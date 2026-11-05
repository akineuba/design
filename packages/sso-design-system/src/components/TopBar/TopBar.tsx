import type { ReactNode } from 'react';
import { Bell, Building2, ChevronDown } from 'lucide-react';
import { Avatar } from '../Avatar/Avatar';
import { IconButton } from '../Button/Button';

export interface TopBarProps {
  /** Current tenant / organisation context. */
  context?: string;
  onContextClick?: () => void;
  user: { name: string; role: string; avatarUrl?: string };
  onUserClick?: () => void;
  unreadNotifications?: boolean;
  onNotificationsClick?: () => void;
  /** Extra content between context switcher and the right cluster (e.g. global search). */
  children?: ReactNode;
}

export function TopBar({ context, onContextClick, user, onUserClick, unreadNotifications, onNotificationsClick, children }: TopBarProps) {
  return (
    <header className="sso-topbar">
      {context && (
        <button type="button" className="sso-topbar__context" onClick={onContextClick} aria-label={`Switch tenant, current: ${context}`}>
          <Building2 aria-hidden />
          <span>{context}</span>
          <ChevronDown aria-hidden className="sso-topbar__caret" />
        </button>
      )}
      <div className="sso-topbar__middle">{children}</div>
      <div className="sso-topbar__right">
        <IconButton label="Notifications" icon={<Bell />} dot={unreadNotifications} onClick={onNotificationsClick} />
        <span className="sso-topbar__divider" aria-hidden />
        <button type="button" className="sso-topbar__user" onClick={onUserClick} aria-label={`Account menu for ${user.name}`}>
          <Avatar name={user.name} src={user.avatarUrl} />
          <span className="sso-topbar__user-text">
            <span className="sso-topbar__user-name">{user.name}</span>
            <span className="sso-topbar__user-role">{user.role}</span>
          </span>
          <ChevronDown aria-hidden className="sso-topbar__caret" />
        </button>
      </div>
    </header>
  );
}
