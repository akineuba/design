import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface ViewToggleOption<T extends string = string> {
  value: T;
  /** Accessible name, e.g. "List view". Shown as a tooltip too. */
  label: string;
  icon: ReactNode;
}

export interface ViewToggleProps<T extends string = string> {
  options: ViewToggleOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  /** Name for the group, e.g. "Customers view". */
  'aria-label': string;
  className?: string;
}

/**
 * Swap buttons: an icon-only switch for changing how the same records are shown (list ↔ calendar ↔ grid).
 * Ported from the wCRM design system (Figma: wCRM updates, Social posts view switch `btn-list-view` /
 * `btn-calendar-view`, 1036:6314) and restyled with wBiz tokens: one 1px `line` outline, 40 × 40 cells,
 * the selected cell filled `primary` with an `fg-inverse` icon, the others `surface` with an `icon-muted`
 * glyph. Behaves as a radio group: one Tab stop; arrow keys move and select; Home and End jump.
 * For labelled options (text or text + icon), use `SegmentedControl`.
 */
export function ViewToggle<T extends string = string>({ options, value, onValueChange, className, 'aria-label': ariaLabel }: ViewToggleProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    const jump = e.key === 'Home' ? 0 : e.key === 'End' ? options.length - 1 : null;
    if (!step && jump === null) return;
    e.preventDefault();
    const next = jump ?? (index + step + options.length) % options.length;
    onValueChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div role="radiogroup" aria-label={ariaLabel} className={cx('inline-flex shrink-0 rounded-lg border border-line bg-surface', className)}>
      {options.map((o, i) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={o.label}
            title={o.label}
            tabIndex={selected ? 0 : -1}
            onClick={() => onValueChange(o.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cx(
              // -m-px lets the filled cell sit on the group outline, as in Figma.
              '-m-px inline-flex size-control-md items-center justify-center rounded-lg transition-colors duration-150',
              'focus-visible:relative focus-visible:outline-hidden focus-visible:shadow-focus',
              selected ? 'bg-primary text-fg-inverse' : 'text-icon-muted hover:bg-surface-muted hover:text-fg-strong',
            )}
          >
            <span className="size-icon-sm" aria-hidden>{o.icon}</span>
          </button>
        );
      })}
    </div>
  );
}
