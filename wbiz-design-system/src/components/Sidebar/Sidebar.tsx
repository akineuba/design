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
  /** Id of the current page. Its parent groups are highlighted and expanded. */
  activeId?: string;
  onNavigate?: (item: NavItem) => void;
  /** Groups expanded on first render, in addition to the active item's groups. */
  defaultExpanded?: string[];
  /** Open every group on first render (the "fully unfolded" reference). */
  expandAll?: boolean;
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

const groupIds = (items: NavItem[], pick: (i: NavItem) => boolean): string[] =>
  items.flatMap((i) => (i.children?.length ? [...(pick(i) ? [i.id] : []), ...groupIds(i.children, pick)] : []));

/**
 * App navigation. Figma: sidebar-content (new features, 7067:32543) for the metrics, and the fully
 * unfolded menu supplied by the design team for the structure. Three levels:
 * modules (44px, Inter Semibold 14, fg-strong, 18px icon), pages (40px, Inter 14, fg, 16px icon) and
 * sub-pages (36px, Inter 13, fg, 14px icon, indented), sized from the live product reference. Any level can be a group. The active page and its modules get the
 * primary tint; the module also gets a 3px indicator bar.
 */
export function Sidebar({
  items,
  activeId,
  onNavigate,
  defaultExpanded = [],
  expandAll = false,
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
  const [expanded, setExpanded] = useState<string[]>(() =>
    expandAll ? groupIds(items, () => true) : [...defaultExpanded, ...groupIds(items, (i) => containsActive(i, activeId))],
  );
  const toggleGroup = (id: string) =>
    setExpanded((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const rowBase =
    'relative flex w-full items-center gap-3 rounded-xl text-left font-sans transition-colors ' +
    'focus-visible:outline-none focus-visible:shadow-focus';

  // Per-level metrics. Level 0 = module, 1 = page, 2+ = sub-page.
  const level = (depth: number) =>
    depth === 0
      ? { row: 'h-nav-item px-2.5 py-2.5 text-sm font-semibold', idle: 'text-fg-strong', icon: 'size-icon-md' }
      : depth === 1
        ? { row: 'h-nav-subitem px-2.5 py-2 text-sm', idle: 'text-fg', icon: 'size-icon-sm' }
        : { row: 'h-nav-leaf py-2 pl-8 pr-2.5 text-13', idle: 'text-fg', icon: 'size-icon-xs' };

  const icon = (node: ReactNode | undefined, cls: string) =>
    node ? <span className="inline-flex size-5 shrink-0 items-center justify-center" aria-hidden><span className={cls}>{node}</span></span> : null;

  const leaf = (item: NavItem, depth: number) => {
    const active = item.id === activeId;
    const m = level(depth);
    const cls = cx(
      rowBase,
      m.row,
      collapsed && 'justify-center px-0',
      active ? 'bg-primary-tint font-medium text-primary' : cx(m.idle, 'hover:bg-surface-muted'),
    );
    const content = (
      <>
        {icon(item.icon, m.icon)}
        <span className={cx('min-w-0 flex-1 truncate', collapsed && 'sr-only')}>{item.label}</span>
      </>
    );
    const common = {
      className: cls,
      'aria-current': active ? ('page' as const) : undefined,
      title: collapsed ? item.label : item.label.length > 20 ? item.label : undefined,
      onClick: (e: MouseEvent) => {
        if (!item.href) e.preventDefault();
        onNavigate?.(item);
      },
    };
    return item.href ? <a href={item.href} {...common}>{content}</a> : <button type="button" {...common}>{content}</button>;
  };

  const node = (item: NavItem, depth: number): JSX.Element => {
    if (!item.children?.length) return <li key={item.id}>{leaf(item, depth)}</li>;
    const open = expanded.includes(item.id) && !collapsed;
    const activeGroup = containsActive(item, activeId);
    const m = level(depth);
    return (
      <li key={item.id} className="flex flex-col gap-0.5">
        <button
          type="button"
          aria-expanded={open}
          title={collapsed ? item.label : item.label.length > 20 ? item.label : undefined}
          onClick={() => (collapsed ? (setCollapsed(false), setExpanded((c) => [...c, item.id])) : toggleGroup(item.id))}
          className={cx(
            rowBase,
            m.row,
            collapsed && 'justify-center px-0',
            activeGroup ? cx('text-primary', depth === 0 && 'bg-primary-tint') : cx(m.idle, 'hover:bg-surface-muted'),
          )}
        >
          {activeGroup && depth === 0 && <span className="absolute inset-y-0.5 left-0 w-nav-indicator rounded-xl bg-primary" aria-hidden />}
          {icon(item.icon, m.icon)}
          <span className={cx('min-w-0 flex-1 truncate', collapsed && 'sr-only')}>{item.label}</span>
          {!collapsed && (
            <span className={cx('inline-flex size-5 shrink-0 items-center justify-center', activeGroup ? 'text-primary' : 'text-icon-muted')} aria-hidden>
              <span className={cx('size-icon-xs transition-transform duration-200', open && 'rotate-180')}><ChevronDownIcon /></span>
            </span>
          )}
        </button>
        {open && (
          <ul className="flex flex-col">
            {item.children.map((c) => node(c, depth + 1))}
          </ul>
        )}
      </li>
    );
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
          {items.map((item) => node(item, 0))}
        </ul>
      </nav>
    </aside>
  );
}
