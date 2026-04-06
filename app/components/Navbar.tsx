'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Terminal, Code, Menu, X } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';

const navItems = [
  { name: 'Portfolio', id: 'portfolio' },
  { name: 'Process', id: 'process' },
  { name: 'Timeline', id: 'timeline' },
  { name: 'Tech', id: 'tech' },
  { name: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(['hero', ...navItems.map((n) => n.id)], 100);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-0 rounded-full transition-all duration-500 ease-out border border-white/5
      ${scrolled ? 'px-2 py-1.5 bg-[#08090d]/90 shadow-[0_12px_48px_rgba(0,0,0,0.8)] backdrop-blur-2xl' : 'px-2 py-1.5 bg-[#0c0d12]/75 shadow-2xl backdrop-blur-3xl'}`}
    >
      {/* Animated Gradient Border (rendered as pseudo-element substitute) */}
      <div className="absolute inset-[-1px] rounded-full pointer-events-none opacity-60 transition-opacity hover:opacity-100 overlay-border-mask"></div>

      {/* Logo Pill */}
      <button
        onClick={scrollToTop}
        className="flex items-center gap-2 px-[6px] py-[6px] pr-3.5 rounded-full hover:bg-white/5 transition-colors group"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-[0_0_12px_rgba(208,188,255,0.3)]">
          <Image src="/logo.png" alt="SABARNA" fill sizes="32px" className="object-cover" />
        </div>
        <span className="text-sm font-bold tracking-tight text-white/90 font-headline hidden sm:inline">SABARNA</span>
      </button>

      {/* Divider */}
      <div className="w-[1px] h-5 bg-white/10 mx-1 hidden md:block"></div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-[2px]">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`relative px-4 py-2 rounded-full font-medium text-[13px] tracking-[0.01em] transition-colors duration-300 link-underline
                ${isActive ? 'text-white bg-primary/10' : 'text-[#e4e2ec]/50 hover:text-[#e4e2ec]/90 hover:bg-white/5 whitespace-nowrap'}`}
            >
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#d0bcff] shadow-[0_0_8px_rgba(208,188,255,0.6)]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </div>

      {/* Divider */}
      <div className="w-[1px] h-5 bg-white/10 mx-1 hidden md:block"></div>

      {/* Action Buttons */}
      <div className="flex items-center gap-[2px]">
        {/* Terminal Button */}
        <button
          onClick={() => window.dispatchEvent(new Event('toggle-terminal'))}
          title="Open Terminal (Ctrl+`)"
          aria-label="Open Terminal"
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#e4e2ec]/45 hover:text-primary hover:bg-primary/10 transition-colors"
        >
          <Terminal size={18} />
        </button>
        {/* GitHub Source */}
        <a
          href="https://github.com/Sabarna07-tech"
          target="_blank"
          rel="noopener noreferrer"
          title="View Source on GitHub"
          aria-label="GitHub Profile"
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#e4e2ec]/45 hover:text-primary hover:bg-primary/10 transition-colors"
        >
          <Code size={18} />
        </a>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden w-8 h-8 ml-1 rounded-full flex items-center justify-center text-[#e4e2ec]/60 hover:text-primary hover:bg-primary/10"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-48 glass-panel p-2 rounded-2xl md:hidden flex flex-col gap-1 shadow-2xl"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeSection === item.id ? 'bg-primary/10 text-white' : 'text-white/60 hover:bg-white/5'
              }`}
            >
              {item.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
