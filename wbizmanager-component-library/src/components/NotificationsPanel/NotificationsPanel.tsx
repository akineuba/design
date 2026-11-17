import { useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../Button';
import { Tabs } from '../Tabs';
import { ArrowRightIcon, CheckAllIcon, ErrorIcon, InfoIcon, SettingIcon, TickCircleIcon, TrashIcon, WarningIcon } from '../../icons';

export type NotificationTone = 'info' | 'warning' | 'error' | 'success';

export interface NotificationItem {
  id: string;
  title: string;
  /** One or two sentences; clamped to two lines. */
  body?: string;
  /** Display time, e.g. "12:19 AM" or "Sun, 12:11 AM". */
  time: string;
  /** Who or what sent it, e.g. "System". */
  source?: string;
  /** Day heading the item sits under, e.g. "Today", "Yesterday", "Earlier". */
  group: string;
  tone?: NotificationTone;
  unread?: boolean;
  onSelect?: () => void;
}

export interface NotificationsPanelProps {
  items: NotificationItem[];
  onMarkAllRead?: () => void;
  onSettings?: () => void;
  onClearRead?: () => void;
  onViewAll?: () => void;
  className?: string;
}

const toneIcon: Record<NotificationTone, { icon: ReactNode; className: string }> = {
  info: { icon: <InfoIcon />, className: 'bg-tile-blue-bg text-tile-blue-fg' },
  warning: { icon: <WarningIcon />, className: 'bg-tile-amber-bg text-tile-amber-fg' },
  error: { icon: <ErrorIcon />, className: 'bg-tile-red-bg text-tile-red-fg' },
  success: { icon: <TickCircleIcon />, className: 'bg-tile-green-bg text-tile-green-fg' },
};

/**
 * Popover behind the top bar bell (pass it to TopBar as `notificationsPanel`). A redesign of the older
 * navy panel: white surface like every other popover, one header row (title, Mark all read, settings),
 * All / Unread tabs instead of three stat chips, items grouped under day headings, a small tone icon,
 * a two-line clamped body, and unread shown by a blue dot and a semibold title. The footer keeps
 * Clear read and View all as quiet text buttons.
 */
export function NotificationsPanel({ items, onMarkAllRead, onSettings, onClearRead, onViewAll, className }: NotificationsPanelProps) {
  const [tab, setTab] = useState('all');
  const unread = items.filter((n) => n.unread).length;
  const shown = tab === 'unread' ? items.filter((n) => n.unread) : items;
  const groups = shown.reduce<Array<{ name: string; items: NotificationItem[] }>>((acc, n) => {
    const g = acc.find((x) => x.name === n.group);
    if (g) g.items.push(n);
    else acc.push({ name: n.group, items: [n] });
    return acc;
  }, []);

  return (
    <section
      role="dialog"
      aria-label="Notifications"
      className={cx('flex w-notifications-panel flex-col overflow-hidden rounded-xl border border-line-subtle bg-surface shadow-md', className)}
    >
      <div className="flex items-center justify-between gap-3 px-4 pb-1 pt-3">
        <h2 className="font-sans text-md font-semibold text-fg-ink">Notifications</h2>
        <div className="flex items-center gap-1">
          {onMarkAllRead && (
            <Button variant="tertiary" size="sm" leadingIcon={<CheckAllIcon />} onClick={onMarkAllRead} disabled={unread === 0}>
              Mark all read
            </Button>
          )}
          {onSettings && (
            <Button variant="tertiary" size="sm" iconOnly aria-label="Notification settings" onClick={onSettings}>
              <SettingIcon />
            </Button>
          )}
        </div>
      </div>

      <Tabs
        aria-label="Filter notifications"
        idPrefix="notifications"
        value={tab}
        onChange={setTab}
        items={[{ value: 'all', label: 'All' }, { value: 'unread', label: 'Unread', count: unread }]}
        className="border-b border-line-subtle px-1"
      />

      <div id={`notifications-panel-${tab}`} role="tabpanel" aria-labelledby={`notifications-tab-${tab}`} className="max-h-notifications-list overflow-y-auto">
        {groups.length === 0 ? (
          <div className="flex flex-col items-center gap-1 px-6 py-12 text-center">
            <span className="mb-2 size-8 text-success" aria-hidden><TickCircleIcon /></span>
            <span className="font-sans text-sm font-medium text-fg-ink">You're all caught up</span>
            <span className="font-sans text-xs text-fg-muted">New notifications will show up here.</span>
          </div>
        ) : (
          groups.map((g) => (
            <div key={g.name} role="group" aria-label={g.name}>
              <div className="sticky top-0 z-10 bg-surface px-4 pb-1 pt-3 font-sans text-xs font-medium text-fg-subtle">{g.name}</div>
              <ul className="flex flex-col pb-1">
                {g.items.map((n) => {
                  const tone = toneIcon[n.tone ?? 'info'];
                  return (
                    <li key={n.id}>
                      <button
                        type="button"
                        onClick={n.onSelect}
                        className="flex w-full gap-3 px-4 py-2.5 text-left transition-colors hover:bg-surface-muted focus-visible:bg-surface-muted focus-visible:outline-hidden"
                      >
                        <span className={cx('inline-flex size-8 shrink-0 items-center justify-center rounded-full', tone.className)} aria-hidden>
                          <span className="size-4">{tone.icon}</span>
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <span className="flex items-center gap-2">
                            <span className={cx('min-w-0 flex-1 truncate font-sans text-sm text-fg-ink', n.unread ? 'font-semibold' : 'font-medium')}>
                              {n.title}
                            </span>
                            {n.unread && (
                              <>
                                <span className="size-2 shrink-0 rounded-full bg-primary" aria-hidden />
                                <span className="sr-only">Unread</span>
                              </>
                            )}
                          </span>
                          {n.body && <span className="line-clamp-2 font-sans text-xs text-fg-muted">{n.body}</span>}
                          <span className="font-sans text-xs text-fg-subtle">
                            {n.time}
                            {n.source && <> · {n.source}</>}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </div>

      {(onClearRead || onViewAll) && (
        <div className="flex items-center justify-between border-t border-line-subtle px-2 py-2">
          {onClearRead ? (
            <Button variant="tertiary" size="sm" leadingIcon={<TrashIcon />} onClick={onClearRead}>
              Clear read
            </Button>
          ) : <span />}
          {onViewAll && (
            <button
              type="button"
              onClick={onViewAll}
              className="inline-flex h-control-sm items-center gap-1.5 rounded-lg px-3 font-sans text-sm font-medium text-primary transition-colors hover:bg-primary-subtle focus-visible:outline-hidden focus-visible:shadow-focus"
            >
              View all
              <span className="size-4" aria-hidden><ArrowRightIcon /></span>
            </button>
          )}
        </div>
      )}
    </section>
  );
}
