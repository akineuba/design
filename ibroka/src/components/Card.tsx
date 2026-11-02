import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Card title, Instrument Sans Bold 18. Leave out for a plain white panel. */
  title?: ReactNode;
  /** Controls next to the title, such as filter dropdowns (Figma list screen). */
  titleAddon?: ReactNode;
  /** Buttons on the right of the header. One primary at most (UI rule 11). */
  actions?: ReactNode;
  /** `xl` (20px) for dashboard cards and charts; `lg` (10px) for cards that hold a table. */
  radius?: 'lg' | 'xl';
  /** Remove body padding, for tables and lists that run edge to edge. */
  flush?: boolean;
  footer?: ReactNode;
}

/** White container with an optional header row and divider. Figma: dashboard and list cards. */
export function Card({ title, titleAddon, actions, radius = 'xl', flush = false, footer, className, children, ...rest }: CardProps) {
  const hasHeader = title || actions || titleAddon;
  return (
    <section
      className={cx(
        'flex min-w-0 flex-col overflow-hidden bg-surface shadow-card',
        radius === 'xl' ? 'rounded-xl' : 'rounded-lg',
        className,
      )}
      {...rest}
    >
      {hasHeader && (
        <header className="flex min-h-[74px] flex-wrap items-center justify-between gap-x-7.5 gap-y-2.5 border-b border-line px-4.5 py-4">
          <div className="flex min-w-0 flex-wrap items-center gap-x-7.5 gap-y-2.5">
            {title && <h2 className="truncate text-18 font-bold text-fg-strong">{title}</h2>}
            {titleAddon}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
        </header>
      )}
      <div className={cx('flex min-h-0 flex-1 flex-col', !flush && 'p-4.5')}>{children}</div>
      {footer && <footer className="border-t border-line-row px-4.5 py-3">{footer}</footer>}
    </section>
  );
}
