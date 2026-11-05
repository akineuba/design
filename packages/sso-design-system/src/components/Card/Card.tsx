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

export interface StatCardProps {
  label: string;
  value: ReactNode;
  helper?: ReactNode;
  /** Buttons rendered at the bottom (e.g. Add organisation). */
  actions?: ReactNode;
  icon?: ReactNode;
}

/** Headline number with optional action, used on Dashboard and Subscriptions. */
export function StatCard({ label, value, helper, actions, icon }: StatCardProps) {
  return (
    <Card className="sso-stat">
      <div className="sso-stat__top">
        <p className="sso-stat__label">{label}</p>
        {icon && <span className="sso-stat__icon" aria-hidden>{icon}</span>}
      </div>
      <p className="sso-stat__value sso-num">{value}</p>
      {helper && <p className="sso-stat__helper">{helper}</p>}
      {actions && <div className="sso-stat__actions">{actions}</div>}
    </Card>
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
