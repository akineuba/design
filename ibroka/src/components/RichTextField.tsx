import { useId, useRef, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { BoldIcon, BulletListIcon, ItalicIcon, LinkIcon, NumberListIcon } from '../icons';

export interface RichTextFieldProps {
  label?: ReactNode;
  /** Initial HTML. */
  defaultValue?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
  hint?: ReactNode;
}

/** Formatted notes: policy remarks, claim descriptions, email bodies. Bold, italic, lists and links only. */
export function RichTextField({ label, defaultValue = '', onChange, placeholder = 'Write a note…', disabled, hint }: RichTextFieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const exec = (cmd: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(cmd, false, arg);
    onChange?.(ref.current?.innerHTML ?? '');
  };
  const tools: Array<[string, ReactNode, () => void]> = [
    ['Bold', <BoldIcon key="b" />, () => exec('bold')],
    ['Italic', <ItalicIcon key="i" />, () => exec('italic')],
    ['Bulleted list', <BulletListIcon key="u" />, () => exec('insertUnorderedList')],
    ['Numbered list', <NumberListIcon key="o" />, () => exec('insertOrderedList')],
    [
      'Link',
      <LinkIcon key="l" />,
      () => {
        const url = window.prompt('Link address');
        if (url) exec('createLink', url);
      },
    ],
  ];
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span id={`${id}-l`} className="text-13 font-medium text-fg-strong">
          {label}:
        </span>
      )}
      <div className={cx('overflow-hidden rounded-md border focus-within:border-brand focus-within:shadow-focus', disabled ? 'border-line bg-surface-muted' : 'border-line-subtle bg-surface')}>
        <div role="toolbar" aria-label="Formatting" className="flex gap-1 border-b border-line-subtle bg-surface-header px-2 py-1.5">
          {tools.map(([name, icon, fn]) => (
            <button key={name} type="button" aria-label={name} title={name} disabled={disabled} onMouseDown={(e) => e.preventDefault()} onClick={fn} className="inline-flex size-7 items-center justify-center rounded text-fg-muted hover:bg-surface hover:text-fg-strong ib-focus disabled:text-fg-disabled">
              <span className="size-icon-sm">{icon}</span>
            </button>
          ))}
        </div>
        <div
          ref={ref}
          role="textbox"
          aria-multiline
          aria-labelledby={label ? `${id}-l` : undefined}
          aria-describedby={hint ? `${id}-h` : undefined}
          aria-disabled={disabled || undefined}
          contentEditable={!disabled}
          suppressContentEditableWarning
          data-placeholder={placeholder}
          onInput={() => onChange?.(ref.current?.innerHTML ?? '')}
          dangerouslySetInnerHTML={{ __html: defaultValue }}
          className="ib-rte min-h-[120px] px-4 py-3 text-13 leading-[20px] text-fg-strong focus:outline-none [&_a]:text-primary [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
        />
      </div>
      {hint && (
        <p id={`${id}-h`} className="text-12 text-fg-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
