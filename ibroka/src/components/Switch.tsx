import { useId, type ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  size?: 'sm' | 'md';
  /** Required when there is no visible label. */
  'aria-label'?: string;
}

/** On/off setting that takes effect immediately (no Save). For choices saved with a form, use Checkbox. */
export function Switch({ checked, onChange, label, description, disabled, size = 'md', ...aria }: SwitchProps) {
  const id = useId();
  const track = size === 'md' ? 'h-6 w-[44px]' : 'h-5 w-9';
  const knob = size === 'md' ? 'size-5 data-[on=true]:translate-x-5' : 'size-4 data-[on=true]:translate-x-4';
  return (
    <div className="inline-flex items-start gap-3">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={aria['aria-label']}
        aria-labelledby={label ? `${id}-label` : undefined}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cx(
          'relative inline-flex shrink-0 items-center rounded-full p-0.5 transition-colors ib-focus disabled:cursor-not-allowed disabled:opacity-50',
          track,
          checked ? 'bg-primary' : 'bg-surface-track',
        )}
      >
        <span data-on={checked} className={cx('rounded-full bg-white shadow-card transition-transform', knob)} />
      </button>
      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <label id={`${id}-label`} htmlFor={id} className="cursor-pointer text-13 font-medium text-fg-strong">
              {label}
            </label>
          )}
          {description && <span className="text-12 text-fg-muted">{description}</span>}
        </div>
      )}
    </div>
  );
}
