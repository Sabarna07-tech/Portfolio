import Image from 'next/image';
import ScrollReveal from './ScrollReveal';
import { Layers, Zap } from 'lucide-react';

export default function About() {
  return (
    <section className="py-32 bg-surface-container-low relative" id="process">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Image & Stats */}
        <ScrollReveal direction="left" className="relative">
          <div className="aspect-square glass-panel rounded-xl overflow-hidden shadow-2xl relative group">
            <Image
              alt="Modern cyberpunk workstation with neon purple lighting, multiple screens displaying code, and sleek hardware in a dark room"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnlvdOUZPyBIQOPUPboYC8dhd_w_9RFW5GULHB2Da-RmPRXU0Cq5DFQ5Rl_nwiCOqijssvPz41ZLmvFa1GVnbeJWR1mM-rqkl8beKBj4XNa-OuPhdU-lw-bGa-CLEAwko-ozEGNXUQqz4AVZJTqMrxReHYMp6va3_Gdd55eT9Pc5y98fbsjnWpD6rc5aeeQbkYk3_nZgW6iN2RyCRjEeKDRe9Nmm3yE-JcJA9r-qZUl1sXzHzstZnrercGTs3WKDi4-M65gR4QN5az"
              fill
              className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-80 pointer-events-none"></div>
          </div>
          
          {/* Floating Detail Card */}
          <div
            className="absolute -bottom-8 -right-8 glass-panel p-6 rounded-xl hidden lg:block transform hover:-translate-y-2 transition-transform shadow-2xl"
          >
            <p className="text-primary font-headline text-3xl font-black">9+</p>
            <p className="text-xs uppercase tracking-widest text-on-surface-variant">
              Certifications<br />Earned
            </p>
          </div>
        </ScrollReveal>

        {/* Right Side: Content */}
        <div>
          <ScrollReveal delay={0.1}>
            <h2 className="font-headline text-4xl font-extrabold text-on-surface mb-8 tracking-tight">
              The Visionary Process
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
            <p>
              Design is not just what it looks like; it's how it moves, breathes, and interacts. I approach
              every project as a <span className="text-primary font-semibold">Digital Curator</span>, meticulously
              selecting the right technologies to create immersive experiences.
            </p>
            <p>
              My philosophy is built on the intersection of aesthetic brilliance and technical precision. I
              don't build websites; I build ecosystems that prioritize the user's emotional journey through
              intentional asymmetry and tonal depth.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3} className="mt-12 grid grid-cols-2 gap-8">
            <div>
              <Layers className="text-secondary mb-4 w-8 h-8" />
              <h4 className="font-headline font-bold text-on-surface mb-2">Systems Design</h4>
              <p className="text-sm text-on-surface-variant">Scalable components that evolve with your product.</p>
            </div>
            <div>
              <Zap className="text-secondary mb-4 w-8 h-8" />
              <h4 className="font-headline font-bold text-on-surface mb-2">Performance</h4>
              <p className="text-sm text-on-surface-variant">Optimized assets and light-weight code for speed.</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
