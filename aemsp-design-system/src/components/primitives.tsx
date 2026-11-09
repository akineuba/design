import React from 'react';
import { Icon, IconName } from './Icon';

const cx = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(' ');
export { cx };

/* ---------------- Button ---------------- */
export type ButtonVariant =
  | 'primary' | 'confirm' | 'secondary' | 'outline' | 'danger' | 'danger-outline' | 'link-outline' | 'cancel' | 'ghost';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  icon?: IconName;
  iconEnd?: IconName;
  loading?: boolean;
  block?: boolean;
  iconOnly?: boolean;
}

export function Button({ variant = 'primary', size = 'md', icon, iconEnd, loading, block, iconOnly, children, className, disabled, ...rest }: ButtonProps) {
  const isz = size === 'sm' ? 16 : 18;
  return (
    <button
      type="button"
      className={cx('ae-btn', `ae-btn--${variant}`, size !== 'md' && `ae-btn--${size}`, block && 'ae-btn--block', iconOnly && 'ae-btn--icon', className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Icon name="refresh" size={isz} className="ae-spin" /> : icon && <Icon name={icon} size={isz} />}
      {iconOnly ? <span className="ae-sr">{children}</span> : children}
      {iconEnd && !loading && <Icon name={iconEnd} size={isz - 2} />}
    </button>
  );
}

export function IconButton({ icon, label, badge, muted, size = 20, ...rest }: { icon: IconName; label: string; badge?: number; muted?: boolean; size?: number } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cx('ae-icon-btn', muted && 'ae-icon-btn--muted')} aria-label={badge ? `${label} (${badge} unread)` : label} title={label} {...rest}>
      <Icon name={icon} size={size} />
      {!!badge && <span className="ae-dot-badge">{badge > 9 ? '9+' : badge}</span>}
    </button>
  );
}

/* ---------------- Avatar ---------------- */
export const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join('') || '?';

export function Avatar({ name, size = 'lg', tone = 'neutral' }: { name: string; size?: 'sm' | 'md' | 'lg' | 'xl'; tone?: 'neutral' | 'navy' | 'blue' }) {
  return <span className={cx('ae-avatar', `ae-avatar--${size}`, tone !== 'neutral' && `ae-avatar--${tone}`)} aria-hidden>{initials(name)}</span>;
}

export function AvatarLabel({ name, sub, size = 'lg', tone }: { name: string; sub?: string; size?: 'sm' | 'md' | 'lg' | 'xl'; tone?: 'neutral' | 'navy' | 'blue' }) {
  return (
    <span className="ae-avatar-row">
      <Avatar name={name} size={size} tone={tone} />
      <span className="ae-avatar-row__text">
        <span className="ae-avatar-row__name">{name}</span>
        {sub && <span className="ae-avatar-row__sub">{sub}</span>}
      </span>
    </span>
  );
}

export function AvatarStack({ names, max = 4 }: { names: string[]; max?: number }) {
  const shown = names.slice(0, max);
  return (
    <span className="ae-avatar-stack" title={names.join(', ')}>
      {shown.map((n) => <Avatar key={n} name={n} size="md" />)}
      {names.length > max && <span className="ae-avatar ae-avatar--md">+{names.length - max}</span>}
    </span>
  );
}

/* ---------------- Status pill (kept exactly as the Figma) ---------------- */
export type Status = 'success' | 'error' | 'warning' | 'neutral' | 'info';
export function StatusPill({ status = 'success', variant = 'solid', children, autoWidth }: { status?: Status; variant?: 'solid' | 'soft'; children: React.ReactNode; autoWidth?: boolean }) {
  return <span className={cx('ae-pill', `ae-pill--${variant}`, `ae-pill--${status}`, autoWidth && 'ae-pill--auto')}>{children}</span>;
}

/* ---------------- Badge / Tag ---------------- */
export function Badge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'blue' | 'red' | 'navy' }) {
  return <span className={cx('ae-badge', tone !== 'neutral' && `ae-badge--${tone}`)}>{children}</span>;
}

export function Tag({ children, variant = 'outline', icon, onRemove }: { children: React.ReactNode; variant?: 'outline' | 'filled' | 'accent'; icon?: IconName; onRemove?: () => void }) {
  return (
    <span className={cx('ae-tag', variant !== 'outline' && `ae-tag--${variant}`)}>
      {icon && <Icon name={icon} size={14} />}
      {children}
      {onRemove && (
        <button type="button" className="ae-tag__x" onClick={onRemove} aria-label={`Remove ${typeof children === 'string' ? children : ''}`}>
          <Icon name="close" size={13} />
        </button>
      )}
    </span>
  );
}

/* ---------------- Tooltip ---------------- */
export function Tooltip({ content, children, placement = 'top', open }: { content: React.ReactNode; children: React.ReactNode; placement?: 'top' | 'right'; open?: boolean }) {
  return (
    <span className={cx('ae-tip', placement === 'right' && 'ae-tip--right', open && 'ae-tip--open')}>
      {children}
      <span role="tooltip" className="ae-tip__bubble">{content}</span>
    </span>
  );
}

/* ---------------- Progress / Skeleton / Divider ---------------- */
export function ProgressBar({ value, max = 100, tone = 'default', size = 'md', label }: { value: number; max?: number; tone?: 'default' | 'success' | 'warning' | 'error'; size?: 'sm' | 'md'; label?: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cx('ae-progress', tone !== 'default' && `ae-progress--${tone}`, size === 'sm' && 'ae-progress--sm')}
      role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
      <div className="ae-progress__bar" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Skeleton({ w = '100%', h = 14, r, style }: { w?: number | string; h?: number | string; r?: number; style?: React.CSSProperties }) {
  return <span className="ae-skel" style={{ width: w, height: h, borderRadius: r, ...style }} aria-hidden />;
}

export function Divider({ label }: { label?: string }) {
  return label ? <div className="ae-divider ae-divider--label" role="separator">{label}</div> : <hr className="ae-divider" />;
}

/* ---------------- Logo ---------------- */
/** Full wordmark, or the stacked "AE / MSP" mark used in the collapsed sidebar (Figma: "collapsed logo"). */
export function Logo({ variant = 'full', inverse = true, size }: { variant?: 'full' | 'mark'; inverse?: boolean; size?: number }) {
  const color = inverse ? '#fff' : 'var(--navy-900)';
  if (variant === 'mark') {
    return <span className="ae-logo ae-logo--stacked" aria-label="AEMSP" style={{ color }}><span>AE</span><span>MSP</span></span>;
  }
  return <span className="ae-logo" style={{ color, fontSize: size ?? 33 }}>AEMSP</span>;
}

/* ---------------- Number formatting ----------------
   Rule: show full numbers below 10,000; abbreviate from 10,000 up (12.4k, 3.98M),
   and always expose the exact value on hover. */
export function formatCompact(n: number, decimals = 2): string {
  const abs = Math.abs(n);
  if (abs < 10_000) return n.toLocaleString('en-GB');
  const units: [number, string][] = [[1e9, 'B'], [1e6, 'M'], [1e3, 'k']];
  for (const [v, s] of units) if (abs >= v) return `${+(n / v).toFixed(decimals)}${s}`;
  return String(n);
}

export function formatMoney(n: number, currency = 'GBP', compact = false) {
  const loc = currency === 'USD' ? 'en-US' : 'en-GB';
  if (compact && Math.abs(n) >= 10_000) {
    const sym = new Intl.NumberFormat(loc, { style: 'currency', currency, maximumFractionDigits: 0 }).format(0).replace(/0/g, '').trim();
    return `${n < 0 ? '−' : ''}${sym}${formatCompact(Math.abs(n))}`;
  }
  return new Intl.NumberFormat(loc, { style: 'currency', currency, minimumFractionDigits: 2 }).format(n).replace('-', '−');
}

export function NumberValue({ value, compact = true, money, currency }: { value: number; compact?: boolean; money?: boolean; currency?: string }) {
  const full = money ? formatMoney(value, currency) : value.toLocaleString('en-GB');
  const shown = money ? formatMoney(value, currency, compact) : compact ? formatCompact(value) : full;
  return <span title={shown !== full ? full : undefined} style={{ fontVariantNumeric: 'tabular-nums' }}>{shown}</span>;
}

/** Negative / attention value for tables — red plus an icon, so meaning never relies on colour alone. */
export function NegativeValue({ children, label = 'Below target' }: { children: React.ReactNode; label?: string }) {
  return (
    <span className="ae-value-neg" title={label}>
      <Icon name="arrow-down" size={13} label={label} />
      {children}
    </span>
  );
}
