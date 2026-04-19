'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function useActiveSection(sectionIds: string[], offset = 0) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');
  const activeSectionRef = useRef(activeSection);
  const rafRef = useRef<number>(0);
  const tickingRef = useRef(false);

  // Stable reference to avoid re-attaching listener
  activeSectionRef.current = activeSection;

  const compute = useCallback(() => {
    tickingRef.current = false;
    let currentSection = activeSectionRef.current;

    if (window.scrollY < 100) {
      currentSection = sectionIds[0];
    } else {
      const half = window.innerHeight / 2;
      let bestDist = Infinity;
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= half && top > -window.innerHeight) {
          const dist = Math.abs(top - offset);
          if (dist < bestDist) {
            bestDist = dist;
            currentSection = sectionIds[i];
          }
        }
      }
    }

    if (currentSection !== activeSectionRef.current) {
      setActiveSection(currentSection);
    }
  }, [sectionIds, offset]);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        rafRef.current = requestAnimationFrame(compute);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    compute(); // initial

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [compute]);

  return activeSection;
}
