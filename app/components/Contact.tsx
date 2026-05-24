'use client';

import ScrollReveal from './ScrollReveal';
import { Mail, Code, Briefcase, Terminal, Copy } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'sabarna.saha1308@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative" id="contact">
      {/* ===== LIME SQUIGGLY DIVIDER ===== */}
      <div className="relative z-20 bg-[#1f1633]">
        <svg viewBox="0 0 1200 12" className="w-full h-3 block" preserveAspectRatio="none">
          <path d="M0,6 Q50,0 100,6 Q150,12 200,6 Q250,0 300,6 Q350,12 400,6 Q450,0 500,6 Q550,12 600,6 Q650,0 700,6 Q750,12 800,6 Q850,0 900,6 Q950,12 1000,6 Q1050,0 1100,6 Q1150,12 1200,6" stroke="#c2ef4e" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* ===== LIGHT CANVAS POLARITY FLIP ===== */}
      <div className="py-16 sm:py-24 md:py-32 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
          <ScrollReveal>
            {/* Availability Badge — Lime */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-[4px] bg-[#c2ef4e] text-[#1f1633] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-6 sm:mb-8">
              <span className="w-2 h-2 rounded-full bg-[#1f1633] animate-pulse"></span>
              Available for Opportunities
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-4 sm:mb-6 text-[#1f1633]">
              Let's Build the <span className="chip-lime">Future</span>
            </h2>
            <p className="text-[#1f1633]/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16 leading-relaxed font-body">
              Whether you have a breakthrough project in mind or simply want to connect over distributed systems and AI architecture, my inbox is open.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20">
            <button
              onClick={copyEmail}
              className="w-full md:w-auto flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-[8px] bg-white border border-[#e5e7eb] hover:border-[#6a5fc1]/50 transition-colors group"
            >
              <Mail className="text-[#6a5fc1] group-hover:scale-110 transition-transform" size={20} />
              <span className="font-code text-[#1f1633] text-xs sm:text-sm truncate">{email}</span>
              <div className="w-px h-4 bg-[#e5e7eb] mx-1 sm:mx-2"></div>
              {copied ? <span className="text-xs font-bold text-[#c2ef4e]">COPIED</span> : <Copy className="text-[#79628c]" size={16} />}
            </button>

            <a
              href="mailto:sabarna.saha1308@gmail.com"
              className="w-full md:w-auto btn-sentri-primary text-center shadow-[rgb(21,15,35)_0_0_8px_6px]"
            >
              SAY HELLO
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-16 sm:mb-24 md:mb-32">
            <a href="https://linkedin.com/in/sabarnasaha/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#1f1633]/60 hover:text-[#1f1633] transition-colors uppercase tracking-widest text-xs font-bold">
              <Briefcase size={18} /> LinkedIn
            </a>
            <a href="https://github.com/Sabarna07-tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#1f1633]/60 hover:text-[#1f1633] transition-colors uppercase tracking-widest text-xs font-bold">
              <Code size={18} /> GitHub
            </a>
            <a href="https://leetcode.com/u/TryExcept/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#1f1633]/60 hover:text-[#1f1633] transition-colors uppercase tracking-widest text-xs font-bold">
              <Terminal size={18} /> LeetCode
            </a>
          </ScrollReveal>
        </div>

        {/* ===== LIGHT FOOTER ===== */}
        <footer className="relative z-10 border-t border-[#e5e7eb] text-center py-8">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 md:px-8 gap-3 sm:gap-4">
            <p className="text-xs text-[#1f1633]/50 font-code">
              &copy; {new Date().getFullYear()} Sabarna Saha. Curated natively with Next.js &amp; Tailwind.
            </p>
            <div className="flex gap-6">
              <a href="#hero" className="text-xs text-[#1f1633]/50 hover:text-[#1f1633] transition-colors uppercase tracking-widest">Back to top ↑</a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
