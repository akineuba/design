import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../Button';
import { FilterLinesIcon } from '../../icons';

export interface FilterDropdownProps {
  /** Filter fields, usually `FilterField`s wrapping a `Select` or `Input`. */
  children: ReactNode;
  /** Number of filters currently applied. Shows a count on the trigger when above 0. */
  activeCount?: number;
  onApply?: () => void;
  onReset?: () => void;
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Trigger label. Figma: "Filters". */
  label?: string;
  /** Which edge of the trigger the panel lines up with. */
  align?: 'start' | 'end';
  className?: string;
}

/**
 * Table-toolbar filter control. Trigger: "Filters" on every accounting table (Customers 191:3274,
 * Bills 4183:23454, Chart of Accounts 1871:19163): borderless, 40px, three-line icon, Inter 14 fg.
 * Panel: the "filter" panel (new features, 7099:7787): surface-page fill, line-subtle border,
 * 8px radius, 16/20 padding, 20px between fields.
 */
export function FilterDropdown({
  children,
  activeCount = 0,
  onApply,
  onReset,
  open: openProp,
  onOpenChange,
  label = 'Filters',
  align = 'start',
  className,
}: FilterDropdownProps) {
  const panelId = useId();
  const [inner, setInner] = useState(false);
  const open = openProp ?? inner;
  const setOpen = (v: boolean) => {
    if (openProp === undefined) setInner(v);
    onOpenChange?.(v);
  };
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Clicks inside a Select menu rendered within the panel count as inside.
      if (!rootRef.current?.contains(target)) setOpen(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); triggerRef.current?.focus(); }
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  });

  const active = activeCount > 0;

  return (
    <div ref={rootRef} className={cx('relative inline-flex h-fit', className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className={cx(
          'inline-flex h-control-md items-center gap-2 rounded-lg px-4 font-sans text-sm transition-colors',
          'focus-visible:outline-none focus-visible:shadow-focus',
          active || open ? 'bg-primary-subtle text-primary' : 'bg-surface text-fg hover:bg-surface-muted',
        )}
      >
        <span className="size-icon shrink-0" aria-hidden><FilterLinesIcon /></span>
        {label}
        {active && (
          <span className="inline-flex h-badge min-w-badge items-center justify-center rounded-full bg-primary px-1 font-sans text-2xs font-bold text-fg-inverse">
            <span className="sr-only">, </span>{activeCount}<span className="sr-only"> applied</span>
          </span>
        )}
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label={label}
          className={cx(
            'absolute top-full z-20 mt-2 flex w-max max-w-popover-max flex-col gap-5 rounded-lg border border-line-subtle bg-surface-page px-5 py-4 shadow-md',
            align === 'end' ? 'right-0' : 'left-0',
          )}
        >
          <div className="flex flex-wrap gap-5">{children}</div>
          {(onApply || onReset) && (
            <div className="flex justify-end gap-2 border-t border-line-subtle pt-4">
              {onReset && <Button variant="tertiary" size="sm" onClick={onReset}>Reset</Button>}
              {onApply && <Button size="sm" onClick={() => { onApply(); setOpen(false); }}>Apply filters</Button>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export interface FilterFieldProps {
  /** Label shown above the control. Figma: "Dimension:" in Roboto 14, fg-muted. */
  label: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Labelled slot inside a FilterDropdown panel. Fixed field width so panels line up. */
export function FilterField({ label, children, className }: FilterFieldProps) {
  return (
    <div className={cx('flex w-filter-field max-w-full flex-col gap-1', className)}>
      <span className="font-data text-sm text-fg-muted">{label}</span>
      {children}
    </div>
  );
}
