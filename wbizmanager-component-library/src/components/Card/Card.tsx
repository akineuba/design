import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  /** Controls in the header, aligned right. */
  actions?: ReactNode;
  /** Draws a divider between header and body (Figma: Approval & Reservation). */
  divided?: boolean;
}

/**
 * Content section. Figma: settings cards (new features, 7053:6444): white, 1px line-subtle border,
 * 10px radius, 24px padding, title Inter Semibold 16 in fg-strong.
 */
export function Card({ title, description, actions, divided, className, children, ...rest }: CardProps) {
  return (
    <section className={cx('flex min-w-0 flex-col gap-5 rounded-xl border border-line-subtle bg-surface p-6', className)} {...rest}>
      {(title || actions) && (
        <div className={cx('flex flex-wrap items-start justify-between gap-3', divided && 'border-b border-line-subtle pb-5')}>
          <div className="flex min-w-0 flex-col gap-1">
            {title && <h2 className="font-sans text-md font-semibold text-fg-strong">{title}</h2>}
            {description && <p className="font-sans text-sm text-fg-muted">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}
