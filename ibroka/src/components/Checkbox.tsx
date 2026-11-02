import { forwardRef, useEffect, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { CheckIcon, MinusIcon } from '../icons';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  /** Shown when some, not all, rows are selected (header checkbox). */
  indeterminate?: boolean;
}

/** 20px square checkbox, 5px radius. Checked fills with primary teal (Figma had blue and red; see UI Rules B3). */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, indeterminate = false, className, disabled, ...rest },
  ref,
) {
  const inner = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inner.current) inner.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <label
      className={cx(
        'group inline-flex items-center gap-2.5 text-13 text-fg-strong',
        disabled ? 'cursor-not-allowed text-fg-disabled' : 'cursor-pointer',
        className,
      )}
    >
      <span className="relative inline-flex size-icon shrink-0">
        <input
          ref={(el) => {
            inner.current = el;
            if (typeof ref === 'function') ref(el);
            else if (ref) ref.current = el;
          }}
          type="checkbox"
          disabled={disabled}
          className="peer absolute inset-0 m-0 size-full cursor-[inherit] appearance-none rounded-sm border border-fg bg-surface transition-colors checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:shadow-focus disabled:border-fg-disabled disabled:bg-surface-disabled"
          {...rest}
        />
        <span className="pointer-events-none absolute inset-[3px] hidden text-fg-inverse peer-checked:block" aria-hidden>
          {!indeterminate && <CheckIcon />}
        </span>
        <span className="pointer-events-none absolute inset-[3px] hidden text-fg-inverse peer-indeterminate:block" aria-hidden>
          <MinusIcon />
        </span>
      </span>
      {label && <span>{label}</span>}
    </label>
  );
});
