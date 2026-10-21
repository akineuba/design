import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { AppsIcon, BellIcon, ChevronDownIcon, MoonIcon, SparkleIcon, SunIcon } from '../../icons';

export interface Crumb {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface TopBarUser {
  name: string;
  role?: string;
  /** Up to two letters. Derived from `name` when omitted. */
  initials?: string;
}

export interface TopBarProps {
  breadcrumbs: Crumb[];
  user?: TopBarUser;
  onUserMenuClick?: () => void;
  notificationCount?: number;
  onNotificationsClick?: () => void;
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
  onTourClick?: () => void;
  onAppsClick?: () => void;
  /** Extra controls placed before the Tour button. */
  actions?: ReactNode;
  className?: string;
}

const initialsOf = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join('');

const iconBtn =
  'inline-flex shrink-0 items-center justify-center text-fg-subtle transition-colors hover:text-fg-strong ' +
  'focus-visible:outline-none focus-visible:shadow-focus rounded-lg';

/**
 * Page header bar. Figma: top-header (new features, 7053:5510): 64px, white, 1px line-subtle bottom
 * border, 32px side padding. Breadcrumb in Roboto 13 with the current page in primary. Toolbar: Tour,
 * theme toggle (38px on surface-control), notifications with a count badge, user menu and app launcher.
 */
export function TopBar({
  breadcrumbs,
  user,
  onUserMenuClick,
  notificationCount = 0,
  onNotificationsClick,
  theme = 'light',
  onThemeToggle,
  onTourClick,
  onAppsClick,
  actions,
  className,
}: TopBarProps) {
  const last = breadcrumbs.length - 1;
  return (
    <header className={cx('flex h-topbar w-full items-center justify-between gap-6 border-b border-line-subtle bg-surface px-8', className)}>
      <nav aria-label="Breadcrumb" className="min-w-0">
        <ol className="flex min-w-0 items-center gap-1.5 font-data text-13 text-fg-muted">
          {breadcrumbs.map((c, i) => (
            <li key={`${c.label}-${i}`} className="flex min-w-0 items-center gap-1.5">
              {i > 0 && <span aria-hidden>/</span>}
              {i === last ? (
                <span aria-current="page" className="truncate font-semibold text-primary">{c.label}</span>
              ) : c.href || c.onClick ? (
                <a
                  href={c.href ?? '#'}
                  onClick={(e) => { if (c.onClick) { e.preventDefault(); c.onClick(); } }}
                  className="truncate rounded-sm hover:text-fg-strong focus-visible:outline-none focus-visible:shadow-focus"
                >
                  {c.label}
                </a>
              ) : (
                <span className="truncate">{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="flex shrink-0 items-center gap-5">
        {actions}
        {onTourClick && (
          <button type="button" onClick={onTourClick} className={cx(iconBtn, 'gap-2 px-1 font-sans text-sm font-medium')}>
            <span className="size-6"><SparkleIcon /></span>
            Tour
          </button>
        )}
        {onThemeToggle && (
          <button
            type="button"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={onThemeToggle}
            className={cx(iconBtn, 'size-theme-toggle rounded-xl bg-surface-control')}
          >
            <span className="size-icon-sm">{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</span>
          </button>
        )}
        {onNotificationsClick && (
          <button
            type="button"
            aria-label={notificationCount > 0 ? `Notifications, ${notificationCount} unread` : 'Notifications'}
            onClick={onNotificationsClick}
            className={cx(iconBtn, 'relative size-control-xs')}
          >
            <span className="size-icon"><BellIcon /></span>
            {notificationCount > 0 && (
              <span
                aria-hidden
                className="absolute -right-0.5 -top-0.5 inline-flex h-badge min-w-badge items-center justify-center rounded-full bg-badge px-1 font-sans text-2xs font-bold text-fg-inverse"
              >
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </button>
        )}
        {user && (
          <button
            type="button"
            onClick={onUserMenuClick}
            aria-haspopup="menu"
            className="flex items-center gap-3 rounded-lg text-left focus-visible:outline-none focus-visible:shadow-focus"
          >
            <span className="inline-flex size-avatar shrink-0 items-center justify-center rounded-full bg-avatar-neutral font-sans text-13 font-semibold text-fg-inverse" aria-hidden>
              {user.initials ?? initialsOf(user.name)}
            </span>
            <span className="flex flex-col">
              <span className="font-sans text-sm font-bold text-fg-strong">{user.name}</span>
              {user.role && <span className="font-sans text-11 text-fg-subtle">{user.role}</span>}
            </span>
            <span className="size-icon-xs text-fg-subtle" aria-hidden><ChevronDownIcon /></span>
          </button>
        )}
        {onAppsClick && (
          <button type="button" aria-label="All apps" onClick={onAppsClick} className={cx(iconBtn, 'size-6')}>
            <AppsIcon />
          </button>
        )}
      </div>
    </header>
  );
}
