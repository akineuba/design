import type { ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface RadioOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  /** Group label, read by screen readers and shown above the options. */
  label?: ReactNode;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  direction?: 'horizontal' | 'vertical';
  disabled?: boolean;
}

/** Pick one of two to five options. For a single on/off choice use Checkbox or Switch (wBiz B14). */
export function RadioGroup({ name, label, options, value, onChange, direction = 'horizontal', disabled }: RadioGroupProps) {
  return (
    <fieldset className="flex flex-col gap-2" disabled={disabled}>
      {label && <legend className="mb-2 text-13 font-medium text-fg-strong">{label}</legend>}
      <div className={cx('flex gap-x-6 gap-y-2.5', direction === 'vertical' ? 'flex-col' : 'flex-wrap')}>
        {options.map((o) => {
          const off = disabled || o.disabled;
          return (
            <label
              key={o.value}
              className={cx('inline-flex items-center gap-2.5 text-13', off ? 'cursor-not-allowed text-fg-disabled' : 'cursor-pointer text-fg-strong')}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={value === undefined ? undefined : value === o.value}
                disabled={off}
                onChange={() => onChange?.(o.value)}
                className="m-0 grid size-icon shrink-0 cursor-[inherit] appearance-none place-content-center rounded-full border border-fg bg-surface before:size-2.5 before:scale-0 before:rounded-full before:bg-primary before:transition-transform checked:border-primary checked:before:scale-100 focus-visible:shadow-focus disabled:border-fg-disabled disabled:bg-surface-disabled"
              />
              {o.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
