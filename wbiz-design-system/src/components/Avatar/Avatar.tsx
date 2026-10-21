import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type AvatarSize = 'sm' | 'md';
export type AvatarTone = 'blue' | 'neutral';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Full name. Initials are taken from the first and last words. */
  name: string;
  /** Photo URL. Initials show when it is missing. */
  src?: string;
  /** sm 28px for table cells, md 36px for the top bar. */
  size?: AvatarSize;
  /** blue: people in tables (customers, employees). neutral: the signed-in user in the top bar. */
  tone?: AvatarTone;
}

export const initials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return '?';
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : words[0][1] ?? '';
  return (first + last).toUpperCase();
};

/**
 * Round initials avatar. The blue gradient comes from the reference the design team supplied; the
 * neutral one is the top-bar avatar (new features, 7075:190). Inter Semibold, white.
 */
export function Avatar({ name, src, size = 'md', tone = 'blue', className, ...rest }: AvatarProps) {
  return (
    <span
      role="img"
      aria-label={name}
      className={cx(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-sans font-semibold text-fg-inverse',
        size === 'sm' ? 'size-avatar-sm text-11' : 'size-avatar text-13',
        tone === 'blue' ? 'bg-avatar' : 'bg-avatar-neutral',
        className,
      )}
      {...rest}
    >
      {src ? <img src={src} alt="" className="size-full object-cover" /> : <span aria-hidden>{initials(name)}</span>}
    </span>
  );
}

export interface AvatarLabelProps extends Omit<AvatarProps, 'children'> {
  /** Second line, e.g. an email address or job title. */
  description?: ReactNode;
}

/** Avatar with the name beside it, for the first column of people tables. */
export function AvatarLabel({ name, description, size = 'sm', className, ...avatar }: AvatarLabelProps) {
  return (
    <span className={cx('inline-flex min-w-0 items-center gap-3', className)}>
      <Avatar name={name} size={size} {...avatar} aria-hidden role={undefined} aria-label={undefined} />
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-sans text-sm font-medium text-fg-ink">{name}</span>
        {description && <span className="truncate font-sans text-xs text-fg-muted">{description}</span>}
      </span>
    </span>
  );
}
