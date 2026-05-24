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

const accentColors = ['#c2ef4e', '#6a5fc1', '#fa7faa', '#c2ef4e'];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden" id="timeline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-[2]">
        <ScrollReveal>
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center text-white">
            Professional <span className="chip-lime">Evolution</span>
          </h2>
        </ScrollReveal>

        <div ref={containerRef} className="relative max-w-4xl mx-auto mt-12 sm:mt-16 md:mt-20">
          {/* Vertical timeline outline line (static bg) */}
          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-[#362d59]/40"></div>
          
          {/* Animated fill line — lime → violet → pink */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#c2ef4e] via-[#6a5fc1] to-[#fa7faa] shadow-[0_0_15px_rgba(194,239,78,0.4)] origin-top"
          ></motion.div>
          
          <div className="space-y-12 sm:space-y-16 md:space-y-24">
            {experience.map((exp, i) => {
              const accent = accentColors[i % accentColors.length];
              const isAlt = i % 2 !== 0;
              const isCurrent = exp.end === 'Present';

              return (
                <div key={exp.title + i} className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center pl-10 sm:pl-12 md:pl-0">
                  {/* Center Dot */}
                  <div 
                    className="absolute left-4 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 border-[3px] sm:border-4 border-[#150f23] rounded-full -translate-x-1/2 z-10"
                    style={{ backgroundColor: accent, boxShadow: `0 0 15px ${accent}80` }}
                  ></div>

                  {/* Desktop Info Side */}
                  <ScrollReveal 
                    direction={isAlt ? 'left' : 'right'} 
                    delay={0.1}
                    className={`hidden md:block w-[45%] ${isAlt ? 'pl-12 order-2' : 'text-right pr-12 order-1'}`}
                  >
                    <p className="text-sm font-bold" style={{ color: accent }}>{exp.start} — {exp.end}</p>
                    <h4 className="font-headline font-bold text-xl mb-2 text-white">{exp.title}</h4>
                    <p className="text-[#bdb8c0] text-sm">{exp.company}</p>
                  </ScrollReveal>

                  {/* Detail Panel Side */}
                  <ScrollReveal 
                    direction={isAlt ? 'right' : 'left'} 
                    delay={0.2}
                    className={`w-full md:w-[45%] ${isAlt ? 'md:pr-12 order-1' : 'md:pl-12 order-2'}`}
                  >
                    <p className="md:hidden text-xs font-bold mb-2" style={{ color: accent }}>{exp.start} — {exp.end}</p>
                    
                    <div className={`bg-[#1f1633] border border-[#362d59] p-4 sm:p-5 md:p-6 rounded-[12px] transform hover:-translate-y-1 transition-all hover:border-[#6a5fc1]/40 ${isAlt ? 'md:text-right' : 'text-left'}`}>
                      <p className="md:hidden font-headline font-bold text-lg mb-1 text-white">{exp.title}</p>
                      <p className="md:hidden text-[#bdb8c0] text-xs mb-3">{exp.company}</p>
                      
                      <p className="text-[#bdb8c0] text-sm leading-relaxed mb-4">{exp.description}</p>
                      
                      <div className={`flex flex-wrap gap-2 mb-3 ${isAlt ? 'md:justify-end' : ''}`}>
                        <span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-[#362d59]" style={{ color: accent }}>
                          {exp.type}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold" style={{ backgroundColor: `${accent}20`, color: accent }}>
                            Active
                          </span>
                        )}
                      </div>

                      {exp.skills.length > 0 && (
                        <div className={`flex flex-wrap gap-1.5 ${isAlt ? 'md:justify-end' : ''}`}>
                          {exp.skills.map((skill) => (
                            <span key={skill} className="text-[10px] px-2 py-0.5 rounded bg-[#150f23] text-[#bdb8c0] font-medium border border-[#362d59]">
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
