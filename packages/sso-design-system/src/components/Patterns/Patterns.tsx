import type { ReactNode } from 'react';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { cx } from '../../utils/cx';
import { Card, CardHeader, IconTile, KeyValueList, type TileTone } from '../Card/Card';
import { Chip } from '../Tag/Tag';
import { StatusPill, type StatusTone } from '../StatusPill/StatusPill';

/* ---------------- App tile ---------------- */

export interface AppTileProps {
  name: string;
  description?: string;
  icon: ReactNode;
  href?: string;
  onOpen?: () => void;
  /** Products not in the tenant's plan render locked. */
  disabled?: boolean;
}

/** Launches a wBiz product through SSO. */
export function AppTile({ name, description = 'Open application', icon, href = '#', onOpen, disabled }: AppTileProps) {
  return (
    <a
      className={cx('sso-app-tile', disabled && 'is-disabled')}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      onClick={(e) => { if (disabled) { e.preventDefault(); return; } onOpen?.(); }}
    >
      <span className="sso-app-tile__icon" aria-hidden>{icon}</span>
      <span className="sso-app-tile__name">{name}</span>
      <span className="sso-app-tile__desc">{disabled ? 'Not in your plan' : description}</span>
      <ArrowRight className="sso-app-tile__arrow" aria-hidden />
    </a>
  );
}

/* ---------------- Setup checklist ---------------- */

export interface ChecklistStep { id: string; label: string; done?: boolean; href?: string }

export function SetupChecklist({ title = 'Get started', subtitle, steps }: { title?: string; subtitle?: string; steps: ChecklistStep[] }) {
  const done = steps.filter((s) => s.done).length;
  const pct = Math.round((done / steps.length) * 100);
  return (
    <Card padding="lg">
      <CardHeader title={title} subtitle={subtitle} action={<span className="sso-checklist__pct sso-num">{pct}%</span>} />
      <div className="sso-checklist__bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Setup progress">
        <span style={{ width: `${pct}%` }} />
      </div>
      <ol className="sso-checklist">
        {steps.map((s, i) => (
          <li key={s.id}>
            <a href={s.href ?? '#'} className={cx('sso-checklist__item', s.done && 'is-done')}>
              <span className="sso-checklist__marker" aria-hidden>{s.done ? <Check strokeWidth={3} /> : i + 1}</span>
              <span className="sso-checklist__label">{s.label}{s.done && <span className="sso-visually-hidden"> (done)</span>}</span>
              <ArrowRight className="sso-checklist__arrow" aria-hidden />
            </a>
          </li>
        ))}
      </ol>
    </Card>
  );
}

/* ---------------- Activity list ---------------- */

export interface ActivityItem { id: string; icon: ReactNode; title: string; detail?: string; time: string }

export function ActivityList({ title = 'Recent activity', subtitle, items }: { title?: string; subtitle?: string; items: ActivityItem[] }) {
  return (
    <Card padding="lg">
      <CardHeader title={title} subtitle={subtitle} />
      <ul className="sso-activity">
        {items.map((it) => (
          <li key={it.id} className="sso-activity__item">
            <span className="sso-activity__icon" aria-hidden>{it.icon}</span>
            <span className="sso-activity__text">
              <span className="sso-activity__title">{it.title}</span>
              {it.detail && <span className="sso-activity__detail">{it.detail}</span>}
            </span>
            <time className="sso-activity__time">{it.time}</time>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ---------------- Plan summary (inside an org Accordion) ---------------- */

export interface PlanSummaryProps {
  status?: { label: string; tone: StatusTone };
  planName: string;
  planDescription?: string;
  price: string;
  priceLabel?: string;
  renews: string;
  features: string[];
  billing: Array<{ label: string; value: ReactNode }>;
  action?: ReactNode;
}

export function PlanSummary({ status, planName, planDescription, price, priceLabel = 'Annual subscription', renews, features, billing, action }: PlanSummaryProps) {
  return (
    <div className="sso-plan">
      <div className="sso-plan__top">
        <div className="sso-plan__info">
          {status && <StatusPill tone={status.tone}>{status.label}</StatusPill>}
          <p className="sso-plan__name">{planName}</p>
          {planDescription && <p className="sso-plan__desc">{planDescription}</p>}
          <ul className="sso-plan__features" aria-label="Included features">
            {features.map((f) => <li key={f}><Chip kind="feature">{f}</Chip></li>)}
          </ul>
        </div>
        <div className="sso-plan__price">
          <span className="sso-section-label">{priceLabel}</span>
          <span className="sso-plan__amount sso-num">{price}</span>
          <span className="sso-plan__renews">Renews {renews}</span>
          {action}
        </div>
      </div>
      <Card variant="inset" padding="md">
        <p className="sso-plan__billing-title">Billing and renewal</p>
        <KeyValueList layout="columns" items={billing} />
      </Card>
    </div>
  );
}

/* ---------------- Empty state ---------------- */

export function EmptyState({ icon, title, description, action }: { icon?: ReactNode; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="sso-empty">
      {icon && <span className="sso-empty__icon" aria-hidden>{icon}</span>}
      <p className="sso-empty__title">{title}</p>
      {description && <p className="sso-empty__desc">{description}</p>}
      {action}
    </div>
  );
}

/* ---------------- Link tile ---------------- */

export interface LinkTileProps {
  title: string;
  description?: string;
  icon: ReactNode;
  tone?: TileTone;
  href?: string;
  onClick?: () => void;
}

/** Icon + title + one-line description that navigates somewhere. Quick links and tool hubs. */
export function LinkTile({ title, description, icon, tone = 'blue', href = '#', onClick }: LinkTileProps) {
  return (
    <a className={cx('sso-link-tile', !description && 'sso-link-tile--compact')} href={href} onClick={(e) => { if (onClick) { e.preventDefault(); onClick(); } }}>
      <IconTile icon={icon} tone={tone} />
      <span className="sso-link-tile__text">
        <span className="sso-link-tile__title">{title}</span>
        {description && <span className="sso-link-tile__desc">{description}</span>}
      </span>
      <ChevronRight className="sso-link-tile__chevron" aria-hidden />
    </a>
  );
}

/** Section heading + optional description above a group of tiles or cards. */
export function SectionHeading({ title, description, action, label }: { title?: string; description?: string; action?: ReactNode; label?: string }) {
  return (
    <div className="sso-section-heading">
      <div>
        {label && <p className="sso-section-label" style={{ margin: 0 }}>{label}</p>}
        {title && <h2 className="sso-section-heading__title">{title}</h2>}
        {description && <p className="sso-section-heading__desc">{description}</p>}
      </div>
      {action}
    </div>
  );
}

/* ---------------- Row actions ---------------- */

export interface RowAction { label: string; icon?: ReactNode; onClick?: () => void; href?: string }

/** Inline, small text buttons for the 2–3 most used row actions. Put the rest in an ActionMenu. */
export function RowActions({ actions, children }: { actions: RowAction[]; children?: ReactNode }) {
  return (
    <div className="sso-row-actions">
      {actions.map((a) => (
        <button key={a.label} type="button" className="sso-row-actions__btn" onClick={a.onClick}>
          {a.icon}
          {a.label}
        </button>
      ))}
      {children}
    </div>
  );
}
