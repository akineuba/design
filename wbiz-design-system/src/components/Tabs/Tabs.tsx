import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface TabItem {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  /** Accessible name for the tab list. */
  'aria-label': string;
  /** Prefix for tab/panel ids so a TabPanel can reference its tab: `${idPrefix}-tab-${value}`. */
  idPrefix?: string;
  className?: string;
}

/**
 * Underlined section tabs. Figma: sub-menu-list (new features, 7053:5433): 35px tabs with 10/20
 * padding; active is Roboto Semibold 13 in primary with a 2px primary underline, the rest Roboto
 * Medium 13 in fg-muted. Arrow keys, Home and End move between tabs.
 */
export function Tabs({ items, value, onChange, idPrefix = 'wbiz-tabs', className, 'aria-label': ariaLabel }: TabsProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const enabled = items.map((t, i) => (t.disabled ? -1 : i)).filter((i) => i >= 0);

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const pos = enabled.indexOf(index);
    let next: number | undefined;
    if (e.key === 'ArrowRight') next = enabled[(pos + 1) % enabled.length];
    if (e.key === 'ArrowLeft') next = enabled[(pos - 1 + enabled.length) % enabled.length];
    if (e.key === 'Home') next = enabled[0];
    if (e.key === 'End') next = enabled[enabled.length - 1];
    if (next === undefined) return;
    e.preventDefault();
    refs.current[next]?.focus();
    onChange(items[next].value);
  };

  return (
    <div role="tablist" aria-label={ariaLabel} className={cx('flex max-w-full overflow-x-auto', className)}>
      {items.map((t, i) => {
        const selected = t.value === value;
        return (
          <button
            key={t.value}
            ref={(el) => { refs.current[i] = el; }}
            id={`${idPrefix}-tab-${t.value}`}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel-${t.value}`}
            tabIndex={selected ? 0 : -1}
            disabled={t.disabled}
            onClick={() => onChange(t.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cx(
              'h-tab shrink-0 whitespace-nowrap border-b-2 px-5 py-2.5 font-data text-13 transition-colors',
              'focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:text-fg-disabled',
              selected ? 'border-primary font-semibold text-primary' : 'border-transparent font-medium text-fg-muted hover:text-fg',
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export interface TabPanelProps {
  value: string;
  activeValue: string;
  idPrefix?: string;
  children: ReactNode;
  className?: string;
}

/** Content for one tab. Rendered only when its tab is active. */
export function TabPanel({ value, activeValue, idPrefix = 'wbiz-tabs', children, className }: TabPanelProps) {
  if (value !== activeValue) return null;
  return (
    <div role="tabpanel" id={`${idPrefix}-panel-${value}`} aria-labelledby={`${idPrefix}-tab-${value}`} tabIndex={0} className={className}>
      {children}
    </div>
  );
}
