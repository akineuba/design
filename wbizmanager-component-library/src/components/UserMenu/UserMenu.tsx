import { forwardRef, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Avatar } from '../Avatar';
import { ExternalLinkIcon, LogOutIcon, ShieldIcon } from '../../icons';

export interface UserMenuItem {
  id: string;
  label: string;
  icon: ReactNode;
  /** Opens outside the app (another product or site): adds a trailing external-link glyph. */
  external?: boolean;
  onSelect?: () => void;
}

export interface UserMenuSession {
  /** Clock time the session ends, e.g. "16:01". */
  endsAt: string;
  /** Time left, e.g. "3h 36m left". */
  remaining: string;
  /** Share of the session left, 0–1. Drives the thin bar. */
  progress: number;
}

export interface UserMenuProps {
  name: string;
  email: string;
  role?: string;
  session?: UserMenuSession;
  /** Groups of items; a hairline divides each group. */
  groups: UserMenuItem[][];
  onLogOut?: () => void;
  className?: string;
}

const row =
  'flex h-control-sm w-full items-center gap-3 rounded-md px-2.5 text-left font-sans text-sm transition-colors focus-visible:outline-hidden';

/**
 * The panel behind the top bar's user button. A redesign of the older account dropdown: one neutral
 * avatar (same as the top bar), the role as quiet text instead of a pill, the session as one line with a
 * 2px bar, and single-line items with 16px `icon-muted` glyphs instead of coloured tiles and subtitles.
 * Log out sits alone at the bottom in `error` red. Menu keyboard model: arrows move, Home and End jump, Escape closes
 * (handled by the opener).
 */
export const UserMenu = forwardRef<HTMLDivElement, UserMenuProps>(function UserMenu(
  { name, email, role, session, groups, onLogOut, className },
  ref,
) {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]'));
    const i = items.indexOf(document.activeElement as HTMLElement);
    const next =
      e.key === 'ArrowDown' ? (i + 1) % items.length
      : e.key === 'ArrowUp' ? (i - 1 + items.length) % items.length
      : e.key === 'Home' ? 0
      : e.key === 'End' ? items.length - 1
      : null;
    if (next === null) return;
    e.preventDefault();
    items[next]?.focus();
  };

  return (
    <div
      ref={ref}
      role="menu"
      aria-label={`Account menu for ${name}`}
      onKeyDown={onKeyDown}
      className={cx('w-user-menu overflow-hidden rounded-xl border border-line-subtle bg-surface shadow-md', className)}
    >
      <div className="flex items-center gap-3 px-4 pb-3 pt-4">
        <Avatar name={name} tone="neutral" />
        <div className="flex min-w-0 flex-col">
          <span className="truncate font-sans text-sm font-semibold text-fg-ink">{name}</span>
          <span className="truncate font-sans text-xs text-fg-muted">{email}</span>
        </div>
      </div>

      {(role || session) && (
        <div className="mx-4 mb-3 flex flex-col gap-2 rounded-lg bg-surface-muted px-3 py-2.5">
          {role && (
            <div className="flex items-center justify-between font-sans text-xs">
              <span className="text-fg-muted">Role</span>
              <span className="font-medium text-fg-strong">{role}</span>
            </div>
          )}
          {session && (
            <>
              <div className="flex items-center justify-between gap-3 font-sans text-xs">
                <span className="flex items-center gap-1.5 text-fg-muted">
                  <span className="size-3.5 text-success" aria-hidden><ShieldIcon /></span>
                  Session ends {session.endsAt}
                </span>
                <span className="font-medium text-fg-strong">{session.remaining}</span>
              </div>
              <div
                role="progressbar"
                aria-label="Session time left"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(session.progress * 100)}
                className="h-0.5 overflow-hidden rounded-full bg-line"
              >
                <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(0, Math.min(1, session.progress)) * 100}%` }} />
              </div>
            </>
          )}
        </div>
      )}

      {groups.map((group, g) => (
        <div key={g} role="group" className="flex flex-col border-t border-line-subtle p-1.5">
          {group.map((item) => (
            <button key={item.id} type="button" role="menuitem" tabIndex={-1} onClick={item.onSelect} className={cx(row, 'text-fg hover:bg-surface-muted focus-visible:bg-surface-muted')}>
              <span className="size-icon-sm shrink-0 text-icon-muted" aria-hidden>{item.icon}</span>
              <span className="flex-1 truncate">{item.label}</span>
              {item.external && (
                <span className="size-3.5 shrink-0 text-fg-subtle" aria-label="Opens in a new tab"><ExternalLinkIcon /></span>
              )}
            </button>
          ))}
        </div>
      ))}

      {onLogOut && (
        <div className="border-t border-line-subtle p-1.5">
          <button type="button" role="menuitem" tabIndex={-1} onClick={onLogOut} className={cx(row, 'text-error hover:bg-error-subtle focus-visible:bg-error-subtle')}>
            <span className="size-icon-sm shrink-0" aria-hidden><LogOutIcon /></span>
            Log out
          </button>
        </div>
      )}
    </div>
  );
});
