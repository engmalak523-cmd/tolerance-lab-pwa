import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { SiteContent, PearsonUnit, Lesson } from '../types';
import { EditableText } from '../components/EditableText';

interface UnitDetailProps {
  unit: PearsonUnit;
  content: SiteContent;
  update: (updater: (prev: SiteContent) => SiteContent) => void;
  navigate: (path: string) => void;
}

export function UnitDetail({ unit, content, update, navigate }: UnitDetailProps) {
  const updateUnit = (updater: (u: PearsonUnit) => PearsonUnit) => {
    update((p) => ({
      ...p,
      units: p.units.map((u) => (u.id === unit.id ? updater(u) : u)),
    }));
  };

  const updateLesson = (lessonId: string, updater: (l: Lesson) => Lesson) => {
    updateUnit((u) => ({
      ...u,
      lessons: u.lessons.map((l) => (l.id === lessonId ? updater(l) : l)),
    }));
  };

  return (
    <div className="pt-16 animate-fade-in">
      {/* Header */}
      <section className="py-16 sm:py-24 bg-ink text-bone noise relative overflow-hidden">
        <div className="bg-grid-dark absolute inset-0 opacity-30" />
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <button
            onClick={() => navigate('/units')}
            className="inline-flex items-center gap-2 text-bone/50 hover:text-bone text-sm font-mono tracking-wide2 uppercase transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Pearson Units
          </button>

          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-bone/40 tracking-wide2">UNIT / {unit.number}</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tightest">
            UNIT / {unit.number} —{' '}
            <EditableText
              value={unit.title}
              onChange={(v) => updateUnit((u) => ({ ...u, title: v }))}
            />
          </h1>
          <p className="mt-4 text-base text-bone/60 max-w-2xl leading-relaxed">
            <EditableText
              value={unit.subtitle}
              onChange={(v) => updateUnit((u) => ({ ...u, subtitle: v }))}
              multiline
            />
          </p>
        </div>
      </section>

      {/* Lesson Boxes */}
      <section className="py-16 sm:py-24 bg-bone">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs text-concrete tracking-wide2 uppercase">Lessons</span>
            <span className="flex-1 h-px bg-line" />
            <span className="font-mono text-xs text-concrete tracking-wide2">
              {unit.lessons.length} BOXES
            </span>
          </div>

          <div className="space-y-px bg-line">
            {unit.lessons.map((lesson, i) => (
              <div
                key={lesson.id}
                className="bg-bone animate-fade-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-0">
                  {/* Left: number / category */}
                  <div className="sm:w-48 flex items-center gap-4 p-6 sm:p-6 border-b sm:border-b-0 sm:border-r border-line">
                    <span className="font-mono text-sm font-medium text-ink tracking-wide2">
                      {lesson.number}
                    </span>
                    <span className="font-mono text-[10px] tracking-wide2 text-concrete uppercase">
                      <EditableText
                        value={lesson.category}
                        onChange={(v) => updateLesson(lesson.id, (l) => ({ ...l, category: v }))}
                      />
                    </span>
                  </div>

                  {/* Middle: title + optional vocabulary chips */}
                  <div className="flex-1 p-6 sm:py-6 sm:px-8">
                    <h3 className="font-display font-semibold text-base sm:text-lg tracking-tightest text-ink">
                      <EditableText
                        value={lesson.title}
                        onChange={(v) => updateLesson(lesson.id, (l) => ({ ...l, title: v }))}
                        multiline
                      />
                    </h3>
                    {lesson.vocabulary && lesson.vocabulary.length > 0 && (
                      <div className="mt-4">
                        <p className="font-mono text-[10px] tracking-wide2 text-concrete uppercase mb-2">
                          Vocabulary Preview
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {lesson.vocabulary.map((word, wi) => (
                            <EditableText
                              key={wi}
                              value={word}
                              onChange={(v) =>
                                updateLesson(lesson.id, (l) => ({
                                  ...l,
                                  vocabulary: l.vocabulary
                                    ? l.vocabulary.map((w, idx) => (idx === wi ? v : w))
                                    : [v],
                                }))
                              }
                              className="px-2.5 py-1 text-xs border border-line rounded-sm"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: OPEN button */}
                  <div className="p-6 sm:p-6 flex items-center">
                    <a
                      href={lesson.link}
                      target={lesson.link !== '#' ? '_blank' : undefined}
                      rel={lesson.link !== '#' ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-center gap-2 px-5 py-3 bg-ink text-bone text-xs font-mono tracking-wide2 uppercase rounded-sm transition-all hover:gap-3"
                    >
                      Open
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {unit.lessons.length === 0 && (
            <div className="text-center py-16">
              <p className="font-mono text-sm text-concrete tracking-wide2 uppercase">
                Lessons coming soon
              </p>
            </div>
          )}

          {/* Bottom navigation */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/units')}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-medium text-ink border border-ink rounded-sm hover:bg-ink hover:text-bone transition-all"
            >
              <ArrowLeft size={18} />
              Back to Units
            </button>
            <button
              onClick={() => navigate('/archive')}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-medium text-concrete hover:text-ink transition-colors"
            >
              Continue to STEAM Lab Archive
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
