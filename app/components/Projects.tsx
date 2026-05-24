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
    <section className="py-16 sm:py-24 md:py-32 pb-24 sm:pb-32 md:pb-48" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <ScrollReveal>
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-12 sm:mb-16 md:mb-20 text-center text-white">
            Curated <span className="chip-lime">Installations</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-16 sm:space-y-24 md:space-y-40">
          {projects.map((repo: GithubRepo, index: number) => {
            const isAlternate = index % 2 !== 0;

            const imagePanel = (
              <TiltCard className={`rounded-[18px] ${isAlternate ? 'md:-mr-4 lg:-mr-8' : 'md:-ml-4 lg:-ml-8'}`}>
                <ScrollReveal delay={0.1} direction={isAlternate ? 'right' : 'left'}>
                  <div className={`relative rounded-[18px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] aspect-[16/9] bg-[#150f23] transition-transform duration-700 hover:scale-105 group peer border border-[#362d59] ${isAlternate ? 'rotate-[1deg]' : 'rotate-[-1deg]'}`}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center text-white z-10 transition-transform duration-700 group-hover:scale-110" style={{ transform: "translateZ(30px)" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-[#6a5fc1]/40 mb-4 sm:mb-6 drop-shadow-[0_0_15px_rgba(106,95,193,0.4)]">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <h4 className="font-headline font-bold text-xl sm:text-2xl md:text-3xl tracking-tight opacity-80 uppercase">
                        {repo.name.replace(/-/g, ' ')}
                      </h4>
                    </div>
                    <div className="absolute inset-0 bg-[#6a5fc1]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                  </div>
                </ScrollReveal>
              </TiltCard>
            );

            const infoPanel = (
              <TiltCard className="z-10 relative">
                <ScrollReveal delay={0.2} direction={isAlternate ? 'left' : 'right'}>
                  <div className={`bg-[#1f1633] border border-[#362d59] p-6 sm:p-8 md:p-10 rounded-[18px] ${isAlternate ? 'md:-mr-6 md:pl-8 lg:-mr-12 lg:pl-16' : 'md:-ml-6 md:pr-8 lg:-ml-12 lg:pr-16'} shadow-2xl hover:border-[#6a5fc1]/40 transition-colors`}>
                    <div style={{ transform: "translateZ(40px)" }}>
                      <span className="text-xs font-bold text-[#c2ef4e] tracking-widest uppercase mb-4 block">
                        {repo.language || 'Application'}
                      </span>
                      
                      <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 uppercase tracking-tighter line-clamp-2">
                        {repo.name.replace(/-/g, ' ')}
                      </h3>
                      
                      <p className="text-[#bdb8c0] mb-6 sm:mb-8 leading-[2] text-sm sm:text-base md:text-[16px]">
                        {repo.description || 'An open-source installation driven by continuous technical iteration and rigorous architectural design.'}
                      </p>
                      
                      <div className="flex flex-wrap gap-4">
                        <a
                          className="btn-sentri-primary text-xs sm:text-sm"
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Code size={18} /> REPOSITORY
                        </a>
                        
                        {repo.homepage && (
                          <a
                            className="btn-sentri-ghost text-xs sm:text-sm"
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
              <div key={repo.id} className="grid md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-center group relative">
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
