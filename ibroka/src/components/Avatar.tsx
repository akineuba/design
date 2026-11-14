import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Full name. Initials are taken from the first and last word. */
  name: string;
  /** Photo URL. Falls back to initials. */
  src?: string;
  /** sm 30px (tables, Figma), md 40px (sidebar user). */
  size?: 'sm' | 'md';
  /** brand = indigo initials (Figma). neutral = grey for system or unknown users. */
  tone?: 'brand' | 'neutral';
  /** Optional name and secondary line next to the avatar. */
  label?: ReactNode;
  sublabel?: ReactNode;
}

export function initials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : words[0][1] ?? '';
  return (first + last).toUpperCase();
}

/** Round initials avatar. Figma: 30px, Bold 13, white initials on indigo. */
export function Avatar({ name, src, size = 'sm', tone = 'brand', label, sublabel, className, ...rest }: AvatarProps) {
  const circle = (
    <span
      className={cx(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-bold',
        size === 'sm' ? 'size-avatar text-12' : 'size-avatar-lg text-18',
        tone === 'brand' ? 'bg-avatar-bg text-avatar-fg' : 'bg-status-neutral-bg text-status-neutral-fg',
        !label && className,
      )}
      aria-hidden={label ? true : undefined}
      role={label ? undefined : 'img'}
      aria-label={label ? undefined : name}
      {...(label ? {} : rest)}
    >
      {src ? <img src={src} alt="" className="size-full object-cover" /> : initials(name)}
    </span>
  );
  if (!label) return circle;
  return (
    <span className={cx('inline-flex min-w-0 items-center gap-2.5', className)} {...rest}>
      {circle}
      <span className="flex min-w-0 flex-col">
        <span className={cx('truncate font-medium text-fg-strong', size === 'sm' ? 'text-13' : 'text-15')}>{label}</span>
        {sublabel && <span className="truncate text-12 text-fg-muted">{sublabel}</span>}
      </span>
    </span>
  );
}
