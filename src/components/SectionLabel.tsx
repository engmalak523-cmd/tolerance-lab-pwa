interface SectionLabelProps {
  number: string;
  label: string;
}

export function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-concrete tracking-wide2">{number}</span>
      <span className="w-8 h-px bg-concrete/40" />
      <span className="font-mono text-xs text-concrete tracking-wide2 uppercase">{label}</span>
    </div>
  );
}
