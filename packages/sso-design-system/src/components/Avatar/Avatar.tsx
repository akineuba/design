import { cx } from '../../utils/cx';

export interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  /** `brand` = blue initials on slate (signed-in user). `neutral` = white on slate (people in lists). */
  tone?: 'brand' | 'neutral';
  className?: string;
}

export function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join('');
}

export function Avatar({ name, src, size = 'md', tone = 'brand', className }: AvatarProps) {
  return (
    <span className={cx('sso-avatar', `sso-avatar--${size}`, `sso-avatar--${tone}`, className)} title={name}>
      {src ? <img src={src} alt="" /> : <span aria-hidden>{initials(name)}</span>}
      <span className="sso-visually-hidden">{name}</span>
    </span>
  );
}
