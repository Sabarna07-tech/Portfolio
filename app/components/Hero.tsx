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
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-visible">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 hero-gradient z-0 pointer-events-none"></div>
      
      {/* Animated Core Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10 pointer-events-none mix-blend-screen">
        <div className="w-full h-full rounded-full border border-primary/20 animate-[spin_25s_linear_infinite]"></div>
        <div className="absolute inset-10 rounded-full border border-secondary/15 animate-[spin_20s_linear_infinite_reverse]"></div>
        <div className="absolute inset-20 rounded-full border border-primary-container/10 animate-[spin_30s_linear_infinite]"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="font-headline text-secondary tracking-[0.4em] uppercase text-xs mb-6"
        >
          AI/ML Engineer · Power Engineering
        </motion.p>
        
        <motion.h1
          variants={sentence}
          initial="hidden"
          animate="visible"
          className="font-headline text-5xl md:text-8xl font-black text-on-surface tracking-tighter leading-none mb-8 flex flex-wrap justify-center gap-[0.2em]"
        >
          <span className="flex">
            {'SABARNA'.split('').map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter}>{char}</motion.span>
            ))}
          </span>
          <span className="flex text-gradient">
             {'SAHA'.split('').map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter}>{char}</motion.span>
            ))}
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-on-surface-variant mb-12 font-light leading-relaxed"
        >
          AI/ML Engineer with hands-on experience in RAG, deep learning, and NLP.
          Currently pursuing Power Engineering at Jadavpur University while building intelligent systems.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.19, 1, 0.22, 1] as const }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary-container text-on-primary px-10 py-4 rounded-xl font-bold glow-button btn-interactive text-center"
            href="#projects"
          >
            VIEW PORTFOLIO
          </a>
          <a
            className="w-full sm:w-auto border border-outline-variant/50 text-[#e4e2ec] px-10 py-4 rounded-xl font-bold hover:bg-white/5 btn-interactive text-center"
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
          className="mt-12"
        >
          <SpotifyNowPlaying />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.2em] font-label uppercase text-on-surface-variant">Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent"></div>
      </motion.div>
    </section>
  );
}
