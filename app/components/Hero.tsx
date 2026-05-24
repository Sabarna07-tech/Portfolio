'use client';

import { motion } from 'framer-motion';
import SpotifyNowPlaying from './SpotifyNowPlaying';

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.08,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as const },
  },
};

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 pb-24 sm:pt-20 sm:pb-20 overflow-visible">
      {/* Deep Violet Radial Glow */}
      <div className="absolute inset-0 hero-gradient z-0 pointer-events-none"></div>
      
      {/* Subtle Concentric Rings — violet, atmospheric */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] opacity-[0.06] pointer-events-none">
        <div className="w-full h-full rounded-full border border-[#6a5fc1]/30 animate-[spin_25s_linear_infinite]"></div>
        <div className="absolute inset-6 sm:inset-8 md:inset-10 rounded-full border border-[#c2ef4e]/15 animate-[spin_20s_linear_infinite_reverse]"></div>
        <div className="absolute inset-12 sm:inset-16 md:inset-20 rounded-full border border-[#422082]/20 animate-[spin_30s_linear_infinite]"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="font-headline text-[#79628c] tracking-[0.2em] sm:tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-4 sm:mb-6 font-medium"
        >
          AI/ML Engineer · Power Engineering
        </motion.p>
        
        {/* Hero Display Headline with Lime Keyword Chip */}
        <motion.h1
          variants={sentence}
          initial="hidden"
          animate="visible"
          className="font-headline text-4xl sm:text-5xl md:text-[88px] font-bold text-white tracking-tighter leading-[1.15] mb-6 sm:mb-8 flex flex-wrap justify-center gap-[0.15em] sm:gap-[0.2em]"
        >
          <span className="flex">
            {'SABARNA'.split('').map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter}>{char}</motion.span>
            ))}
          </span>
          <span className="flex">
            <span className="chip-lime">
              {'SAHA'.split('').map((char, index) => (
                <motion.span key={char + "-" + index} variants={letter}>{char}</motion.span>
              ))}
            </span>
          </span>
        </motion.h1>
        
        {/* Body — airy marketing line-height (2.0) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="max-w-2xl mx-auto text-sm sm:text-base md:text-[16px] text-[#bdb8c0] mb-8 sm:mb-12 font-body font-normal leading-[2] px-2 sm:px-0"
        >
          AI/ML Engineer with hands-on experience in RAG, deep learning, and NLP.
          Currently pursuing Power Engineering at Jadavpur University while building intelligent systems.
        </motion.p>
        
        {/* CTA Buttons — inverted primary on dark canvas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.19, 1, 0.22, 1] as const }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <a
            className="w-full sm:w-auto btn-sentri-inverted text-center shadow-[rgb(21,15,35)_0_0_8px_6px]"
            href="#portfolio"
          >
            VIEW PORTFOLIO
          </a>
          <a
            className="w-full sm:w-auto btn-sentri-ghost text-center"
            href="#contact"
          >
            GET IN TOUCH
          </a>
        </motion.div>

        {/* Integration: Spotify Now Playing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.19, 1, 0.22, 1] as const }}
          className="mt-8 sm:mt-12 w-full flex justify-center"
        >
          <SpotifyNowPlaying />
        </motion.div>
      </div>

      {/* Scroll Indicator — lime accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.2em] font-body uppercase text-[#79628c] font-medium">Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#c2ef4e] to-transparent"></div>
      </motion.div>
    </section>
  );
}
