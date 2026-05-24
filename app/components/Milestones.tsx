import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import { GraduationCap, Award, BadgeCheck } from 'lucide-react';

const education = [
  {
    school: "Jadavpur University",
    degree: "Bachelor of Engineering - BE",
    field: "Power Engineering",
    start: "Nov 2022",
    end: "Jun 2026",
    grade: "7.5",
    skills: ["Microprocessors", "8051 Microcontroller", "x86 Assembly", "MATLAB", "Ansys Fluent", "C", "Python"]
  },
  {
    school: "Sri Aurobindo Vidyamandir",
    degree: "Secondary Education",
    field: "",
    start: "",
    end: "",
    grade: "",
    skills: []
  }
];

const certifications = [
  { name: "Oracle Cloud Infrastructure 2024 Generative AI Professional", issuer: "Oracle", date: "Jul 2024", cred: "100756890OCI2024GAIOCP" },
  { name: "Keras & TensorFlow for Deep Learning", issuer: "Scaler", date: "Sep 2024", cred: "" },
  { name: "Problem Solving (Intermediate)", issuer: "HackerRank", date: "Sep 2024", cred: "93DCB5FD47AB" },
  { name: "Python (Basic)", issuer: "HackerRank", date: "Sep 2024", cred: "F5E0A902D202" },
  { name: "Supervised Machine Learning: Regression and Classification", issuer: "Coursera", date: "May 2024", cred: "" },
  { name: "Foundations of Cybersecurity", issuer: "Google", date: "Feb 2024", cred: "R3PZHU2ZW8QH" },
  { name: "Foundations of Prompt Engineering", issuer: "Amazon Web Services (AWS)", date: "Nov 2023", cred: "" },
  { name: "Excel for Data & Analytics", issuer: "Chegg India", date: "Nov 2023", cred: "" },
  { name: "Complete Data Science Bootcamp", issuer: "Udemy", date: "Sep 2023", cred: "" }
];

const awards = [
  {
    title: "COMSYS Hackathon-1 — 4th Place",
    issuer: "COMSYS Educational Trust & SCEE IIT Mandi",
    date: "Oct 2023",
    description: "Team placed 4th in COMSYS Hackathon-1 held at IIT Mandi, organized by SCEE IIT Mandi and COMSYS Educational Trust, Kolkata, as part of the 4th International Conference on Frontiers in Computing and Systems (COMSYS-2023)."
  }
];

export default function Milestones() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-[#1f1633]" id="milestones">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Education Section */}
        <div className="mb-16 sm:mb-24 md:mb-32">
          <ScrollReveal>
            <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-16" id="education">
              <h3 className="font-headline font-bold flex items-center text-xl sm:text-2xl md:text-3xl text-white">
                <GraduationCap className="text-[#fa7faa] mr-2 sm:mr-3 w-6 h-6 sm:w-8 sm:h-8" /> Education
              </h3>
              <div className="flex-grow h-px bg-gradient-to-r from-[#362d59] to-transparent"></div>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {education.map((edu, i) => (
              <TiltCard key={i}>
                <ScrollReveal delay={i * 0.1} className="h-full">
                  <div className="bg-[#1f1633] border border-[#362d59] p-5 sm:p-6 md:p-8 rounded-[18px] h-full hover:border-[#fa7faa]/40 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 gap-1 sm:gap-0">
                      <h4 className="font-headline font-bold text-xl text-white">{edu.school}</h4>
                      {edu.start && <span className="text-xs font-bold text-[#fa7faa]">{edu.start} — {edu.end}</span>}
                    </div>
                    <p className="text-[#bdb8c0] font-medium mb-1">{edu.degree}</p>
                    {edu.field && <p className="text-[#79628c] text-sm">{edu.field}</p>}
                    {edu.grade && <p className="text-[#c2ef4e] text-sm font-bold mt-4">CGPA: {edu.grade}</p>}
                    
                    {edu.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-6">
                        {edu.skills.map(s => (
                          <span key={s} className="text-[10px] px-2 py-1 rounded bg-[#150f23] text-[#bdb8c0] border border-[#362d59]">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Certifications & Awards Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 md:gap-16">
          
          {/* Certifications */}
          <div className="lg:col-span-8">
            <ScrollReveal>
              <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12" id="certifications">
                <h3 className="font-headline font-bold flex items-center text-xl sm:text-2xl md:text-3xl text-white">
                  <BadgeCheck className="text-[#c2ef4e] mr-2 sm:mr-3 w-6 h-6 sm:w-8 sm:h-8" /> <span className="chip-lime">Credentials</span>
                </h3>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {certifications.map((cert, i) => (
                <TiltCard key={i}>
                  <ScrollReveal delay={0.05 * (i % 4)} className="h-full">
                    <div className="bg-[#1f1633] border border-[#362d59] p-4 sm:p-5 rounded-[12px] hover:border-[#c2ef4e]/40 transition-colors h-full flex flex-col justify-between">
                      <h5 className="font-bold text-sm leading-snug mb-4 text-white">{cert.name}</h5>
                      <div className="flex justify-between items-end">
                        <span className="text-xs text-[#bdb8c0]">{cert.issuer}</span>
                        <span className="text-[10px] uppercase tracking-wider text-[#c2ef4e] font-code">{cert.date}</span>
                      </div>
                    </div>
                  </ScrollReveal>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="lg:col-span-4">
            <ScrollReveal>
              <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12" id="awards">
                <h3 className="font-headline font-bold flex items-center text-xl sm:text-2xl md:text-3xl text-white">
                  <Award className="text-[#6a5fc1] mr-2 sm:mr-3 w-6 h-6 sm:w-8 sm:h-8" /> Honors
                </h3>
              </div>
            </ScrollReveal>

            <div className="space-y-4 sm:space-y-6">
              {awards.map((award, i) => (
                <TiltCard key={i}>
                  <ScrollReveal delay={0.1}>
                    <div className="card-spotlight p-6 rounded-[18px] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#c2ef4e]/10 blur-2xl rounded-full -mr-8 -mt-8 pointer-events-none"></div>
                      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                        <span className="inline-block px-2 py-1 bg-[#c2ef4e]/15 text-[#c2ef4e] text-[10px] uppercase tracking-widest font-bold rounded mb-4">
                          {award.date}
                        </span>
                        <h4 className="font-headline font-bold text-lg mb-2 text-white">{award.title}</h4>
                        <p className="text-xs text-[#bdb8c0] font-bold mb-4">{award.issuer}</p>
                        <p className="text-sm text-[#bdb8c0] leading-relaxed">
                          {award.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </TiltCard>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
