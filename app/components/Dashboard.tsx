import { getLeetCodeStats } from '@/lib/leetcode';
import ScrollReveal from './ScrollReveal';
import { Activity, Code, GitMerge, Bug, Star, ShieldCheck } from 'lucide-react';

const GITHUB_USERNAME = 'Sabarna07-tech';
const HEATMAP_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];

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
  if (!data?.contributions) return <div className="text-on-surface-variant text-sm py-4">Heatmap data unavailable.</div>;

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
        <div className="flex gap-[3px] mb-1 ml-[28px] text-[10px] text-on-surface-variant/60 select-none">
          {monthLabels}
        </div>
        <div className="flex gap-0">
          <div className="flex flex-col gap-[3px] mr-1 text-[10px] text-on-surface-variant/60 select-none min-w-[24px]">
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
                      className="hover:ring-1 hover:ring-primary/50 transition-shadow cursor-default"
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
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <h3 className="font-headline font-extrabold flex items-center text-3xl">
              <Activity className="text-secondary mr-3 w-8 h-8" /> Telemetry &amp; Activity
            </h3>
            <div className="flex-grow h-px bg-gradient-to-r from-outline-variant/50 to-transparent"></div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-12 gap-8">
          {/* GitHub Stats */}
          <ScrollReveal delay={0.1} className="md:col-span-8 glass-panel p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
               <ShieldCheck size={120} />
            </div>
            
            <div className="relative z-10 mb-8">
              <h4 className="font-headline font-bold text-lg text-on-surface mb-2 flex justify-between items-center">
                <span>GitHub Contribution Graph</span>
                <span className="text-xs font-mono text-on-surface-variant font-normal">
                  <span className="text-primary font-bold">{heatmapData?.total?.lastYear || '—'}</span> contributions in the last year
                </span>
              </h4>
              <p className="text-sm text-on-surface-variant">Real-time telemetry extracted from open source interactions.</p>
            </div>

            <div className="relative z-10 bg-surface-container-highest/30 p-4 rounded-xl border border-white/5">
              <Heatmap data={heatmapData} />
            </div>
          </ScrollReveal>

          {/* LeetCode Stats */}
          <ScrollReveal delay={0.2} className="md:col-span-4 glass-panel p-8 rounded-2xl">
            <h4 className="font-headline font-bold text-lg text-on-surface mb-8 flex justify-between items-center">
              LeetCode Telemetry
              <Code className="text-tertiary" size={20} />
            </h4>

            {lcStats ? (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-primary font-headline font-black text-4xl">{lcStats.totalSolved}</p>
                    <p className="text-xs uppercase tracking-widest text-on-surface-variant mt-1">Problems Solved</p>
                  </div>
                  <div className="text-right">
                    <p className="text-secondary font-headline font-bold text-lg">#{lcStats.ranking}</p>
                    <p className="text-xs uppercase tracking-widest text-on-surface-variant mt-1">Global Rank</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {[
                    { label: 'Easy', count: lcStats.easySolved, total: lcStats.totalEasy, color: 'text-[#00b8a3]', bg: '#00b8a3' },
                    { label: 'Medium', count: lcStats.mediumSolved, total: lcStats.totalMedium, color: 'text-[#ffc01e]', bg: '#ffc01e' },
                    { label: 'Hard', count: lcStats.hardSolved, total: lcStats.totalHard, color: 'text-[#ff375f]', bg: '#ff375f' }
                  ].map(lvl => {
                    const pct = lvl.total > 0 ? (lvl.count / lvl.total) * 100 : 0;
                    return (
                      <div key={lvl.label}>
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-sm font-bold ${lvl.color}`}>{lvl.label}</span>
                          <span className="text-xs text-on-surface-variant font-mono">{lvl.count} / {lvl.total}</span>
                        </div>
                        <div className="w-full h-3 rounded-full bg-surface-container-highest overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct}%`, backgroundColor: lvl.bg }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-on-surface-variant text-sm">LeetCode stats unavailable.</p>
              </div>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
