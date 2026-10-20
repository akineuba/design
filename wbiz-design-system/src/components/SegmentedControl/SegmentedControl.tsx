import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface SegmentOption {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  /**
   * `pill`: rounded track (Figma: Inventory / Free Text on line items, new features 7053:5632).
   * `boxed`: bordered group (Figma: List / Card view toggle, new features 7053:5973).
   */
  appearance?: 'pill' | 'boxed';
  'aria-label': string;
  className?: string;
}

/** Single-choice toggle between two to four options. Arrow keys move the selection (radio-group pattern). */
export function SegmentedControl({ options, value, onChange, appearance = 'pill', className, 'aria-label': ariaLabel }: SegmentedControlProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const enabled = options.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i >= 0);

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const pos = enabled.indexOf(index);
    let next: number | undefined;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = enabled[(pos + 1) % enabled.length];
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = enabled[(pos - 1 + enabled.length) % enabled.length];
    if (next === undefined) return;
    e.preventDefault();
    refs.current[next]?.focus();
    onChange(options[next].value);
  };

  const pill = appearance === 'pill';
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cx(
        'inline-flex items-center gap-0.5 border border-line-subtle',
        pill ? 'rounded-3xl bg-surface-track p-0.5' : 'rounded-md bg-surface',
        className,
      )}
    >
      {options.map((o, i) => {
        const checked = o.value === value;
        return (
          <button
            key={o.value}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            disabled={o.disabled}
            onClick={() => onChange(o.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cx(
              'inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-data text-13 transition-colors',
              'focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:text-fg-disabled',
              pill ? 'rounded-3xl px-5 py-0.5' : 'h-control-sm rounded-md px-3',
              checked ? 'bg-primary text-fg-inverse' : 'text-fg-muted hover:text-fg',
            )}
          >
            {o.icon && <span className="size-icon-sm shrink-0" aria-hidden>{o.icon}</span>}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
