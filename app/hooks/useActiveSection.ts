'use client';

import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[], offset = 0) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = activeSection;
      
      // Calculate distances for all sections
      const sections = sectionIds.map((id) => {
        const element = document.getElementById(id);
        if (!element) return { id, distance: Infinity, rawTop: Infinity };
        
        const rect = element.getBoundingClientRect();
        // The distance from the top of the viewport to the top of the element, accounting for offset
        const distance = Math.abs(rect.top - offset);
        return { id, distance, rawTop: rect.top };
      });

      // Filter sections that are somewhat visibly in viewport or just passed
      const visibleSections = sections.filter((s) => s.rawTop <= window.innerHeight / 2 && s.rawTop > -window.innerHeight);
      
      if (visibleSections.length > 0) {
        // Find the one closest to the top of the viewport
        visibleSections.sort((a, b) => a.distance - b.distance);
        currentSection = visibleSections[0].id;
      }

      // If at absolute top, force first section
      if (window.scrollY < 100) {
        currentSection = sectionIds[0];
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, activeSection, offset]);

  return activeSection;
}
