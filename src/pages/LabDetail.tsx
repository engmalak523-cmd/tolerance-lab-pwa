import { useState, useRef } from 'react';
import { ArrowLeft, Upload, Check, Video, ListChecks, Wrench, FileText, BookMarked, StickyNote } from 'lucide-react';
import type { SiteContent, LabTracker, Lab } from '../types';
import { EditableText } from '../components/EditableText';
import { Tag } from '../components/Tag';

interface LabDetailProps {
  lab: Lab;
  content: SiteContent;
  update: (updater: (prev: SiteContent) => SiteContent) => void;
  navigate: (path: string) => void;
  tracker: LabTracker;
  setTracker: (updater: (prev: LabTracker) => LabTracker) => void;
}

export function LabDetail({ lab, content, update, navigate, tracker, setTracker }: LabDetailProps) {
  const [editingProtocol, setEditingProtocol] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const labTracker = tracker[lab.id] || { done: false, photo: null, notes: '', checkedMaterials: [] };
  const checkedMaterials = labTracker.checkedMaterials || new Array(lab.materials.length).fill(false);

  const toggleDone = () => {
    setTracker((prev) => ({
      ...prev,
      [lab.id]: { ...labTracker, done: !labTracker.done },
    }));
  };

  const toggleMaterial = (index: number) => {
    setTracker((prev) => {
      const existing = prev[lab.id] || { done: false, photo: null, notes: '', checkedMaterials: new Array(lab.materials.length).fill(false) };
      const mats = [...(existing.checkedMaterials || new Array(lab.materials.length).fill(false))];
      mats[index] = !mats[index];
      return { ...prev, [lab.id]: { ...existing, checkedMaterials: mats } };
    });
  };

  const setNotes = (notes: string) => {
    setTracker((prev) => ({
      ...prev,
      [lab.id]: { ...labTracker, notes },
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setTracker((prev) => ({
        ...prev,
        [lab.id]: { ...labTracker, photo: reader.result as string },
      }));
    };
    reader.readAsDataURL(file);
  };

  const updateLab = (updater: (l: Lab) => Lab) => {
    update((p) => ({
      ...p,
      labs: p.labs.map((l) => (l.id === lab.id ? updater(l) : l)),
    }));
  };

  return (
    <div className="pt-16 animate-fade-in">
      {/* Header */}
      <section className="py-12 sm:py-16 bg-ink text-bone noise relative overflow-hidden">
        <div className="bg-grid-dark absolute inset-0 opacity-30" />
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <button
            onClick={() => navigate('/archive')}
            className="inline-flex items-center gap-2 text-bone/50 hover:text-bone text-sm font-mono tracking-wide2 uppercase transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Archive
          </button>

          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-bone/40 tracking-wide2">LAB No. {lab.number}</span>
          </div>

          <Tag tag={lab.tag} />

          <h1 className="mt-4 font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tightest">
            <EditableText
              value={lab.title}
              onChange={(v) => updateLab((l) => ({ ...l, title: v }))}
            />
          </h1>
          <p className="mt-4 text-base text-bone/60 max-w-2xl leading-relaxed">
            <EditableText
              value={lab.subtitle}
              onChange={(v) => updateLab((l) => ({ ...l, subtitle: v }))}
              multiline
            />
          </p>

          <button
            onClick={toggleDone}
            className={`mt-8 inline-flex items-center gap-2.5 px-5 py-3 text-sm font-medium rounded-sm border transition-all ${
              labTracker.done
                ? 'bg-bone text-ink border-bone'
                : 'border-bone/30 text-bone hover:bg-bone/10'
            }`}
          >
            <Check size={16} />
            {labTracker.done ? 'Completed' : 'Mark as complete'}
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24 bg-bone">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 space-y-16">
          {/* Video Player */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Video size={18} className="text-ink" strokeWidth={1.5} />
              <h2 className="font-mono text-xs tracking-wide2 uppercase text-ink">Experiment Video</h2>
            </div>
            <div className="aspect-video bg-ink rounded-sm relative overflow-hidden noise group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="bg-grid-dark absolute inset-0 opacity-20" />
              {labTracker.photo ? (
                <img src={labTracker.photo} alt="Experiment" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-bone/40">
                  <Upload size={32} strokeWidth={1} className="mb-3" />
                  <p className="font-mono text-xs tracking-wide2 uppercase">Upload Experiment Video / Photo</p>
                  <p className="font-mono text-[10px] tracking-wide2 text-bone/30 uppercase mt-1">Click to upload</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Materials List */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ListChecks size={18} className="text-ink" strokeWidth={1.5} />
              <h2 className="font-mono text-xs tracking-wide2 uppercase text-ink">Materials List</h2>
            </div>
            <div className="bg-bone border border-line rounded-sm p-6 sm:p-8">
              <ul className="space-y-3">
                {lab.materials.map((material, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={checkedMaterials[i] || false}
                      onChange={() => toggleMaterial(i)}
                      className="lab-checkbox"
                    />
                    <EditableText
                      value={material}
                      onChange={(v) =>
                        updateLab((l) => ({
                          ...l,
                          materials: l.materials.map((m, idx) => (idx === i ? v : m)),
                        }))
                      }
                      className={`text-sm flex-1 ${checkedMaterials[i] ? 'text-concrete line-through' : 'text-ink'}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tools Needed */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Wrench size={18} className="text-ink" strokeWidth={1.5} />
              <h2 className="font-mono text-xs tracking-wide2 uppercase text-ink">Tools Needed</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {lab.tools.map((tool, i) => (
                <EditableText
                  key={i}
                  value={tool}
                  onChange={(v) =>
                    updateLab((l) => ({
                      ...l,
                      tools: l.tools.map((t, idx) => (idx === i ? v : t)),
                    }))
                  }
                  className="px-3 py-2 text-sm border border-line rounded-sm bg-bone"
                />
              ))}
            </div>
          </div>

          {/* Step-by-Step Protocol */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-ink" strokeWidth={1.5} />
                <h2 className="font-mono text-xs tracking-wide2 uppercase text-ink">Step-by-Step Protocol</h2>
              </div>
            </div>
            <div className="space-y-px bg-line">
              {lab.protocol.map((step, i) => (
                <div key={i} className="bg-bone p-6 sm:p-8">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-ink rounded-sm flex items-center justify-center">
                        <span className="font-mono text-sm font-medium text-bone tracking-wide2">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="font-display font-semibold text-lg tracking-tightest text-ink mb-2">
                        <EditableText
                          value={step.title}
                          onChange={(v) =>
                            updateLab((l) => ({
                              ...l,
                              protocol: l.protocol.map((s, idx) =>
                                idx === i ? { ...s, title: v } : s
                              ),
                            }))
                          }
                        />
                      </h3>
                      <p className="text-sm text-slate leading-relaxed">
                        <EditableText
                          value={step.body}
                          onChange={(v) =>
                            updateLab((l) => ({
                              ...l,
                              protocol: l.protocol.map((s, idx) =>
                                idx === i ? { ...s, body: v } : s
                              ),
                            }))
                          }
                          multiline
                        />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vocabulary Bank */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BookMarked size={18} className="text-ink" strokeWidth={1.5} />
              <h2 className="font-mono text-xs tracking-wide2 uppercase text-ink">Vocabulary Bank</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line">
              {lab.vocabulary.map((item, i) => (
                <div key={i} className="bg-bone p-6">
                  <EditableText
                    value={item.term}
                    onChange={(v) =>
                      updateLab((l) => ({
                        ...l,
                        vocabulary: l.vocabulary.map((item2, idx) =>
                          idx === i ? { ...item2, term: v } : item2
                        ),
                      }))
                    }
                    className="font-display font-semibold text-base tracking-tightest text-ink block mb-2"
                  />
                  <EditableText
                    value={item.definition}
                    onChange={(v) =>
                      updateLab((l) => ({
                        ...l,
                        vocabulary: l.vocabulary.map((item2, idx) =>
                          idx === i ? { ...item2, definition: v } : item2
                        ),
                      }))
                    }
                    multiline
                    className="text-sm text-concrete leading-relaxed block"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Student Notes */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <StickyNote size={18} className="text-ink" strokeWidth={1.5} />
              <h2 className="font-mono text-xs tracking-wide2 uppercase text-ink">Student Notes</h2>
            </div>
            <div className="bg-bone border border-line rounded-sm p-6 sm:p-8">
              <textarea
                value={labTracker.notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your observations, results, and reflections here..."
                className="w-full min-h-[160px] bg-transparent text-sm text-ink leading-relaxed resize-y focus:outline-none placeholder:text-concrete/50"
              />
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={toggleDone}
              className={`inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-medium rounded-sm transition-all ${
                labTracker.done
                  ? 'bg-ink text-bone'
                  : 'border border-ink text-ink hover:bg-ink hover:text-bone'
              }`}
            >
              <Check size={18} />
              {labTracker.done ? 'Lab Completed' : 'Mark as Complete'}
            </button>
            <button
              onClick={() => navigate('/tracker')}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-medium text-concrete hover:text-ink transition-colors"
            >
              View My Tracker
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
