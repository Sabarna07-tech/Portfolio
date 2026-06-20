// Small pure formatting helpers shared by server components.

/** Compact "x ago" relative time from an ISO date string. */
export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const secs = Math.max(0, Math.floor((Date.now() - then) / 1000));
  const units: [number, string][] = [
    [31536000, 'y'],
    [2592000, 'mo'],
    [604800, 'w'],
    [86400, 'd'],
    [3600, 'h'],
    [60, 'm'],
  ];
  for (const [s, label] of units) {
    const v = Math.floor(secs / s);
    if (v >= 1) return `${v}${label} ago`;
  }
  return 'just now';
}

/** GitHub-style language → dot color, falling back to brand violet. */
const LANG_COLORS: Record<string, string> = {
  typescript: '#3178c6',
  javascript: '#f1e05a',
  python: '#3572A5',
  go: '#00ADD8',
  rust: '#dea584',
  c: '#9b9b9b',
  'c++': '#f34b7d',
  'c#': '#178600',
  java: '#b07219',
  html: '#e34c26',
  css: '#563d7c',
  scss: '#c6538c',
  shell: '#89e051',
  'jupyter notebook': '#DA5B0B',
  dart: '#00B4AB',
  kotlin: '#A97BFF',
  php: '#4F5D95',
  ruby: '#701516',
  vue: '#41b883',
};

export function langColor(lang?: string | null): string {
  if (!lang) return '#6a5fc1';
  return LANG_COLORS[lang.toLowerCase()] ?? '#6a5fc1';
}

/** Deterministic brand accent so each project reads as distinct but on-brand. */
const BRAND_ACCENTS = ['#c2ef4e', '#6a5fc1', '#fa7faa'];

export function accentFor(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return BRAND_ACCENTS[h % BRAND_ACCENTS.length];
}

/** "my-cool-repo" → "My Cool Repo" */
export function titleize(name: string): string {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
