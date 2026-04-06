'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const experience = [
  {
    title: "AI/ML Engineer",
    company: "AiSPRY",
    type: "Internship",
    location: "Hyderabad, Telangana, India · On-site",
    start: "Oct 2024",
    end: "Jul 2025",
    description: "Built production-grade AI systems leveraging Retrieval-Augmented Generation (RAG), TensorFlow, ChromaDB, and Redis. Worked on deep learning models using RNNs, LSTMs, and GRUs for real-world NLP and time-series applications.",
    skills: ["RAG", "TensorFlow", "ChromaDB", "Redis", "GRU", "LSTM"]
  },
  {
    title: "Member",
    company: "GDSC Jadavpur University",
    type: "Part-time",
    location: "Kolkata, India",
    start: "Oct 2023",
    end: "Present",
    description: "Active member of Google Developer Student Clubs at Jadavpur University, contributing to open-source projects and collaborative tech initiatives.",
    skills: ["Open Source", "Community"]
  },
  {
    title: "Member",
    company: "Institution of Engineering and Technology (IET)",
    type: "Part-time",
    location: "Kolkata, West Bengal, India",
    start: "May 2023",
    end: "Present",
    description: "Member of the multidisciplinary professional engineering institution with authority to establish professional registration for Chartered Engineer, Incorporated Engineer, and Engineering Technician.",
    skills: ["Engineering", "Professional Development"]
  },
  {
    title: "Organizing Committee Member",
    company: "SRIJAN, Jadavpur University",
    type: "Part-time",
    location: "Kolkata, India",
    start: "Feb 2023",
    end: "Present",
    description: "Part of the organizing committee for SRIJAN — Jadavpur University's flagship technical festival. Drove event planning, coordination, and teamwork across departments.",
    skills: ["Teamwork", "Event Management"]
  }
];

export default function Timeline() {
  const colors = ['primary', 'secondary', 'tertiary', 'primary'];
  const glowColors = [
    'rgba(208,188,255,0.6)', 'rgba(76,215,246,0.6)',
    'rgba(255,184,105,0.6)', 'rgba(208,188,255,0.6)'
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-32 bg-surface relative overflow-hidden" id="timeline">
      <div className="max-w-7xl mx-auto px-8 relative z-[2]">
        <ScrollReveal>
          <h2 className="font-headline text-4xl font-extrabold tracking-tight mb-4 text-center">
            Professional <span className="text-gradient">Evolution</span>
          </h2>
        </ScrollReveal>

        <div ref={containerRef} className="relative max-w-4xl mx-auto mt-20">
          {/* Vertical timeline outline line (static bg) */}
          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-outline-variant/20"></div>
          
          {/* Animated fill line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-[2px] bg-gradient-to-b from-primary via-secondary to-tertiary shadow-[0_0_15px_rgba(208,188,255,0.5)] origin-top"
          ></motion.div>
          
          <div className="space-y-24">
            {experience.map((exp, i) => {
              const colorBase = colors[i % colors.length];
              const glow = glowColors[i % glowColors.length];
              const isAlt = i % 2 !== 0;
              const isCurrent = exp.end === 'Present';

              const textColorClass = colorBase === 'primary' ? 'text-primary' : colorBase === 'secondary' ? 'text-secondary' : 'text-tertiary';
              const bgColorClass = colorBase === 'primary' ? 'bg-primary' : colorBase === 'secondary' ? 'bg-secondary' : 'bg-tertiary';
              const bgOpacityClass = colorBase === 'primary' ? 'bg-primary/10' : colorBase === 'secondary' ? 'bg-secondary/10' : 'bg-tertiary/10';

              return (
                <div key={exp.title + i} className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center pl-12 md:pl-0">
                  {/* Center Dot */}
                  <div 
                    className={`absolute left-4 md:left-1/2 w-4 h-4 ${bgColorClass} border-4 border-surface rounded-full -translate-x-1/2 z-10`}
                    style={{ boxShadow: `0 0 15px ${glow}` }}
                  ></div>

                  {/* Desktop Info Side */}
                  <ScrollReveal 
                    direction={isAlt ? 'left' : 'right'} 
                    delay={0.1}
                    className={`hidden md:block w-[45%] ${isAlt ? 'pl-12 order-2' : 'text-right pr-12 order-1'}`}
                  >
                    <p className={`text-sm font-bold ${textColorClass}`}>{exp.start} — {exp.end}</p>
                    <h4 className="font-headline font-black text-xl mb-2">{exp.title}</h4>
                    <p className="text-on-surface-variant text-sm">{exp.company}</p>
                  </ScrollReveal>

                  {/* Detail Panel Side */}
                  <ScrollReveal 
                    direction={isAlt ? 'right' : 'left'} 
                    delay={0.2}
                    className={`w-full md:w-[45%] ${isAlt ? 'md:pr-12 order-1' : 'md:pl-12 order-2'}`}
                  >
                    <p className={`md:hidden text-xs font-bold ${textColorClass} mb-2`}>{exp.start} — {exp.end}</p>
                    
                    <div className={`glass-panel p-6 rounded-lg transform hover:-translate-y-1 transition-transform ${isAlt ? 'md:text-right' : 'text-left'}`}>
                      <p className="md:hidden font-headline font-black text-lg mb-1">{exp.title}</p>
                      <p className="md:hidden text-on-surface-variant text-xs mb-3">{exp.company}</p>
                      
                      <p className="text-on-surface-variant text-sm leading-relaxed mb-4">{exp.description}</p>
                      
                      <div className={`flex flex-wrap gap-2 mb-3 ${isAlt ? 'md:justify-end' : ''}`}>
                        <span className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-outline-variant/20 ${textColorClass}`}>
                          {exp.type}
                        </span>
                        {isCurrent && (
                          <span className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full ${bgOpacityClass} ${textColorClass} font-bold`}>
                            Active
                          </span>
                        )}
                      </div>

                      {exp.skills.length > 0 && (
                        <div className={`flex flex-wrap gap-1.5 ${isAlt ? 'md:justify-end' : ''}`}>
                          {exp.skills.map((skill) => (
                            <span key={skill} className="text-[10px] px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
