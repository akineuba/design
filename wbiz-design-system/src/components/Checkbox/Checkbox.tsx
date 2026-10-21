import { forwardRef, useEffect, useId, useImperativeHandle, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Visible label to the right of the box. Omit it in table cells and pass `aria-label` instead. */
  label?: ReactNode;
  /** Shows a dash: some, but not all, of the rows it controls are selected. */
  indeterminate?: boolean;
}

/**
 * 20px checkbox. Figma: Button (Trial balance, 896:17613) and the selection column on accounting tables:
 * unchecked is white with a line border and 6px radius; checked is a primary fill with a white tick;
 * indeterminate (header "select all") is a primary-tinted box with a primary border and dash.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, indeterminate = false, disabled, className, id, ...rest },
  ref,
) {
  const inner = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inner.current as HTMLInputElement);
  useEffect(() => {
    if (inner.current) inner.current.indeterminate = indeterminate;
  }, [indeterminate]);
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={cx(
        'inline-flex items-center gap-4 align-middle font-sans text-sm text-fg-black',
        disabled ? 'cursor-not-allowed text-fg-disabled' : 'cursor-pointer',
        className,
      )}
    >
      <span className="relative inline-flex size-checkbox shrink-0">
        <input
          ref={inner}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          className={cx(
            'peer size-checkbox shrink-0 cursor-[inherit] appearance-none rounded-md border border-line bg-surface transition-colors',
            'checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary-subtle',
            'hover:border-primary focus-visible:outline-none focus-visible:shadow-focus',
            'disabled:border-line-subtle disabled:bg-surface-muted disabled:checked:bg-surface-disabled',
          )}
          {...rest}
        />
        <svg viewBox="0 0 20 20" className="pointer-events-none absolute inset-0 hidden text-fg-inverse peer-checked:block" aria-hidden>
          <path d="m5.5 10.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg viewBox="0 0 20 20" className="pointer-events-none absolute inset-0 hidden text-primary peer-indeterminate:block" aria-hidden>
          <path d="M6 10h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      {label}
    </label>
  );
});
