import os
import sys
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

from dotenv import load_dotenv
load_dotenv()

if not os.environ.get("GEMINI_API_KEY"):
    os.environ["GEMINI_API_KEY"] = ""

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

def query_codebase(query_text):
    print("Initializing ChromaDB...")
    vectorstore = Chroma(
        persist_directory="./chroma_code_db"
    )
    
    retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
    
    print("Initializing Gemini LLM...")
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        google_api_key=os.environ["GEMINI_API_KEY"],
        temperature=0.2
    )
    
    prompt = ChatPromptTemplate.from_template(
        "You are an expert AI software engineer and architecture analyzer.\n"
        "Use the following snippets of the codebase to answer the user's question.\n"
        "If you cannot find the answer in the provided code snippets, just say you don't know.\n"
        "Code Snippets:\n{context}\n\n"
        "Question: {question}"
    )
    
    print(f"Querying codebase: '{query_text}'")
    
    rag_chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    
    answer = rag_chain.invoke(query_text)
    
    print("\nAnswer:")
    print(answer)
    
    print("\n" + "="*50)
    print("Sources (Top 5):")
    docs = retriever.invoke(query_text)
    for doc in docs:
        source = doc.metadata.get("source", "Unknown")
        print(f"- {source}")

if __name__ == "__main__":
    query = sys.argv[1] if len(sys.argv) > 1 else "What does the Wagon Damage Detection model do?"
    query_codebase(query)
