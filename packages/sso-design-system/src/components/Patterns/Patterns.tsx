import type { ReactNode } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { cx } from '../../utils/cx';
import { Card, KeyValueList } from '../Card/Card';
import { Chip } from '../Tag/Tag';
import { StatusPill, type StatusTone } from '../StatusPill/StatusPill';

/* Patterns from the Figma SSO portal (page "new" › portal), drawn with ERP card styling. */

/* ---------------- App tile (Figma: Your applications) ---------------- */

export interface AppTileProps {
  name: string;
  description?: string;
  icon: ReactNode;
  href?: string;
  onOpen?: () => void;
  /** Products not in the tenant's plan render locked. */
  disabled?: boolean;
}

export function AppTile({ name, description = 'Open application', icon, href = '#', onOpen, disabled }: AppTileProps) {
  return (
    <a
      className={cx('sso-app-tile', disabled && 'is-disabled')}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      onClick={(e) => { if (disabled) { e.preventDefault(); return; } if (onOpen) { e.preventDefault(); onOpen(); } }}
    >
      <span className="sso-app-tile__icon" aria-hidden>{icon}</span>
      <span className="sso-app-tile__name">{name}</span>
      <span className="sso-app-tile__desc">
        {disabled ? 'Not in your plan' : description}
        {!disabled && <ArrowRight className="sso-app-tile__arrow" aria-hidden />}
      </span>
    </a>
  );
}

/* ---------------- Setup checklist (Figma: Get started) ---------------- */

export interface ChecklistStep { id: string; label: string; done?: boolean; href?: string }

export function SetupChecklist({ title = 'Get started', description, steps }: { title?: string; description?: string; steps: ChecklistStep[] }) {
  const pct = Math.round((steps.filter((s) => s.done).length / steps.length) * 100);
  return (
    <Card title={title} description={description} actions={<span className="sso-checklist__pct sso-num">{pct}%</span>}>
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

/* ---------------- Activity list (Figma: Recent subscription activity) ---------------- */

export interface ActivityItem { id: string; icon: ReactNode; title: string; detail?: string; time: string }

export function ActivityList({ title = 'Recent activity', description, items }: { title?: string; description?: string; items: ActivityItem[] }) {
  return (
    <Card title={title} description={description}>
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

/* ---------------- Plan summary (Figma: subscription per organisation) ---------------- */

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
          <span className="sso-plan__price-label">{priceLabel}</span>
          <span className="sso-plan__amount sso-num">{price}</span>
          <span className="sso-plan__renews">Renews {renews}</span>
          {action}
        </div>
      </div>
      <Card variant="inset" title="Billing and renewal">
        <KeyValueList layout="columns" items={billing} />
      </Card>
    </div>
  );
}
