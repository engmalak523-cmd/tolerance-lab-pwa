import { useRef } from 'react';
import { Check, Upload, ArrowRight, Circle } from 'lucide-react';
import type { SiteContent, LabTracker } from '../types';
import { EditableText } from '../components/EditableText';
import { Tag } from '../components/Tag';

interface TrackerProps {
  content: SiteContent;
  update: (updater: (prev: SiteContent) => SiteContent) => void;
  navigate: (path: string) => void;
  tracker: LabTracker;
  setTracker: (updater: (prev: LabTracker) => LabTracker) => void;
}

export function Tracker({ content, update, navigate, tracker, setTracker }: TrackerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeLabId = useRef<string | null>(null);

  const totalLabs = content.labs.length;
  const doneCount = content.labs.filter((l) => tracker[l.id]?.done).length;
  const progress = totalLabs > 0 ? Math.round((doneCount / totalLabs) * 100) : 0;

  const toggleDone = (labId: string) => {
    setTracker((prev) => {
      const existing = prev[labId] || { done: false, photo: null, notes: '', checkedMaterials: [] };
      return { ...prev, [labId]: { ...existing, done: !existing.done } };
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, labId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setTracker((prev) => {
        const existing = prev[labId] || { done: false, photo: null, notes: '', checkedMaterials: [] };
        return { ...prev, [labId]: { ...existing, photo: reader.result as string } };
      });
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = (labId: string) => {
    activeLabId.current = labId;
    fileInputRef.current?.click();
  };

  return (
    <div className="pt-16 animate-fade-in">
      {/* Header */}
      <section className="py-16 sm:py-24 bg-ink text-bone noise relative overflow-hidden">
        <div className="bg-grid-dark absolute inset-0 opacity-30" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-bone/40 tracking-wide2">04 / TRACKER</span>
            <span className="w-8 h-px bg-bone/20" />
            <span className="font-mono text-xs text-bone/40 tracking-wide2 uppercase">Progress</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tightest max-w-3xl">
            <EditableText
              value={content.trackerTitle}
              onChange={(v) => update((p) => ({ ...p, trackerTitle: v }))}
            />
          </h1>
          <p className="mt-6 text-base text-bone/60 max-w-2xl leading-relaxed">
            <EditableText
              value={content.trackerSubtitle}
              onChange={(v) => update((p) => ({ ...p, trackerSubtitle: v }))}
              multiline
            />
          </p>

          {/* Progress Bar */}
          <div className="mt-10 max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-bone/40 tracking-wide2 uppercase">Progress</span>
              <span className="font-mono text-xs text-bone tracking-wide2">
                {doneCount} / {totalLabs} — {progress}%
              </span>
            </div>
            <div className="h-1 bg-bone/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-bone transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tracker List */}
      <section className="py-16 sm:py-24 bg-bone">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="space-y-4">
            {content.labs.map((lab, i) => {
              const labTracker = tracker[lab.id] || { done: false, photo: null, notes: '', checkedMaterials: [] };
              return (
                <div
                  key={lab.id}
                  className={`border rounded-sm transition-all animate-fade-up ${
                    labTracker.done ? 'border-ink bg-ink/[0.02]' : 'border-line bg-bone'
                  }`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex flex-col sm:flex-row items-stretch gap-0">
                    {/* Status */}
                    <button
                      onClick={() => toggleDone(lab.id)}
                      className="flex items-center justify-center w-full sm:w-20 py-4 sm:py-0 border-b sm:border-b-0 sm:border-r border-line transition-colors hover:bg-ink/5"
                    >
                      {labTracker.done ? (
                        <div className="w-7 h-7 bg-ink rounded-full flex items-center justify-center">
                          <Check size={16} className="text-bone" />
                        </div>
                      ) : (
                        <Circle size={24} className="text-concrete" strokeWidth={1.5} />
                      )}
                    </button>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-[10px] tracking-wide2 text-concrete uppercase">
                              LAB No. {lab.number}
                            </span>
                            <Tag tag={lab.tag} />
                          </div>
                          <h3 className="font-display font-semibold text-lg sm:text-xl tracking-tightest text-ink">
                            {lab.title}
                          </h3>
                          <p className="mt-1 text-sm text-concrete">{lab.subtitle}</p>
                        </div>
                        <button
                          onClick={() => navigate(`/lab/${lab.id}`)}
                          className="hidden sm:inline-flex items-center gap-2 text-xs font-mono tracking-wide2 uppercase text-ink hover:gap-3 transition-all flex-shrink-0"
                        >
                          Open
                          <ArrowRight size={14} />
                        </button>
                      </div>

                      {/* Photo */}
                      <div className="mt-4 flex items-center gap-4">
                        <button
                          onClick={() => triggerUpload(lab.id)}
                          className="relative w-20 h-20 rounded-sm border border-line overflow-hidden flex items-center justify-center transition-colors hover:border-ink group flex-shrink-0"
                        >
                          {labTracker.photo ? (
                            <img src={labTracker.photo} alt="Experiment" className="w-full h-full object-cover" />
                          ) : (
                            <Upload size={18} className="text-concrete group-hover:text-ink transition-colors" strokeWidth={1.5} />
                          )}
                        </button>
                        <div>
                          <p className="text-xs text-concrete">
                            {labTracker.photo ? 'Experiment photo added' : 'Add your experiment photo'}
                          </p>
                          <button
                            onClick={() => navigate(`/lab/${lab.id}`)}
                            className="sm:hidden mt-2 inline-flex items-center gap-2 text-xs font-mono tracking-wide2 uppercase text-ink"
                          >
                            Open lab <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (activeLabId.current) handlePhotoUpload(e, activeLabId.current);
            }}
            className="hidden"
          />
        </div>
      </section>
    </div>
  );
}
