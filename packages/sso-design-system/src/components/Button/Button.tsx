import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Spinner } from '../Spinner/Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * `primary`: the one main action on a view. `secondary`: grey fill, neutral actions
   * (e.g. Transaction History). `outline`: blue outline, companion to primary.
   * `ghost`: low-emphasis, toolbars. `danger`: destructive. `link`: inline text action.
   */
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', iconLeft, iconRight, fullWidth, loading, disabled, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx('sso-btn', `sso-btn--${variant}`, `sso-btn--${size}`, fullWidth && 'sso-btn--full', className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner size={16} /> : iconLeft}
      {children && <span className="sso-btn__label">{children}</span>}
      {iconRight}
    </button>
  );
});

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name; icon buttons have no visible text. */
  label: string;
  icon: ReactNode;
  variant?: 'soft' | 'ghost' | 'outline';
  size?: ButtonSize;
  /** Show a small red dot (e.g. unread notifications). */
  dot?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, icon, variant = 'soft', size = 'md', dot, className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      className={cx('sso-icon-btn', `sso-icon-btn--${variant}`, `sso-icon-btn--${size}`, className)}
      {...rest}
    >
      {icon}
      {dot && <span className="sso-icon-btn__dot" aria-hidden />}
    </button>
  );
});
