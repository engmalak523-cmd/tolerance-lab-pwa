import type { LabTag } from '../types';

const tagStyles: Record<LabTag, string> = {
  SCIENCE: 'border-ink/30 text-ink',
  TECH: 'border-ink/30 text-ink',
  ENGINEERING: 'border-ink/30 text-ink',
};

const tagIcons: Record<LabTag, string> = {
  SCIENCE: 'SCI',
  TECH: 'TEC',
  ENGINEERING: 'ENG',
};

export function Tag({ tag }: { tag: LabTag }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-medium tracking-wide2 uppercase border rounded-sm ${tagStyles[tag]}`}
    >
      <span className="w-1 h-1 bg-current rounded-full" />
      {tagIcons[tag]} · {tag}
    </span>
  );
}
