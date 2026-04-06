import { getGithubData, GithubRepo } from '@/lib/github';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import { Blocks, Code, ExternalLink } from 'lucide-react';

const FALLBACK_PROJECTS: GithubRepo[] = [
  {
    id: 1,
    name: "portfolio",
    full_name: "Sabarna07-tech/portfolio",
    html_url: "https://github.com/Sabarna07-tech/portfolio",
    description: "Personal curatorial portfolio designed for peak performance and aesthetics.",
    fork: false,
    stargazers_count: 5,
    language: "TypeScript",
    topics: ["portfolio", "nextjs"],
    homepage: "",
    updated_at: new Date().toISOString()
  }
];

export default async function Projects() {
  const data = await getGithubData();
  const projects = data?.projects?.length ? data.projects : FALLBACK_PROJECTS;

  return (
    <section className="py-32 bg-surface-container-low" id="portfolio">
      <div className="max-w-7xl mx-auto px-8">
        <ScrollReveal>
          <h2 className="font-headline text-4xl font-extrabold tracking-tight mb-20 text-center">
            Curated <span className="text-gradient">Installations</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-40">
          {projects.map((repo: GithubRepo, index: number) => {
            const isAlternate = index % 2 !== 0;

            const imagePanel = (
              <TiltCard className={`rounded-xl ${isAlternate ? 'md:-mr-8' : 'md:-ml-8'}`}>
                <ScrollReveal delay={0.1} direction={isAlternate ? 'right' : 'left'}>
                  <div className="relative rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] aspect-[16/9] bg-surface-container-highest transition-transform duration-700 hover:scale-105 group peer">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-on-surface border border-outline-variant/20 z-10 transition-transform duration-700 group-hover:scale-110" style={{ transform: "translateZ(30px)" }}>
                      <Blocks className="w-20 h-20 text-primary/40 mb-6 drop-shadow-[0_0_15px_rgba(208,188,255,0.4)]" />
                      <h4 className="font-headline font-bold text-3xl tracking-tight opacity-80 uppercase">
                        {repo.name.replace(/-/g, ' ')}
                      </h4>
                    </div>
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                  </div>
                </ScrollReveal>
              </TiltCard>
            );

            const infoPanel = (
              <TiltCard className="z-10 relative">
                <ScrollReveal delay={0.2} direction={isAlternate ? 'left' : 'right'}>
                  <div className={`glass-panel p-10 rounded-xl ${isAlternate ? 'md:-mr-12 md:pl-16' : 'md:-ml-12 md:pr-16'} shadow-2xl backdrop-blur-3xl bg-[#171f33]/80 hover:bg-[#1a233a]/90`}>
                    <div style={{ transform: "translateZ(40px)" }}>
                      <span className={`text-xs font-bold text-${isAlternate ? 'secondary' : 'primary'} tracking-widest uppercase mb-4 block`}>
                        {repo.language || 'Application'}
                      </span>
                      
                      <h3 className="font-headline text-4xl font-black text-on-surface mb-6 uppercase tracking-tighter line-clamp-2">
                        {repo.name.replace(/-/g, ' ')}
                      </h3>
                      
                      <p className="text-on-surface-variant mb-8 leading-relaxed text-lg">
                        {repo.description || 'An open-source installation driven by continuous technical iteration and rigorous architectural design.'}
                      </p>
                      
                      <div className="flex flex-wrap gap-4">
                        <a
                          className={`text-on-surface hover:text-${isAlternate ? 'secondary' : 'primary'} transition-colors flex items-center gap-2 text-sm font-bold bg-surface-container-highest px-5 py-3 rounded-xl hover:bg-surface-container-high border border-outline-variant/10 shadow-lg`}
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Code size={18} /> REPOSITORY
                        </a>
                        
                        {repo.homepage && (
                          <a
                            className={`text-on-surface hover:text-${isAlternate ? 'secondary' : 'primary'} transition-colors flex items-center gap-2 text-sm font-bold border border-outline-variant/30 px-5 py-3 rounded-xl hover:bg-surface-container-highest shadow-lg`}
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={18} /> LIVE DEMO
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </TiltCard>
            );

            return (
              <div key={repo.id} className="grid md:grid-cols-12 gap-8 items-center group relative">
                <div className={`md:col-span-7 ${isAlternate ? 'order-1 md:order-2' : ''}`}>
                  {imagePanel}
                </div>
                <div className={`md:col-span-5 ${isAlternate ? 'order-2 md:order-1 relative z-20' : 'relative z-20'}`}>
                  {infoPanel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
