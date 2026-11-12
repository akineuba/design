import { useEffect, useId, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, HistoryIcon, HomeIcon, SearchIcon, StarIcon } from '../../icons';

export interface NavItem {
  id: string;
  label: string;
  /** Shorter name for the module rail, where the label sits under the icon (e.g. "HR"). */
  shortLabel?: string;
  icon?: ReactNode;
  href?: string;
  children?: NavItem[];
}

export interface NavMenuProps {
  /** Modules, top to bottom in the rail. Their children are the pages shown in the panel. */
  items: NavItem[];
  /** Modules pinned to the bottom of the rail (Settings, Help). */
  footerItems?: NavItem[];
  /** Id of the current page. Its module gets the blue bar in the rail and opens in the panel. */
  activeId?: string;
  onNavigate?: (item: NavItem) => void;
  /** Rail only, without the panel and search. Controlled when `onCollapsedChange` is passed. */
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Logo shown at the top. Pass a compact mark via `logoCollapsed` for the rail-only state. */
  logo?: ReactNode;
  logoCollapsed?: ReactNode;
  /** Panel shown first: 'home' or a module id. Defaults to the current page's module. */
  defaultView?: string;
  /** Show the Home entry (recent and pinned pages) at the top of the rail. */
  showHome?: boolean;
  /** Recently visited page ids, most recent first, listed on Home. */
  recentIds?: string[];
  /** Pinned page ids, listed on Home. Controlled when `onPinnedChange` is passed. */
  pinnedIds?: string[];
  defaultPinnedIds?: string[];
  onPinnedChange?: (ids: string[]) => void;
  searchPlaceholder?: string;
  className?: string;
}

const HOME = '__home';

type Entry = { item: NavItem; path: NavItem[] };

const containsActive = (item: NavItem, activeId?: string): boolean =>
  !!activeId && (item.id === activeId || !!item.children?.some((c) => containsActive(c, activeId)));

function indexItems(items: NavItem[]) {
  const map = new Map<string, Entry>();
  const walk = (list: NavItem[], path: NavItem[]) =>
    list.forEach((item) => {
      map.set(item.id, { item, path });
      if (item.children) walk(item.children, [...path, item]);
    });
  walk(items, []);
  return map;
}

const hasPages = (item: NavItem) => !!item.children?.length;

/**
 * App navigation: a module rail and a page panel. Layout from the navigation reference images
 * supplied by design (Nov 2026): logo and collapse button, "Find in menu" search, then the rail
 * (icon over a short label; Settings and Help at the bottom) beside a rounded panel listing the
 * selected module's pages (text only, no icons). Home lists recent and pinned pages. Compact metrics
 * and colours follow the Settings reference (Nov 2026): the module being viewed is a raised white card
 * with a primary icon and label, other modules are fg-muted; the current page is primary on
 * primary-muted. In the collapsed rail the module holding the current page gets the selected style. Pages with sub-pages
 * open in place with a back link. Hovering a page shows a star that pins it to Home.
 */
export function NavMenu({
  items,
  footerItems = [],
  activeId,
  onNavigate,
  collapsed: collapsedProp,
  onCollapsedChange,
  logo,
  logoCollapsed,
  defaultView,
  showHome = true,
  recentIds = [],
  pinnedIds: pinnedProp,
  defaultPinnedIds = [],
  onPinnedChange,
  searchPlaceholder = 'Find in menu',
  className,
}: NavMenuProps) {
  const panelId = useId();
  const searchRef = useRef<HTMLInputElement>(null);
  const index = useMemo(() => indexItems([...items, ...footerItems]), [items, footerItems]);

  const [innerCollapsed, setInnerCollapsed] = useState(false);
  const collapsed = collapsedProp ?? innerCollapsed;
  const setCollapsed = (v: boolean) => {
    if (collapsedProp === undefined) setInnerCollapsed(v);
    onCollapsedChange?.(v);
  };

  const [innerPinned, setInnerPinned] = useState(defaultPinnedIds);
  const pinned = pinnedProp ?? innerPinned;
  const togglePin = (id: string) => {
    const next = pinned.includes(id) ? pinned.filter((x) => x !== id) : [...pinned, id];
    if (pinnedProp === undefined) setInnerPinned(next);
    onPinnedChange?.(next);
  };

  // Which module the panel shows, and which sub-page groups are opened inside it.
  const activeEntry = activeId ? index.get(activeId) : undefined;
  const activeModule = activeEntry ? activeEntry.path[0] ?? activeEntry.item : undefined;
  const drillFor = (moduleId: string) =>
    activeEntry && activeModule?.id === moduleId ? activeEntry.path.slice(1).map((i) => i.id) : [];
  const initialView = defaultView === 'home' ? HOME : defaultView ?? (activeModule && hasPages(activeModule) ? activeModule.id : HOME);
  const [view, setView] = useState(initialView);
  const [drill, setDrill] = useState<string[]>(() => (initialView === HOME ? [] : drillFor(initialView)));
  const [query, setQuery] = useState('');

  const openModule = (id: string) => {
    setQuery('');
    setView(id);
    setDrill(id === HOME ? [] : drillFor(id));
    if (collapsed) setCollapsed(false);
  };

  // "/" focuses the search from anywhere outside a text field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      if (t && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName))) return;
      e.preventDefault();
      if (collapsed) setCollapsed(false);
      requestAnimationFrame(() => searchRef.current?.focus());
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  const navigate = (item: NavItem) => (e: MouseEvent) => {
    if (!item.href) e.preventDefault();
    onNavigate?.(item);
  };

  const focusRing = 'focus-visible:outline-hidden focus-visible:shadow-focus';

  // ---------- Rail ----------
  const railButton = (item: NavItem, opts: { home?: boolean } = {}) => {
    const id = opts.home ? HOME : item.id;
    const viewed = !collapsed && !query && view === id;
    const leafModule = !opts.home && !hasPages(item);
    // Only one module looks active: the one being viewed. The module holding the current page is
    // marked only when nothing is viewed (collapsed rail) or when it is a page itself (Approvals).
    const holdsActive = !opts.home && (collapsed || leafModule) && containsActive(item, activeId);
    const cls = cx(
      'relative flex h-nav-rail-item w-full flex-col items-center justify-center gap-0.5 rounded-xl font-sans text-11 font-medium transition-colors',
      focusRing,
      // Selected: raised white card, primary icon and label. Others: fg-muted icon and label.
      viewed || holdsActive ? 'bg-surface text-primary shadow-xs' : 'text-fg-muted hover:bg-surface-muted hover:text-fg-strong',
    );
    const content = (
      <>
        <span className="size-icon-md" aria-hidden>{item.icon}</span>
        <span className="max-w-full truncate px-0.5">{item.shortLabel ?? item.label}</span>
      </>
    );
    const title = item.shortLabel && item.shortLabel !== item.label ? item.label : undefined;
    if (leafModule) {
      return item.href ? (
        <a href={item.href} className={cls} title={title} aria-current={item.id === activeId ? 'page' : undefined} onClick={navigate(item)}>{content}</a>
      ) : (
        <button type="button" className={cls} title={title} aria-current={item.id === activeId ? 'page' : undefined} onClick={navigate(item)}>{content}</button>
      );
    }
    return (
      <button type="button" className={cls} title={title} aria-pressed={viewed} aria-controls={collapsed ? undefined : panelId} onClick={() => openModule(id)}>
        {content}
      </button>
    );
  };

  // ---------- Panel ----------
  const pageRow = (item: NavItem, opts: { path?: string; pinnable?: boolean } = {}) => {
    const group = hasPages(item);
    const active = item.id === activeId;
    const holdsActive = group && containsActive(item, activeId);
    const isPinned = pinned.includes(item.id);
    const pinnable = opts.pinnable !== false && !group;
    const cls = cx(
      'flex min-h-nav-row w-full items-center gap-2 rounded-lg px-2 py-1 text-left font-sans text-13 transition-colors',
      focusRing,
      // Only pinned rows keep room for the star; otherwise it floats over the row end on hover.
      pinnable && isPinned && 'pr-7',
      active ? 'bg-primary-muted font-medium text-primary' : cx(holdsActive ? 'text-primary' : group ? 'text-fg-strong' : 'text-fg', 'hover:bg-surface-muted'),
      group && 'font-semibold',
    );
    const content = (
      <>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate" title={item.label.length > 20 ? item.label : undefined}>{item.label}</span>
          {opts.path && <span className="truncate text-2xs font-regular text-fg-muted">{opts.path}</span>}
        </span>
        {group && <span className="size-icon-xs shrink-0 text-icon-muted" aria-hidden><ChevronRightIcon /></span>}
      </>
    );
    return (
      <li key={item.id} className="group/row relative">
        {group ? (
          <button type="button" className={cls} onClick={() => { setQuery(''); setDrill((d) => [...d, item.id]); }}>{content}</button>
        ) : item.href ? (
          <a href={item.href} className={cls} aria-current={active ? 'page' : undefined} onClick={navigate(item)}>{content}</a>
        ) : (
          <button type="button" className={cls} aria-current={active ? 'page' : undefined} onClick={navigate(item)}>{content}</button>
        )}
        {pinnable && (
          <button
            type="button"
            aria-label={isPinned ? `Unpin ${item.label}` : `Pin ${item.label}`}
            aria-pressed={isPinned}
            onClick={() => togglePin(item.id)}
            className={cx(
              'absolute right-1 top-1/2 inline-flex size-5 -translate-y-1/2 items-center justify-center rounded-md transition-opacity',
              focusRing,
              isPinned ? 'text-warning' : 'bg-surface text-icon-muted opacity-0 shadow-xs hover:text-warning group-hover/row:opacity-100 focus-visible:opacity-100',
            )}
          >
            <span className="size-icon-xs"><StarIcon fill={isPinned ? 'currentColor' : 'none'} /></span>
          </button>
        )}
      </li>
    );
  };

  const [recentOpen, setRecentOpen] = useState(true);
  const [pinnedOpen, setPinnedOpen] = useState(true);
  const section = (title: string, icon: ReactNode, open: boolean, setOpen: (v: boolean) => void, rows: ReactNode) => (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={cx('flex items-center gap-1.5 rounded-md px-1 py-0.5 font-sans text-11 font-semibold uppercase text-fg-muted hover:text-fg-strong', focusRing)}
      >
        <span className="size-icon-xs" aria-hidden>{icon}</span>
        <span className="flex-1 text-left">{title}</span>
        <span className={cx('size-icon-xs transition-transform duration-200', !open && '-rotate-90')} aria-hidden><ChevronDownIcon /></span>
      </button>
      {open && <ul className="flex flex-col gap-1">{rows}</ul>}
    </div>
  );

  const lookup = (ids: string[]) => ids.map((id) => index.get(id)?.item).filter((i): i is NavItem => !!i && !hasPages(i));
  const pathOf = (id: string) => index.get(id)?.path.map((p) => p.shortLabel ?? p.label).join(' › ');

  const title = (text: string) => <h2 className="px-2 pt-1 font-sans text-15 font-semibold text-fg-ink">{text}</h2>;

  const panelBody = () => {
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      const results = [...index.values()].filter(({ item }) => !hasPages(item) && item.label.toLowerCase().includes(q));
      return (
        <>
          {title('Results')}
          {results.length ? (
            <ul className="flex flex-col gap-1.5">{results.map(({ item }) => pageRow(item, { path: pathOf(item.id) }))}</ul>
          ) : (
            <p className="px-2 font-sans text-13 text-fg-muted">No pages match “{query.trim()}”.</p>
          )}
        </>
      );
    }
    if (view === HOME) {
      const recent = lookup(recentIds);
      const pins = lookup(pinned);
      return (
        <>
          {title('Home')}
          {recent.length > 0 &&
            section('Recent', <HistoryIcon />, recentOpen, setRecentOpen, recent.map((i) => pageRow(i, { path: pathOf(i.id) })))}
          {pins.length > 0 ? (
            section('Pinned', <StarIcon />, pinnedOpen, setPinnedOpen, pins.map((i) => pageRow(i, { path: pathOf(i.id) })))
          ) : (
            <div className="flex flex-col items-center gap-1 rounded-lg border border-dashed border-line px-3 py-4 text-center font-sans">
              <span className="mb-0.5 size-icon-sm text-warning" aria-hidden><StarIcon /></span>
              <p className="text-13 font-medium text-fg-strong">Pin the pages you use most</p>
              <p className="text-xs text-fg-muted">Pick a module on the left, hover a page and click the star.</p>
            </div>
          )}
        </>
      );
    }
    const module = index.get(view)?.item;
    if (!module) return null;
    const groups = drill.map((id) => index.get(id)?.item).filter((i): i is NavItem => !!i);
    const current = groups[groups.length - 1] ?? module;
    const parent = groups.length > 1 ? groups[groups.length - 2] : groups.length ? module : undefined;
    return (
      <>
        {parent && (
          <button
            type="button"
            onClick={() => setDrill((d) => d.slice(0, -1))}
            className={cx('-mb-1.5 inline-flex items-center gap-1 self-start rounded-md px-1.5 font-sans text-xs text-fg-muted hover:text-fg-strong', focusRing)}
          >
            <span className="size-icon-xs" aria-hidden><ChevronLeftIcon /></span>
            {parent.label}
          </button>
        )}
        {title(current.label)}
        <ul className="flex flex-col gap-1.5">{current.children?.map((c) => pageRow(c))}</ul>
      </>
    );
  };

  const panelLabel = query.trim() ? 'Search results' : view === HOME ? 'Home' : index.get(view)?.item.label;

  return (
    <aside className={cx('flex h-full w-fit shrink-0 flex-col gap-3 bg-surface-sunken px-2 py-4', className)}>
      <div className={cx('flex gap-2 px-1', collapsed ? 'flex-col items-center' : 'items-center justify-between')}>
        <div className="min-w-0">{collapsed ? logoCollapsed ?? logo : logo}</div>
        <button
          type="button"
          aria-label={collapsed ? 'Expand menu' : 'Collapse menu'}
          aria-expanded={!collapsed}
          onClick={() => setCollapsed(!collapsed)}
          className={cx('inline-flex size-6 shrink-0 items-center justify-center rounded-md border border-fg-strong text-fg-strong hover:bg-surface-muted', focusRing)}
        >
          <span className={cx('size-icon-xs transition-transform duration-200', collapsed && 'rotate-180')}><ChevronLeftIcon /></span>
        </button>
      </div>

      {!collapsed && (
        <label className="flex h-control-xs items-center gap-2 rounded-lg border border-line-subtle bg-surface px-2.5 focus-within:shadow-focus">
          <span className="size-icon-sm shrink-0 text-icon-muted" aria-hidden><SearchIcon /></span>
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            aria-controls={panelId}
            className="h-full w-0 min-w-0 flex-1 bg-transparent font-sans text-13 text-fg-strong outline-hidden placeholder:text-fg-placeholder"
          />
          <kbd className="rounded-sm border border-line px-1 font-sans text-11 text-fg-muted" aria-hidden>/</kbd>
        </label>
      )}

      <div className="flex min-h-0 flex-1 gap-1">
        <nav aria-label="Modules" className="flex w-nav-rail shrink-0 flex-col gap-1">
          <ul className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto">
            {showHome && (
              <>
                <li>{railButton({ id: HOME, label: 'Home', icon: <HomeIcon /> }, { home: true })}</li>
                <li className="mx-2 my-1 h-px shrink-0 bg-line" aria-hidden />
              </>
            )}
            {items.map((item) => <li key={item.id}>{railButton(item)}</li>)}
          </ul>
          {footerItems.length > 0 && (
            <ul className="flex flex-col gap-0.5">
              {footerItems.map((item) => <li key={item.id}>{railButton(item)}</li>)}
            </ul>
          )}
        </nav>

        {!collapsed && (
          <nav
            id={panelId}
            aria-label={panelLabel}
            className="flex w-nav-panel min-w-0 flex-col gap-3 overflow-y-auto rounded-xl border border-line-subtle bg-surface-nav p-2"
          >
            {panelBody()}
          </nav>
        )}
      </div>
    </aside>
  );
}
