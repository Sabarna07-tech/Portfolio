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
  distance = 30,
  scale,
  blur = false
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

  // Only use transform + opacity (GPU-composited). 
  // Avoid filter: blur() during scroll — it forces rasterization on every frame.
  const initial: Record<string, any> = {
    opacity: 0,
    ...offset,
  };
  const animate: Record<string, any> = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  if (scale !== undefined) {
    initial.scale = scale;
    animate.scale = 1;
  }

  return (
    <MotionTag
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.19, 1, 0.22, 1]
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
