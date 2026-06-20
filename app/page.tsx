import Hero from '@/components/Hero';
import StatsBand from '@/components/StatsBand';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Timeline from '@/components/Timeline';
import Milestones from '@/components/Milestones';
import Projects from '@/components/Projects';
import Research from '@/components/Research';
import Dashboard from '@/components/Dashboard';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <About />
      <Skills />
      <Projects />
      <Research />
      <Dashboard />
      <Timeline />
      <Milestones />
      <Contact />
    </>
  );
}
