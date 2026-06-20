import { getGithubData, TechStackItem } from '@/lib/github';
import ScrollReveal from './ScrollReveal';
import { StaggerGroup, StaggerItem } from './Stagger';
import TiltCard from './TiltCard';
import { Terminal, Cloud, MemoryStick, Globe, Palette, Blocks, Server, Code2, BrainCircuit, Database, Cpu, Wrench } from 'lucide-react';

const DOMAIN_EXPERTISE = [
  {
    category: "AI & Machine Learning",
    icon: <BrainCircuit size={24} className="text-[#c2ef4e] mb-4" />,
    skills: ["TensorFlow", "Keras", "RAG", "NLP", "RNN", "LSTM", "GRU", "Generative AI", "LLM", "Machine Learning", "Time Series Forecasting"]
  },
  {
    category: "Data Science & Viz",
    icon: <Database size={24} className="text-[#6a5fc1] mb-4" />,
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Statsmodels"]
  },
  {
    category: "Core Engineering",
    icon: <Cpu size={24} className="text-[#fa7faa] mb-4" />,
    skills: ["Microprocessors", "8051 Microcontroller", "Power Engineering", "x86 Assembly"]
  },
  {
    category: "Frameworks & Tools",
    icon: <Wrench size={24} className="text-[#c2ef4e] mb-4" />,
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
  if (['python', 'java', 'c++', 'c#', 'php', 'ruby'].includes(t)) return <Terminal className="mb-4 text-[#c2ef4e] group-hover:scale-110 transition-transform" size={28} />;
  if (['go', 'docker', 'aws'].includes(t)) return <Cloud className="mb-4 text-[#c2ef4e] group-hover:scale-110 transition-transform" size={28} />;
  if (['rust', 'c'].includes(t)) return <MemoryStick className="mb-4 text-[#c2ef4e] group-hover:scale-110 transition-transform" size={28} />;
  if (t === 'html') return <Globe className="mb-4 text-[#c2ef4e] group-hover:scale-110 transition-transform" size={28} />;
  if (t === 'css' || t === 'tailwind') return <Palette className="mb-4 text-[#c2ef4e] group-hover:scale-110 transition-transform" size={28} />;
  if (['react', 'nextjs', 'vue'].includes(t)) return <Blocks className="mb-4 text-[#c2ef4e] group-hover:scale-110 transition-transform" size={28} />;
  if (t === 'nodejs') return <Server className="mb-4 text-[#c2ef4e] group-hover:scale-110 transition-transform" size={28} />;
  return <Code2 className="mb-4 text-[#c2ef4e] group-hover:scale-110 transition-transform" size={28} />;
}

function getLargeIconForTech(tech: string) {
  const t = tech.toLowerCase();
  if (['python', 'java', 'c++', 'c#', 'php', 'ruby'].includes(t)) return <Terminal size={120} className="opacity-[0.07] group-hover:opacity-[0.12] transition-opacity text-[#c2ef4e]" />;
  if (['go', 'docker', 'aws'].includes(t)) return <Cloud size={120} className="opacity-[0.07] group-hover:opacity-[0.12] transition-opacity text-[#c2ef4e]" />;
  if (['rust', 'c'].includes(t)) return <MemoryStick size={120} className="opacity-[0.07] group-hover:opacity-[0.12] transition-opacity text-[#c2ef4e]" />;
  if (t === 'html') return <Globe size={120} className="opacity-[0.07] group-hover:opacity-[0.12] transition-opacity text-[#c2ef4e]" />;
  if (t === 'css' || t === 'tailwind') return <Palette size={120} className="opacity-[0.07] group-hover:opacity-[0.12] transition-opacity text-[#c2ef4e]" />;
  if (['react', 'nextjs', 'vue'].includes(t)) return <Blocks size={120} className="opacity-[0.07] group-hover:opacity-[0.12] transition-opacity text-[#c2ef4e]" />;
  if (t === 'nodejs') return <Server size={120} className="opacity-[0.07] group-hover:opacity-[0.12] transition-opacity text-[#c2ef4e]" />;
  return <Code2 size={120} className="opacity-[0.07] group-hover:opacity-[0.12] transition-opacity text-[#c2ef4e]" />;
}

export default async function Skills() {
  const data = await getGithubData();
  const techStack = data?.techStack?.length ? data.techStack : FALLBACK_STACK;

  return (
    <section className="py-16 sm:py-24 md:py-32" id="tech">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <ScrollReveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 md:mb-20 gap-4 sm:gap-8">
          <div>
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 sm:mb-4 text-white">
              Tech Stack <span className="chip-lime">&amp;</span> Arsenal
            </h2>
            <p className="text-[#bdb8c0] text-sm sm:text-base">A curated collection of tools I master to bring ideas to life.</p>
          </div>
          <div className="flex space-x-2 pb-2">
            <div className="w-12 h-1 bg-[#c2ef4e]"></div>
            <div className="w-4 h-1 bg-[#362d59]"></div>
          </div>
        </ScrollReveal>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {techStack.map((tech: TechStackItem, index: number) => {
            if (index === 0) {
              return (
                <StaggerItem key={tech.name} className="sm:col-span-2 sm:row-span-2 h-full">
                  <TiltCard className="h-full">
                    <div className="w-full h-full card-spotlight p-6 sm:p-8 md:p-10 rounded-[18px] relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8">
                        {getLargeIconForTech(tech.name)}
                      </div>
                      <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 mt-2 sm:mt-4 relative z-10 text-white">{tech.name} Mastery</h3>
                      <p className="text-[#bdb8c0] leading-relaxed max-w-sm relative z-10 font-medium text-sm sm:text-base">Primary focus area across most open source contributions and architectural designs.</p>
                      <div className="mt-6 sm:mt-8 md:mt-12 relative z-10">
                        <span className="px-5 py-2.5 bg-[#150f23] text-[#c2ef4e] border border-[#c2ef4e]/20 rounded-full text-xs font-bold uppercase tracking-widest">
                          {tech.count} Repositories
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                </StaggerItem>
              );
            }

            return (
              <StaggerItem key={tech.name} className="h-full">
                <TiltCard className="h-full">
                  <div className="h-full bg-[#1f1633] border border-[#362d59] p-5 sm:p-6 md:p-8 rounded-[18px] hover:border-[#6a5fc1]/40 transition-colors group">
                    {getIconForTech(tech.name)}
                    <h4 className="font-headline font-bold text-white mb-2">{tech.name}</h4>
                    <p className="text-sm text-[#bdb8c0] leading-relaxed">Frequently utilized in {tech.count} recent projects.</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* Domain Expertise (Manual Skills) */}
        <div className="mt-16 sm:mt-24 md:mt-32">
          <ScrollReveal>
            <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-8 sm:mb-12 flex items-center gap-3 sm:gap-4 text-white">
              Domain <span className="chip-lime">Expertise</span>
              <div className="flex-grow h-px bg-gradient-to-r from-[#362d59] to-transparent"></div>
            </h3>
          </ScrollReveal>
          
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {DOMAIN_EXPERTISE.map((domain, idx) => (
              <StaggerItem key={idx} className="h-full">
                <TiltCard className="h-full">
                  <div className="h-full bg-[#1f1633] border border-[#362d59] p-6 rounded-[18px] hover:border-[#6a5fc1]/40 transition-colors">
                    {domain.icon}
                    <h4 className="font-headline font-bold text-lg mb-4 text-white">{domain.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {domain.skills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 text-xs bg-[#150f23] text-[#bdb8c0] hover:text-[#c2ef4e] transition-colors rounded border border-[#362d59]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
