import { getGithubData, GithubRepo } from '@/lib/github';
import ScrollReveal from './ScrollReveal';
import { StaggerGroup, StaggerItem } from './Stagger';
import TiltCard from './TiltCard';
import { Code, ExternalLink, Star, Clock, GitFork } from 'lucide-react';
import { timeAgo, langColor, accentFor, titleize } from '@/lib/format';

const FALLBACK_PROJECTS: GithubRepo[] = [
  {
    id: 1,
    name: 'portfolio',
    full_name: 'Sabarna07-tech/portfolio',
    html_url: 'https://github.com/Sabarna07-tech/portfolio',
    description: 'Personal curatorial portfolio designed for peak performance and aesthetics.',
    fork: false,
    stargazers_count: 5,
    language: 'TypeScript',
    topics: ['portfolio', 'nextjs', 'webgl'],
    homepage: '',
    updated_at: new Date().toISOString(),
  },
];

const EXT: Record<string, string> = {
  typescript: 'tsx',
  javascript: 'js',
  python: 'py',
  go: 'go',
  rust: 'rs',
  c: 'c',
  'c++': 'cpp',
  java: 'java',
  html: 'html',
  css: 'css',
};

function fileExt(lang?: string | null) {
  if (!lang) return 'git';
  return EXT[lang.toLowerCase()] ?? 'src';
}

export default async function Projects() {
  const data = await getGithubData();
  const projects = data?.projects?.length ? data.projects : FALLBACK_PROJECTS;

  return (
    <section className="py-16 sm:py-24 md:py-32 pb-24 sm:pb-32 md:pb-48" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-24">
            <span className="eyebrow text-[#79628c] mb-3">Selected Work</span>
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Curated <span className="chip-lime">Installations</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-16 sm:space-y-24 md:space-y-40">
          {projects.map((repo: GithubRepo, index: number) => {
            const isAlternate = index % 2 !== 0;
            const accent = accentFor(repo.name);
            const lc = langColor(repo.language);
            const title = titleize(repo.name);
            const topics = (repo.topics || []).slice(0, 4);

            const visualPanel = (
              <TiltCard className={`rounded-[18px] ${isAlternate ? 'md:-mr-4 lg:-mr-8' : 'md:-ml-4 lg:-ml-8'}`}>
                <div>
                  <div
                    className={`relative rounded-[18px] overflow-hidden aspect-[16/9] bg-[#120c1f] border border-[#362d59] shadow-[0_20px_50px_rgba(0,0,0,0.45)] group transition-transform duration-700 hover:scale-[1.02] ${
                      isAlternate ? 'rotate-[0.6deg]' : 'rotate-[-0.6deg]'
                    }`}
                  >
                    {/* generative grid + accent glow */}
                    <div className="absolute inset-0 bg-grid-faint opacity-60" />
                    <div
                      className="absolute -top-1/3 -right-1/4 w-2/3 h-2/3 rounded-full blur-[60px] opacity-40 group-hover:opacity-70 transition-opacity duration-700"
                      style={{ backgroundColor: accent }}
                    />
                    {/* sweeping scanline */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div
                        className="scanline absolute left-0 right-0 h-24 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: `linear-gradient(to bottom, transparent, ${accent}22, transparent)`,
                        }}
                      />
                    </div>

                    {/* window chrome */}
                    <div className="relative z-10 flex items-center gap-2 px-4 sm:px-5 py-3 border-b border-[#362d59]/70 bg-[#150f23]/60 backdrop-blur-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#fa7faa]/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffc01e]/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#c2ef4e]/70" />
                      <span className="ml-3 font-code text-[10px] sm:text-xs text-[#79628c] truncate">
                        ~/{repo.name}.{fileExt(repo.language)}
                      </span>
                    </div>

                    {/* body */}
                    <div
                      className="relative z-10 flex flex-col justify-center h-[calc(100%-44px)] px-5 sm:px-8"
                      style={{ transform: 'translateZ(40px)' }}
                    >
                      <h4 className="font-headline font-bold text-2xl sm:text-3xl md:text-4xl tracking-tighter text-white leading-none">
                        {title}
                      </h4>
                      <div className="mt-3 flex items-center gap-3 text-xs font-code text-[#bdb8c0]">
                        {repo.language && (
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lc }} />
                            {repo.language}
                          </span>
                        )}
                        {repo.stargazers_count > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <Star size={12} className="text-[#ffc01e]" /> {repo.stargazers_count}
                          </span>
                        )}
                      </div>
                      {topics.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {topics.map((t) => (
                            <span
                              key={t}
                              className="font-code text-[10px] px-2 py-0.5 rounded border border-[#362d59] text-[#79628c]"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            );

            const infoPanel = (
              <TiltCard className="z-10 relative">
                <div
                  className={`bg-[#1f1633] border border-[#362d59] p-6 sm:p-8 md:p-10 rounded-[18px] ${
                      isAlternate ? 'md:-mr-6 md:pl-8 lg:-mr-12 lg:pl-16' : 'md:-ml-6 md:pr-8 lg:-ml-12 lg:pr-16'
                    } shadow-2xl hover:border-[#6a5fc1]/40 transition-colors`}
                  >
                    <div style={{ transform: 'translateZ(40px)' }}>
                      <span
                        className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-4"
                        style={{ color: accent }}
                      >
                        <span className="w-6 h-px" style={{ backgroundColor: accent }} />
                        {repo.language || 'Application'}
                      </span>

                      <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 uppercase tracking-tighter line-clamp-2">
                        {title}
                      </h3>

                      <p className="text-[#bdb8c0] mb-6 leading-[2] text-sm sm:text-base md:text-[16px]">
                        {repo.description ||
                          'An open-source installation driven by continuous technical iteration and rigorous architectural design.'}
                      </p>

                      {/* meta row */}
                      <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-6 text-xs text-[#79628c]">
                        {repo.stargazers_count > 0 && (
                          <span className="inline-flex items-center gap-1.5">
                            <Star size={14} className="text-[#ffc01e]" /> {repo.stargazers_count} stars
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={14} className="text-[#6a5fc1]" /> {timeAgo(repo.updated_at)}
                        </span>
                        {repo.fork && (
                          <span className="inline-flex items-center gap-1.5">
                            <GitFork size={14} /> fork
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <a className="btn-sentri-primary text-xs sm:text-sm" href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          <Code size={18} /> REPOSITORY
                        </a>
                        {repo.homepage && (
                          <a className="btn-sentri-ghost text-xs sm:text-sm" href={repo.homepage} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={18} /> LIVE DEMO
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
              </TiltCard>
            );

            return (
              <StaggerGroup
                key={repo.id}
                className="grid md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-center group relative"
                stagger={0.12}
              >
                <StaggerItem
                  direction={isAlternate ? 'right' : 'left'}
                  className={`md:col-span-7 ${isAlternate ? 'order-1 md:order-2' : ''}`}
                >
                  {visualPanel}
                </StaggerItem>
                <StaggerItem
                  direction={isAlternate ? 'left' : 'right'}
                  className={`md:col-span-5 ${isAlternate ? 'order-2 md:order-1 relative z-20' : 'relative z-20'}`}
                >
                  {infoPanel}
                </StaggerItem>
              </StaggerGroup>
            );
          })}
        </div>
      </div>
    </section>
  );
}
