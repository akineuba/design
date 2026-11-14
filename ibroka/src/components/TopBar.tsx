import { Fragment, useId, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { usePopover } from '../lib/usePopover';
import { BellIcon, MoonIcon, SunIcon } from '../icons';

export interface Crumb {
  label: string;
  href?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body?: string;
  /** "2h ago" */
  time: string;
  unread?: boolean;
  icon?: ReactNode;
}

export interface TopBarProps {
  /** Path to the current page. The last crumb is the current page, in teal (Figma). */
  breadcrumb: Crumb[];
  theme?: 'light' | 'dark';
  onThemeChange?: (t: 'light' | 'dark') => void;
  notifications?: NotificationItem[];
  onNotificationClick?: (id: string) => void;
  onMarkAllRead?: () => void;
  /** Extra controls before the bell (Tour, app launcher). */
  extra?: ReactNode;
  defaultNotificationsOpen?: boolean;
  className?: string;
}

const roundBtn = 'relative inline-flex size-[45px] items-center justify-center rounded-full bg-surface-control text-fg hover:bg-surface-track ib-focus';

/** Bar across the top of the content: breadcrumb left; notifications and theme toggle right. Figma: chrome bg, 80px side padding. */
export function TopBar({ breadcrumb, theme = 'light', onThemeChange, notifications = [], onNotificationClick, onMarkAllRead, extra, defaultNotificationsOpen, className }: TopBarProps) {
  const { open, toggle, rootRef, triggerRef } = usePopover<HTMLDivElement>(defaultNotificationsOpen);
  const unread = notifications.filter((n) => n.unread).length;
  const panelId = useId();
  return (
    <header className={cx('flex h-[66px] shrink-0 items-center justify-between gap-4 bg-surface-chrome px-5 lg:px-20', className)}>
      <nav aria-label="Breadcrumb" className="min-w-0">
        <ol className="flex min-w-0 items-center gap-[7px] text-15">
          {breadcrumb.map((c, i) => {
            const last = i === breadcrumb.length - 1;
            return (
              <Fragment key={`${c.label}${i}`}>
                {i > 0 && (
                  <li aria-hidden className={cx(last ? 'text-primary' : 'text-fg-breadcrumb')}>
                    /
                  </li>
                )}
                <li className="min-w-0 truncate">
                  {last ? (
                    <span aria-current="page" className="font-medium text-primary">
                      {c.label}
                    </span>
                  ) : (
                    <a href={c.href ?? '#'} className="rounded text-fg-breadcrumb hover:text-fg-strong hover:underline ib-focus">
                      {c.label}
                    </a>
                  )}
                </li>
              </Fragment>
            );
          })}
        </ol>
      </nav>
      <div className="flex shrink-0 items-center gap-5">
        {extra}
        <div ref={rootRef} className="relative">
          <button ref={triggerRef} type="button" aria-label={unread ? `Notifications, ${unread} unread` : 'Notifications'} aria-expanded={open} aria-controls={panelId} onClick={toggle} className={roundBtn}>
            <span className="h-[26px] w-[25px]">
              <BellIcon />
            </span>
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 inline-flex min-w-[18px] items-center justify-center rounded-full bg-danger px-1 text-11 font-bold text-fg-inverse ring-2 ring-[var(--ib-color-surface-chrome)]">
                {unread > 9 ? '9+' : unread}
              </span>
            )}
          </button>
          {open && (
            <div id={panelId} role="dialog" aria-label="Notifications" className="absolute right-0 z-40 mt-2 w-[360px] max-w-[calc(100vw-32px)] animate-fade-in overflow-hidden rounded-lg border border-line-subtle bg-surface shadow-pop">
              <div className="flex items-center justify-between border-b border-line-subtle px-4 py-3">
                <p className="text-15 font-semibold text-fg-strong">Notifications</p>
                {unread > 0 && onMarkAllRead && (
                  <button type="button" onClick={onMarkAllRead} className="rounded text-13 font-semibold text-primary hover:underline ib-focus">
                    Mark all as read
                  </button>
                )}
              </div>
              {notifications.length === 0 ? (
                <p className="px-4 py-10 text-center text-13 text-fg-muted">You're all caught up.</p>
              ) : (
                <ul className="max-h-[380px] overflow-y-auto">
                  {notifications.map((n) => (
                    <li key={n.id}>
                      <button type="button" onClick={() => onNotificationClick?.(n.id)} className={cx('flex w-full gap-3 border-b border-line-row px-4 py-3 text-left hover:bg-surface-muted focus-visible:bg-surface-muted focus-visible:outline-none',)}>
                        <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-subtle text-primary" aria-hidden>
                          <span className="size-icon-sm">{n.icon ?? <BellIcon />}</span>
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <span className={cx('text-13 text-fg-strong', n.unread && 'font-semibold')}>{n.title}</span>
                          {n.body && <span className="line-clamp-2 text-12 text-fg-muted">{n.body}</span>}
                          <span className="text-11 text-fg-muted">{n.time}</span>
                        </span>
                        {n.unread && <span className="mt-2 size-2 shrink-0 rounded-full bg-brand" aria-label="Unread" />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <button
          type="button"
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          onClick={() => onThemeChange?.(theme === 'dark' ? 'light' : 'dark')}
          className={cx(roundBtn, 'text-avatar-bg')}
        >
          <span className="size-[25px]">{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</span>
        </button>
      </div>
    </header>
  );
}
