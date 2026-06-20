import { getGithubData } from '@/lib/github';
import { getLeetCodeStats } from '@/lib/leetcode';
import ScrollReveal from './ScrollReveal';
import CountUp from './CountUp';

const GITHUB_USERNAME = 'Sabarna07-tech';

async function getContributions(): Promise<number | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.total?.lastYear ?? null;
  } catch {
    return null;
  }
}

interface Stat {
  to: number;
  suffix?: string;
  label: string;
  sub: string;
  accent: string;
}

export default async function StatsBand() {
  const [github, lc, contributions] = await Promise.all([
    getGithubData(),
    getLeetCodeStats(),
    getContributions(),
  ]);

  const stats: Stat[] = [
    {
      to: github?.totalRepos || 18,
      suffix: '+',
      label: 'Repositories',
      sub: 'Shipped on GitHub',
      accent: '#c2ef4e',
    },
    {
      to: contributions || 420,
      suffix: '+',
      label: 'Contributions',
      sub: 'In the last year',
      accent: '#6a5fc1',
    },
    {
      to: lc?.totalSolved || 200,
      suffix: '+',
      label: 'Problems Solved',
      sub: 'On LeetCode',
      accent: '#fa7faa',
    },
    {
      to: 1,
      label: 'Publication',
      sub: 'Springer · COMSYS',
      accent: '#c2ef4e',
    },
    {
      to: 9,
      suffix: '+',
      label: 'Certifications',
      sub: 'Oracle · AWS · Google',
      accent: '#6a5fc1',
    },
  ];

  return (
    <section className="relative pt-4 pb-8 sm:pb-12" aria-label="Key metrics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <ScrollReveal>
          <div className="rounded-[18px] border border-[#362d59] bg-[#1f1633]/70 backdrop-blur-sm overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-[#362d59]/70">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`group relative p-5 sm:p-6 md:p-7 text-center transition-colors hover:bg-[#251d3d]/40 ${
                    i === stats.length - 1 ? 'col-span-2 md:col-span-1' : ''
                  }`}
                >
                  {/* top accent bar reveal on hover */}
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-2/3 transition-all duration-500 ease-out rounded-full"
                    style={{ backgroundColor: s.accent, boxShadow: `0 0 12px ${s.accent}` }}
                  />
                  <div
                    className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter tabular-nums"
                    style={{ color: s.accent }}
                  >
                    <CountUp to={s.to} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-white">
                    {s.label}
                  </p>
                  <p className="mt-1 text-[10px] sm:text-[11px] text-[#79628c]">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
