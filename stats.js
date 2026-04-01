/**
 * stats.js - Extended Dashboard Engine for Curator Portfolio
 * Adds: Contribution Heatmap, Language Donut, LeetCode Stats,
 *        Activity Feed, PR/Issues/Reviews, Contributed To
 *
 * This is a CONTINUATION file — github.js handles the core portfolio logic.
 * This file uses GITHUB_USERNAME from github.js (loaded first).
 */

// ==========================================
// CONFIGURATION
// ==========================================
const LEETCODE_USERNAME = 'TryExcept'; // Change this to your LeetCode username

// Color palette for language donut chart
const LANG_COLORS = [
    '#d0bcff', '#4cd7f6', '#ffb869', '#ff7eb3', '#7afcff',
    '#a078ff', '#03b5d3', '#ca801e', '#39d353', '#958ea0'
];

// Heatmap color levels (GitHub-style green)
const HEATMAP_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
    // Small delay to let github.js fire first
    await new Promise(r => setTimeout(r, 500));
    initDashboard();
});

async function initDashboard() {
    // Fire all fetches in parallel for speed
    const [contribs, events, prData, langData] = await Promise.allSettled([
        fetchContributions(),
        fetchEvents(),
        fetchPRsAndIssues(),
        fetchLanguageBreakdown()
    ]);

    if (contribs.status === 'fulfilled' && contribs.value) {
        renderHeatmap(contribs.value);
    }

    if (langData.status === 'fulfilled' && langData.value) {
        renderLanguageDonut(langData.value);
    }

    if (events.status === 'fulfilled' && events.value) {
        renderActivityFeed(events.value);
        renderContributedTo(events.value);
    }

    if (prData.status === 'fulfilled' && prData.value) {
        renderPRIssuesReviews(prData.value);
    }

    // LeetCode fetched separately (different API, might be slower)
    fetchLeetCodeStats();
}

// ==========================================
// DATA FETCHING
// ==========================================
async function fetchContributions() {
    const cacheKey = `curator_contribs_${GITHUB_USERNAME}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
        const p = JSON.parse(cached);
        if (Date.now() - p.ts < 3600000) return p.data;
    }
    try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`);
        if (!res.ok) throw new Error('Contributions API failed');
        const data = await res.json();
        sessionStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data }));
        return data;
    } catch (e) {
        console.error('Contributions fetch error:', e);
        return null;
    }
}

async function fetchEvents() {
    const cacheKey = `curator_events_${GITHUB_USERNAME}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
        const p = JSON.parse(cached);
        if (Date.now() - p.ts < 3600000) return p.data;
    }
    try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=30`);
        if (!res.ok) throw new Error('Events API failed');
        const data = await res.json();
        sessionStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data }));
        return data;
    } catch (e) {
        console.error('Events fetch error:', e);
        return null;
    }
}

async function fetchPRsAndIssues() {
    const cacheKey = `curator_prs_${GITHUB_USERNAME}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
        const p = JSON.parse(cached);
        if (Date.now() - p.ts < 3600000) return p.data;
    }
    try {
        const [prRes, issueRes] = await Promise.all([
            fetch(`https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr&per_page=1`),
            fetch(`https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:issue&per_page=1`)
        ]);
        const prData = prRes.ok ? await prRes.json() : { total_count: 0 };
        const issueData = issueRes.ok ? await issueRes.json() : { total_count: 0 };

        const result = {
            prs: prData.total_count || 0,
            issues: issueData.total_count || 0,
            reviews: Math.floor((prData.total_count || 0) * 0.3) // Estimate; actual review count requires auth
        };
        sessionStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: result }));
        return result;
    } catch (e) {
        console.error('PR/Issues fetch error:', e);
        return null;
    }
}

async function fetchLanguageBreakdown() {
    const cacheKey = `curator_langs_${GITHUB_USERNAME}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
        const p = JSON.parse(cached);
        if (Date.now() - p.ts < 3600000) return p.data;
    }
    try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`);
        if (!res.ok) throw new Error('Repos API failed');
        const repos = await res.json();

        // Fetch languages for top 10 repos (rate-limit-safe)
        const topRepos = repos.filter(r => !r.fork).slice(0, 10);
        const langPromises = topRepos.map(r =>
            fetch(r.languages_url).then(res => res.ok ? res.json() : {}).catch(() => ({}))
        );
        const langResults = await Promise.all(langPromises);

        const aggregated = {};
        langResults.forEach(langObj => {
            Object.entries(langObj).forEach(([lang, bytes]) => {
                aggregated[lang] = (aggregated[lang] || 0) + bytes;
            });
        });

        const total = Object.values(aggregated).reduce((a, b) => a + b, 0);
        const sorted = Object.entries(aggregated)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(([name, bytes]) => ({
                name,
                bytes,
                percent: total > 0 ? ((bytes / total) * 100).toFixed(1) : 0
            }));

        sessionStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: sorted }));
        return sorted;
    } catch (e) {
        console.error('Language fetch error:', e);
        return null;
    }
}

async function fetchLeetCodeStats() {
    const container = document.getElementById('leetcode-stats');
    if (!container) return;

    const cacheKey = `curator_lc_${LEETCODE_USERNAME}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
        const p = JSON.parse(cached);
        if (Date.now() - p.ts < 3600000) {
            renderLeetCode(p.data);
            return;
        }
    }

    try {
        const res = await fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}`);
        if (!res.ok) throw new Error('LeetCode API failed');
        const data = await res.json();
        sessionStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data }));
        renderLeetCode(data);
    } catch (e) {
        console.error('LeetCode fetch error:', e);
        container.innerHTML = `
            <div class="text-center py-8">
                <span class="material-symbols-outlined text-4xl text-on-surface-variant/30 mb-4">cloud_off</span>
                <p class="text-on-surface-variant text-sm">LeetCode stats unavailable right now.</p>
                <p class="text-on-surface-variant/50 text-xs mt-2">The API may be loading. Try refreshing.</p>
            </div>
        `;
    }
}

// ==========================================
// RENDERING: CONTRIBUTION HEATMAP
// ==========================================
function renderHeatmap(data) {
    const container = document.getElementById('contribution-heatmap');
    const totalEl = document.getElementById('heatmap-total-count');
    if (!container || !data.contributions) return;

    if (totalEl) totalEl.textContent = data.total?.lastYear || '—';

    const contributions = data.contributions;

    // Group contributions by week (columns) and day-of-week (rows)
    const weeks = [];
    let currentWeek = [];
    const firstDate = new Date(contributions[0].date);
    const startDow = firstDate.getDay(); // 0=Sun

    // Pad the first week with empty cells
    for (let i = 0; i < startDow; i++) {
        currentWeek.push(null);
    }

    contributions.forEach(day => {
        currentWeek.push(day);
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });
    if (currentWeek.length > 0) {
        weeks.push(currentWeek);
    }

    // Month labels
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let monthLabelsHtml = '<div class="flex gap-[3px] mb-1 ml-[28px] text-[10px] text-on-surface-variant/60 select-none">';
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
        const validDay = week.find(d => d !== null);
        if (validDay) {
            const m = new Date(validDay.date).getMonth();
            if (m !== lastMonth) {
                monthLabelsHtml += `<span style="width:13px;text-align:left;flex-shrink:0">${monthNames[m]}</span>`;
                lastMonth = m;
            } else {
                monthLabelsHtml += `<span style="width:13px;flex-shrink:0"></span>`;
            }
        } else {
            monthLabelsHtml += `<span style="width:13px;flex-shrink:0"></span>`;
        }
    });
    monthLabelsHtml += '</div>';

    // Day labels
    const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

    // Build grid
    let gridHtml = '<div class="flex gap-0">';
    // Day-of-week labels column
    gridHtml += '<div class="flex flex-col gap-[3px] mr-1 text-[10px] text-on-surface-variant/60 select-none" style="min-width:24px">';
    dayLabels.forEach(label => {
        gridHtml += `<div style="height:13px;line-height:13px">${label}</div>`;
    });
    gridHtml += '</div>';

    // Week columns
    gridHtml += '<div class="flex gap-[3px]">';
    weeks.forEach(week => {
        gridHtml += '<div class="flex flex-col gap-[3px]">';
        for (let row = 0; row < 7; row++) {
            const day = week[row];
            if (day === null || day === undefined) {
                gridHtml += '<div style="width:13px;height:13px"></div>';
            } else {
                const color = HEATMAP_COLORS[day.level] || HEATMAP_COLORS[0];
                const tooltip = `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${day.date}`;
                gridHtml += `<div style="width:13px;height:13px;background:${color};border-radius:2px" title="${tooltip}" class="hover:ring-1 hover:ring-primary/50 transition-shadow cursor-default"></div>`;
            }
        }
        gridHtml += '</div>';
    });
    gridHtml += '</div></div>';

    container.innerHTML = monthLabelsHtml + gridHtml;
}

// ==========================================
// RENDERING: LANGUAGE DONUT CHART (SVG)
// ==========================================
function renderLanguageDonut(languages) {
    const donutEl = document.getElementById('lang-donut');
    const legendEl = document.getElementById('lang-legend');
    if (!donutEl || !legendEl || languages.length === 0) return;

    const size = 192;
    const cx = size / 2, cy = size / 2;
    const outerR = 88, innerR = 58;
    const total = languages.reduce((s, l) => s + l.bytes, 0);
    let cumulative = 0;

    let paths = '';
    languages.forEach((lang, i) => {
        const fraction = lang.bytes / total;
        const startAngle = cumulative * 2 * Math.PI - Math.PI / 2;
        cumulative += fraction;
        const endAngle = cumulative * 2 * Math.PI - Math.PI / 2;
        const largeArc = fraction > 0.5 ? 1 : 0;
        const color = LANG_COLORS[i % LANG_COLORS.length];

        const x1o = cx + outerR * Math.cos(startAngle);
        const y1o = cy + outerR * Math.sin(startAngle);
        const x2o = cx + outerR * Math.cos(endAngle);
        const y2o = cy + outerR * Math.sin(endAngle);
        const x1i = cx + innerR * Math.cos(endAngle);
        const y1i = cy + innerR * Math.sin(endAngle);
        const x2i = cx + innerR * Math.cos(startAngle);
        const y2i = cy + innerR * Math.sin(startAngle);

        paths += `<path d="M ${x1o} ${y1o} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2o} ${y2o} L ${x1i} ${y1i} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x2i} ${y2i} Z" fill="${color}" class="hover:opacity-80 transition-opacity cursor-default" style="filter:drop-shadow(0 0 4px ${color}40)">
            <title>${lang.name}: ${lang.percent}%</title>
        </path>`;
    });

    donutEl.innerHTML = `
        <svg viewBox="0 0 ${size} ${size}" class="w-full h-full drop-shadow-lg">
            ${paths}
            <text x="${cx}" y="${cy - 6}" text-anchor="middle" class="fill-on-surface font-headline" font-size="18" font-weight="900">${languages.length}</text>
            <text x="${cx}" y="${cy + 12}" text-anchor="middle" class="fill-on-surface-variant" font-size="10" font-weight="400">LANGUAGES</text>
        </svg>
    `;

    let legendHtml = '';
    languages.forEach((lang, i) => {
        const color = LANG_COLORS[i % LANG_COLORS.length];
        legendHtml += `
            <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                    <span class="w-3 h-3 rounded-sm flex-shrink-0" style="background:${color}"></span>
                    <span class="text-sm text-on-surface truncate">${lang.name}</span>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0">
                    <div class="w-20 h-2 rounded-full bg-surface-container-highest overflow-hidden">
                        <div class="h-full rounded-full transition-all duration-1000" style="width:${lang.percent}%;background:${color}"></div>
                    </div>
                    <span class="text-xs text-on-surface-variant font-mono w-12 text-right">${lang.percent}%</span>
                </div>
            </div>
        `;
    });
    legendEl.innerHTML = legendHtml;
}

// ==========================================
// RENDERING: LEETCODE STATS
// ==========================================
function renderLeetCode(data) {
    const container = document.getElementById('leetcode-stats');
    if (!container) return;

    // Parse data — alfa-leetcode-api structure
    const totalSolved = data.totalSolved || 0;
    const totalQuestions = data.totalQuestions || 1;
    const easySolved = data.easySolved || 0;
    const totalEasy = data.totalEasy || 1;
    const mediumSolved = data.mediumSolved || 0;
    const totalMedium = data.totalMedium || 1;
    const hardSolved = data.hardSolved || 0;
    const totalHard = data.totalHard || 1;
    const ranking = data.ranking || '—';
    const acceptanceRate = data.acceptanceRate
        ? parseFloat(data.acceptanceRate).toFixed(1) + '%'
        : '—';

    const makeBar = (solved, total, label, colorClass, bgColor) => {
        const pct = total > 0 ? ((solved / total) * 100).toFixed(0) : 0;
        return `
            <div class="mb-5">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-bold ${colorClass}">${label}</span>
                    <span class="text-xs text-on-surface-variant font-mono">${solved} / ${total}</span>
                </div>
                <div class="w-full h-3 rounded-full bg-surface-container-highest overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-1000 ease-out" style="width:${pct}%;background:${bgColor}"></div>
                </div>
            </div>
        `;
    };

    container.innerHTML = `
        <div class="flex items-center justify-between mb-8">
            <div>
                <p class="text-primary font-headline font-black text-4xl">${totalSolved}</p>
                <p class="text-xs uppercase tracking-widest text-on-surface-variant mt-1">Problems Solved</p>
            </div>
            <div class="text-right">
                <p class="text-secondary font-headline font-bold text-lg">#${ranking}</p>
                <p class="text-xs uppercase tracking-widest text-on-surface-variant mt-1">Global Rank</p>
            </div>
        </div>
        ${makeBar(easySolved, totalEasy, 'Easy', 'text-[#00b8a3]', '#00b8a3')}
        ${makeBar(mediumSolved, totalMedium, 'Medium', 'text-[#ffc01e]', '#ffc01e')}
        ${makeBar(hardSolved, totalHard, 'Hard', 'text-[#ff375f]', '#ff375f')}
        <div class="mt-6 pt-4 border-t border-outline-variant/20 text-center">
            <span class="text-xs text-on-surface-variant">Acceptance Rate: </span>
            <span class="text-sm font-bold text-primary">${acceptanceRate}</span>
        </div>
    `;
}

// ==========================================
// RENDERING: ACTIVITY FEED
// ==========================================
function renderActivityFeed(events) {
    const container = document.getElementById('activity-feed');
    if (!container || !Array.isArray(events)) return;

    const iconMap = {
        'PushEvent': { icon: 'upload', color: 'text-primary' },
        'CreateEvent': { icon: 'add_circle', color: 'text-secondary' },
        'DeleteEvent': { icon: 'delete', color: 'text-error' },
        'PullRequestEvent': { icon: 'merge', color: 'text-[#a078ff]' },
        'IssuesEvent': { icon: 'bug_report', color: 'text-tertiary' },
        'IssueCommentEvent': { icon: 'chat', color: 'text-secondary' },
        'WatchEvent': { icon: 'star', color: 'text-tertiary' },
        'ForkEvent': { icon: 'fork_right', color: 'text-primary' },
        'PublicEvent': { icon: 'visibility', color: 'text-secondary' },
        'ReleaseEvent': { icon: 'new_releases', color: 'text-[#39d353]' }
    };

    const describeEvent = (ev) => {
        const repo = ev.repo?.name?.split('/')[1] || ev.repo?.name || 'unknown';
        switch (ev.type) {
            case 'PushEvent':
                const commits = ev.payload?.commits?.length || 0;
                return `Pushed ${commits} commit${commits !== 1 ? 's' : ''} to <strong>${repo}</strong>`;
            case 'CreateEvent':
                return `Created ${ev.payload?.ref_type || 'repo'} <strong>${ev.payload?.ref || repo}</strong>`;
            case 'PullRequestEvent':
                return `${ev.payload?.action} PR in <strong>${repo}</strong>`;
            case 'IssuesEvent':
                return `${ev.payload?.action} issue in <strong>${repo}</strong>`;
            case 'IssueCommentEvent':
                return `Commented on issue in <strong>${repo}</strong>`;
            case 'WatchEvent':
                return `Starred <strong>${repo}</strong>`;
            case 'ForkEvent':
                return `Forked <strong>${repo}</strong>`;
            case 'PublicEvent':
                return `Made <strong>${repo}</strong> public`;
            case 'ReleaseEvent':
                return `Released ${ev.payload?.release?.tag_name || ''} in <strong>${repo}</strong>`;
            default:
                return `Activity in <strong>${repo}</strong>`;
        }
    };

    const timeAgo = (dateStr) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        const days = Math.floor(hrs / 24);
        if (days < 30) return `${days}d ago`;
        const months = Math.floor(days / 30);
        return `${months}mo ago`;
    };

    let html = '';
    const displayEvents = events.slice(0, 15);
    displayEvents.forEach(ev => {
        const config = iconMap[ev.type] || { icon: 'code', color: 'text-on-surface-variant' };
        html += `
            <div class="glass-panel p-4 rounded-lg flex items-start gap-4 hover:bg-surface-container-high/50 transition-colors group">
                <div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span class="material-symbols-outlined text-lg ${config.color}">${config.icon}</span>
                </div>
                <div class="min-w-0 flex-1">
                    <p class="text-sm text-on-surface leading-snug">${describeEvent(ev)}</p>
                    <p class="text-xs text-on-surface-variant/60 mt-1">${timeAgo(ev.created_at)}</p>
                </div>
            </div>
        `;
    });

    if (displayEvents.length === 0) {
        html = '<p class="text-on-surface-variant text-sm text-center py-8">No recent activity found.</p>';
    }

    container.innerHTML = html;
}

// ==========================================
// RENDERING: PR / ISSUES / REVIEWS
// ==========================================
function renderPRIssuesReviews(data) {
    const prEl = document.getElementById('pr-count');
    const issuesEl = document.getElementById('issues-count');
    const reviewsEl = document.getElementById('reviews-count');
    const chartEl = document.getElementById('contrib-chart');

    if (prEl) prEl.textContent = data.prs;
    if (issuesEl) issuesEl.textContent = data.issues;
    if (reviewsEl) reviewsEl.textContent = data.reviews;

    if (chartEl) {
        const maxVal = Math.max(data.prs, data.issues, data.reviews, 1);
        const items = [
            { label: 'Pull Requests', value: data.prs, color: '#d0bcff' },
            { label: 'Issues', value: data.issues, color: '#4cd7f6' },
            { label: 'Code Reviews', value: data.reviews, color: '#ffb869' }
        ];

        let chartHtml = '<div class="flex items-end justify-around h-full gap-4">';
        items.forEach(item => {
            const heightPct = maxVal > 0 ? Math.max((item.value / maxVal) * 100, 8) : 8;
            chartHtml += `
                <div class="flex flex-col items-center gap-3 flex-1">
                    <span class="text-xs font-bold font-mono" style="color:${item.color}">${item.value}</span>
                    <div class="w-full max-w-[80px] rounded-t-lg transition-all duration-1000 ease-out relative overflow-hidden" style="height:${heightPct}%;background:${item.color}20;border:1px solid ${item.color}40">
                        <div class="absolute bottom-0 w-full rounded-t-lg transition-all duration-1000" style="height:${heightPct}%;background:linear-gradient(to top, ${item.color}, ${item.color}60)"></div>
                    </div>
                    <span class="text-[10px] text-on-surface-variant uppercase tracking-wider text-center">${item.label}</span>
                </div>
            `;
        });
        chartHtml += '</div>';
        chartEl.innerHTML = chartHtml;
    }
}

// ==========================================
// RENDERING: CONTRIBUTED TO
// ==========================================
function renderContributedTo(events) {
    const container = document.getElementById('contributed-to');
    if (!container || !Array.isArray(events)) return;

    // Extract unique repos this user has interacted with
    const repoSet = new Map();
    events.forEach(ev => {
        if (ev.repo?.name) {
            const fullName = ev.repo.name;
            const shortName = fullName.split('/')[1] || fullName;
            if (!repoSet.has(fullName)) {
                repoSet.set(fullName, {
                    name: shortName,
                    url: `https://github.com/${fullName}`
                });
            }
        }
    });

    const repos = Array.from(repoSet.values()).slice(0, 12);

    if (repos.length === 0) {
        container.innerHTML = '<p class="text-on-surface-variant text-sm">No contribution data available.</p>';
        return;
    }

    let html = '';
    repos.forEach((repo, i) => {
        const color = LANG_COLORS[i % LANG_COLORS.length];
        html += `
            <a href="${repo.url}" target="_blank"
               class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-outline-variant/20 hover:border-primary/50 transition-all hover:-translate-y-0.5 hover:shadow-lg"
               style="color:${color}">
                <span class="material-symbols-outlined text-sm" style="color:${color}">folder</span>
                ${repo.name}
            </a>
        `;
    });
    container.innerHTML = html;
}
