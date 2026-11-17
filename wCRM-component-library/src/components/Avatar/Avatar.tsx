import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Full name; initials are derived from the first two words. */
  name: string;
  size?: 'sm' | 'md' | 'lg';
  /** Optional photo. Falls back to initials when absent. */
  src?: string;
}

const sizes = { sm: 'size-avatar-sm text-caption', md: 'size-avatar-md text-caption', lg: 'size-avatar-lg text-label-sm' };

export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

/** Initials avatar from the contact and owner columns (28px circle, muted outline). */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar({ name, size = 'sm', src, className, ...rest }, ref) {
  return (
    <span
      ref={ref}
      role="img"
      aria-label={name}
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-text-muted bg-surface-default font-semibold text-text-secondary',
        sizes[size],
        className,
      )}
      {...rest}
    >
      {src ? <img src={src} alt="" className="size-full object-cover" /> : <span aria-hidden="true">{initials(name)}</span>}
    </span>
  );
});
