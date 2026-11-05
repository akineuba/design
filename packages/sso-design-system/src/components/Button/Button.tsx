import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Spinner } from '../Spinner/Spinner';

/** Same five variants as the ERP Button. */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'tertiary' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * `primary`: main action. `secondary`: white with a grey border (Export, Cancel).
   * `outline`: blue border + label (side-panel Cancel, companion actions).
   * `tertiary`: text only. `destructive`: red border + label (Cancel renewal, Delete).
   */
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Square icon button; pass the icon as children and an aria-label. */
  iconOnly?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', leadingIcon, trailingIcon, iconOnly, fullWidth, loading, disabled, className, children, type = 'button', onClick, ...rest },
  ref,
) {
  const blocked = disabled || loading;
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-disabled={blocked || undefined}
      aria-busy={loading || undefined}
      onClick={blocked ? (e) => e.preventDefault() : onClick}
      className={cx('sso-btn', `sso-btn--${variant}`, `sso-btn--${size}`, iconOnly && 'sso-btn--icon', fullWidth && 'sso-btn--full', className)}
      {...rest}
    >
      {loading ? <Spinner size={16} /> : leadingIcon && <span className="sso-btn__icon" aria-hidden>{leadingIcon}</span>}
      {iconOnly ? (!loading && <span className="sso-btn__icon" aria-hidden>{children}</span>) : children}
      {!iconOnly && trailingIcon && !loading && <span className="sso-btn__icon" aria-hidden>{trailingIcon}</span>}
    </button>
  );
});
