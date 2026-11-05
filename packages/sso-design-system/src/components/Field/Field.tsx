import { forwardRef, useEffect, useId, useRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { cx } from '../../utils/cx';

interface FieldShellProps {
  id: string;
  label?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

/** Label + control + hint/error. Used by Input and Select; use directly for custom controls. */
export function Field({ id, label, required, hint, error, children, className }: FieldShellProps) {
  return (
    <div className={cx('sso-field', className)}>
      {label && (
        <label className="sso-field__label" htmlFor={id}>
          {label}
          {required && <span className="sso-field__req" aria-hidden>*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="sso-field__msg sso-field__msg--error" id={`${id}-msg`}>{error}</p>
      ) : hint ? (
        <p className="sso-field__msg" id={`${id}-msg`}>{hint}</p>
      ) : null}
    </div>
  );
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  leadingIcon?: ReactNode;
  trailing?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fieldClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, leadingIcon, trailing, size = 'md', id, required, className, fieldClassName, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <Field id={inputId} label={label} required={required} hint={hint} error={error} className={fieldClassName}>
      <div className={cx('sso-control', `sso-control--${size}`, error && 'sso-control--error', rest.disabled && 'sso-control--disabled', className)}>
        {leadingIcon && <span className="sso-control__icon">{leadingIcon}</span>}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? `${inputId}-msg` : undefined}
          className="sso-control__input"
          {...rest}
        />
        {trailing && <span className="sso-control__trailing">{trailing}</span>}
      </div>
    </Field>
  );
});

export interface SearchInputProps extends Omit<InputProps, 'leadingIcon' | 'type'> {}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(props, ref) {
  return <Input ref={ref} type="search" leadingIcon={<Search />} aria-label={props.label ? undefined : props.placeholder ?? 'Search'} {...props} />;
});

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  fieldClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, size = 'md', options, placeholder, id, required, className, fieldClassName, ...rest },
  ref,
) {
  const autoId = useId();
  const selectId = id ?? autoId;
  return (
    <Field id={selectId} label={label} required={required} hint={hint} error={error} className={fieldClassName}>
      <div className={cx('sso-control', 'sso-control--select', `sso-control--${size}`, error && 'sso-control--error', className)}>
        <select
          ref={ref}
          id={selectId}
          required={required}
          aria-invalid={error ? true : undefined}
          className="sso-control__input"
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown className="sso-control__chevron" aria-hidden />
      </div>
    </Field>
  );
});

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Visible label. Omit in table cells and pass aria-label instead. */
  label?: ReactNode;
  indeterminate?: boolean;
}

/** 20px checkbox (ERP): white with a line border and 6px radius; checked = primary fill + white tick. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ label, indeterminate = false, className, ...rest }, ref) {
  const inner = useRef<HTMLInputElement | null>(null);
  useEffect(() => { if (inner.current) inner.current.indeterminate = indeterminate; }, [indeterminate]);
  return (
    <label className={cx('sso-check', rest.disabled && 'is-disabled', className)}>
      <span className="sso-check__box">
        <input
          ref={(el) => { inner.current = el; if (typeof ref === 'function') ref(el); else if (ref) ref.current = el; }}
          type="checkbox"
          className="sso-check__input"
          {...rest}
        />
        <svg viewBox="0 0 20 20" className="sso-check__tick" aria-hidden><path d="m5.5 10.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <svg viewBox="0 0 20 20" className="sso-check__dash" aria-hidden><path d="M6 10h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </span>
      {label}
    </label>
  );
});

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  size?: 'sm' | 'md';
}

/** ERP switch: 51×31 track (34×20 small), green when on, white knob. */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch({ label, size = 'md', className, ...rest }, ref) {
  return (
    <label className={cx('sso-switch', `sso-switch--${size}`, className)}>
      <input ref={ref} type="checkbox" role="switch" className="sso-switch__input" {...rest} />
      <span className="sso-switch__track" aria-hidden><span className="sso-switch__knob" /></span>
      {label && <span className="sso-switch__label">{label}</span>}
    </label>
  );
});
