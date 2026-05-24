import { ExternalLink, FlaskConical } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

type PublicationType = 'research' | 'project';
type PublicationStatus = 'Published' | 'Under Review';

interface Publication {
  title: string;
  description: string;
  tech: string[];
  link: string;
  year: string;
  date?: string;
  type: PublicationType;
  status?: PublicationStatus;
  authors?: string;
  venue?: string;
}

const publications: Publication[] = [
  {
    title: "Early Detection of Alzheimer's Disease Using Deep Learning and SMOTE for Class Imbalance Correction",
    description:
      "A deep learning approach that combines CNN-based classification with SMOTE to address class imbalance and improve early-stage Alzheimer's detection accuracy.",
    tech: ['Deep Learning', 'CNN', 'SMOTE', 'Healthcare AI'],
    link: 'https://link.springer.com/chapter/10.1007/978-981-96-8309-3_33',
    year: '2024',
    date: '2024/12/13',
    type: 'research',
    status: 'Published',
    authors: 'Jotiraditya Banerjee, Sabarna Saha, Piyush Gupta, Abhijit Chandra',
    venue:
      'International Conference on Frontiers in Computing and Systems (COMSYS 2024), Volume 1, pp. 469-481. Springer Nature Singapore',
  },
];

export default function Research() {
  return (
    <section className="py-16 sm:py-24 md:py-32 mt-6 sm:mt-8 md:mt-12" id="publications">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <ScrollReveal>
          <div className="max-w-3xl mb-10 sm:mb-12 md:mb-16">
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4 text-white">
              Research <span className="chip-lime">&amp; Publications</span>
            </h2>
            <p className="text-[#bdb8c0] text-sm md:text-base">
              Exploring ideas at the intersection of AI, systems, and applied engineering.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {publications.map((item, index) => {
            const isFeatured = index === 0;

            return (
              <ScrollReveal
                key={item.title}
                delay={0.08 * index}
                className={isFeatured ? 'md:col-span-2 xl:col-span-2' : ''}
              >
                <article className="bg-[#1f1633] border border-[#362d59] rounded-[18px] p-5 sm:p-7 md:p-8 relative h-full group hover:border-[#6a5fc1]/40 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#422082]/10 via-transparent to-[#6a5fc1]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[18px]" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-[4px] bg-[#6a5fc1]/15 text-[#6a5fc1]">
                        {item.type === 'research' ? 'Research' : 'Project'}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-[4px] bg-[#150f23] text-[#bdb8c0] border border-[#362d59]">
                        {item.year}
                      </span>
                      {item.status && (
                        <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-[4px] bg-[#c2ef4e]/15 text-[#c2ef4e]">
                          {item.status}
                        </span>
                      )}
                      {isFeatured && (
                        <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-[4px] bg-[#fa7faa]/15 text-[#fa7faa]">
                          Featured Paper
                        </span>
                      )}
                    </div>

                    <h3 className="font-headline text-lg sm:text-xl md:text-2xl font-bold tracking-tight mb-3 sm:mb-4 text-white group-hover:text-[#c2ef4e] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-[#bdb8c0] text-sm leading-relaxed mb-5">
                      {item.description}
                    </p>

                    {(item.authors || item.venue) && (
                      <div className="rounded-[12px] bg-[#150f23] border border-[#362d59] px-4 py-3 mb-6">
                        {item.authors && (
                          <p className="text-xs text-[#fa7faa] mb-1">{item.authors}</p>
                        )}
                        {item.venue && (
                          <p className="text-xs text-[#bdb8c0]">{item.venue}</p>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tech.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-[4px] border border-[#362d59] bg-[#150f23] text-[#bdb8c0]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-1 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 text-[#bdb8c0] text-xs">
                        <FlaskConical size={14} className="text-[#6a5fc1]" />
                        <span>{item.date ?? item.year}</span>
                      </div>

                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-sentri-ghost text-xs py-2 px-4"
                      >
                        {item.type === 'research' ? 'View Paper' : 'View GitHub'}
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
