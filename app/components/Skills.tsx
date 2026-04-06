import { getGithubData, TechStackItem } from '@/lib/github';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import { Terminal, Cloud, MemoryStick, Globe, Palette, Blocks, Server, Code2, BrainCircuit, Database, Cpu, Wrench } from 'lucide-react';

const DOMAIN_EXPERTISE = [
  {
    category: "AI & Machine Learning",
    icon: <BrainCircuit size={24} className="text-primary mb-4" />,
    skills: ["TensorFlow", "Keras", "RAG", "NLP", "RNN", "LSTM", "GRU", "Generative AI", "LLM", "Machine Learning", "Time Series Forecasting"]
  },
  {
    category: "Data Science & Viz",
    icon: <Database size={24} className="text-secondary mb-4" />,
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Statsmodels"]
  },
  {
    category: "Core Engineering",
    icon: <Cpu size={24} className="text-tertiary mb-4" />,
    skills: ["Microprocessors", "8051 Microcontroller", "Power Engineering", "x86 Assembly"]
  },
  {
    category: "Frameworks & Tools",
    icon: <Wrench size={24} className="text-primary mb-4" />,
    skills: ["ChromaDB", "Redis", "Apache Airflow", "Django REST Framework", "MATLAB", "Ansys Fluent"]
  }
];

const FALLBACK_STACK = [
  { name: 'Python', count: 12 },
  { name: 'JavaScript', count: 8 },
  { name: 'React', count: 5 },
  { name: 'NodeJS', count: 4 },
  { name: 'Docker', count: 3 }
];

function getIconForTech(tech: string) {
  const t = tech.toLowerCase();
  if (['python', 'java', 'c++', 'c#', 'php', 'ruby'].includes(t)) return <Terminal className="mb-4 text-secondary group-hover:scale-110 transition-transform" size={28} />;
  if (['go', 'docker', 'aws'].includes(t)) return <Cloud className="mb-4 text-secondary group-hover:scale-110 transition-transform" size={28} />;
  if (['rust', 'c'].includes(t)) return <MemoryStick className="mb-4 text-secondary group-hover:scale-110 transition-transform" size={28} />;
  if (t === 'html') return <Globe className="mb-4 text-secondary group-hover:scale-110 transition-transform" size={28} />;
  if (t === 'css' || t === 'tailwind') return <Palette className="mb-4 text-secondary group-hover:scale-110 transition-transform" size={28} />;
  if (['react', 'nextjs', 'vue'].includes(t)) return <Blocks className="mb-4 text-secondary group-hover:scale-110 transition-transform" size={28} />;
  if (t === 'nodejs') return <Server className="mb-4 text-secondary group-hover:scale-110 transition-transform" size={28} />;
  return <Code2 className="mb-4 text-secondary group-hover:scale-110 transition-transform" size={28} />;
}

function getLargeIconForTech(tech: string) {
  const t = tech.toLowerCase();
  // Using the same mapping but returning size 120 and different styling for the featured master card
  if (['python', 'java', 'c++', 'c#', 'php', 'ruby'].includes(t)) return <Terminal size={120} className="opacity-10 group-hover:opacity-20 transition-opacity text-white" />;
  if (['go', 'docker', 'aws'].includes(t)) return <Cloud size={120} className="opacity-10 group-hover:opacity-20 transition-opacity text-white" />;
  if (['rust', 'c'].includes(t)) return <MemoryStick size={120} className="opacity-10 group-hover:opacity-20 transition-opacity text-white" />;
  if (t === 'html') return <Globe size={120} className="opacity-10 group-hover:opacity-20 transition-opacity text-white" />;
  if (t === 'css' || t === 'tailwind') return <Palette size={120} className="opacity-10 group-hover:opacity-20 transition-opacity text-white" />;
  if (['react', 'nextjs', 'vue'].includes(t)) return <Blocks size={120} className="opacity-10 group-hover:opacity-20 transition-opacity text-white" />;
  if (t === 'nodejs') return <Server size={120} className="opacity-10 group-hover:opacity-20 transition-opacity text-white" />;
  return <Code2 size={120} className="opacity-10 group-hover:opacity-20 transition-opacity text-white" />;
}

export default async function Skills() {
  const data = await getGithubData();
  const techStack = data?.techStack?.length ? data.techStack : FALLBACK_STACK;

  return (
    <section className="py-32 bg-surface" id="tech">
      <div className="max-w-7xl mx-auto px-8">
        <ScrollReveal className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="font-headline text-4xl font-extrabold tracking-tight mb-4">
              Tech Stack <span className="text-secondary">&amp;</span> Arsenal
            </h2>
            <p className="text-on-surface-variant">A curated collection of tools I master to bring ideas to life.</p>
          </div>
          <div className="flex space-x-2 pb-2">
            <div className="w-12 h-1 bg-primary"></div>
            <div className="w-4 h-1 bg-outline-variant/20"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techStack.map((tech: TechStackItem, index: number) => {
            if (index === 0) {
              return (
                <TiltCard key={tech.name} className="col-span-2 row-span-2">
                  <ScrollReveal delay={0.1} className="w-full h-full glass-panel p-10 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8">
                      {getLargeIconForTech(tech.name)}
                    </div>
                    <h3 className="font-headline text-3xl font-black mb-6 mt-4 relative z-10 text-white">{tech.name} Mastery</h3>
                    <p className="text-on-surface-variant leading-relaxed max-w-sm relative z-10 font-medium">Primary focus area across most open source contributions and architectural designs.</p>
                    <div className="mt-12 relative z-10">
                      <span className="px-5 py-2.5 bg-surface-container-highest text-primary/90 border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest">
                        {tech.count} Repositories
                      </span>
                    </div>
                  </ScrollReveal>
                </TiltCard>
              );
            }
            
            return (
              <TiltCard key={tech.name}>
                <ScrollReveal delay={0.1 + index * 0.1} className="h-full glass-panel p-8 rounded-xl hover:bg-surface-container-high transition-colors group">
                  {getIconForTech(tech.name)}
                  <h4 className="font-headline font-bold text-on-surface mb-2">{tech.name}</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Frequently utilized in {tech.count} recent projects.</p>
                </ScrollReveal>
              </TiltCard>
            );
          })}
        </div>

        {/* Domain Expertise (Manual Skills) */}
        <div className="mt-32">
          <ScrollReveal>
            <h3 className="font-headline text-3xl font-extrabold tracking-tight mb-12 flex items-center gap-4">
              Domain <span className="text-primary">Expertise</span>
              <div className="flex-grow h-px bg-gradient-to-r from-outline-variant/30 to-transparent"></div>
            </h3>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DOMAIN_EXPERTISE.map((domain, idx) => (
              <TiltCard key={idx}>
                <ScrollReveal delay={0.1 * idx} className="h-full glass-panel p-6 rounded-xl hover:border-primary/20 transition-colors">
                  {domain.icon}
                  <h4 className="font-headline font-bold text-lg mb-4">{domain.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {domain.skills.map(skill => (
                      <span key={skill} className="px-2.5 py-1 text-xs bg-surface-container-highest text-on-surface hover:text-primary transition-colors rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </ScrollReveal>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
