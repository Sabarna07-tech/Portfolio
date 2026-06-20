'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Search,
  Home,
  User,
  Cpu,
  FolderGit2,
  FlaskConical,
  Activity,
  GitBranch,
  Award,
  Mail,
  Terminal,
  Briefcase,
  Code2,
  Music,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

interface Command {
  id: string;
  label: string;
  hint: string;
  group: 'Navigate' | 'Actions' | 'Links';
  keywords?: string;
  icon: React.ReactNode;
  run: () => void;
}

const ICON = 'w-[18px] h-[18px] shrink-0';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = () => setOpen(false);

  const scrollTo = (id: string) => {
    close();
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const openExternal = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    close();
  };

  const commands: Command[] = useMemo(
    () => [
      { id: 'top', label: 'Home', hint: 'Back to top', group: 'Navigate', icon: <Home className={ICON} />, run: () => scrollTo('hero') },
      { id: 'process', label: 'Process', hint: 'How I work', group: 'Navigate', keywords: 'about visionary', icon: <User className={ICON} />, run: () => scrollTo('process') },
      { id: 'tech', label: 'Tech Stack', hint: 'Tools & arsenal', group: 'Navigate', keywords: 'skills domain', icon: <Cpu className={ICON} />, run: () => scrollTo('tech') },
      { id: 'portfolio', label: 'Portfolio', hint: 'Curated projects', group: 'Navigate', keywords: 'projects work installations', icon: <FolderGit2 className={ICON} />, run: () => scrollTo('portfolio') },
      { id: 'publications', label: 'Research', hint: 'Publications', group: 'Navigate', keywords: 'paper springer comsys', icon: <FlaskConical className={ICON} />, run: () => scrollTo('publications') },
      { id: 'telemetry', label: 'Telemetry', hint: 'GitHub & LeetCode activity', group: 'Navigate', keywords: 'dashboard stats heatmap', icon: <Activity className={ICON} />, run: () => scrollTo('telemetry') },
      { id: 'timeline', label: 'Timeline', hint: 'Professional evolution', group: 'Navigate', keywords: 'experience career', icon: <GitBranch className={ICON} />, run: () => scrollTo('timeline') },
      { id: 'milestones', label: 'Milestones', hint: 'Education & honors', group: 'Navigate', keywords: 'certifications awards education', icon: <Award className={ICON} />, run: () => scrollTo('milestones') },
      { id: 'contact', label: 'Contact', hint: "Let's build the future", group: 'Navigate', keywords: 'email hire', icon: <Mail className={ICON} />, run: () => scrollTo('contact') },

      {
        id: 'terminal',
        label: 'Open AI Terminal',
        hint: 'Chat with a RAG agent on my codebase',
        group: 'Actions',
        keywords: 'console chat rag ai command',
        icon: <Terminal className={ICON} />,
        run: () => {
          close();
          window.dispatchEvent(new Event('toggle-terminal'));
        },
      },
      {
        id: 'copy-email',
        label: copied ? 'Copied!' : 'Copy Email',
        hint: 'sabarna.saha1308@gmail.com',
        group: 'Actions',
        keywords: 'mail contact clipboard',
        icon: <Mail className={ICON} />,
        run: () => {
          navigator.clipboard?.writeText('sabarna.saha1308@gmail.com');
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        },
      },

      { id: 'github', label: 'GitHub', hint: 'github.com/Sabarna07-tech', group: 'Links', keywords: 'source code repo', icon: <Code2 className={ICON} />, run: () => openExternal('https://github.com/Sabarna07-tech') },
      { id: 'linkedin', label: 'LinkedIn', hint: 'in/sabarnasaha', group: 'Links', keywords: 'connect professional', icon: <Briefcase className={ICON} />, run: () => openExternal('https://www.linkedin.com/in/sabarnasaha/') },
      { id: 'leetcode', label: 'LeetCode', hint: 'leetcode.com/u/TryExcept', group: 'Links', keywords: 'dsa problems', icon: <Code2 className={ICON} />, run: () => openExternal('https://leetcode.com/u/TryExcept/') },
      { id: 'spotify', label: 'Spotify', hint: 'What I listen to', group: 'Links', keywords: 'music now playing', icon: <Music className={ICON} />, run: () => openExternal('https://open.spotify.com/user/sabarna07') },
    ],
    [copied]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint} ${c.keywords ?? ''} ${c.group}`.toLowerCase().includes(q)
    );
  }, [query, commands]);

  // Group while preserving order
  const groups = useMemo(() => {
    const order: Command['group'][] = ['Navigate', 'Actions', 'Links'];
    return order
      .map((g) => ({ group: g, items: filtered.filter((c) => c.group === g) }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  // Global open shortcut + custom event from the navbar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((p) => !p);
      }
    };
    const onToggle = () => setOpen((p) => !p);
    window.addEventListener('keydown', onKey);
    window.addEventListener('toggle-command-palette', onToggle);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('toggle-command-palette', onToggle);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      flat[active]?.run();
    }
  };

  // Keep the active row in view
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[1000] flex items-start justify-center p-4 pt-[12vh] sm:pt-[15vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={close}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -12 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-xl rounded-[16px] border border-[#362d59] bg-[#150f23]/95 shadow-[0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden"
            onKeyDown={onKeyDown}
          >
            {/* gradient top hairline */}
            <div className="h-[2px] w-full bg-gradient-to-r from-[#c2ef4e] via-[#6a5fc1] to-[#fa7faa]" />

            {/* Search */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#362d59]">
              <Search className="w-5 h-5 text-[#79628c]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, actions, links…"
                className="flex-1 bg-transparent outline-none text-sm sm:text-base text-white placeholder:text-[#79628c]"
                spellCheck={false}
              />
              <kbd className="hidden sm:inline-block text-[10px] font-code text-[#79628c] border border-[#362d59] rounded px-1.5 py-0.5">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[52vh] overflow-y-auto no-scrollbar py-2">
              {groups.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-[#79628c]">No matches found.</p>
              )}
              {groups.map((g) => (
                <div key={g.group} className="px-2 py-1">
                  <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#79628c]">
                    {g.group}
                  </p>
                  {g.items.map((c) => {
                    const idx = flat.indexOf(c);
                    const isActive = idx === active;
                    return (
                      <button
                        key={c.id}
                        data-idx={idx}
                        onMouseMove={() => setActive(idx)}
                        onClick={c.run}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-left transition-colors ${
                          isActive ? 'bg-[#6a5fc1]/20 text-white' : 'text-[#bdb8c0] hover:bg-white/5'
                        }`}
                      >
                        <span className={isActive ? 'text-[#c2ef4e]' : 'text-[#79628c]'}>{c.icon}</span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-medium truncate">{c.label}</span>
                          <span className="block text-[11px] text-[#79628c] truncate">{c.hint}</span>
                        </span>
                        {isActive && <CornerDownLeft className="w-4 h-4 text-[#79628c]" />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer hints */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#362d59] text-[10px] text-[#79628c]">
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1"><ArrowUp className="w-3 h-3" /><ArrowDown className="w-3 h-3" /> navigate</span>
                <span className="flex items-center gap-1"><CornerDownLeft className="w-3 h-3" /> select</span>
              </span>
              <span className="font-code">SABARNA · OS</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
