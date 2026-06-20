import { getGithubData, GithubRepo } from '@/lib/github';
import ScrollReveal from './ScrollReveal';
import { StaggerGroup, StaggerItem } from './Stagger';
import { Radio, Star, ArrowUpRight } from 'lucide-react';
import { timeAgo, langColor, titleize } from '@/lib/format';

export default async function CurrentlyBuilding() {
  const data = await getGithubData();
  const repos = data?.recent ?? [];

  return (
    <section className="py-12 sm:py-16 md:py-24" id="activity">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12 md:mb-14">
            <div>
              <span className="inline-flex items-center gap-2 eyebrow text-[#c2ef4e] mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#c2ef4e] opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#c2ef4e]" />
                </span>
                Live · Currently Building
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Latest <span className="chip-lime">Activity</span>
              </h2>
            </div>
            <a
              href="https://github.com/Sabarna07-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#79628c] hover:text-[#c2ef4e] transition-colors"
            >
              <Radio size={14} /> Synced from GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </ScrollReveal>

        {repos.length > 0 ? (
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4" stagger={0.06}>
            {repos.map((repo: GithubRepo) => (
              <StaggerItem key={repo.id} className="h-full">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full bg-[#1f1633] border border-[#362d59] rounded-[14px] p-4 sm:p-5 hover:border-[#c2ef4e]/40 hover:bg-[#251d3d]/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: langColor(repo.language) }}
                      />
                      <span className="font-headline font-bold text-white text-sm sm:text-base truncate group-hover:text-[#c2ef4e] transition-colors">
                        {titleize(repo.name)}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-[#79628c] shrink-0 group-hover:text-[#c2ef4e] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>

                  <p className="text-[#bdb8c0] text-xs sm:text-sm leading-relaxed line-clamp-2 min-h-[2.5em]">
                    {repo.description || 'Active repository — work in progress.'}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#362d59]/60 flex items-center justify-between text-[11px] text-[#79628c] font-code">
                    <span>{repo.language || 'code'}</span>
                    <span className="flex items-center gap-3">
                      {repo.stargazers_count > 0 && (
                        <span className="inline-flex items-center gap-1">
                          <Star size={11} className="text-[#ffc01e]" /> {repo.stargazers_count}
                        </span>
                      )}
                      <span className="text-[#c2ef4e]/80">{timeAgo(repo.updated_at)}</span>
                    </span>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          <ScrollReveal>
            <a
              href="https://github.com/Sabarna07-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#1f1633] border border-[#362d59] rounded-[14px] p-8 text-center hover:border-[#c2ef4e]/40 transition-colors"
            >
              <p className="text-[#bdb8c0] text-sm">
                Live activity is syncing. View the latest commits directly on{' '}
                <span className="text-[#c2ef4e] font-semibold">GitHub →</span>
              </p>
            </a>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
