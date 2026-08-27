import { useRef, useCallback } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
}

export function EditableText({ value, onChange, className = '', multiline = false, placeholder = '' }: EditableTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const handleBlur = useCallback(() => {
    if (ref.current) {
      const text = ref.current.innerText;
      if (text !== value) onChange(text);
    }
  }, [value, onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!multiline && e.key === 'Enter') {
        e.preventDefault();
        ref.current?.blur();
      }
    },
    [multiline]
  );

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`inline-block ${className}`}
      data-placeholder={placeholder}
    >
      {value}
    </span>
  );
}
