import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { CloseCircleIcon, ColumnsIcon, TickCircleIcon } from '../../icons';

export interface ColumnOption {
  key: string;
  label: string;
  /** Columns that can never be hidden, e.g. the record name. */
  locked?: boolean;
}

export interface ColumnCustomizerValue {
  /** Keys of the visible columns. */
  columns: string[];
  /** Keys of the ticked "More Options". */
  options: string[];
}

export interface ColumnCustomizerPanelProps {
  columns: ColumnOption[];
  /** Extra switches under "More Options", e.g. "Include Inactive Accounts". */
  options?: ColumnOption[];
  value: ColumnCustomizerValue;
  onApply: (value: ColumnCustomizerValue) => void;
  onCancel: () => void;
  title?: ReactNode;
  optionsTitle?: ReactNode;
  className?: string;
}

const toggle = (list: string[], key: string) => (list.includes(key) ? list.filter((k) => k !== key) : [...list, key]);

/**
 * The popup content. Figma: Edit Column (Trial balance 896:17474, Opening balance 5288:29266):
 * 354px white panel, 8px radius, 24px padding, "Visible Column" and "More Options" in Inter 20,
 * 20px checkboxes with Inter 14 labels, Cancel (outline) and Apply (primary) on the right.
 * Changes are a draft until Apply; at least one column stays visible.
 */
export function ColumnCustomizerPanel({
  columns,
  options = [],
  value,
  onApply,
  onCancel,
  title = 'Visible Column',
  optionsTitle = 'More Options',
  className,
}: ColumnCustomizerPanelProps) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  const titleId = useId();
  const optionsId = useId();
  const onlyOne = draft.columns.length <= 1;

  return (
    <div className={cx('flex w-columns-popup max-w-full flex-col gap-6 rounded-lg bg-surface p-6 shadow-md', className)}>
      <fieldset className="flex flex-col gap-5" aria-labelledby={titleId}>
        <legend id={titleId} className="mb-5 font-sans text-lg text-fg-black">{title}</legend>
        {columns.map((c) => {
          const checked = draft.columns.includes(c.key);
          return (
            <Checkbox
              key={c.key}
              label={c.label}
              checked={checked}
              disabled={c.locked || (checked && onlyOne)}
              onChange={() => setDraft({ ...draft, columns: toggle(draft.columns, c.key) })}
            />
          );
        })}
      </fieldset>
      {options.length > 0 && (
        <fieldset className="flex flex-col gap-5" aria-labelledby={optionsId}>
          <legend id={optionsId} className="mb-5 font-sans text-lg text-fg-black">{optionsTitle}</legend>
          {options.map((o) => (
            <Checkbox
              key={o.key}
              label={o.label}
              checked={draft.options.includes(o.key)}
              disabled={o.locked}
              onChange={() => setDraft({ ...draft, options: toggle(draft.options, o.key) })}
            />
          ))}
        </fieldset>
      )}
      <div className="flex justify-end gap-5">
        <Button variant="outline" leadingIcon={<CloseCircleIcon />} onClick={() => { setDraft(value); onCancel(); }}>Cancel</Button>
        <Button leadingIcon={<TickCircleIcon />} onClick={() => onApply(draft)}>Apply</Button>
      </div>
    </div>
  );
}

export interface ColumnCustomizerProps extends Omit<ColumnCustomizerPanelProps, 'onCancel' | 'onApply' | 'className'> {
  onChange: (value: ColumnCustomizerValue) => void;
  /** Accessible name of the icon-only trigger and its popup. */
  label?: string;
  /** Which edge of the trigger the popup lines up with. */
  align?: 'start' | 'end';
  className?: string;
}

/** Icon-only primary "Customize Columns" toolbar button that opens the column popup. Escape or an outside click cancels. */
export function ColumnCustomizer({
  onChange,
  label = 'Customize Columns',
  align = 'end',
  className,
  ...panel
}: ColumnCustomizerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popupId = useId();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (!rootRef.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus(); } };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div ref={rootRef} className={cx('relative inline-flex h-fit', className)}>
      <Button
        ref={btnRef}
        iconOnly
        aria-label={label}
        title={label}
        aria-expanded={open}
        aria-controls={popupId}
        aria-haspopup="dialog"
        onClick={() => setOpen(!open)}
      >
        <ColumnsIcon />
      </Button>
      {open && (
        <div id={popupId} role="dialog" aria-label={label} className={cx('absolute top-full z-20 mt-2', align === 'end' ? 'right-0' : 'left-0')}>
          <ColumnCustomizerPanel
            {...panel}
            className="border border-line-subtle"
            onCancel={() => { setOpen(false); btnRef.current?.focus(); }}
            onApply={(v) => { onChange(v); setOpen(false); btnRef.current?.focus(); }}
          />
        </div>
      )}
    </div>
  );
}
