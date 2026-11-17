import { forwardRef, type HTMLAttributes, type MouseEventHandler, type ReactNode } from 'react';
import logoSrc from '../../assets/wragby-logo.png';
import { BasilAppsOutlineIcon, BiFilterLeftIcon, CarbonNotificationNewIcon, MoonIcon, SunIcon } from '../../icons';
import { cn } from '../../utils/cn';
import { initials } from '../Avatar';

/*
 * Desktop app header, Figma `navbar` (1514:7170) / `Application header` (2518:57355): 63px white bar with a bottom
 * border, 23px inset. Left: sidebar toggle (31px bi:filter-left, #667085), the 140×40 Wragby logo, then the greeting
 * (Roboto Semi Bold 13, #B8B8C0) over the page title (Roboto Bold 20, #667085), 37px apart. Right, 16px apart: the
 * 30px notification bell (#A3AED0, red unread dot), the 26px app switcher, the 30px theme-toggle circle (#E5E7EB,
 * 13px sun) and the 36px initials avatar (Inter Bold 13, #1E293B on rgba(226,232,240,.3)).
 * Hover and focus states are derived; Figma draws only the resting bar.
 */

export interface TopBarProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Page title, e.g. "Settings - Social Media". */
  title: ReactNode;
  /** Small line above the title, e.g. "Hi Akinola". */
  greeting?: ReactNode;
  /** Signed-in user's full name; the avatar shows its initials and the button is labelled with it. */
  userName: string;
  /** Optional avatar photo. */
  userAvatarSrc?: string;
  /** Shows the red dot on the bell and adds "unread" to its label. */
  hasUnreadNotifications?: boolean;
  /** Current colour theme: the toggle shows a sun in light mode and a moon in dark mode. */
  theme?: 'light' | 'dark';
  /** Whether the sidebar is open; sets aria-expanded on the menu button. */
  sidebarOpen?: boolean;
  /** id of the sidebar the menu button controls (aria-controls). */
  sidebarId?: string;
  onMenuClick?: MouseEventHandler<HTMLButtonElement>;
  onNotificationsClick?: MouseEventHandler<HTMLButtonElement>;
  onAppsClick?: MouseEventHandler<HTMLButtonElement>;
  onThemeToggle?: MouseEventHandler<HTMLButtonElement>;
  onProfileClick?: MouseEventHandler<HTMLButtonElement>;
  /** Replaces the Wragby logo (140×40). */
  logo?: ReactNode;
}

// Round, borderless header buttons with the shared focus ring. Each button adds its own hover fill (derived).
const headerButton =
  'inline-flex shrink-0 items-center justify-center rounded-full transition-colors duration-fast ease-standard ' +
  'focus-visible:outline-none focus-visible:shadow-focus';
const hoverFill = 'hover:bg-surface-subtle';

export const TopBar = forwardRef<HTMLElement, TopBarProps>(function TopBar(
  {
    title,
    greeting,
    userName,
    userAvatarSrc,
    hasUnreadNotifications = false,
    theme = 'light',
    sidebarOpen,
    sidebarId,
    onMenuClick,
    onNotificationsClick,
    onAppsClick,
    onThemeToggle,
    onProfileClick,
    logo,
    className,
    ...rest
  },
  ref,
) {
  const isDark = theme === 'dark';
  return (
    <header
      ref={ref}
      className={cn(
        'flex h-header w-full items-center justify-between gap-6 border-b border-border-default bg-surface-default px-5.75 py-2.5',
        className,
      )}
      {...rest}
    >
      <div className="flex min-w-0 items-center gap-9.25">
        <div className="flex shrink-0 items-center gap-2.25">
          <button
            type="button"
            aria-label={sidebarOpen === false ? 'Open navigation' : 'Close navigation'}
            aria-expanded={sidebarOpen}
            aria-controls={sidebarId}
            onClick={onMenuClick}
            className={cn(headerButton, 'size-7.75 rounded-sm text-text-tertiary [&>svg]:size-7.75', hoverFill)}
          >
            <BiFilterLeftIcon />
          </button>
          {logo ?? <img src={logoSrc} alt="Wragby" className="h-10 w-logo-w object-contain object-left" />}
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          {greeting && <p className="truncate font-data text-label-sm text-text-greeting">{greeting}</p>}
          <h1 className="truncate font-data text-heading-1 text-text-tertiary">{title}</h1>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <button
          type="button"
          aria-label={hasUnreadNotifications ? 'Notifications (unread)' : 'Notifications'}
          onClick={onNotificationsClick}
          className={cn(
            headerButton,
            'size-9 text-text-muted [&>svg]:size-7.5',
            hoverFill,
            // The bell's last path is the red unread dot.
            !hasUnreadNotifications && '[&_path:last-child]:hidden',
          )}
        >
          <CarbonNotificationNewIcon />
        </button>
        <button type="button" aria-label="Apps" onClick={onAppsClick} className={cn(headerButton, hoverFill, 'size-7.5 rounded-sm text-text-muted [&>svg]:size-6.5')}>
          <BasilAppsOutlineIcon />
        </button>
        <button
          type="button"
          role="switch"
          aria-checked={isDark}
          aria-label="Dark mode"
          onClick={onThemeToggle}
          className={cn(
            headerButton,
            'size-control-30 bg-surface-toggle hover:bg-border-strong',
            isDark ? 'text-status-theme-moon [&>svg]:size-4' : '[&>svg]:size-3.25',
          )}
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </button>
        <button
          type="button"
          aria-label={`Account: ${userName}`}
          onClick={onProfileClick}
          className={cn(headerButton, hoverFill, 'size-avatar-36 overflow-hidden bg-surface-avatar-tint font-sans text-label-sm font-bold text-text-charcoal')}
        >
          {userAvatarSrc ? <img src={userAvatarSrc} alt="" className="size-full object-cover" /> : <span aria-hidden="true">{initials(userName)}</span>}
        </button>
      </div>
    </header>
  );
});
