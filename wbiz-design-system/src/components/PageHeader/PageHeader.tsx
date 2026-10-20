import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** Primary page action(s) on the right, e.g. "+ New Requisition". */
  actions?: ReactNode;
  /** "< Back to …" link above the title (Figma: New Consumption Requisition). */
  back?: { label: string; href?: string; onClick?: () => void };
}

/**
 * Page title block. Figma: action-row (new features, 7053:5433): title Roboto Bold 28 in fg-strong,
 * description Roboto 14 in fg-muted, 6px apart, actions aligned right.
 */
export function PageHeader({ title, description, actions, back, className, ...rest }: PageHeaderProps) {
  return (
    <div className={cx('flex flex-col gap-4', className)} {...rest}>
      {back && (
        <a
          href={back.href ?? '#'}
          onClick={(e) => { if (back.onClick) { e.preventDefault(); back.onClick(); } }}
          className="self-start rounded-sm font-sans text-sm text-fg-muted hover:text-fg-strong focus-visible:outline-none focus-visible:shadow-focus"
        >
          &lt; Back to <span className="font-medium text-primary">{back.label}</span>
        </a>
      )}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1.5">
          <h1 className="font-data text-28 font-bold text-fg-strong">{title}</h1>
          {description && <p className="font-data text-sm text-fg-muted">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
