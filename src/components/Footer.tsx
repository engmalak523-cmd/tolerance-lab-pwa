import { EditableText } from './EditableText';

interface FooterProps {
  footerText: string;
  onFooterChange: (text: string) => void;
}

export function Footer({ footerText, onFooterChange }: FooterProps) {
  return (
    <footer className="bg-ink text-bone noise relative">
      <div className="bg-grid-dark absolute inset-0 opacity-50" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 bg-bone/10 flex items-center justify-center rounded-sm border border-bone/20">
              <span className="font-display font-bold text-bone text-base tracking-tightest">TL</span>
            </span>
            <div>
              <p className="font-mono text-[10px] tracking-wide2 text-concrete uppercase">
                TOLERANCE LAB
              </p>
              <p className="font-display text-sm text-bone/80 mt-0.5">
                Pearson STEAM
              </p>
            </div>
          </div>

          <EditableText
            value={footerText}
            onChange={onFooterChange}
            className="font-mono text-xs text-bone/60 tracking-wide2"
          />
        </div>
      </div>
    </footer>
  );
}
