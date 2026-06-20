import { getLeetCodeStats } from '@/lib/leetcode';
import ScrollReveal from './ScrollReveal';
import { Activity } from 'lucide-react';

const GITHUB_USERNAME = 'Sabarna07-tech';
// Sentri-themed heatmap: midnight → deep violet → violet → lime → bright lime
const HEATMAP_COLORS = ['#150f23', '#422082', '#6a5fc1', '#c2ef4e', '#e8ff80'];

async function getHeatmapData() {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function Heatmap({ data }: { data: any }) {
  if (!data?.contributions) return <div className="text-[#bdb8c0] text-sm py-4">Heatmap data unavailable.</div>;

  const weeks: any[][] = [];
  let currentWeek: any[] = [];
  const firstDate = new Date(data.contributions[0].date);
  const startDow = firstDate.getDay();

  for (let i = 0; i < startDow; i++) {
    currentWeek.push(null);
  }

  data.contributions.forEach((day: any) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let monthLabels: React.ReactNode[] = [];
  let lastMonth = -1;

  weeks.forEach((week, i) => {
    const validDay = week.find((d: any) => d !== null);
    if (validDay) {
      const m = new Date(validDay.date).getMonth();
      if (m !== lastMonth) {
        monthLabels.push(<span key={i} style={{ width: '13px', textAlign: 'left', flexShrink: 0 }}>{monthNames[m]}</span>);
        lastMonth = m;
      } else {
        monthLabels.push(<span key={i} style={{ width: '13px', flexShrink: 0 }}></span>);
      }
    } else {
      monthLabels.push(<span key={i} style={{ width: '13px', flexShrink: 0 }}></span>);
    }
  });

  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  return (
    <div className="overflow-x-auto no-scrollbar py-2">
      <div className="min-w-max flex flex-col">
        <div className="flex gap-[3px] mb-1 ml-[28px] text-[10px] text-[#79628c] select-none">
          {monthLabels}
        </div>
        <div className="flex gap-0">
          <div className="flex flex-col gap-[3px] mr-1 text-[10px] text-[#79628c] select-none min-w-[24px]">
            {dayLabels.map((l, i) => <div key={i} style={{ height: '13px', lineHeight: '13px' }}>{l}</div>)}
          </div>
          <div className="flex gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => {
                  if (!day) return <div key={di} style={{ width: '13px', height: '13px' }}></div>;
                  const color = HEATMAP_COLORS[day.level] || HEATMAP_COLORS[0];
                  return (
                    <div
                      key={di}
                      title={`${day.count} contributions on ${day.date}`}
                      style={{ width: '13px', height: '13px', backgroundColor: color, borderRadius: '2px' }}
                      className="hover:ring-1 hover:ring-[#c2ef4e]/50 transition-shadow cursor-default"
                    ></div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Dashboard() {
  const [heatmapData, lcStats] = await Promise.all([
    getHeatmapData(),
    getLeetCodeStats()
  ]);

  return (
    <section className="py-12 sm:py-16 md:py-20" id="telemetry">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <ScrollReveal>
          <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-16">
            <h3 className="font-headline font-bold flex items-center text-xl sm:text-2xl md:text-3xl text-white">
              <Activity className="text-[#c2ef4e] mr-2 sm:mr-3 w-6 h-6 sm:w-8 sm:h-8" /> Telemetry &amp; <span className="chip-lime ml-2">Activity</span>
            </h3>
            <div className="flex-grow h-px bg-gradient-to-r from-[#362d59] to-transparent"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
          {/* GitHub Stats */}
          <ScrollReveal delay={0.1} className="md:col-span-8 bg-[#1f1633] border border-[#362d59] p-4 sm:p-6 md:p-8 rounded-[18px] relative overflow-hidden flex flex-col justify-between hover:border-[#6a5fc1]/40 transition-colors">
            <div className="absolute top-0 right-0 p-8 opacity-[0.06] pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="120" height="120" className="text-[#c2ef4e]">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            
            <div className="relative z-10 mb-4 sm:mb-6 md:mb-8">
              <h4 className="font-headline font-bold text-sm sm:text-base md:text-lg text-white mb-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span>GitHub Contribution Graph</span>
                <span className="text-[10px] sm:text-xs font-code text-[#bdb8c0] font-normal">
                  <span className="text-[#c2ef4e] font-bold">{heatmapData?.total?.lastYear || '—'}</span> contributions in the last year
                </span>
              </h4>
              <p className="text-sm text-[#79628c]">Real-time telemetry extracted from open source interactions.</p>
            </div>

            <div className="relative z-10 bg-[#150f23]/50 p-2 sm:p-3 md:p-4 rounded-[12px] border border-[#362d59]/50">
              <Heatmap data={heatmapData} />
            </div>
          </ScrollReveal>

          {/* LeetCode Stats — Spotlight Violet Card */}
          <ScrollReveal delay={0.2} className="md:col-span-4 card-spotlight p-5 sm:p-6 md:p-8 rounded-[18px]">
            <h4 className="font-headline font-bold text-base sm:text-lg text-white mb-6 sm:mb-8 flex justify-between items-center">
              LeetCode Telemetry
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-[#c2ef4e] w-6 h-6">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125 1.513 5.527 5.527 0 0 0 .524 1.704 5.343 5.343 0 0 0 .97 1.48L8.66 22.51a1.29 1.29 0 0 0 1.83 0l1.83-1.83a1.29 1.29 0 0 0 0-1.83l-1.83-1.83a1.29 1.29 0 0 0-1.83 0l-3.37 3.37a2.58 2.58 0 0 1-3.66 0 2.58 2.58 0 0 1 0-3.66l4.49-4.49zm2.463 3.6c-.347 0-.693.132-.958.397l-6.85 6.85-2.07 2.071c-.53.53-.53 1.388 0 1.918l1.496 1.496c.53.53 1.388.53 1.918 0l2.07-2.07 6.85-6.85c.53-.53.53-1.388 0-1.918l-1.498-1.496c-.265-.265-.611-.398-.958-.398zm-.045 1.543l.865.865-6.85 6.85-.865-.865 6.85-6.85zm3.178 3.178c-.347 0-.693.132-.958.397l-2.07 2.071c-.53.53-.53 1.388 0 1.918l5.354 5.354c.53.53 1.388.53 1.918 0l2.07-2.07c.53-.53.53-1.388 0-1.918l-5.354-5.354c-.265-.265-.611-.397-.958-.397z"/>
              </svg>
            </h4>

            {lcStats ? (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-[#c2ef4e] font-headline font-bold text-4xl">{lcStats.totalSolved}</p>
                    <p className="text-xs uppercase tracking-widest text-[#bdb8c0] mt-1">Problems Solved</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#fa7faa] font-headline font-bold text-lg">#{lcStats.ranking}</p>
                    <p className="text-xs uppercase tracking-widest text-[#bdb8c0] mt-1">Global Rank</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {[
                    { label: 'Easy', count: lcStats.easySolved, total: lcStats.totalEasy, color: 'text-[#c2ef4e]', bg: '#c2ef4e' },
                    { label: 'Medium', count: lcStats.mediumSolved, total: lcStats.totalMedium, color: 'text-[#ffc01e]', bg: '#ffc01e' },
                    { label: 'Hard', count: lcStats.hardSolved, total: lcStats.totalHard, color: 'text-[#fa7faa]', bg: '#fa7faa' }
                  ].map(lvl => {
                    const pct = lvl.total > 0 ? (lvl.count / lvl.total) * 100 : 0;
                    return (
                      <div key={lvl.label}>
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-sm font-bold ${lvl.color}`}>{lvl.label}</span>
                          <span className="text-xs text-[#bdb8c0] font-code">{lvl.count} / {lvl.total}</span>
                        </div>
                        <div className="w-full h-3 rounded-full bg-[#150f23] overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct}%`, backgroundColor: lvl.bg }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-[#bdb8c0] text-sm">LeetCode stats unavailable.</p>
              </div>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
