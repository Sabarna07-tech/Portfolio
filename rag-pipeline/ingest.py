import os
from github import Github
import subprocess
from langchain_text_splitters import Language
from langchain_community.document_loaders.generic import GenericLoader
from langchain_community.document_loaders.parsers import LanguageParser
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings

from dotenv import load_dotenv
load_dotenv()

# Environment variables
GITHUB_PAT = os.environ.get("GITHUB_PAT", "")
if not os.environ.get("GEMINI_API_KEY"):
    os.environ["GEMINI_API_KEY"] = ""

def ingest():
    # Phase 1: Ingestion (Cloning the top 5 repos)
    print("--- Phase 1: Cloning Repositories ---")
    g = Github(GITHUB_PAT)
    user = g.get_user()

    clone_dir = "./my_knowledge_base"
    os.makedirs(clone_dir, exist_ok=True)

    repos_to_ingest = [
        "Portfolio", "Power-Quality-Disturbance-PQD-Classification-On-Device-Detection",
        "PaySlip", "payslip-extension", "Clinical-EMR", "Iterative-Self-Distillation",
        "GridWatch", "orderassist", "FastNAS", "tradingWorkflow-Engine",
        "Multimodal-RAG-for-Image-Text-Search", "Vision-Search-Engine",
        "renewable-energy-optimization-ai", "Distributed-Sparse-Matrix-Multiplication",
        "vectaraft", "netstack-arcade", "6502-CPU_Emulator", "crispy-octo-broccoli",
        "super-octo-fiesta", "ML-DL-NLP-CV", "autoinvestigator", "HFTC",
        "Vehicle_Insurance_Forecasting", "Hospital-Management-System", "EchoVision",
        "Sabarna07-tech", "LLM_compiler_Optimizer", "claude-python-trading-bot",
        "WagonDamageNew", "MLOps-practice1"
    ]

    for repo in user.get_repos():
        if repo.name not in repos_to_ingest:
            continue
        
        print(f"Cloning {repo.name}...")
        repo_path = os.path.join(clone_dir, repo.name)
        
        # Clone or pull if it already exists
        if not os.path.exists(repo_path):
            subprocess.run(["git", "clone", repo.clone_url, repo_path])
        else:
            subprocess.run(["git", "-C", repo_path, "pull"])
            
    # Phase 2: Robust Loading & Syntax-Aware Chunking
    print("--- Phase 2: Loading & Syntax-Aware Chunking ---")
    from langchain_core.documents import Document
    documents = []
    
    for root, dirs, files in os.walk(clone_dir):
        if any(skip in root for skip in [".git", "node_modules", "venv", "__pycache__"]):
            continue
        for file in files:
            if file.endswith((".py", ".tsx", ".ts", ".js", ".md", ".jsx", ".go", ".cpp", ".rs", ".java", ".kt")):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()
                except UnicodeDecodeError:
                    try:
                        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                            content = f.read()
                    except Exception:
                        continue
                except Exception:
                    continue
                
                documents.append(Document(page_content=content, metadata={"source": file_path, "repo": file_path.split(os.sep)[2] if len(file_path.split(os.sep)) > 2 else "unknown"}))
                
    print(f"Loaded {len(documents)} source files.")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000, 
        chunk_overlap=200
    )

    chunks = splitter.split_documents(documents)
    print(f"Split codebase into {len(chunks)} logical chunks.")

    # Phase 3: Embedding and Vector Storage (Pinecone for Production)
    print("--- Phase 3: Embedding & Storing into Pinecone ---")
    from pinecone import Pinecone
    
    if "PINECONE_API_KEY" not in os.environ:
        print("ERROR: PINECONE_API_KEY is not set. Please set it to proceed with cloud deployment.")
        return

    pc = Pinecone(api_key=os.environ["PINECONE_API_KEY"])
    index = pc.Index("portfolio-rag")

    print("Generating Llama-V2 embeddings and syncing to Pinecone Serverless...")

    # Process in batches to stay within API payload limits
    batch_size = 96 
    for i in range(3072, len(chunks), batch_size):
        batch_chunks = chunks[i : i + batch_size]
        texts = [chunk.page_content for chunk in batch_chunks]
        
        import time
        max_retries = 3
        
        for attempt in range(max_retries):
            try:
                # 1. Generate 1024-dim embeddings via Pinecone's hosted Llama model
                embeddings_res = pc.inference.embed(
                    model="llama-text-embed-v2",
                    inputs=texts,
                    parameters={"input_type": "passage", "truncate": "END"}
                )
                
                # 2. Package standard vectors with metadata
                vectors = []
                for j, emb in enumerate(embeddings_res):
                    vectors.append({
                        "id": f"chunk-{i+j}",
                        "values": emb["values"],
                        "metadata": {"text": texts[j]} # This matches your "Field map: text"
                    })
                    
                # 3. Standard Upsert
                index.upsert(vectors=vectors)
                print(f"Upserted chunks {i} to {i + len(batch_chunks)}")
                
                # Sleep to respect the 250,000 Tokens Per Minute free-tier limit
                # 96 chunks * ~250 tokens = 24k tokens. 10 batches = 240k tokens/min.
                # Delay 6.5 seconds per batch ensures < 10 batches a minute.
                time.sleep(6.5)
                break
            except Exception as e:
                print(f"Error on batch {i}: {e}. Retrying in 60 seconds...")
                time.sleep(60)

    print("Pinecone Sync Complete! 🚀")

    print("Codebase successfully embedded and stored.")

if __name__ == "__main__":
    ingest()
