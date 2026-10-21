import { forwardRef, useId, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Visible label to the right of the switch. Without it, pass `aria-label`. */
  label?: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
  /** md 51×31 (settings), sm 34×20 (table rows, Chart of Accounts status column). */
  size?: 'sm' | 'md';
}

/**
 * On/off switch. Figma: "Toggle" instances on the accounting settings screens (51×31, success when
 * on, translucent grey when off, white knob with a soft shadow). The small size matches the Status
 * column on the Chart of Accounts (1871:19163).
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { checked, defaultChecked = false, onCheckedChange, label, description, size = 'md', disabled, className, id, ...rest },
  ref,
) {
  const autoId = useId();
  const switchId = id ?? `wbiz-switch-${autoId}`;
  const [inner, setInner] = useState(defaultChecked);
  const on = checked ?? inner;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInner(!on);
    onCheckedChange?.(!on);
  };

  const control = (
    <button
      ref={ref}
      id={switchId}
      type="button"
      role="switch"
      aria-checked={on}
      aria-labelledby={label ? `${switchId}-label` : undefined}
      aria-describedby={description ? `${switchId}-desc` : undefined}
      disabled={disabled}
      onClick={toggle}
      className={cx(
        'inline-flex shrink-0 items-center rounded-full p-0.5 transition-colors duration-200',
        size === 'sm' ? 'h-switch-sm-h w-switch-sm-w' : 'h-switch-h w-switch-w',
        'focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:opacity-50',
        on ? 'bg-success' : 'bg-switch-off',
        className,
      )}
      {...rest}
    >
      <span className={cx('rounded-full bg-surface shadow-knob transition-transform duration-200', size === 'sm' ? 'size-knob-sm' : 'size-knob', on ? (size === 'sm' ? 'translate-x-3.5' : 'translate-x-5') : 'translate-x-0')} />
    </button>
  );

  if (!label) return control;
  return (
    <div className="flex items-start gap-3">
      {control}
      <div className="flex min-w-0 flex-col gap-0.5 pt-1">
        <label id={`${switchId}-label`} htmlFor={switchId} className={cx('font-sans text-sm font-medium', disabled ? 'text-fg-disabled' : 'text-fg-strong')}>
          {label}
        </label>
        {description && <p id={`${switchId}-desc`} className="font-sans text-sm text-fg-muted">{description}</p>}
      </div>
    </div>
  );
});
