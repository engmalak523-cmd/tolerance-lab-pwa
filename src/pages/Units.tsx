import { ArrowRight } from 'lucide-react';
import type { SiteContent } from '../types';
import { EditableText } from '../components/EditableText';

interface UnitsProps {
  content: SiteContent;
  update: (updater: (prev: SiteContent) => SiteContent) => void;
  navigate: (path: string) => void;
}

export function Units({ content, update, navigate }: UnitsProps) {
  return (
    <div className="pt-16 animate-fade-in">
      {/* Header */}
      <section className="py-16 sm:py-24 bg-ink text-bone noise relative overflow-hidden">
        <div className="bg-grid-dark absolute inset-0 opacity-30" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-bone/40 tracking-wide2">02 / PEARSON</span>
            <span className="w-8 h-px bg-bone/20" />
            <span className="font-mono text-xs text-bone/40 tracking-wide2 uppercase">Curriculum</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tightest max-w-3xl">
            <EditableText
              value={content.unitsTitle}
              onChange={(v) => update((p) => ({ ...p, unitsTitle: v }))}
            />
          </h1>
          <p className="mt-6 text-base text-bone/60 max-w-2xl leading-relaxed">
            <EditableText
              value={content.unitsSubtitle}
              onChange={(v) => update((p) => ({ ...p, unitsSubtitle: v }))}
              multiline
            />
          </p>
        </div>
      </section>

      {/* Units Grid — 2 columns on desktop */}
      <section className="py-16 sm:py-24 bg-bone">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line">
            {content.units.map((unit, i) => (
              <button
                key={unit.id}
                onClick={() => navigate(`/${unit.id}`)}
                className="group bg-bone p-8 lg:p-10 text-left transition-colors hover:bg-ink hover:text-bone animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-xs tracking-wide2 text-concrete group-hover:text-bone/40 transition-colors">
                    UNIT / {unit.number}
                  </span>
                  <ArrowRight
                    size={18}
                    className="text-concrete group-hover:text-bone transition-all group-hover:translate-x-1 -rotate-45"
                  />
                </div>

                <h3 className="font-display font-semibold text-2xl sm:text-3xl tracking-tightest mb-3">
                  <EditableText
                    value={unit.title}
                    onChange={(v) =>
                      update((p) => ({
                        ...p,
                        units: p.units.map((u) =>
                          u.id === unit.id ? { ...u, title: v } : u
                        ),
                      }))
                    }
                  />
                </h3>

                <p className="text-sm text-concrete group-hover:text-bone/60 leading-relaxed transition-colors">
                  <EditableText
                    value={unit.concept}
                    onChange={(v) =>
                      update((p) => ({
                        ...p,
                        units: p.units.map((u) =>
                          u.id === unit.id ? { ...u, concept: v } : u
                        ),
                      }))
                    }
                  />
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
