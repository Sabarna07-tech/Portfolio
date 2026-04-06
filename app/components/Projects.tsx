import { getGithubData, GithubRepo } from '@/lib/github';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import { Code, ExternalLink } from 'lucide-react';

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
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 text-primary/40 mb-6 drop-shadow-[0_0_15px_rgba(208,188,255,0.4)]">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
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
