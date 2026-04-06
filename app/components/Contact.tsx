'use client';

import ScrollReveal from './ScrollReveal';
import { Mail, Code, Briefcase, Terminal, Copy } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'sabarna.saha1308@gmail.com'; // Extracted from implicit links

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-32 bg-surface-container-low relative" id="contact">
      <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Available for Opportunities
          </div>
          <h2 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
            Let's Build the <span className="text-secondary">Future</span>
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
            Whether you have a breakthrough project in mind or simply want to connect over distributed systems and AI architecture, my inbox is open.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20">
          <button
            onClick={copyEmail}
            className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-surface-container-highest border border-outline-variant/30 hover:border-primary/50 transition-colors group"
          >
            <Mail className="text-primary group-hover:scale-110 transition-transform" size={20} />
            <span className="font-mono text-on-surface">{email}</span>
            <div className="w-px h-4 bg-outline-variant/30 mx-2"></div>
            {copied ? <span className="text-xs font-bold text-secondary">COPIED</span> : <Copy className="text-on-surface-variant" size={16} />}
          </button>

          <a
            href="mailto:sabarna.saha1308@gmail.com"
            className="w-full md:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-surface font-bold glow-button transition-transform hover:scale-105 active:scale-95"
          >
            SAY HELLO
          </a>
        </ScrollReveal>

        <ScrollReveal delay={0.3} className="flex justify-center gap-8 mb-32">
          <a href="https://linkedin.com/in/sabarnasaha/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold">
            <Briefcase size={18} /> LinkedIn
          </a>
          <a href="https://github.com/Sabarna07-tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold">
            <Code size={18} /> GitHub
          </a>
          <a href="https://leetcode.com/u/TryExcept/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold">
            <Terminal size={18} /> LeetCode
          </a>
        </ScrollReveal>
      </div>

      <footer className="relative z-10 border-t border-outline-variant/10 text-center py-8">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-8 gap-4">
          <p className="text-xs text-on-surface-variant font-mono">
            &copy; {new Date().getFullYear()} Sabarna Saha. Curated natively with Next.js & Tailwind.
          </p>
          <div className="flex gap-6">
            <a href="#hero" className="text-xs text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </section>
  );
}
