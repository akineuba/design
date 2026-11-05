import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface TabItem { id: string; label: ReactNode; count?: number }

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  'aria-label'?: string;
}

/** Underline tabs. Arrow keys move between tabs. */
export function Tabs({ items, value, onChange, ...aria }: TabsProps) {
  const base = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const onKey = (e: KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + items.length) % items.length;
    refs.current[next]?.focus();
    onChange(items[next]!.id);
  };
  return (
    <div className="sso-tabs" role="tablist" aria-label={aria['aria-label']}>
      {items.map((t, i) => {
        const selected = t.id === value;
        return (
          <button
            key={t.id}
            ref={(el) => { refs.current[i] = el; }}
            id={`${base}-${t.id}`}
            role="tab"
            type="button"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            className={cx('sso-tabs__tab', selected && 'is-active')}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
            {t.count !== undefined && <span className="sso-tabs__count">{t.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
