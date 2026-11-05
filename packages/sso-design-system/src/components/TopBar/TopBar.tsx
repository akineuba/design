import { useId, type ReactNode } from 'react';
import { Bell, ChevronDown, LogOut, UserRound } from 'lucide-react';
import { initials } from '../Avatar/Avatar';
import { ActionMenu, type ActionMenuItem } from '../ActionMenu/ActionMenu';

export interface Crumb { label: string; href?: string; onClick?: () => void }

export interface ContextSelector {
  id: string;
  /** Short label shown before the control, e.g. "Scope", "Product", "Entity". */
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange?: (value: string) => void;
  /** Width of the select in px. */
  width?: number;
  disabled?: boolean;
}

export interface TopBarUser { name: string; role?: string; email?: string; initials?: string }

export interface TopBarProps {
  /** Left side, option A: scope / product / entity switchers (SSO admin context). */
  contexts?: ContextSelector[];
  /** Left side, option B: breadcrumbs (last item is the current page). */
  breadcrumbs?: Crumb[];
  user?: TopBarUser;
  /** Extra items in the profile menu, above Sign out. */
  userMenuItems?: ActionMenuItem[];
  onSignOut?: () => void;
  notificationCount?: number;
  onNotificationsClick?: () => void;
  /** Extra controls before the bell. */
  actions?: ReactNode;
}

/**
 * Top bar. Same metrics as the ERP: 64px, white, 1px bottom line, 32px side padding;
 * bell with a red count badge; blue gradient initials avatar, name Bold 16, role 12, chevron.
 * Sign out lives in the profile menu.
 */
export function TopBar({ contexts, breadcrumbs, user, userMenuItems = [], onSignOut, notificationCount = 0, onNotificationsClick, actions }: TopBarProps) {
  return (
    <header className="sso-topbar">
      <div className="sso-topbar__left">
        {contexts && <ContextBar contexts={contexts} />}
        {!contexts && breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      </div>
      <div className="sso-topbar__right">
        {actions}
        <button
          type="button"
          className="sso-topbar__bell"
          aria-label={notificationCount > 0 ? `Notifications, ${notificationCount} unread` : 'Notifications'}
          onClick={onNotificationsClick}
        >
          <Bell aria-hidden />
          {notificationCount > 0 && <span className="sso-topbar__badge" aria-hidden>{notificationCount > 99 ? '99+' : notificationCount}</span>}
        </button>
        {user && (
          <ActionMenu
            label={`Account menu for ${user.name}`}
            triggerClassName="sso-topbar__user"
            header={user.email ? <><strong>{user.name}</strong>{user.email}</> : undefined}
            items={[
              { label: 'My profile', icon: <UserRound /> },
              ...userMenuItems,
              { label: 'Sign out', icon: <LogOut />, onSelect: onSignOut, tone: 'delete' },
            ]}
            trigger={
              <>
                <span className="sso-topbar__avatar" aria-hidden>{user.initials ?? initials(user.name)}</span>
                <span className="sso-topbar__user-text">
                  <span className="sso-topbar__user-name">{user.name}</span>
                  {user.role && <span className="sso-topbar__user-role">{user.role}</span>}
                </span>
                <ChevronDown aria-hidden className="sso-topbar__caret" />
              </>
            }
          />
        )}
      </div>
    </header>
  );
}

function ContextBar({ contexts }: { contexts: ContextSelector[] }) {
  const base = useId();
  return (
    <div className="sso-topbar__contexts" role="group" aria-label="Working context">
      {contexts.map((c) => (
        <div className="sso-topbar__ctx" key={c.id}>
          <label htmlFor={`${base}-${c.id}`} className="sso-topbar__ctx-label">{c.label}</label>
          <div className="sso-topbar__ctx-control" style={{ width: c.width }}>
            <select
              id={`${base}-${c.id}`}
              value={c.value}
              disabled={c.disabled}
              onChange={(e) => c.onChange?.(e.target.value)}
            >
              {c.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown aria-hidden />
          </div>
        </div>
      ))}
    </div>
  );
}

function Breadcrumbs({ items }: { items: Crumb[] }) {
  const last = items.length - 1;
  return (
    <nav aria-label="Breadcrumb">
      <ol className="sso-topbar__crumbs">
        {items.map((c, i) => (
          <li key={`${c.label}-${i}`}>
            {i > 0 && <span aria-hidden>/</span>}
            {i === last ? (
              <span aria-current="page" className="sso-topbar__crumb-current">{c.label}</span>
            ) : (
              <a href={c.href ?? '#'} onClick={(e) => { if (c.onClick) { e.preventDefault(); c.onClick(); } }}>{c.label}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
