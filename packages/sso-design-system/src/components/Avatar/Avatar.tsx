import { cx } from '../../utils/cx';

export interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  /** `brand` = blue gradient (default). `neutral` = grey gradient. */
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

/** Avatar + name + optional description, for table cells (ERP AvatarName). */
export function PersonCell({ name, description, size = 'sm', tone = 'brand' }: { name: string; description?: string; size?: 'sm' | 'md'; tone?: 'brand' | 'neutral' }) {
  return (
    <span className="sso-person">
      <Avatar name={name} size={size} tone={tone} />
      <span className="sso-person__text">
        <span className="sso-person__name">{name}</span>
        {description && <span className="sso-person__desc">{description}</span>}
      </span>
    </span>
  );
}
