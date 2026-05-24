'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#c2ef4e] via-[#6a5fc1] to-[#fa7faa] origin-left z-[100] shadow-[0_0_10px_rgba(194,239,78,0.6)]"
      style={{ scaleX }}
    />
  );
}
