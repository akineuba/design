import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { CaretLeftIcon } from '../icons';

export interface PageHeaderProps {
  title: ReactNode;
  /** Line under the title. Figma: "Subtext/information" (Medium 15). */
  description?: ReactNode;
  /** Page-level actions on the right. One primary at most. */
  actions?: ReactNode;
  /** Shows "← label" above the title for detail pages. */
  back?: { label: string; href?: string; onClick?: () => void };
  className?: string;
}

/** Page title block that opens every page, under the top bar. Figma: Title Bold 30 + subtext Medium 15, 10px apart. */
export function PageHeader({ title, description, actions, back, className }: PageHeaderProps) {
  return (
    <div className={cx('flex flex-wrap items-end justify-between gap-4', className)}>
      <div className="flex min-w-0 flex-col gap-2.5">
        {back && (
          <a
            href={back.href ?? '#'}
            onClick={(e) => {
              if (back.onClick) {
                e.preventDefault();
                back.onClick();
              }
            }}
            className="inline-flex w-fit items-center gap-1 rounded text-13 font-medium text-primary hover:underline ib-focus"
          >
            <span className="size-icon-sm">
              <CaretLeftIcon />
            </span>
            {back.label}
          </a>
        )}
        <h1 className="text-30 font-bold text-fg-strong">{title}</h1>
        {description && <p className="text-15 font-medium text-fg-strong">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
    </div>
  );
}
