import { ArrowRight } from 'lucide-react';
import type { SiteContent, LabTracker } from '../types';
import { EditableText } from '../components/EditableText';
import { Tag } from '../components/Tag';

interface ArchiveProps {
  content: SiteContent;
  update: (updater: (prev: SiteContent) => SiteContent) => void;
  navigate: (path: string) => void;
  tracker: LabTracker;
}

export function Archive({ content, update, navigate, tracker }: ArchiveProps) {
  return (
    <div className="pt-16 animate-fade-in">
      {/* Header */}
      <section className="py-16 sm:py-24 bg-ink text-bone noise relative overflow-hidden">
        <div className="bg-grid-dark absolute inset-0 opacity-30" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-bone/40 tracking-wide2">03 / ARCHIVE</span>
            <span className="w-8 h-px bg-bone/20" />
            <span className="font-mono text-xs text-bone/40 tracking-wide2 uppercase">Experiments</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tightest max-w-3xl">
            <EditableText
              value={content.archiveTitle}
              onChange={(v) => update((p) => ({ ...p, archiveTitle: v }))}
            />
          </h1>
          <p className="mt-6 text-base text-bone/60 max-w-2xl leading-relaxed">
            <EditableText
              value={content.archiveSubtitle}
              onChange={(v) => update((p) => ({ ...p, archiveSubtitle: v }))}
              multiline
            />
          </p>
        </div>
      </section>

      {/* Lab Grid */}
      <section className="py-16 sm:py-24 bg-bone">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.labs.map((lab, i) => {
              const isDone = tracker[lab.id]?.done;
              return (
                <button
                  key={lab.id}
                  onClick={() => navigate(`/lab/${lab.id}`)}
                  className="group text-left bg-bone border border-line rounded-sm overflow-hidden transition-all hover:border-ink hover:shadow-[0_8px_32px_rgba(17,17,17,0.08)] animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* Card top */}
                  <div className="relative aspect-[4/3] bg-ink noise overflow-hidden">
                    <div className="bg-grid-dark absolute inset-0 opacity-30" />
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[10px] tracking-wide2 text-bone/40 uppercase">
                          LAB No.
                        </span>
                        {isDone && (
                          <span className="font-mono text-[10px] tracking-wide2 text-bone uppercase border border-bone/30 px-2 py-0.5 rounded-sm">
                            DONE
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="font-display font-bold text-bone text-5xl sm:text-6xl tracking-tightest block">
                          {lab.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <Tag tag={lab.tag} />
                    <h3 className="mt-4 font-display font-semibold text-xl tracking-tightest text-ink">
                      <EditableText
                        value={lab.title}
                        onChange={(v) =>
                          update((p) => ({
                            ...p,
                            labs: p.labs.map((l) =>
                              l.id === lab.id ? { ...l, title: v } : l
                            ),
                          }))
                        }
                      />
                    </h3>
                    <p className="mt-2 text-sm text-concrete leading-relaxed">
                      <EditableText
                        value={lab.subtitle}
                        onChange={(v) =>
                          update((p) => ({
                            ...p,
                            labs: p.labs.map((l) =>
                              l.id === lab.id ? { ...l, subtitle: v } : l
                            ),
                          }))
                        }
                        multiline
                      />
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-xs font-mono tracking-wide2 uppercase text-ink group-hover:gap-3 transition-all">
                      Open protocol
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
