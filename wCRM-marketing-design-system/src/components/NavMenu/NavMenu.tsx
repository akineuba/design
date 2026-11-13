import { forwardRef, useId, useState, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { LoginIcon, LucideChevronDownIcon, LucideChevronRightIcon, Setting2Icon } from '../../icons';
import { cn } from '../../utils/cn';

/*
 * Desktop sidebar navigation, Figma sidebar instance (1514:7196, component 808:7459): 217px white column with a right
 * border, 35px top/bottom and 13px side inset, so items are 191px wide. Section label: Inter Semi Bold 12 uppercase
 * #667085. Items: 40px rows, 6px apart, 15px left inset, 20px icon (#A3AED0) then a 12px gap and the label (Roboto
 * Medium 14, #4F5966). Active: #F0F4FA fill (radius 8) and a 2×21 #EE1F2F bar on the left edge.
 *
 * Footer (Settings dropdown + Log Out) follows the product reference screenshot, not the older Figma group: a 1px
 * #E2E8F0 rule; "Settings" (Medium 14, #4B5563) with an #A3AED0 gear and a chevron-down caret (rotates right when
 * closed); sub-items Semi Bold 13, #667085, 34px apart, each with a 16px #A3AED0 right chevron (they open settings
 * pages); then Log Out (#A3AED0 icon, #4B5563 label) straight after. Nested items under a regular entry (e.g. Reports)
 * are Roboto Regular 14 with no chevron. Hover and focus states are derived.
 */

export interface NavMenuItem {
  id: string;
  label: string;
  /** 20px glyph; top-level items only. */
  icon?: ReactNode;
  /** Renders a link; without it the item is a button that calls onNavigate. */
  href?: string;
  /** Sub-items: the item becomes an expandable group with a chevron. */
  children?: NavMenuItem[];
  /** Groups only: open on first render. A group also opens when it contains the active item. */
  defaultOpen?: boolean;
}

export interface NavMenuSection {
  id: string;
  /** Uppercase heading, e.g. "Marketing" or "Business Development". */
  label?: string;
  items: NavMenuItem[];
}

export interface NavMenuSettings {
  /** Defaults to "Settings". */
  label?: string;
  items: NavMenuItem[];
  /** Open on first render. It also opens when the active item is one of its items. */
  defaultOpen?: boolean;
  /** Right chevron on each sub-item (default true). The Marketing menu turns them off. */
  showChevrons?: boolean;
}

export interface NavMenuProps extends Omit<HTMLAttributes<HTMLElement>, 'onSelect'> {
  sections: NavMenuSection[];
  /** id of the current page's item; it gets the active fill, the red bar and aria-current="page". */
  activeId?: string;
  /** Called when any item (top level, nested or settings) is chosen. */
  onNavigate?: (item: NavMenuItem, event: MouseEvent<HTMLElement>) => void;
  /** The Settings group in the footer. Omit to hide it. */
  settings?: NavMenuSettings;
  /** Shows Log Out in the footer. */
  onLogout?: () => void;
  logoutLabel?: string;
  /** Accessible name of the navigation landmark. */
  'aria-label'?: string;
}

const containsActive = (item: NavMenuItem, activeId?: string): boolean =>
  !!activeId && (item.id === activeId || !!item.children?.some((c) => containsActive(c, activeId)));

const focusRing = 'focus-visible:outline-none focus-visible:shadow-focus';

/** The 2×21 red bar on the left edge of the active item. */
const ActiveBar = () => (
  <span aria-hidden="true" className="absolute left-0 top-1/2 h-nav-indicator-sm w-0.5 -translate-y-1/2 rounded-nav bg-brand-primary" />
);

interface RowProps {
  item: NavMenuItem;
  active: boolean;
  className: string;
  onNavigate?: NavMenuProps['onNavigate'];
  children: ReactNode;
}

/** A link when the item has an href, otherwise a button. */
function NavRow({ item, active, className, onNavigate, children }: RowProps) {
  const common = {
    className: cn('relative flex w-full items-center text-left transition-colors duration-fast ease-standard', focusRing, className),
    'aria-current': active ? ('page' as const) : undefined,
    onClick: (e: MouseEvent<HTMLElement>) => onNavigate?.(item, e),
  };
  return item.href ? (
    <a href={item.href} {...common}>
      {children}
    </a>
  ) : (
    <button type="button" {...common}>
      {children}
    </button>
  );
}

// Top-level rows: 40px, 15px inset, icon → 12px → label.
const topRow = (active: boolean) =>
  cn('gap-3 rounded-md py-2.5 pl-3.75 pr-3.75', active ? 'bg-accent-navy-subtle' : 'hover:bg-surface-subtle');
const topLabel = (active: boolean) =>
  cn('min-w-0 flex-1 truncate font-data text-body', active ? 'font-semibold text-text-primary' : 'font-medium text-text-nav');

// Nested rows (under Reports, Settings): 28px line, indented to sit just before the parent label.
const subRow = (active: boolean) =>
  cn('rounded-nav pl-10 pr-6', active ? 'bg-accent-navy-subtle' : 'hover:bg-surface-subtle');

function NavGroup({ item, activeId, onNavigate }: { item: NavMenuItem; activeId?: string; onNavigate?: NavMenuProps['onNavigate'] }) {
  const [open, setOpen] = useState(() => Boolean(item.defaultOpen) || containsActive(item, activeId));
  const panelId = useId();
  return (
    <li className="flex flex-col gap-1.5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className={cn('relative flex w-full items-center text-left transition-colors duration-fast ease-standard', focusRing, topRow(false))}
      >
        <span className="inline-flex size-5 shrink-0 items-center justify-center text-text-muted [&>svg]:size-5" aria-hidden="true">
          {item.icon}
        </span>
        <span className={topLabel(false)}>{item.label}</span>
        <LucideChevronDownIcon
          aria-hidden="true"
          className={cn('size-4.5 shrink-0 text-text-muted transition-transform duration-fast ease-standard', !open && '-rotate-90')}
        />
      </button>
      <ul id={panelId} hidden={!open} className={cn('flex-col gap-1.5', open ? 'flex' : 'hidden')}>
        {item.children!.map((child) => {
          const active = child.id === activeId;
          return (
            <li key={child.id}>
              <NavRow item={child} active={active} onNavigate={onNavigate} className={subRow(active)}>
                {active && <ActiveBar />}
                <span className={cn('truncate font-data text-body leading-nav tracking-tight', active ? 'text-text-primary' : 'text-text-nav')}>
                  {child.label}
                </span>
              </NavRow>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

function SettingsGroup({ settings, activeId, onNavigate }: { settings: NavMenuSettings; activeId?: string; onNavigate?: NavMenuProps['onNavigate'] }) {
  const [open, setOpen] = useState(() => Boolean(settings.defaultOpen) || settings.items.some((i) => containsActive(i, activeId)));
  const panelId = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex w-full items-center justify-between rounded-nav py-2 pl-3.75 pr-6 text-left transition-colors duration-fast ease-standard hover:bg-surface-subtle',
          focusRing,
        )}
      >
        <span className="flex items-center gap-3.5">
          <Setting2Icon aria-hidden="true" className="size-5 shrink-0 text-text-muted" />
          <span className="font-data text-nav text-text-icon-strong">{settings.label ?? 'Settings'}</span>
        </span>
        <LucideChevronDownIcon
          aria-hidden="true"
          className={cn('size-4.5 shrink-0 text-text-muted transition-transform duration-fast ease-standard', !open && '-rotate-90')}
        />
      </button>
      <ul id={panelId} hidden={!open} className={cn('flex-col gap-1.5', open ? 'flex' : 'hidden')}>
        {settings.items.map((item) => {
          const active = containsActive(item, activeId);
          return (
            <li key={item.id}>
              <NavRow item={item} active={active} onNavigate={onNavigate} className={cn('justify-between', subRow(active))}>
                {active && <ActiveBar />}
                <span className={cn('truncate font-data text-label-sm leading-nav tracking-tight', active ? 'text-text-strong' : 'text-text-tertiary')}>
                  {item.label}
                </span>
                {settings.showChevrons !== false && <LucideChevronRightIcon aria-hidden="true" className="size-4 shrink-0 text-text-muted" />}
              </NavRow>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export const NavMenu = forwardRef<HTMLElement, NavMenuProps>(function NavMenu(
  { sections, activeId, onNavigate, settings, onLogout, logoutLabel = 'Log Out', className, 'aria-label': ariaLabel = 'Main', ...rest },
  ref,
) {
  const hasFooter = Boolean(settings) || Boolean(onLogout);
  return (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={cn(
        'flex h-full w-sidebar shrink-0 flex-col gap-6 overflow-y-auto border-r border-border-default bg-surface-default px-3.25 py-8.75',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col gap-6">
        {sections.map((section) => (
          <div key={section.id} className="flex flex-col gap-2.5">
            {section.label && <p className="px-1.75 font-sans text-caption font-semibold uppercase text-text-tertiary">{section.label}</p>}
            <ul className="flex flex-col gap-1.5">
              {section.items.map((item) =>
                item.children?.length ? (
                  <NavGroup key={item.id} item={item} activeId={activeId} onNavigate={onNavigate} />
                ) : (
                  <li key={item.id}>
                    <NavRow item={item} active={item.id === activeId} onNavigate={onNavigate} className={topRow(item.id === activeId)}>
                      {item.id === activeId && <ActiveBar />}
                      <span className="inline-flex size-5 shrink-0 items-center justify-center text-text-muted [&>svg]:size-5" aria-hidden="true">
                        {item.icon}
                      </span>
                      <span className={topLabel(item.id === activeId)}>{item.label}</span>
                    </NavRow>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>

      {hasFooter && (
        <div className="mt-auto flex flex-col gap-1.5 border-t border-border-default pt-2.5">
          {settings && <SettingsGroup settings={settings} activeId={activeId} onNavigate={onNavigate} />}
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className={cn(
                'flex w-full items-center gap-3.5 rounded-nav py-1.5 pl-3.75 pr-6 text-left transition-colors duration-fast ease-standard hover:bg-surface-subtle',
                focusRing,
              )}
            >
              <LoginIcon aria-hidden="true" className="size-6 shrink-0 -scale-x-100 text-text-muted" />
              <span className="font-data text-nav text-text-icon-strong">{logoutLabel}</span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
});
