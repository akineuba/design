import React, { useState } from 'react';
import { Icon, IconName } from './Icon';
import { Avatar, Button, cx, formatMoney, ProgressBar, StatusPill, Tooltip } from './primitives';
import { Checkbox } from './forms';

/* =============== Usage meter (seats / licences used vs limit) =============== */
export function UsageMeter({ label, used, limit, unit = 'seats', warnAt = 0.85, compact }: { label: string; used: number; limit: number; unit?: string; warnAt?: number; compact?: boolean }) {
  const ratio = used / limit;
  const tone = ratio > 1 ? 'error' : ratio >= warnAt ? 'warning' : 'default';
  return (
    <div className="ae-meter">
      <div className="ae-meter__top">
        <span className="ae-meter__label">{label}</span>
        <span className="ae-meter__nums"><b>{used.toLocaleString('en-GB')}</b> / {limit.toLocaleString('en-GB')} {unit}</span>
      </div>
      <ProgressBar value={Math.min(used, limit)} max={limit} tone={tone} size={compact ? 'sm' : 'md'} label={`${label}: ${used} of ${limit} ${unit}`} />
      {!compact && (
        <div className="ae-meter__foot">
          <span>{Math.round(ratio * 100)}% used</span>
          {ratio > 1 ? <span className="ae-meter__over"><Icon name="error" size={13} />{(used - limit).toLocaleString('en-GB')} over limit</span>
            : ratio >= warnAt ? <span className="ae-meter__warn"><Icon name="warning" size={13} />{(limit - used).toLocaleString('en-GB')} left</span>
            : <span>{(limit - used).toLocaleString('en-GB')} available</span>}
        </div>
      )}
    </div>
  );
}

/* =============== Renewal badge =============== */
export function RenewalBadge({ days, date, autoRenew }: { days: number; date?: string; autoRenew?: boolean }) {
  const [cls, text, icon]: [string, string, IconName] =
    days < 0 ? ['expired', `Expired ${Math.abs(days)}d ago`, 'x-circle']
    : days === 0 ? ['today', 'Renews today', 'warning']
    : autoRenew ? ['auto', `Auto-renews in ${days}d`, 'refresh']
    : days <= 30 ? ['soon', `Renews in ${days}d`, 'calendar-clock']
    : ['ok', `Renews in ${days}d`, 'calendar'];
  const badge = <span className={`ae-renew ae-renew--${cls}`}><Icon name={icon} size={13} />{text}</span>;
  return date ? <Tooltip content={date}>{badge}</Tooltip> : badge;
}

/* =============== Licence key =============== */
export function LicenceKey({ value, masked = true }: { value: string; masked?: boolean }) {
  const [show, setShow] = useState(!masked);
  const [copied, setCopied] = useState(false);
  const display = show ? value : value.replace(/[A-Z0-9](?=[A-Z0-9-]{4})/gi, '•');
  return (
    <div className="ae-key">
      <Icon name="key" size={16} className="ae-key__icon" />
      <span className="ae-key__val" aria-label={show ? value : 'Licence key hidden'}>{display}</span>
      <button type="button" className="ae-kebab" aria-label={show ? 'Hide key' : 'Show key'} onClick={() => setShow(!show)}><Icon name={show ? 'eye-off' : 'eye'} size={16} /></button>
      <Tooltip content={copied ? 'Copied' : 'Copy key'} open={copied}>
        <button type="button" className="ae-kebab" aria-label="Copy key" onClick={() => { navigator.clipboard?.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1400); }}><Icon name={copied ? 'check' : 'copy'} size={16} /></button>
      </Tooltip>
    </div>
  );
}

/* =============== Subscription card =============== */
export interface Subscription {
  product: string; vendor: string; plan: string; status: 'active' | 'trial' | 'expiring' | 'suspended' | 'expired';
  seatsUsed: number; seats: number; price: number; cycle: 'month' | 'year'; renewDays: number; renewDate: string; autoRenew?: boolean; initials?: string;
}
const SUB_STATUS: Record<Subscription['status'], ['success' | 'warning' | 'error' | 'neutral' | 'info', string]> = {
  active: ['success', 'Active'], trial: ['info', 'Trial'], expiring: ['warning', 'Expiring'], suspended: ['neutral', 'Suspended'], expired: ['error', 'Expired'],
};
export function SubscriptionCard({ sub, selected, onManage }: { sub: Subscription; selected?: boolean; onManage?: () => void }) {
  const [tone, label] = SUB_STATUS[sub.status];
  return (
    <article className="ae-sub" style={selected ? { borderColor: 'var(--blue-500)', boxShadow: '0 0 0 1px var(--blue-500)' } : undefined}>
      <div className="ae-sub__head">
        <span className="ae-sub__logo">{sub.initials ?? sub.product.slice(0, 2).toUpperCase()}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="ae-sub__name">{sub.product}</div>
          <div className="ae-sub__vendor">{sub.vendor} · {sub.plan}</div>
        </div>
        <StatusPill status={tone} variant="soft" autoWidth>{label}</StatusPill>
      </div>
      <div className="ae-sub__price">{formatMoney(sub.price)} <small>/ {sub.cycle}</small></div>
      <UsageMeter label="Seats" used={sub.seatsUsed} limit={sub.seats} compact />
      <div className="ae-sub__foot">
        <RenewalBadge days={sub.renewDays} date={sub.renewDate} autoRenew={sub.autoRenew} />
        <Button size="sm" variant="link-outline" onClick={onManage}>Manage</Button>
      </div>
    </article>
  );
}

/* =============== Role badge =============== */
export type RoleKind = 'owner' | 'admin' | 'manager' | 'finance' | 'viewer' | 'custom';
const ROLE_ICON: Record<RoleKind, IconName> = { owner: 'shield', admin: 'admin', manager: 'users-group', finance: 'credit-card', viewer: 'eye', custom: 'sliders' };
export function RoleBadge({ role, children }: { role: RoleKind; children?: React.ReactNode }) {
  return <span className={`ae-role ae-role--${role}`}><Icon name={ROLE_ICON[role]} size={13} />{children ?? role[0].toUpperCase() + role.slice(1)}</span>;
}

/* =============== Permission matrix =============== */
export type Perm = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'export';
export interface PermRow { id: string; module: string; description?: string; section?: string; allowed: Perm[]; available?: Perm[]; }
const PERMS: Perm[] = ['view', 'create', 'edit', 'delete', 'approve', 'export'];
export function PermissionMatrix({ rows, readOnly }: { rows: PermRow[]; readOnly?: boolean }) {
  const [state, setState] = useState(() => Object.fromEntries(rows.map((r) => [r.id, new Set(r.allowed)])));
  const toggle = (id: string, p: Perm, on: boolean) => {
    const s = new Set(state[id]);
    if (on) { s.add(p); if (p !== 'view') s.add('view'); } else { s.delete(p); if (p === 'view') s.clear(); }
    setState({ ...state, [id]: s });
  };
  const sections = [...new Set(rows.map((r) => r.section ?? ''))];
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="ae-perm">
        <thead><tr><th>Module</th>{PERMS.map((p) => <th key={p}>{p}</th>)}<th>All</th></tr></thead>
        <tbody>
          {sections.map((sec) => (
            <React.Fragment key={sec}>
              {sec && <tr className="ae-perm__section"><td colSpan={PERMS.length + 2}>{sec}</td></tr>}
              {rows.filter((r) => (r.section ?? '') === sec).map((r) => {
                const avail = r.available ?? PERMS;
                const all = avail.every((p) => state[r.id].has(p));
                const some = avail.some((p) => state[r.id].has(p));
                return (
                  <tr key={r.id}>
                    <td><div className="ae-perm__mod">{r.module}</div>{r.description && <div className="ae-perm__desc">{r.description}</div>}</td>
                    {PERMS.map((p) => (
                      <td key={p}>{avail.includes(p)
                        ? <Checkbox ariaLabel={`${r.module}: ${p}`} checked={state[r.id].has(p)} disabled={readOnly} onChange={(c) => toggle(r.id, p, c)} />
                        : <span className="ae-muted" aria-label="Not applicable">—</span>}</td>
                    ))}
                    <td><Checkbox ariaLabel={`${r.module}: all`} checked={all} indeterminate={some && !all} disabled={readOnly}
                      onChange={(c) => setState({ ...state, [r.id]: new Set(c ? avail : []) })} /></td>
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* =============== Entity header (Organisation / OEM) =============== */
export function EntityHeader({ name, initials, type, status, meta, facts, actions }: { name: string; initials: string; type: string; status?: React.ReactNode; meta?: [IconName, string][]; facts?: [string, React.ReactNode][]; actions?: React.ReactNode }) {
  return (
    <section className="ae-entity">
      <div className="ae-entity__top">
        <span className="ae-entity__logo">{initials}</span>
        <div style={{ minWidth: 0 }}>
          <div className="ae-entity__name">{name}<span className="ae-tag ae-tag--filled">{type}</span>{status}</div>
          {meta && <div className="ae-entity__meta">{meta.map(([i, t]) => <span key={t}><Icon name={i} size={14} />{t}</span>)}</div>}
        </div>
        {actions && <div className="ae-entity__actions">{actions}</div>}
      </div>
      {facts && <div className="ae-entity__facts">{facts.map(([k, v]) => <div key={k} className="ae-kv"><span className="ae-kv__k">{k}</span><span className="ae-kv__v" style={{ fontSize: 15 }}>{v}</span></div>)}</div>}
    </section>
  );
}

/* =============== Approval request item =============== */
export interface ApprovalRequest { id: string; title: string; org: string; requester: string; type: 'New subscription' | 'Seat increase' | 'Plan upgrade' | 'Cancellation' | 'Renewal'; amount?: number; submitted: string; priority?: 'high' | 'normal'; status?: 'pending' | 'approved' | 'rejected'; }
const TYPE_ICON: Record<ApprovalRequest['type'], IconName> = { 'New subscription': 'package', 'Seat increase': 'user-plus', 'Plan upgrade': 'layers', Cancellation: 'x-circle', Renewal: 'refresh' };
export function ApprovalItem({ req, selected, onSelect, onApprove, onReject, showActions = true }: { req: ApprovalRequest; selected?: boolean; onSelect?: () => void; onApprove?: () => void; onReject?: () => void; showActions?: boolean }) {
  return (
    <article className={cx('ae-approval', selected && 'ae-approval--selected')} onClick={onSelect} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onSelect?.()} aria-selected={selected}>
      <span className="ae-stat__tile ae-tile--indigo" style={{ width: 38, height: 38, margin: 0 }}><Icon name={TYPE_ICON[req.type]} size={18} /></span>
      <div className="ae-approval__body">
        <div className="ae-approval__title">{req.title}</div>
        <div className="ae-approval__meta">
          <span><Icon name="building" size={13} />{req.org}</span>
          <span><Icon name="user" size={13} />{req.requester}</span>
          <span><Icon name="clock" size={13} />{req.submitted}</span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span className="ae-tag ae-tag--filled" style={{ height: 22 }}>{req.type}</span>
          {req.priority === 'high' && <span className="ae-renew ae-renew--today"><Icon name="warning" size={12} />High priority</span>}
        </div>
      </div>
      <div className="ae-approval__right">
        {req.amount !== undefined && <span className="ae-approval__amount">{formatMoney(req.amount)}</span>}
        {req.status && req.status !== 'pending' ? (
          <StatusPill status={req.status === 'approved' ? 'success' : 'error'} variant="soft" autoWidth>{req.status === 'approved' ? 'Approved' : 'Rejected'}</StatusPill>
        ) : showActions && (
          <div className="ae-approval__actions" onClick={(e) => e.stopPropagation()}>
            <Button size="sm" variant="danger-outline" onClick={onReject}>Reject</Button>
            <Button size="sm" variant="primary" icon="check" onClick={onApprove}>Approve</Button>
          </div>
        )}
      </div>
    </article>
  );
}

/* =============== Approval trail (timeline) =============== */
export interface TrailStep { state: 'submitted' | 'approved' | 'rejected' | 'current' | 'pending'; title: string; who?: string; when?: string; note?: string; }
const TRAIL_ICON: Record<TrailStep['state'], IconName> = { submitted: 'send', approved: 'check', rejected: 'close', current: 'clock', pending: 'circle-dashed' };
export function ApprovalTrail({ steps }: { steps: TrailStep[] }) {
  return (
    <ol className="ae-timeline">
      {steps.map((s, i) => (
        <li key={i} className="ae-tl">
          <span className={`ae-tl__dot ae-tl__dot--${s.state}`}><Icon name={TRAIL_ICON[s.state]} size={15} /></span>
          <div style={{ flex: 1, minWidth: 0, paddingTop: 5 }}>
            <div className="ae-tl__head">{s.title}</div>
            {(s.who || s.when) && <div className="ae-tl__meta">{[s.who, s.when].filter(Boolean).join(' · ')}</div>}
            {s.note && <div className="ae-tl__note">“{s.note}”</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* =============== Stepper (multi-step forms) =============== */
export function Stepper({ steps, current, vertical, errorAt }: { steps: { label: string; hint?: string }[]; current: number; vertical?: boolean; errorAt?: number }) {
  return (
    <ol className={cx('ae-stepper', vertical && 'ae-stepper--vertical')} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {steps.map((s, i) => {
        const state = errorAt === i ? 'error' : i < current ? 'done' : i === current ? 'current' : 'todo';
        return (
          <li key={s.label} className={cx('ae-step', `ae-step--${state}`)} aria-current={i === current ? 'step' : undefined}>
            <span className="ae-step__dot">{state === 'done' ? <Icon name="check" size={15} /> : state === 'error' ? <Icon name="close" size={14} /> : i + 1}</span>
            <span className="ae-step__text" style={vertical ? undefined : { display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span className="ae-step__label">{s.label}</span>
              {s.hint && <span className="ae-step__hint">{s.hint}</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/* =============== Key-value list =============== */
export function DescriptionList({ items }: { items: [string, React.ReactNode][] }) {
  return <dl className="ae-dl">{items.map(([k, v]) => <React.Fragment key={k}><dt>{k}</dt><dd>{v}</dd></React.Fragment>)}</dl>;
}

export function MemberRow({ name, email, role, status }: { name: string; email: string; role: RoleKind; status: 'active' | 'invited' | 'suspended' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}>
      <Avatar name={name} />
      <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 600, color: 'var(--text-ink)' }}>{name}</div><div className="ae-muted" style={{ fontSize: 12 }}>{email}</div></div>
      <RoleBadge role={role} />
      <StatusPill status={status === 'active' ? 'success' : status === 'invited' ? 'warning' : 'neutral'} variant="soft">{status}</StatusPill>
    </div>
  );
}

/* =============== Activity feed (budget & overage events) =============== */
export interface ActivityEvent { id: string; title: string; date: string; body: string; kind: 'budget' | 'overage'; org?: string; unread?: boolean; }
export function ActivityEventItem({ ev, onRead }: { ev: ActivityEvent; onRead?: () => void }) {
  return (
    <article className={cx('ae-event', ev.unread && 'ae-event--unread')} tabIndex={0}>
      <div className="ae-event__head">
        {ev.unread && <span className="ae-event__dot" aria-label="Unread" />}
        <span className="ae-event__title">{ev.title}</span>
        <time className="ae-event__date">{ev.date}</time>
        <Tooltip content={ev.unread ? 'Mark as read' : 'Read'}>
          <button type="button" className="ae-kebab" aria-label={`Mark “${ev.title}” as read`} onClick={onRead} disabled={!ev.unread}><Icon name="check" size={16} /></button>
        </Tooltip>
      </div>
      <p className="ae-event__body">{ev.body}</p>
      <div className="ae-event__tags">
        {ev.kind === 'budget'
          ? <span className="ae-event__tag ae-event__tag--budget"><Icon name="warning" size={13} />Budget</span>
          : <span className="ae-event__tag ae-event__tag--overage"><Icon name="zap" size={13} />Overage</span>}
        {ev.org && <span className="ae-tag" style={{ height: 24 }}>{ev.org}</span>}
      </div>
    </article>
  );
}

/** `totals` shows server-side counts when only the first page of events is loaded. */
export function ActivityFeed({ events, maxHeight = 520, totals }: { events: ActivityEvent[]; maxHeight?: number; totals?: { all?: number; unread?: number; budgets?: number; overages?: number } }) {
  const [list, setList] = useState(events);
  const [tab, setTab] = useState('all');
  const unread = list.filter((e) => e.unread).length;
  const budgets = list.filter((e) => e.kind === 'budget').length;
  const overages = list.filter((e) => e.kind === 'overage').length;
  const shown = list.filter((e) => tab === 'all' || (tab === 'unread' ? e.unread : e.kind === (tab === 'budgets' ? 'budget' : 'overage')));
  return (
    <div className="ae-feed">
      <div className="ae-feed__bar">
        <div role="tablist" className="ae-feed__tabs">
          {[['all', 'All events', totals?.all ?? list.length], ['unread', 'Unread', unread === 0 ? 0 : totals?.unread ?? unread], ['budgets', 'Budgets', totals?.budgets ?? budgets], ['overages', 'Overages', totals?.overages ?? (overages || undefined)]].map(([id, l, n]) => (
            <button key={id as string} type="button" role="tab" aria-selected={tab === id} className="ae-feed__tab" onClick={() => setTab(id as string)}>{l}{n !== undefined && <span>{n}</span>}</button>
          ))}
        </div>
        <button type="button" className="ae-linkbtn" disabled={!unread} onClick={() => setList(list.map((e) => ({ ...e, unread: false })))} style={{ display: 'inline-flex', gap: 6, alignItems: 'center', opacity: unread ? 1 : .5 }}><Icon name="check" size={15} />Mark all as read</button>
      </div>
      <div className="ae-feed__list" style={{ maxHeight }}>
        {shown.length ? shown.map((ev) => <ActivityEventItem key={ev.id} ev={ev} onRead={() => setList(list.map((x) => (x.id === ev.id ? { ...x, unread: false } : x)))} />)
          : <div className="ae-empty"><span className="ae-empty__art"><Icon name="bell-off" size={26} /></span><p className="ae-empty__title">No events here</p><p className="ae-empty__text">Budget warnings and prepaid overages will appear here.</p></div>}
      </div>
    </div>
  );
}
