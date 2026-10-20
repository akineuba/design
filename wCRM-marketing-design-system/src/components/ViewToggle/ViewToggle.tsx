import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

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
  /** Name for the group, e.g. "Posts view". */
  'aria-label': string;
  className?: string;
}

/**
 * Swap buttons: a segmented icon switch for changing how a list is shown (list ↔ calendar ↔ grid).
 * Figma: the view switch beside "New Post" (`btn-list-view` / `btn-calendar-view`): one 1px `text-muted`
 * outline, 40 × 40 cells, the selected cell filled `brand-primary` with a white icon, others white with
 * a `text-icon` glyph. Behaves as a radio group: one Tab stop, arrow keys move and select.
 */
export function ViewToggle<T extends string = string>({ options, value, onValueChange, className, ...rest }: ViewToggleProps<T>) {
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
    <div role="radiogroup" aria-label={rest['aria-label']} className={cn('inline-flex shrink-0 rounded-md border border-text-muted bg-surface-default', className)}>
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
            className={cn(
              // -m-px lets the filled cell sit on the group outline, as in Figma.
              '-m-px inline-flex size-control-md items-center justify-center rounded-md transition-colors duration-fast ease-standard [&>svg]:size-4',
              'focus-visible:relative focus-visible:outline-none focus-visible:shadow-focus',
              selected ? 'bg-brand-primary text-text-inverse' : 'text-text-icon hover:text-text-secondary',
            )}
          >
            {o.icon}
          </button>
        );
      })}
    </div>
  );
}
