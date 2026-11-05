import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** `raised` (default) = white card with border + soft shadow. `inset` = slate panel inside another card. */
  variant?: 'raised' | 'inset' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ variant = 'raised', padding = 'md', className, ...rest }: CardProps) {
  return <div className={cx('sso-card', `sso-card--${variant}`, `sso-card--pad-${padding}`, className)} {...rest} />;
}

export interface CardHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="sso-card__header">
      <div>
        <h3 className="sso-card__title">{title}</h3>
        {subtitle && <p className="sso-card__subtitle">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export type TileTone = 'blue' | 'green' | 'amber' | 'teal' | 'red' | 'slate';

/** Rounded square holding an icon, tinted by tone. Same colour pairs as the ERP tiles. */
export function IconTile({ icon, tone = 'blue', size = 'md' }: { icon: ReactNode; tone?: TileTone; size?: 'sm' | 'md' | 'lg' }) {
  return <span className={cx('sso-icon-tile', `sso-icon-tile--${tone}`, `sso-icon-tile--${size}`)} aria-hidden>{icon}</span>;
}

export interface StatCardProps {
  label: string;
  /** Secondary line under the label, e.g. "Registered organisations". */
  description?: string;
  value: ReactNode;
  /** Footnote under the value, e.g. "91 active · 2 inactive". */
  helper?: ReactNode;
  /** Buttons rendered at the bottom (e.g. Add tenant). */
  actions?: ReactNode;
  icon?: ReactNode;
  iconTone?: TileTone;
  href?: string;
}

/** Headline number. With an icon, the tinted tile sits on top (Dashboard). */
export function StatCard({ label, description, value, helper, actions, icon, iconTone = 'blue', href }: StatCardProps) {
  const body = (
    <>
      {icon && <IconTile icon={icon} tone={iconTone} size="lg" />}
      <div className="sso-stat__head">
        <p className="sso-stat__label">{label}</p>
        {description && <p className="sso-stat__desc">{description}</p>}
      </div>
      <p className="sso-stat__value sso-num">{value}</p>
      {helper && <p className="sso-stat__helper">{helper}</p>}
      {actions && <div className="sso-stat__actions">{actions}</div>}
    </>
  );
  return href ? (
    <a href={href} className="sso-card sso-card--raised sso-card--pad-md sso-stat sso-stat--link">{body}</a>
  ) : (
    <Card className="sso-stat">{body}</Card>
  );
}

export interface KeyValueListProps {
  items: Array<{ label: ReactNode; value: ReactNode }>;
  /** `rows` = label left / value right. `columns` = label above value, laid out horizontally. */
  layout?: 'rows' | 'columns';
}

export function KeyValueList({ items, layout = 'rows' }: KeyValueListProps) {
  return (
    <dl className={cx('sso-kv', `sso-kv--${layout}`)}>
      {items.map((it, i) => (
        <div className="sso-kv__item" key={i}>
          <dt>{it.label}</dt>
          <dd>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
