import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: icon-only buttons need an accessible name. */
  'aria-label': string;
  icon: ReactNode;
  /**
   * - outline: bordered square, e.g. the toolbar Filter button (40 × 40)
   * - ghost: no border, e.g. row actions, close ✕, the "…" menu trigger
   */
  variant?: 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Pressed/active state, e.g. Filter while filters are applied (red border, subtle fill). */
  active?: boolean;
}

const sizes = { sm: 'size-8', md: 'size-control-md', lg: 'size-control-lg' };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, variant = 'ghost', size = 'md', active = false, type = 'button', className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-pressed={active || undefined}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-md transition-colors duration-fast ease-standard',
        'focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:text-border-strong',
        '[&>svg]:size-4',
        active
          ? 'border border-brand-primary bg-brand-primary-subtle text-brand-primary'
          : variant === 'outline'
            ? 'border border-border-default bg-surface-default text-text-secondary hover:border-border-strong hover:text-text-primary'
            : 'text-text-secondary hover:bg-surface-subtle hover:text-text-primary disabled:hover:bg-transparent',
        sizes[size],
        className,
      )}
      {...rest}
    >
      {icon}
    </button>
  );
});
