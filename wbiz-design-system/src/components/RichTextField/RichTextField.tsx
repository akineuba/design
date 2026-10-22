import { useEffect, useId, useRef, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useFieldLabelClass } from '../../utils/field-label';
import { BoldIcon, ItalicIcon, ListIcon, ListOrderedIcon, UnderlineIcon } from '../../icons';

export interface RichTextFieldProps {
  label?: ReactNode;
  /** HTML content. Uncontrolled after the first render; read changes through `onChange`. */
  defaultValue?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  hint?: ReactNode;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

const tools = [
  { cmd: 'bold', label: 'Bold', icon: <BoldIcon /> },
  { cmd: 'italic', label: 'Italic', icon: <ItalicIcon /> },
  { cmd: 'underline', label: 'Underline', icon: <UnderlineIcon /> },
  { cmd: 'insertUnorderedList', label: 'Bulleted list', icon: <ListIcon /> },
  { cmd: 'insertOrderedList', label: 'Numbered list', icon: <ListOrderedIcon /> },
] as const;

/**
 * Multi-line text with basic formatting (bold, italic, underline, lists) for customer-facing notes,
 * terms and payment instructions. Derived: Figma has no rich text field. The field matches Input
 * (line border, 8px radius, focus ring); the toolbar sits inside the top edge.
 */
export function RichTextField({ label, defaultValue = '', onChange, placeholder, hint, disabled, className, 'aria-label': ariaLabel }: RichTextFieldProps) {
  const labelClass = useFieldLabelClass();
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && !ref.current.innerHTML) ref.current.innerHTML = defaultValue;
  }, [defaultValue]);

  const run = (cmd: string) => {
    ref.current?.focus();
    // execCommand is deprecated but still the simplest dependency-free way to format contentEditable.
    document.execCommand(cmd);
    onChange?.(ref.current?.innerHTML ?? '');
  };

  return (
    <div className={cx('flex w-full flex-col gap-1', className)}>
      {label && <span id={`${id}-label`} className={labelClass}>{label}</span>}
      <div
        className={cx(
          'overflow-hidden rounded-lg border bg-surface transition-[border-color,box-shadow]',
          disabled ? 'border-line-subtle bg-surface-muted' : 'border-line focus-within:border-primary focus-within:shadow-focus',
        )}
      >
        <div role="toolbar" aria-label="Formatting" className="flex gap-0.5 border-b border-line-subtle px-1.5 py-1">
          {tools.map((t) => (
            <button
              key={t.cmd}
              type="button"
              aria-label={t.label}
              title={t.label}
              disabled={disabled}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => run(t.cmd)}
              className="inline-flex size-control-xs items-center justify-center rounded-md text-icon-muted hover:bg-surface-muted hover:text-fg-strong focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:text-fg-disabled"
            >
              <span className="size-icon-sm">{t.icon}</span>
            </button>
          ))}
        </div>
        <div
          ref={ref}
          role="textbox"
          aria-multiline="true"
          aria-labelledby={label ? `${id}-label` : undefined}
          aria-label={label ? undefined : ariaLabel}
          aria-describedby={hint ? `${id}-hint` : undefined}
          contentEditable={!disabled}
          suppressContentEditableWarning
          data-placeholder={placeholder}
          onInput={() => onChange?.(ref.current?.innerHTML ?? '')}
          className="wbiz-rich min-h-editor px-3.5 py-2.5 font-sans text-sm text-fg-strong outline-none"
        />
      </div>
      {hint && <p id={`${id}-hint`} className="font-sans text-sm text-fg-muted">{hint}</p>}
    </div>
  );
}
