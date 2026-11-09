import React, { useEffect, useId, useState } from 'react';
import { Icon, IconName } from './Icon';
import { Avatar, Badge, Button, cx, IconButton, Tooltip } from './primitives';
import { usePopover } from './forms';

/* =============== Sidebar =============== */
export interface NavChild { id: string; label: string; count?: number; }
export interface NavItem { id: string; label: string; icon: IconName; children?: NavChild[]; count?: number; }

export const AEMSP_NAV: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'organisations', label: 'Organisations', icon: 'hierarchy' },
  { id: 'partner', label: 'Partner Centre', icon: 'handshake', children: [
    { id: 'clients', label: 'Clients' }, { id: 'policies', label: 'Policies' }, { id: 'approvals', label: 'Approval Management' }] },
  { id: 'reports', label: 'Reports', icon: 'statistics' },
  { id: 'insights', label: 'Insight Metrics', icon: 'pie-chart' },
  { id: 'users', label: 'Users & Access', icon: 'users-group', children: [
    { id: 'users-list', label: 'Users' }, { id: 'roles', label: 'Roles' }, { id: 'audit', label: 'Audit Log' }] },
  { id: 'settings', label: 'Settings', icon: 'settings', children: [
    { id: 'settings-general', label: 'General' }, { id: 'settings-billing', label: 'Billing' }, { id: 'settings-integrations', label: 'Integrations' }] },
  { id: 'help', label: 'Help & Support', icon: 'help' },
];

export interface SidebarProps {
  items?: NavItem[];
  active?: string;
  defaultOpen?: string[];
  collapsed?: boolean;
  theme?: 'light' | 'dark';
  onNavigate?: (id: string) => void;
  onToggle?: (collapsed: boolean) => void;
  onLogout?: () => void;
}

export function Sidebar({ items = AEMSP_NAV, active = 'dashboard', defaultOpen, collapsed: c0 = false, theme, onNavigate, onToggle, onLogout }: SidebarProps) {
  const parentOf = (id: string) => items.find((i) => i.children?.some((c) => c.id === id))?.id;
  const [open, setOpen] = useState<string[]>(defaultOpen ?? [parentOf(active) ?? ''].filter(Boolean));
  const [cur, setCur] = useState(active);
  const [collapsed, setCollapsed] = useState(c0);
  useEffect(() => setCur(active), [active]);
  useEffect(() => setCollapsed(c0), [c0]);
  const go = (id: string) => { setCur(id); onNavigate?.(id); };
  const toggleCollapse = () => { setCollapsed(!collapsed); onToggle?.(!collapsed); };

  return (
    <nav className={cx('ae-sidebar', collapsed && 'ae-sidebar--collapsed', theme === 'dark' && 'ae-sidebar--dark')} aria-label="Main">
      <div className="ae-sidebar__top">
        <div className="ae-sidebar__brand">
          {collapsed ? <span className="ae-logo ae-logo--stacked" aria-label="AEMSP"><span>AE</span><span>MSP</span></span> : <span className="ae-logo">AEMSP</span>}
          <button type="button" className="ae-sidebar__toggle" onClick={toggleCollapse} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} aria-expanded={!collapsed}>
            <Icon name={collapsed ? 'sidebar-expand' : 'sidebar-collapse'} size={18} />
          </button>
        </div>
        <div className="ae-nav">
          {items.map((it) => {
            const hasKids = !!it.children?.length;
            const isOpen = open.includes(it.id);
            const childActive = it.children?.some((c) => c.id === cur);
            const isActive = cur === it.id || (collapsed && childActive);
            const kidsCount = it.children?.reduce((a, c) => a + (c.count ?? 0), 0) ?? 0;
            const btn = (
              <button type="button" className={cx('ae-nav__item', isActive && 'ae-nav__item--active')} aria-current={cur === it.id ? 'page' : undefined}
                aria-expanded={hasKids && !collapsed ? isOpen : undefined}
                onClick={() => (hasKids && !collapsed ? setOpen(isOpen ? open.filter((x) => x !== it.id) : [...open, it.id]) : go(hasKids ? it.children![0].id : it.id))}>
                <Icon name={it.icon} size={18} />
                {!collapsed && <span className="ae-nav__label">{it.label}</span>}
                {!collapsed && hasKids && <Icon name="caret-down" size={18} className={cx('ae-nav__caret', isOpen && 'ae-nav__caret--open')} />}
                {collapsed && kidsCount > 0 && <span className="ae-nav__dot" aria-label={`${kidsCount} pending`} />}
              </button>
            );
            return (
              <div key={it.id} className="ae-nav__group">
                {collapsed ? <Tooltip content={it.label} placement="right">{btn}</Tooltip> : btn}
                {hasKids && isOpen && !collapsed && (
                  <div className="ae-nav__sub">
                    {it.children!.map((c) => (
                      <button key={c.id} type="button" className={cx('ae-nav__subitem', cur === c.id && 'ae-nav__subitem--active')} aria-current={cur === c.id ? 'page' : undefined} onClick={() => go(c.id)}>
                        <Icon name="dot-circle" size={18} />
                        <span className="ae-nav__label">{c.label}</span>
                        {!!c.count && <span className="ae-nav__count"><Badge tone="blue">{c.count}</Badge></span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {collapsed ? (
        <Tooltip content="Log Out" placement="right">
          <button type="button" className="ae-nav__item" onClick={onLogout}><Icon name="log-out" size={18} /><span className="ae-sr">Log Out</span></button>
        </Tooltip>
      ) : (
        <button type="button" className="ae-nav__item" onClick={onLogout}><Icon name="log-out" size={18} /><span className="ae-nav__label">Log Out</span></button>
      )}
    </nav>
  );
}

/* =============== Breadcrumb =============== */
export function Breadcrumb({ items }: { items: string[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="ae-crumbs">
        {items.map((it, i) => i < items.length - 1
          ? <li key={i}><button type="button" className="ae-crumbs__link">{i > 0 ? `/ ${it}` : it}</button></li>
          : <li key={i} className="ae-crumbs__current" aria-current="page">/ {it}</li>)}
      </ol>
    </nav>
  );
}

/* =============== Theme toggle =============== */
export function useTheme(): ['light' | 'dark', (t: 'light' | 'dark') => void] {
  const read = () => (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  const [t, setT] = useState<'light' | 'dark'>(read);
  useEffect(() => {
    const obs = new MutationObserver(() => setT(read()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  return [t, (n) => { document.documentElement.dataset.theme = n; setT(n); }];
}

export function ThemeToggle() {
  const [t, set] = useTheme();
  return <IconButton icon={t === 'dark' ? 'sun' : 'moon'} label={t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} onClick={() => set(t === 'dark' ? 'light' : 'dark')} size={22} />;
}

/* =============== Notifications =============== */
export interface Notification { id: string; title: string; body: string; time: string; unread?: boolean; icon: IconName; tone: 'blue' | 'green' | 'amber' | 'purple' | 'indigo' | 'gray'; group: 'Today' | 'Earlier'; }
export const SAMPLE_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'Approval needed', body: 'Northwind Motors requested 120 more seats on Fleet Diagnostics Pro.', time: '12 min ago', unread: true, icon: 'check-badge', tone: 'blue', group: 'Today' },
  { id: '2', title: 'Licences running low', body: 'Apex OEM has used 94% of its Telematics Suite seats.', time: '1 hr ago', unread: true, icon: 'warning', tone: 'amber', group: 'Today' },
  { id: '3', title: 'Subscription renewed', body: 'Kestrel Autos renewed Service Manuals Plus for 12 months.', time: '3 hr ago', unread: true, icon: 'refresh', tone: 'green', group: 'Today' },
  { id: '4', title: 'New organisation added', body: 'Harbor Fleet Ltd was added by Grace Obi.', time: 'Yesterday', icon: 'building', tone: 'indigo', group: 'Earlier' },
  { id: '5', title: 'Role updated', body: 'Finance Analyst can now export invoices.', time: '2 days ago', icon: 'shield', tone: 'purple', group: 'Earlier' },
];

export function NotificationsPanel({ items = SAMPLE_NOTIFICATIONS, inline }: { items?: Notification[]; inline?: boolean }) {
  const [list, setList] = useState(items);
  const [tab, setTab] = useState<'all' | 'unread'>('all');
  const shown = tab === 'all' ? list : list.filter((n) => n.unread);
  const unread = list.filter((n) => n.unread).length;
  return (
    <div className={cx('ae-pop ae-pop--right ae-notif')} style={inline ? { position: 'static', animation: 'none' } : undefined} role="dialog" aria-label="Notifications">
      <div className="ae-notif__head">
        <span className="ae-h3">Notifications</span>
        {unread > 0 && <button type="button" className="ae-linkbtn" onClick={() => setList(list.map((n) => ({ ...n, unread: false })))}>Mark all as read</button>}
      </div>
      <div className="ae-notif__tabs"><Tabs size="sm" items={[{ id: 'all', label: 'All' }, { id: 'unread', label: 'Unread', count: unread }]} value={tab} onChange={(v) => setTab(v as any)} /></div>
      <div className="ae-notif__list">
        {!shown.length ? (
          <div className="ae-empty"><span className="ae-empty__art"><Icon name="bell-off" size={26} /></span><p className="ae-empty__title">You’re all caught up</p><p className="ae-empty__text">New approvals, renewals and licence alerts will show up here.</p></div>
        ) : (['Today', 'Earlier'] as const).map((g) => {
          const rows = shown.filter((n) => n.group === g);
          if (!rows.length) return null;
          return (
            <div key={g}>
              <div className="ae-notif__group">{g}</div>
              {rows.map((n) => (
                <div key={n.id} className={cx('ae-notif__item', n.unread && 'ae-notif__item--unread')} onClick={() => setList(list.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))}>
                  <span className={`ae-notif__icon ae-tile--${n.tone}`}><Icon name={n.icon} size={17} /></span>
                  <div><div className="ae-notif__title">{n.title}</div><div className="ae-notif__body">{n.body}</div><div className="ae-notif__time">{n.time}</div></div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="ae-notif__foot"><button type="button" className="ae-linkbtn">View all activity</button><button type="button" className="ae-linkbtn" style={{ color: 'var(--text-muted)' }}>Settings</button></div>
    </div>
  );
}

/* =============== Help menu =============== */
export function HelpMenu({ inline }: { inline?: boolean }) {
  const rows: [IconName, string, string?][] = [['book', 'Documentation'], ['zap', 'What’s new', 'v2.4'], ['keyboard', 'Keyboard shortcuts', '?'], ['message', 'Contact support'], ['activity', 'System status']];
  return (
    <div className="ae-pop ae-pop--right" style={inline ? { position: 'static', animation: 'none' } : { minWidth: 240 }} role="menu" aria-label="Help">
      <div className="ae-menu-label">Help & resources</div>
      {rows.map(([i, l, end]) => (
        <button key={l} type="button" role="menuitem" className="ae-menu-item"><Icon name={i} size={17} />{l}{end && <span className="ae-menu-item__end">{end}</span>}</button>
      ))}
    </div>
  );
}

/* =============== User menu =============== */
export function UserMenu({ name = 'Admin', email = 'email@example.com', role = 'Super Admin', inline, onLogout }: { name?: string; email?: string; role?: string; inline?: boolean; onLogout?: () => void }) {
  const [t, setT] = useTheme();
  return (
    <div className="ae-pop ae-pop--right ae-usermenu" style={inline ? { position: 'static', animation: 'none' } : undefined} role="menu" aria-label="Account">
      <div className="ae-usermenu__head">
        <Avatar name={name === 'Admin' ? 'A E' : name} size="xl" />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 600, color: 'var(--text-ink)', fontSize: 14 }}>{name}</div>
          <div className="ae-muted" style={{ fontSize: 12 }}>{email}</div>
          <div className="ae-usermenu__role"><span className="ae-role ae-role--owner">{role}</span></div>
        </div>
      </div>
      <div className="ae-menu-sep" />
      <button type="button" role="menuitem" className="ae-menu-item"><Icon name="user" size={17} />My profile</button>
      <button type="button" role="menuitem" className="ae-menu-item"><Icon name="settings" size={17} />Account settings</button>
      <button type="button" role="menuitem" className="ae-menu-item"><Icon name="building" size={17} />Switch organisation<span className="ae-menu-item__end"><Icon name="chevron-right" size={14} /></span></button>
      <button type="button" role="menuitemcheckbox" aria-checked={t === 'dark'} className="ae-menu-item" onClick={() => setT(t === 'dark' ? 'light' : 'dark')}>
        <Icon name="moon" size={17} />Dark mode<span className="ae-menu-item__end"><span className={cx('ae-switch ae-switch--sm', t === 'dark' && 'ae-switch--on')} /></span>
      </button>
      <div className="ae-menu-sep" />
      <button type="button" role="menuitem" className="ae-menu-item ae-menu-item--danger" onClick={onLogout}><Icon name="log-out" size={17} />Log Out</button>
    </div>
  );
}

/* =============== Top bar =============== */
export interface TopBarProps { breadcrumb?: string[]; title?: string; user?: { name: string; email: string; role?: string }; notifications?: number; open?: 'notifications' | 'user' | 'help' | null; }
export function TopBar({ breadcrumb = ['Overview', 'Dashboard'], title = 'Page Title', user = { name: 'Admin', email: 'email@example.com', role: 'Super Admin' }, notifications = 3, open: open0 = null }: TopBarProps) {
  const [open, setOpen] = useState(open0);
  const help = usePopover(); const notif = usePopover(); const um = usePopover();
  useEffect(() => { help.setOpen(open === 'help'); notif.setOpen(open === 'notifications'); um.setOpen(open === 'user'); }, [open]);
  return (
    <header className="ae-topbar">
      <div className="ae-topbar__titles">
        <Breadcrumb items={breadcrumb} />
        <h1 className="ae-topbar__title">{title}</h1>
      </div>
      <div className="ae-topbar__right">
        <div className="ae-topbar__icons">
          <div className="ae-pop-anchor" ref={help.ref}>
            <IconButton icon="help" label="Help" aria-expanded={help.open} onClick={() => { help.setOpen(!help.open); setOpen(null); }} />
            {help.open && <HelpMenu />}
          </div>
          <div className="ae-pop-anchor" ref={notif.ref}>
            <IconButton icon="bell" label="Notifications" badge={notifications} aria-expanded={notif.open} onClick={() => { notif.setOpen(!notif.open); setOpen(null); }} />
            {notif.open && <NotificationsPanel items={notifications ? SAMPLE_NOTIFICATIONS : []} />}
          </div>
          <ThemeToggle />
        </div>
        <div className="ae-pop-anchor" ref={um.ref}>
          <button type="button" className="ae-user-chip" aria-haspopup="menu" aria-expanded={um.open} onClick={() => { um.setOpen(!um.open); setOpen(null); }}>
            <Avatar name={user.name === 'Admin' ? 'A E' : user.name} size="md" />
            <span className="ae-user-chip__text"><span className="ae-user-chip__name">{user.name}</span><span className="ae-user-chip__mail">{user.email}</span></span>
            <Icon name="chevron-down" size={14} style={{ color: 'var(--text-muted)' }} />
          </button>
          {um.open && <UserMenu {...user} />}
        </div>
      </div>
    </header>
  );
}

/* =============== Page header (H1 + subtext) =============== */
export function PageHeader({ title, subtext, actions, back }: { title: string; subtext?: string; actions?: React.ReactNode; back?: string }) {
  return (
    <div className="ae-pagehead">
      <div className="ae-pagehead__text">
        {back && <button type="button" className="ae-pagehead__back"><Icon name="arrow-left" size={15} />{back}</button>}
        <h2 className="ae-h1">{title}</h2>
        {subtext && <p className="ae-subtext">{subtext}</p>}
      </div>
      {actions && <div className="ae-card__actions">{actions}</div>}
    </div>
  );
}

/* =============== App shell =============== */
function useNarrow(query = '(max-width: 900px)') {
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches;
  const [m, setM] = useState(get);
  useEffect(() => { const mq = window.matchMedia(query); const f = () => setM(mq.matches); mq.addEventListener('change', f); return () => mq.removeEventListener('change', f); }, [query]);
  return m;
}

export function AppShell({ active, breadcrumb, title, children, sidebarCollapsed, footer }: { active?: string; breadcrumb?: string[]; title?: string; children: React.ReactNode; sidebarCollapsed?: boolean; footer?: React.ReactNode }) {
  const [theme] = useTheme();
  const narrow = useNarrow();
  return (
    <div className="ae-shell ae-root">
      <Sidebar active={active} collapsed={sidebarCollapsed || narrow} theme={theme} />
      <div className="ae-shell__main">
        <TopBar breadcrumb={breadcrumb} title={title} />
        <main className="ae-page" style={{ flex: 1 }}>{children}</main>
        {footer}
      </div>
    </div>
  );
}

/* =============== Card =============== */
export function Card({ title, subtitle, actions, children, divided, flush, footer, className, style }: { title?: React.ReactNode; subtitle?: string; actions?: React.ReactNode; children?: React.ReactNode; divided?: boolean; flush?: boolean; footer?: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <section className={cx('ae-card', className)} style={style}>
      {(title || actions) && (
        <header className={cx('ae-card__head', divided && 'ae-card__head--divided')}>
          <div>{title && <h3 className="ae-card__title">{title}</h3>}{subtitle && <p className="ae-card__sub">{subtitle}</p>}</div>
          {actions && <div className="ae-card__actions">{actions}</div>}
        </header>
      )}
      <div className={cx('ae-card__body', flush && 'ae-card__body--flush')}>{children}</div>
      {footer && <footer className="ae-card__foot">{footer}</footer>}
    </section>
  );
}

/* =============== Stat card =============== */
export type Tone = 'green' | 'indigo' | 'amber' | 'gray' | 'purple' | 'blue';
export interface StatCardProps { label: string; value: React.ReactNode; icon: IconName; tone?: Tone; trend?: { value: string; direction: 'up' | 'down'; good?: boolean; period?: string }; hint?: string; loading?: boolean; }
export function StatCard({ label, value, icon, tone = 'blue', trend, hint, loading }: StatCardProps) {
  const good = trend ? (trend.good ?? trend.direction === 'up') : true;
  return (
    <div className="ae-stat">
      <div className="ae-stat__text">
        <span className="ae-stat__label">{label}</span>
        {loading ? <span className="ae-skel" style={{ width: 90, height: 30 }} /> : <span className="ae-stat__value">{value}</span>}
        {trend && !loading && (
          <span className={cx('ae-stat__trend', good ? 'ae-stat__trend--up' : 'ae-stat__trend--down')}>
            <b style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><Icon name={trend.direction === 'up' ? 'trend-up' : 'trend-down'} size={14} />{trend.value}</b>
            <span style={{ whiteSpace: 'nowrap' }}>{trend.period ?? 'vs last month'}</span>
          </span>
        )}
        {hint && !trend && <span className="ae-stat__trend">{hint}</span>}
      </div>
      <span className={`ae-stat__tile ae-tile--${tone}`}><Icon name={icon} size={25} /></span>
    </div>
  );
}

/* =============== Tabs =============== */
export function Tabs({ items, value, onChange, size }: { items: { id: string; label: string; count?: number; icon?: IconName }[]; value?: string; onChange?: (id: string) => void; size?: 'sm' }) {
  const [v, setV] = useState(value ?? items[0]?.id);
  useEffect(() => { if (value) setV(value); }, [value]);
  return (
    <div className="ae-tabs" role="tablist">
      {items.map((t) => (
        <button key={t.id} type="button" role="tab" aria-selected={v === t.id} className="ae-tab" style={size === 'sm' ? { minWidth: 0, paddingInline: 10 } : undefined}
          onClick={() => { setV(t.id); onChange?.(t.id); }}>
          {t.icon && <Icon name={t.icon} size={15} />}{t.label}{t.count !== undefined && <Badge tone={v === t.id ? 'blue' : 'neutral'}>{t.count}</Badge>}
        </button>
      ))}
    </div>
  );
}

/* =============== Accordion =============== */
export function Accordion({ title, meta, children, defaultOpen, disabled, plain, icon }: { title: string; meta?: string; children: React.ReactNode; defaultOpen?: boolean; disabled?: boolean; plain?: boolean; icon?: IconName }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const id = useId();
  return (
    <div className={cx('ae-acc', open && 'ae-acc--open', plain && 'ae-acc--plain')}>
      <button type="button" className="ae-acc__btn" aria-expanded={open} aria-controls={id} disabled={disabled} onClick={() => setOpen(!open)}>
        {icon && <span className="ae-stat__tile ae-tile--blue" style={{ width: 34, height: 34, margin: 0, alignSelf: 'center' }}><Icon name={icon} size={17} /></span>}
        <span className="ae-acc__title">{title}</span>
        {meta && <span className="ae-acc__meta">{meta}</span>}
        <Icon name="chevron-down" size={18} className="ae-acc__chev" />
      </button>
      {open && <div id={id} className="ae-acc__panel">{children}</div>}
    </div>
  );
}

/* =============== Action menu (kebab) =============== */
export interface MenuAction { label: string; icon: IconName; danger?: boolean; disabled?: boolean; shortcut?: string; onClick?: () => void; }
export function ActionMenu({ actions, label = 'Row actions', defaultOpen, trigger, align = 'right' }: { actions: (MenuAction | 'separator')[]; label?: string; defaultOpen?: boolean; trigger?: 'kebab' | 'button'; align?: 'left' | 'right' }) {
  const pop = usePopover(defaultOpen);
  return (
    <div className="ae-pop-anchor" ref={pop.ref}>
      {trigger === 'button'
        ? <Button variant="outline" iconEnd="chevron-down" aria-haspopup="menu" aria-expanded={pop.open} onClick={() => pop.setOpen(!pop.open)}>{label}</Button>
        : <button type="button" className="ae-kebab" aria-label={label} aria-haspopup="menu" aria-expanded={pop.open} onClick={(e) => { e.stopPropagation(); pop.setOpen(!pop.open); }}><Icon name="kebab" size={20} /></button>}
      {pop.open && (
        <div className={cx('ae-pop', align === 'right' && 'ae-pop--right')} role="menu" style={{ minWidth: 200 }}>
          {actions.map((a, i) => a === 'separator' ? <div key={i} className="ae-menu-sep" /> : (
            <button key={a.label} type="button" role="menuitem" disabled={a.disabled} className={cx('ae-menu-item', a.danger && 'ae-menu-item--danger')}
              onClick={(e) => { e.stopPropagation(); a.onClick?.(); pop.setOpen(false); }}>
              <Icon name={a.icon} size={17} />{a.label}{a.shortcut && <span className="ae-menu-item__end">{a.shortcut}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
