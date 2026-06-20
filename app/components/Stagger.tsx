'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right';

const ITEM: Record<Direction, Variants> = {
  up: { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0 } },
};

const FADE: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

/**
 * A scroll-triggered stagger container. Children rendered as <StaggerItem>
 * cascade in via framer-motion variant propagation when the group enters
 * the viewport. Reduced-motion collapses the stagger to a simple fade.
 */
export function StaggerGroup({
  children,
  className = '',
  stagger = 0.08,
  delay = 0.05,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : stagger,
            delayChildren: reduce ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduce ? FADE : ITEM[direction]}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] as const }}
    >
      {children}
    </motion.div>
  );
}
