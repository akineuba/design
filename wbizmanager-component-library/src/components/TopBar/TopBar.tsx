import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { BellIcon, ChevronDownIcon, CompassIcon, MoonIcon, SunIcon } from '../../icons';
import { Button } from '../Button';

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
  /** Panel opened by the user button, usually a `UserMenu`. Closes on Escape, outside click or a choice. */
  userMenu?: ReactNode;
  notificationCount?: number;
  onNotificationsClick?: () => void;
  /** Panel opened by the bell, usually a `NotificationsPanel`. Closes on Escape or an outside click. */
  notificationsPanel?: ReactNode;
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
  onTourClick?: () => void;
  /** Extra controls placed before the Tour button. */
  actions?: ReactNode;
  className?: string;
}

const initialsOf = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join('');

const iconBtn =
  'inline-flex shrink-0 items-center justify-center text-fg-subtle transition-colors hover:text-fg-strong ' +
  'focus-visible:outline-hidden focus-visible:shadow-focus rounded-lg';

/**
 * Page header bar. Figma: top-header (new features, 7053:5510) for the metrics (64px, white, 1px
 * line-subtle bottom border, 32px side padding) and the latest top-bar reference from the design team
 * for the details: current page in primary Semibold 14; Tour as a small tertiary Button with a compass;
 * theme toggle (38px on surface-control); bell with a red count badge that can open a NotificationsPanel;
 * 32px neutral grey initials avatar,
 * name in Bold 16 and role in 12; chevron.
 */
export function TopBar({
  breadcrumbs,
  user,
  onUserMenuClick,
  userMenu,
  notificationCount = 0,
  onNotificationsClick,
  notificationsPanel,
  theme = 'light',
  onThemeToggle,
  onTourClick,
  actions,
  className,
}: TopBarProps) {
  const last = breadcrumbs.length - 1;
  const [open, setOpen] = useState<'user' | 'notifications' | null>(null);
  const menuOpen = open === 'user';
  const bellOpen = open === 'notifications';
  const userRef = useRef<HTMLDivElement>(null);
  const userBtn = useRef<HTMLButtonElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);
  const bellBtn = useRef<HTMLButtonElement>(null);

  // One popover at a time. Focus moves into it; Escape or an outside click closes it.
  useEffect(() => {
    if (!open) return;
    const wrap = open === 'user' ? userRef.current : bellRef.current;
    const btn = open === 'user' ? userBtn.current : bellBtn.current;
    wrap?.querySelector<HTMLElement>('[role="menuitem"], [role="tab"][aria-selected="true"]')?.focus();
    const outside = (e: MouseEvent) => { if (!wrap?.contains(e.target as Node)) setOpen(null); };
    const esc = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape') { setOpen(null); btn?.focus(); } };
    document.addEventListener('mousedown', outside);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', outside); document.removeEventListener('keydown', esc); };
  }, [open]);
  return (
    <header className={cx('flex h-topbar w-full items-center justify-between gap-6 border-b border-line-subtle bg-surface px-8', className)}>
      <nav aria-label="Breadcrumb" className="min-w-0">
        <ol className="flex min-w-0 items-center gap-1.5 font-sans text-sm text-fg-muted">
          {breadcrumbs.map((c, i) => (
            <li key={`${c.label}-${i}`} className="flex min-w-0 items-center gap-1.5">
              {i > 0 && <span aria-hidden>/</span>}
              {i === last ? (
                <span aria-current="page" className="truncate font-semibold text-primary">{c.label}</span>
              ) : c.href || c.onClick ? (
                <a
                  href={c.href ?? '#'}
                  onClick={(e) => { if (c.onClick) { e.preventDefault(); c.onClick(); } }}
                  className="truncate rounded-sm hover:text-fg-strong focus-visible:outline-hidden focus-visible:shadow-focus"
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
          <Button variant="tertiary" size="sm" leadingIcon={<CompassIcon />} onClick={onTourClick}>
            Tour
          </Button>
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
        {(onNotificationsClick || notificationsPanel) && (
          <div ref={bellRef} className="relative">
          <button
            ref={bellBtn}
            type="button"
            aria-label={notificationCount > 0 ? `Notifications, ${notificationCount} unread` : 'Notifications'}
            aria-haspopup={notificationsPanel ? 'dialog' : undefined}
            aria-expanded={notificationsPanel ? bellOpen : undefined}
            onClick={() => { onNotificationsClick?.(); if (notificationsPanel) setOpen(bellOpen ? null : 'notifications'); }}
            className={cx(iconBtn, 'relative size-control-xs', bellOpen && 'text-fg-strong')}
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
          {notificationsPanel && bellOpen && <div className="absolute -right-4 top-full z-50 mt-4">{notificationsPanel}</div>}
          </div>
        )}
        {user && (
          <div ref={userRef} className="relative">
          <button
            ref={userBtn}
            type="button"
            onClick={() => { onUserMenuClick?.(); if (userMenu) setOpen(menuOpen ? null : 'user'); }}
            aria-haspopup="menu"
            aria-expanded={userMenu ? menuOpen : undefined}
            className="flex items-center gap-3 rounded-lg text-left focus-visible:outline-hidden focus-visible:shadow-focus"
          >
            <span className="inline-flex size-avatar-topbar shrink-0 items-center justify-center rounded-full bg-avatar-neutral font-sans text-xs font-semibold text-fg-inverse" aria-hidden>
              {user.initials ?? initialsOf(user.name)}
            </span>
            <span className="flex flex-col">
              <span className="font-sans text-md font-bold text-fg-ink">{user.name}</span>
              {user.role && <span className="font-sans text-xs text-fg-subtle">{user.role}</span>}
            </span>
            <span className={cx('ml-4 size-icon-sm text-fg-strong transition-transform', menuOpen && 'rotate-180')} aria-hidden><ChevronDownIcon /></span>
          </button>
          {userMenu && menuOpen && (
            <div className="absolute right-0 top-full z-50 mt-3" onClick={(e) => { if ((e.target as HTMLElement).closest('[role="menuitem"]')) setOpen(null); }}>
              {userMenu}
            </div>
          )}
          </div>
        )}
      </div>
    </header>
  );
}
