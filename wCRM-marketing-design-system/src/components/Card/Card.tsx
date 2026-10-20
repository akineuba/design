import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { TrendDownIcon, TrendUpIcon } from '../../icons';
import { cn } from '../../utils/cn';
import { Avatar } from '../Avatar';

/*
 * Cards from the marketing dashboards and list headers. All share the base surface:
 * white, 1px border-default, radius-lg (12), 20px inset.
 */

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** md 20px (stat and list cards), lg 24px (section cards with charts or forms). */
  padding?: 'none' | 'md' | 'lg';
}

const paddings = { none: '', md: 'p-5', lg: 'p-6' };

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ padding = 'md', className, ...rest }, ref) {
  return <div ref={ref} className={cn('rounded-lg border border-border-default bg-surface-default', paddings[padding], className)} {...rest} />;
});

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  /** Small muted count after the title, e.g. "12 deals". */
  count?: ReactNode;
  /** Right-aligned action, e.g. a "View all" link or a Select. */
  action?: ReactNode;
  /** Heading level for the title. Defaults to h3. */
  as?: 'h2' | 'h3' | 'h4';
}

/** Section heading inside a card: title + optional count on the left, action on the right. */
export function CardHeader({ title, count, action, as: Heading = 'h3', className, ...rest }: CardHeaderProps) {
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-3', className)} {...rest}>
      <div className="flex min-w-0 items-baseline gap-1.5">
        <Heading className="text-heading-3 text-text-primary">{title}</Heading>
        {count !== undefined && <span className="text-caption text-text-muted">{count}</span>}
      </div>
      {action}
    </div>
  );
}

/* ---------------------------------------------------------------- StatCard */

export interface StatTrend {
  /** Pre-formatted change, e.g. "12%" or "+4". */
  value: string;
  direction: 'up' | 'down';
  /** Comparison period, e.g. "vs last month". */
  label?: string;
  /** Set when a drop is good news (e.g. unsubscribes). Swaps the colours, not the arrow. */
  invert?: boolean;
}

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: ReactNode;
  /** The highlighted first card of a stats row (blue → purple `gradient-feature`). */
  featured?: boolean;
  /** 28px icon tile shown before the label. */
  icon?: ReactNode;
  trend?: StatTrend;
  /** Extra content under the value, e.g. a sparkline. */
  children?: ReactNode;
}

/**
 * KPI tile from the Social posts and Email marketing headers (Figma `stats-row` / `stat-card-*`):
 * 12/600 uppercase muted label, 28/700 value, 12px gap. Lay them out in a responsive grid.
 */
export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  { label, value, featured, icon, trend, className, children, ...rest },
  ref,
) {
  const good = trend ? (trend.direction === 'up') !== Boolean(trend.invert) : false;
  return (
    <div
      ref={ref}
      className={cn(
        'flex min-w-0 flex-col gap-3 rounded-lg border p-5',
        featured ? 'border-transparent bg-feature text-text-inverse' : 'border-border-default bg-surface-default',
        className,
      )}
      {...rest}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <span
            className={cn(
              'inline-flex size-icon-tile shrink-0 items-center justify-center rounded-sm [&>svg]:size-4',
              featured ? 'bg-surface-default text-accent-navy' : 'bg-surface-canvas text-accent-navy-hover',
            )}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <p className={cn('truncate text-caption font-semibold uppercase', featured ? 'text-text-inverse' : 'text-text-muted')}>{label}</p>
      </div>
      <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
        <p className={cn('text-display tabular-nums', featured ? 'text-text-inverse' : 'text-text-primary')}>{value}</p>
        {trend && (
          <p
            className={cn(
              'mb-1 inline-flex items-center gap-1 text-caption font-semibold [&>svg]:size-3.5',
              featured ? 'text-text-inverse' : good ? 'text-status-success-text' : 'text-status-danger',
            )}
          >
            {trend.direction === 'up' ? <TrendUpIcon /> : <TrendDownIcon />}
            <span>
              <span className="sr-only">{trend.direction === 'up' ? 'Up ' : 'Down '}</span>
              {trend.value}
            </span>
            {trend.label && <span className={cn('font-normal', featured ? 'text-text-inverse' : 'text-text-secondary')}>{trend.label}</span>}
          </p>
        )}
      </div>
      {children}
    </div>
  );
});

/* ------------------------------------------------------------- SummaryCard */

export type CardTone = 'brand' | 'navy' | 'info' | 'success' | 'warning' | 'danger';

const toneTile: Record<CardTone, string> = {
  brand: 'bg-brand-primary-subtle text-brand-primary',
  navy: 'bg-accent-navy-subtle text-accent-navy',
  info: 'bg-status-info-subtle text-status-info',
  success: 'bg-status-success-subtle text-status-success-text',
  warning: 'bg-status-warning-subtle text-status-warning-text',
  danger: 'bg-status-danger-subtle text-status-danger',
};

export interface SummaryCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  tone?: CardTone;
  /** Optional line under the value, e.g. "3 added this week". */
  hint?: ReactNode;
}

/** Overview tile: 48px tinted icon circle beside a label and a 28px navy figure (Audiences, Campaigns overview). */
export const SummaryCard = forwardRef<HTMLDivElement, SummaryCardProps>(function SummaryCard(
  { label, value, icon, tone = 'brand', hint, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn('flex min-w-0 items-center gap-4 rounded-lg border border-border-default bg-surface-default p-5', className)} {...rest}>
      <span className={cn('inline-flex size-12 shrink-0 items-center justify-center rounded-full [&>svg]:size-5', toneTile[tone])} aria-hidden="true">
        {icon}
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="truncate text-body-sm text-text-secondary">{label}</p>
        <p className="text-display tabular-nums text-accent-navy-hover">{value}</p>
        {hint && <p className="text-caption text-text-muted">{hint}</p>}
      </div>
    </div>
  );
});

/* -------------------------------------------------------------- MetricCard */

export interface MetricDetail {
  label: string;
  value: ReactNode;
}

export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: ReactNode;
  /** Word after the value, e.g. "opens" or "sent". */
  qualifier?: string;
  /** Secondary figure under the value, e.g. "of 12,450 delivered". */
  subValue?: ReactNode;
  /** Label/value lines under a divider (breakdown by channel, device…). */
  details?: MetricDetail[];
}

/** Report metric with a breakdown (email performance: Opens, Clicks, Bounces). */
export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(function MetricCard(
  { label, value, qualifier, subValue, details, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn('flex min-w-0 flex-col gap-4 rounded-lg border border-border-default bg-surface-default p-5', className)} {...rest}>
      <div className="flex flex-col gap-1">
        <p className="text-overline text-text-muted">{label}</p>
        <p className="flex items-baseline gap-1.5">
          <span className="text-display tabular-nums text-text-primary">{value}</span>
          {qualifier && <span className="text-body-sm text-text-secondary">{qualifier}</span>}
        </p>
        {subValue && <p className="text-caption text-text-secondary">{subValue}</p>}
      </div>
      {children}
      {details && details.length > 0 && (
        <dl className="flex flex-col gap-2 border-t border-border-default pt-4">
          {details.map((d) => (
            <div key={d.label} className="flex items-center justify-between gap-3 text-body-sm">
              <dt className="text-text-secondary">{d.label}</dt>
              <dd className="font-semibold tabular-nums text-text-strong">{d.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
});

/* ------------------------------------------------------------- ProgressBar */

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  /** 0–100. */
  value: number;
  /** Text on the right, defaults to "{value}%". */
  valueLabel?: ReactNode;
  tone?: 'brand' | 'navy' | 'info' | 'success' | 'warning';
}

const barTone = {
  brand: 'bg-brand-primary',
  navy: 'bg-accent-navy',
  info: 'bg-status-info',
  success: 'bg-status-success',
  warning: 'bg-status-warning',
};

/** Labelled horizontal bar for breakdowns inside cards (budget spent, device share, goal progress). */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  { label, value, valueLabel, tone = 'brand', className, ...rest },
  ref,
) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...rest}>
      <div className="flex items-center justify-between gap-3 text-body-sm">
        <span className="text-text-secondary">{label}</span>
        <span className="font-semibold tabular-nums text-text-strong">{valueLabel ?? `${Math.round(pct)}%`}</span>
      </div>
      <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} className="h-2 overflow-hidden rounded-full bg-surface-sunken">
        <div className={cn('h-full rounded-full transition-[width] duration-base ease-standard', barTone[tone])} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
});

/* -------------------------------------------------------------- ModuleCard */

export interface ModuleCardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  title: string;
  /** Illustration or channel logo. */
  media: ReactNode;
  description?: string;
  selected?: boolean;
}

/**
 * Square picker card (196px, radius-xl, `border-subtle`, resting shadow) used to choose a module or
 * channel, e.g. "Email", "SMS", "Social". Renders a toggle button; group several in a grid.
 */
export const ModuleCard = forwardRef<HTMLButtonElement, ModuleCardProps>(function ModuleCard(
  { title, media, description, selected = false, type = 'button', className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-pressed={selected}
      className={cn(
        'flex size-module-card flex-col items-center justify-center gap-3 rounded-xl border bg-surface-default p-4 text-center shadow-sm',
        'transition-[border-color,box-shadow] duration-fast ease-standard focus-visible:outline-none focus-visible:shadow-focus',
        'disabled:cursor-not-allowed disabled:opacity-50',
        selected ? 'border-brand-primary' : 'border-border-subtle hover:border-border-strong hover:shadow-md',
        className,
      )}
      {...rest}
    >
      <span className="flex flex-1 items-center justify-center [&>img]:max-h-full [&>svg]:size-12" aria-hidden="true">
        {media}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className={cn('text-label', selected ? 'text-brand-primary' : 'text-text-primary')}>{title}</span>
        {description && <span className="text-caption text-text-secondary">{description}</span>}
      </span>
    </button>
  );
});

/* ------------------------------------------------------------ ActivityFeed */

export interface ActivityItem {
  id: string;
  /** Person who did it; renders an initials avatar. Ignored when `icon` is set. */
  actor?: string;
  icon?: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  /** Relative or absolute time, e.g. "2h ago". */
  time: string;
}

export interface ActivityFeedProps extends HTMLAttributes<HTMLOListElement> {
  items: ActivityItem[];
}

/** Recent-activity list inside a `Card`: avatar or icon, one-line title, meta, timestamp. */
export function ActivityFeed({ items, className, ...rest }: ActivityFeedProps) {
  return (
    <ol className={cn('flex flex-col', className)} {...rest}>
      {items.map((item, i) => (
        <li key={item.id} className={cn('flex gap-3 py-3', i > 0 && 'border-t border-border-subtle')}>
          {item.icon ? (
            <span className="inline-flex size-avatar-md shrink-0 items-center justify-center rounded-full bg-accent-navy-subtle text-accent-navy [&>svg]:size-4" aria-hidden="true">
              {item.icon}
            </span>
          ) : (
            <Avatar name={item.actor ?? ''} size="md" />
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-body-sm text-text-primary">{item.title}</p>
            {item.meta && <p className="text-caption text-text-secondary">{item.meta}</p>}
          </div>
          <time className="shrink-0 text-caption text-text-muted">{item.time}</time>
        </li>
      ))}
    </ol>
  );
}
