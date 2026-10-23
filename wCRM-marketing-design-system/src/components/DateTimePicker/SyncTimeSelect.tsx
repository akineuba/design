import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { LucideChevronDownIcon } from '../../icons';
import { cn } from '../../utils/cn';

export interface SyncTimeOption {
  value: string;
  label: string;
}

export interface SyncTimeSelectProps {
  /** Field label ("Sync Time", Inter Regular 13 #1E2238, 8px above the box). */
  label: string;
  options: SyncTimeOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Start expanded (Figma `Property 1=dropdown`). */
  defaultOpen?: boolean;
  className?: string;
}

/**
 * Inline-expanding select from `time-picker-row` (1268:28451): the trigger row and the options share one bordered
 * box (p12/16, gap 10, r8, no shadow) and the list pushes the content below it down instead of floating.
 * Selected value Inter 14 #1E2238 with the chevron; other options Inter 14 #64748B.
 */
export function SyncTimeSelect({ label, options, value, defaultValue, onValueChange, defaultOpen = false, className }: SyncTimeSelectProps) {
  const id = useId();
  const [open, setOpen] = useState(defaultOpen);
  const [inner, setInner] = useState(defaultValue ?? options[0]?.value);
  const current = value ?? inner;
  const selected = options.find((o) => o.value === current);
  const rest = options.filter((o) => o.value !== current);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const choose = (v: string) => {
    if (value === undefined) setInner(v);
    onValueChange?.(v);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onListKey = (e: KeyboardEvent, i: number) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    const step = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = i + step;
    if (next < 0) triggerRef.current?.focus();
    else optionRefs.current[Math.min(next, rest.length - 1)]?.focus();
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <span id={`${id}-label`} className="text-field-label text-text-primary">{label}</span>
      <div className="flex flex-col gap-2.5 rounded-md border border-border-default bg-surface-default px-4 py-3 focus-within:border-accent-navy">
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-labelledby={`${id}-label ${id}-value`}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
              requestAnimationFrame(() => optionRefs.current[0]?.focus());
            }
          }}
          className="flex items-center justify-between rounded-xs text-left text-body text-text-primary outline-none focus-visible:shadow-focus"
        >
          <span id={`${id}-value`}>{selected?.label}</span>
          <LucideChevronDownIcon className={cn('size-3 shrink-0 text-text-primary transition-transform duration-fast', open && 'rotate-180')} strokeWidth={2.67} />
        </button>
        {open && (
          <div id={`${id}-list`} role="listbox" aria-labelledby={`${id}-label`} className="flex flex-col gap-2.5">
            {rest.map((o, i) => (
              <button
                key={o.value}
                ref={(el) => {
                  optionRefs.current[i] = el;
                }}
                type="button"
                role="option"
                aria-selected={false}
                onClick={() => choose(o.value)}
                onKeyDown={(e) => onListKey(e, i)}
                className="rounded-xs text-left text-body text-text-secondary outline-none hover:text-text-primary focus-visible:text-text-primary focus-visible:shadow-focus"
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
