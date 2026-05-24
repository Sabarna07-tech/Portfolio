'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COMMANDS: Record<string, () => string[]> = {
  about: () => [
    'Sabarna Saha | AI/ML Engineer @ Jadavpur University',
    'Specializing in RAG, Deep Learning, and highly performant architectures.',
  ],
  whoami: () => ['Sabarna Saha — AI/ML Engineer & Power Engineer'],
  pwd: () => ['/home/sabarna/portfolio'],
  ls: () => ['about.tsx  skills.ts  experience.md  certs.json  projects/'],
  help: () => [
    'Available commands:',
    '  about     - Who is Sabarna?',
    '  ls / pwd  - Standard Unix commands',
    '  whoami    - Print user info',
    '  theme     - Toggle visual theme',
    '  clear     - Clear terminal',
    '  exit      - Close terminal'
  ]
};

export default function TerminalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'hacker' | 'cyber'>('hacker');
  const [history, setHistory] = useState<string[]>([
    'Welcome to the Curator Terminal v2.0 (React Port)',
    'Type "help" to see available commands.',
    'Shortcut: Ctrl+` to toggle terminal anytime.',
    ''
  ]);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    const toggleEvent = () => setIsOpen(prev => !prev);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggle-terminal', toggleEvent);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-terminal', toggleEvent);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isOpen, history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((prev) => [...prev, `❯ ${cmd}`]);

    if (trimmed === 'clear') {
      setHistory([]);
    } else if (trimmed === 'exit') {
      setIsOpen(false);
    } else if (trimmed === 'theme') {
      setTheme(t => t === 'hacker' ? 'cyber' : 'hacker');
      setHistory(prev => [...prev, `Switched theme to ${theme === 'hacker' ? 'cyber' : 'hacker'}`]);
    } else if (COMMANDS[trimmed]) {
      setHistory((prev) => [...prev, ...COMMANDS[trimmed]()]);
    } else {
      setHistory((prev) => [...prev, `command not found: ${trimmed}`, `Type "help" for a list of commands.`]);
    }

    setInputVal('');
  };

  const handleInputDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  const getThemeClasses = () => {
    if (theme === 'cyber') return 'bg-[#150f23] text-[#6a5fc1] border-[#362d59] shadow-[0_0_40px_rgba(106,95,193,0.15)]';
    return 'bg-[#150f23] text-[#c2ef4e] border-[#362d59] shadow-[0_0_40px_rgba(194,239,78,0.1)]';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full max-w-3xl h-[75vh] sm:h-[65vh] md:h-[60vh] rounded-[12px] flex flex-col border overflow-hidden ${getThemeClasses()}`}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Header */}
            <div className="p-3 bg-black/40 border-b border-[#362d59] flex items-center justify-between">
              <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400"></button>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <p className="text-xs font-code opacity-60 uppercase tracking-widest">{theme === 'cyber' ? 'root@cybernet:~' : 'sabarna@curator:~'}</p>
              <div className="w-12"></div>
            </div>

            {/* Output */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 font-code text-xs sm:text-sm leading-loose no-scrollbar">
              {history.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap">{line}</div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input Row */}
            <div className="flex items-center p-3 sm:p-4 bg-black/20 border-t border-[#362d59]">
              <span className="mr-3" style={{ color: theme === 'cyber' ? '#6a5fc1' : '#c2ef4e' }}>❯</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleInputDown}
                className="flex-1 bg-transparent border-none outline-none font-code text-xs sm:text-sm w-full focus:ring-0"
                placeholder="type a command..."
                spellCheck={false}
                autoFocus
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
