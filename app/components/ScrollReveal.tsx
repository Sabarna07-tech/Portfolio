'use client';

import { motion, useReducedMotion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  className?: string;
  duration?: number;
  distance?: number;
  scale?: number;
  blur?: boolean;
}

export default function ScrollReveal({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  className = '',
  duration = 0.6,
  distance = 40,
  scale = 0.95,
  blur = true
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as any;

  if (shouldReduceMotion) {
    return (
      <MotionTag
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration, delay }}
        className={className}
      >
        {children}
      </MotionTag>
    );
  }

  const directionOffsets: Record<string, { x: number; y: number }> = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const offset = directionOffsets[direction] || directionOffsets.none;

  return (
    <MotionTag
      initial={{ 
        opacity: 0, 
        scale,
        filter: blur ? 'blur(8px)' : 'blur(0px)',
        ...offset 
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        filter: 'blur(0px)',
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.19, 1, 0.22, 1] // ease-out-expo matching global CSS
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
