import { ArrowRight, FlaskConical, BookOpen, ClipboardList } from 'lucide-react';
import type { SiteContent } from '../types';
import { EditableText } from '../components/EditableText';
import { SectionLabel } from '../components/SectionLabel';

interface HomeProps {
  content: SiteContent;
  update: (updater: (prev: SiteContent) => SiteContent) => void;
  navigate: (path: string) => void;
}

export function Home({ content, update, navigate }: HomeProps) {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-ink text-bone noise overflow-hidden">
        <div className="bg-grid-dark absolute inset-0 opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bone/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-10 pt-20">
          <div className="flex items-center gap-3 mb-8 animate-fade-up delay-0">
            <span className="font-mono text-[10px] tracking-wide2 text-bone/40 uppercase">
              TOLERANCE LAB / 2026
            </span>
            <span className="w-12 h-px bg-bone/20" />
            <span className="font-mono text-[10px] tracking-wide2 text-bone/40 uppercase">
              Pearson x STEAM
            </span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tightest max-w-5xl animate-fade-up delay-1">
            <EditableText
              value={content.heroTitle}
              onChange={(v) => update((p) => ({ ...p, heroTitle: v }))}
              multiline
              className="text-bone"
            />
          </h1>

          <p className="mt-8 text-base sm:text-lg text-bone/60 max-w-2xl leading-relaxed animate-fade-up delay-2">
            <EditableText
              value={content.heroSubtitle}
              onChange={(v) => update((p) => ({ ...p, heroSubtitle: v }))}
              multiline
            />
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 animate-fade-up delay-3">
            <button
              onClick={() => navigate('/archive')}
              className="group inline-flex items-center gap-3 px-6 py-4 bg-bone text-ink font-medium text-sm rounded-sm transition-all hover:bg-bone/90 hover:gap-4"
            >
              Enter STEAM Lab
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate('/units')}
              className="inline-flex items-center gap-3 px-6 py-4 border border-bone/20 text-bone font-medium text-sm rounded-sm transition-all hover:border-bone/40 hover:bg-bone/5"
            >
              Browse Pearson Units
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-fade-in delay-5">
          <div className="flex flex-col items-center gap-2 text-bone/30">
            <span className="font-mono text-[10px] tracking-wide2 uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-bone/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* Intro by Miss Malak */}
      <section className="py-20 sm:py-32 bg-bone">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <SectionLabel number="01" label="Instructor" />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="aspect-[4/5] bg-ink rounded-sm relative overflow-hidden noise">
                <div className="bg-grid-dark absolute inset-0 opacity-30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-bone/10 border border-bone/20 flex items-center justify-center mb-4">
                    <span className="font-display font-bold text-bone text-2xl tracking-tightest">EM</span>
                  </div>
                  <EditableText
                    value={content.introName}
                    onChange={(v) => update((p) => ({ ...p, introName: v }))}
                    className="font-display text-lg text-bone font-semibold"
                  />
                  <EditableText
                    value={content.introRole}
                    onChange={(v) => update((p) => ({ ...p, introRole: v }))}
                    className="font-mono text-[10px] tracking-wide2 text-bone/50 uppercase mt-1"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl tracking-tightest text-ink mb-6">
                <EditableText
                  value={content.introTitle}
                  onChange={(v) => update((p) => ({ ...p, introTitle: v }))}
                />
              </h2>
              <p className="text-base sm:text-lg text-slate leading-relaxed max-w-2xl">
                <EditableText
                  value={content.introBody}
                  onChange={(v) => update((p) => ({ ...p, introBody: v }))}
                  multiline
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 sm:py-32 bg-bone border-t border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <SectionLabel number="02" label="What's Inside" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-line">
            {[
              {
                icon: BookOpen,
                title: 'Pearson Units',
                desc: 'Six structured units from the Pearson English curriculum, each with vocabulary previews.',
                path: '/units',
                cta: 'View units',
              },
              {
                icon: FlaskConical,
                title: 'STEAM Lab Archive',
                desc: 'Hands-on experiments with full protocols, materials, tools, and vocabulary banks.',
                path: '/archive',
                cta: 'Enter the lab',
              },
              {
                icon: ClipboardList,
                title: 'Lab Tracker',
                desc: 'Mark labs complete, upload your experiment photos, and keep your notes.',
                path: '/tracker',
                cta: 'Track progress',
              },
            ].map((card, i) => (
              <button
                key={card.title}
                onClick={() => navigate(card.path)}
                className="group bg-bone p-8 lg:p-10 text-left transition-colors hover:bg-ink hover:text-bone animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <card.icon size={28} strokeWidth={1.5} className="text-ink group-hover:text-bone transition-colors" />
                <h3 className="mt-6 font-display font-semibold text-xl tracking-tightest">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-concrete group-hover:text-bone/60 leading-relaxed transition-colors">
                  {card.desc}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono tracking-wide2 uppercase">
                  {card.cta}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
