import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type IconButtonSize = 'row' | 'sm' | 'md' | 'search' | 'lg';
export type IconButtonTone = 'default' | 'muted' | 'danger';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: icon-only buttons need an accessible name. */
  'aria-label': string;
  icon: ReactNode;
  /**
   * - outline: bordered square for toolbar tools (export, refresh, the 42px search button). For filters use `FilterButton`.
   * - ghost: no border, e.g. the 30px row actions (Edit / Move up / Move down / More), close ✕
   */
  variant?: 'outline' | 'ghost';
  /**
   * Glyph colour. Figma row actions: `default` #4B5563 (Edit, Move up, Move down), `muted` #A3AED0 (More).
   * `danger` turns the hover red (inline delete). Disabled glyphs are #CBD5E1.
   */
  tone?: IconButtonTone;
  /** row 30 r6 (fields table actions) · sm 32 · md 40 · search 42 (User management search button) · lg 44. */
  size?: IconButtonSize;
  /** Pressed/active state, e.g. a toggled tool (red border, subtle fill; derived). */
  active?: boolean;
}

const sizes: Record<IconButtonSize, string> = {
  row: 'size-control-30 rounded-sm',
  sm: 'size-8 rounded-md',
  md: 'size-control-md rounded-md',
  search: 'size-control-42 rounded-md',
  lg: 'size-control-lg rounded-md',
};

const tones: Record<IconButtonTone, string> = {
  default: 'text-text-icon-strong hover:text-text-primary',
  muted: 'text-text-muted hover:text-text-secondary',
  danger: 'text-text-icon-strong hover:text-status-danger',
};

const ghostHover: Record<IconButtonTone, string> = {
  default: 'hover:bg-surface-subtle',
  muted: 'hover:bg-surface-subtle',
  danger: 'hover:bg-status-danger-subtle',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, variant = 'ghost', tone = 'default', size = 'md', active = false, type = 'button', className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-pressed={active || undefined}
      data-size={size}
      className={cn(
        'inline-flex shrink-0 items-center justify-center transition-colors duration-fast ease-standard',
        'focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:text-border-strong disabled:hover:bg-transparent',
        size === 'search' ? '[&>svg]:size-5' : '[&>svg]:size-4',
        active
          ? 'border border-brand-primary bg-brand-primary-subtle text-brand-primary'
          : variant === 'outline'
            ? cn('border border-border-default bg-surface-default hover:border-border-strong', tones[tone])
            : cn(tones[tone], ghostHover[tone]),
        sizes[size],
        className,
      )}
      {...rest}
    >
      {icon}
    </button>
  );
});
