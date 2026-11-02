import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface TabItem {
  id: string;
  label: ReactNode;
  disabled?: boolean;
  /** Count shown after the label, e.g. open claims. */
  count?: number;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  'aria-label': string;
  className?: string;
}

/**
 * Underlined section tabs under the page title. Switch between sibling pages of one module (UI rule 17)
 * or between views of one record. Figma: SemiBold 13, active teal with a 2px teal underline, 24px apart.
 * Arrow keys move between tabs.
 */
export function Tabs({ items, value, onChange, className, ...aria }: TabsProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const enabled = items.filter((i) => !i.disabled);
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const idx = enabled.findIndex((i) => i.id === value);
    const next = enabled[(idx + (e.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length];
    onChange(next.id);
    refs.current[items.indexOf(next)]?.focus();
  };
  return (
    <div role="tablist" aria-label={aria['aria-label']} onKeyDown={onKey} className={cx('flex gap-6 border-b border-line-subtle', className)}>
      {items.map((t, i) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            type="button"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            disabled={t.disabled}
            onClick={() => onChange(t.id)}
            className={cx(
              '-mb-px inline-flex items-center gap-1.5 border-b-2 px-1.5 py-2.5 text-13 transition-colors ib-focus disabled:cursor-not-allowed disabled:text-fg-disabled',
              active ? 'border-brand font-semibold text-primary' : 'border-transparent font-medium text-fg-muted hover:text-fg-strong',
            )}
          >
            {t.label}
            {t.count !== undefined && (
              <span className={cx('rounded-full px-1.5 text-11', active ? 'bg-primary-subtle text-primary' : 'bg-surface-track text-fg-muted')}>
                {t.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
