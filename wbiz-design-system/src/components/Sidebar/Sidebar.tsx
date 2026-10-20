import { useState, type MouseEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ChevronDownIcon, ChevronLeftIcon } from '../../icons';

export interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  children?: NavItem[];
}

export interface SidebarProps {
  items: NavItem[];
  /** Id of the current page. Its parent group is highlighted and expanded. */
  activeId?: string;
  onNavigate?: (item: NavItem) => void;
  /** Groups expanded on first render, in addition to the active item's group. */
  defaultExpanded?: string[];
  /** Icon-only rail. Controlled when `onCollapsedChange` is passed. */
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Logo shown at the top. Pass a compact mark via `logoCollapsed` for the rail. */
  logo?: ReactNode;
  logoCollapsed?: ReactNode;
  sectionTitle?: string;
  className?: string;
}

const containsActive = (item: NavItem, activeId?: string): boolean =>
  !!activeId && (item.id === activeId || !!item.children?.some((c) => containsActive(c, activeId)));

/**
 * App navigation. Figma: sidebar-content (new features, 7067:32543), the newest version of the menu.
 * 200px wide on surface-sunken. Items are 48px (Inter Semibold 15, fg), sub-items 44px. The active
 * group gets a primary tint, primary text and a 3px indicator bar.
 */
export function Sidebar({
  items,
  activeId,
  onNavigate,
  defaultExpanded = [],
  collapsed: collapsedProp,
  onCollapsedChange,
  logo,
  logoCollapsed,
  sectionTitle = 'Main menu',
  className,
}: SidebarProps) {
  const [innerCollapsed, setInnerCollapsed] = useState(false);
  const collapsed = collapsedProp ?? innerCollapsed;
  const setCollapsed = (v: boolean) => {
    if (collapsedProp === undefined) setInnerCollapsed(v);
    onCollapsedChange?.(v);
  };
  const [expanded, setExpanded] = useState<string[]>(() => [
    ...defaultExpanded,
    ...items.filter((i) => i.children && containsActive(i, activeId)).map((i) => i.id),
  ]);
  const toggleGroup = (id: string) =>
    setExpanded((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const rowBase =
    'relative flex w-full items-center gap-3 rounded-xl text-left font-sans text-15 transition-colors ' +
    'focus-visible:outline-none focus-visible:shadow-focus';

  const Leaf = ({ item, sub }: { item: NavItem; sub?: boolean }) => {
    const active = item.id === activeId;
    const cls = cx(
      rowBase,
      sub ? 'h-nav-subitem p-2.5' : 'h-nav-item px-2.5 py-3 font-semibold',
      collapsed && 'justify-center px-0',
      active ? 'bg-primary-tint font-medium text-primary' : cx(sub ? 'text-fg-muted' : 'text-fg', 'hover:bg-surface-muted'),
    );
    const content = (
      <>
        {item.icon && <span className="inline-flex size-6 shrink-0 items-center justify-center" aria-hidden><span className="size-icon">{item.icon}</span></span>}
        <span className={cx('min-w-0 flex-1 truncate', collapsed && 'sr-only')}>{item.label}</span>
      </>
    );
    const common = {
      className: cls,
      'aria-current': active ? ('page' as const) : undefined,
      title: collapsed ? item.label : undefined,
      onClick: (e: MouseEvent) => {
        if (!item.href) e.preventDefault();
        onNavigate?.(item);
      },
    };
    return item.href ? <a href={item.href} {...common}>{content}</a> : <button type="button" {...common}>{content}</button>;
  };

  return (
    <aside
      className={cx(
        'flex h-full shrink-0 flex-col overflow-y-auto bg-surface-sunken px-1 py-6 transition-[width] duration-200',
        collapsed ? 'w-sidebar-collapsed' : 'w-sidebar',
        className,
      )}
    >
      <div className={cx('flex items-start gap-2 px-2.5 pb-6', collapsed ? 'flex-col items-center' : 'justify-between')}>
        <div className="min-w-0">{collapsed ? logoCollapsed ?? logo : logo}</div>
        <button
          type="button"
          aria-label={collapsed ? 'Expand menu' : 'Collapse menu'}
          aria-expanded={!collapsed}
          onClick={() => setCollapsed(!collapsed)}
          className="inline-flex size-6 shrink-0 items-center justify-center rounded-lg border border-fg text-fg hover:bg-surface-muted focus-visible:outline-none focus-visible:shadow-focus"
        >
          <span className={cx('size-icon-xs transition-transform duration-200', collapsed && 'rotate-180')}><ChevronLeftIcon /></span>
        </button>
      </div>

      <p className={cx('px-6 py-2 font-sans text-xs font-bold uppercase text-fg-muted', collapsed && 'sr-only')}>{sectionTitle}</p>

      <nav aria-label={sectionTitle}>
        <ul className="flex flex-col gap-0.5">
          {items.map((item) => {
            if (!item.children?.length) return <li key={item.id}><Leaf item={item} /></li>;
            const open = expanded.includes(item.id) && !collapsed;
            const activeGroup = containsActive(item, activeId);
            return (
              <li key={item.id} className="flex flex-col gap-1">
                <button
                  type="button"
                  aria-expanded={open}
                  title={collapsed ? item.label : undefined}
                  onClick={() => (collapsed ? (setCollapsed(false), setExpanded((c) => [...c, item.id])) : toggleGroup(item.id))}
                  className={cx(
                    rowBase,
                    'h-nav-item px-2.5 py-3 font-semibold',
                    collapsed && 'justify-center px-0',
                    activeGroup ? 'bg-primary-tint text-primary' : 'text-fg hover:bg-surface-muted',
                  )}
                >
                  {activeGroup && <span className="absolute inset-y-0.5 left-0 w-nav-indicator rounded-xl bg-primary" aria-hidden />}
                  {item.icon && <span className="inline-flex size-6 shrink-0 items-center justify-center" aria-hidden><span className="size-icon">{item.icon}</span></span>}
                  <span className={cx('min-w-0 flex-1 truncate', collapsed && 'sr-only')}>{item.label}</span>
                  {!collapsed && (
                    <span className={cx('inline-flex size-6 shrink-0 items-center justify-center', activeGroup ? 'text-primary' : 'text-icon-muted')} aria-hidden>
                      <span className={cx('size-icon-sm transition-transform duration-200', open && 'rotate-180')}><ChevronDownIcon /></span>
                    </span>
                  )}
                </button>
                {open && (
                  <ul className="flex flex-col">
                    {item.children.map((c) => <li key={c.id}><Leaf item={c} sub /></li>)}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
