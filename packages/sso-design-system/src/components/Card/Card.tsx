import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  /** Controls in the header, aligned right. */
  actions?: ReactNode;
  /** Divider between header and body. */
  divided?: boolean;
  /** `inset` is the slate panel used inside another card (Figma billing block). */
  variant?: 'default' | 'inset';
}

/** Content section (ERP Card): white, 1px line-subtle border, 10px radius, 24px padding, title Semibold 16. */
export function Card({ title, description, actions, divided, variant = 'default', className, children, ...rest }: CardProps) {
  return (
    <section className={cx('sso-card', variant === 'inset' && 'sso-card--inset', className)} {...rest}>
      {(title || actions) && (
        <div className={cx('sso-card__header', divided && 'is-divided')}>
          <div className="sso-card__titles">
            {title && <h2 className="sso-card__title">{title}</h2>}
            {description && <p className="sso-card__desc">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export type SummaryTone = 'green' | 'blue' | 'amber' | 'teal' | 'red';

export interface SummaryCardProps {
  label: ReactNode;
  value: ReactNode;
  /** Context line under the value, e.g. "of 5 purchased seats". */
  hint?: ReactNode;
  /** Optional icon in a coloured tile on the left (ERP SummaryCard). Leave out for plain figures. */
  icon?: ReactNode;
  color?: SummaryTone;
  /** Buttons under the figure (Figma subscription summary: Add organisation, Add users). */
  actions?: ReactNode;
  className?: string;
}

/** Headline figure (ERP SummaryCard). Label Medium 14 muted, value Bold 24, hint 13. */
export function SummaryCard({ label, value, hint, icon, color = 'blue', actions, className }: SummaryCardProps) {
  return (
    <div className={cx('sso-summary', !!actions && 'has-actions', className)}>
      <div className="sso-summary__main">
        {icon && <span className={cx('sso-summary__tile', `sso-summary__tile--${color}`)} aria-hidden>{icon}</span>}
        <div className="sso-summary__text">
          <span className="sso-summary__label">{label}</span>
          <span className="sso-summary__value sso-num">{value}</span>
          {hint && <span className="sso-summary__hint">{hint}</span>}
        </div>
      </div>
      {actions && <div className="sso-summary__actions">{actions}</div>}
    </div>
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
