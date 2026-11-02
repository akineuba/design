import type { ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface SegmentOption {
  value: string;
  label: ReactNode;
  /** Icon-only segments need an accessible name. */
  'aria-label'?: string;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  'aria-label': string;
  /** icon = square icon buttons (Figma list/grid toggle). text = pill segments for short labels. */
  variant?: 'icon' | 'text';
  className?: string;
}

/** Switches how the same content is shown (list or grid, week or month). Figma: list/grid toggle, 34px squares. */
export function SegmentedControl({ options, value, onChange, variant = 'text', className, ...aria }: SegmentedControlProps) {
  return (
    <div role="radiogroup" aria-label={aria['aria-label']} className={cx('inline-flex rounded-lg bg-surface-track p-[3px]', className)}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={o['aria-label']}
            disabled={o.disabled}
            onClick={() => onChange(o.value)}
            className={cx(
              'inline-flex items-center justify-center rounded-md text-13 font-semibold transition-colors ib-focus disabled:cursor-not-allowed disabled:text-fg-disabled',
              variant === 'icon' ? 'size-control-sm' : 'h-[30px] px-3.5',
              on ? 'bg-primary text-fg-inverse shadow-card' : 'text-fg-subtle hover:text-fg-strong',
            )}
          >
            {variant === 'icon' ? <span className="size-icon">{o.label}</span> : o.label}
          </button>
        );
      })}
    </div>
  );
}
