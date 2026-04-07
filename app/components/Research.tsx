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
    <section className="py-32 mt-12 bg-surface" id="publications">
      <div className="max-w-7xl mx-auto px-8">
        <ScrollReveal>
          <div className="max-w-3xl mb-16">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight mb-4">
              Research <span className="text-gradient">&amp; Publications</span>
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base">
              Exploring ideas at the intersection of AI, systems, and applied engineering.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {publications.map((item, index) => {
            const isFeatured = index === 0;

            return (
              <ScrollReveal
                key={item.title}
                delay={0.08 * index}
                className={isFeatured ? 'md:col-span-2 xl:col-span-2' : ''}
              >
                <article className="glass-panel rounded-2xl p-7 md:p-8 relative h-full group border border-outline-variant/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {item.type === 'research' ? 'Research' : 'Project'}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant">
                        {item.year}
                      </span>
                      {item.status && (
                        <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-secondary/10 text-secondary">
                          {item.status}
                        </span>
                      )}
                      {isFeatured && (
                        <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-tertiary/10 text-tertiary">
                          Featured Paper
                        </span>
                      )}
                    </div>

                    <h3 className="font-headline text-2xl font-black tracking-tight mb-4 text-on-surface group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-on-surface-variant text-sm leading-relaxed mb-5">
                      {item.description}
                    </p>

                    {(item.authors || item.venue) && (
                      <div className="rounded-xl bg-surface-container-low border border-outline-variant/20 px-4 py-3 mb-6">
                        {item.authors && (
                          <p className="text-xs text-tertiary mb-1">{item.authors}</p>
                        )}
                        {item.venue && (
                          <p className="text-xs text-on-surface-variant">{item.venue}</p>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tech.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md border border-outline-variant/25 bg-surface-container-high text-on-surface-variant"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-1 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 text-on-surface-variant text-xs">
                        <FlaskConical size={14} className="text-secondary" />
                        <span>{item.date ?? item.year}</span>
                      </div>

                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-high px-4 py-2 text-xs font-bold tracking-wide uppercase text-on-surface hover:text-primary hover:border-primary/40 transition-colors"
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
