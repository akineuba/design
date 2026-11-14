import { useMemo, useState, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { CaretDownIcon, CollapseSidebarIcon, SearchIcon, SignOutIcon } from '../icons';
import { Avatar } from './Avatar';
import { Logo } from './Logo';
import { IBROKA_NAV, type NavModule, type NavPage } from './nav';

export interface SidebarProps {
  /** Menu tree. Defaults to the full iBroka menu. */
  modules?: NavModule[];
  /** id of the current module, page or sub-page. */
  activeId: string;
  onNavigate?: (id: string) => void;
  /** Modules open on first render. The active page's module is always opened. */
  defaultExpanded?: string[];
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  user?: { name: string; email: string; role?: string };
  onSignOut?: () => void;
  className?: string;
}

const contains = (p: NavPage, id: string): boolean => p.id === id || (p.children ?? []).some((c) => contains(c, id));
const moduleOf = (mods: NavModule[], id: string) => mods.find((m) => m.id === id || (m.pages ?? []).some((p) => contains(p, id)));

/**
 * The one menu for the platform (UI rule 18). Figma nav: 251px, chrome background, 20px padding,
 * logo + collapse, rounded search, 48px module rows (filled 18px icon, Regular 15), sub-pages indented,
 * active item teal with a 3px teal bar, user at the bottom.
 */
export function Sidebar({ modules = IBROKA_NAV, activeId, onNavigate, defaultExpanded = [], collapsed = false, onCollapsedChange, user, onSignOut, className }: SidebarProps) {
  const activeModule = moduleOf(modules, activeId);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set([...defaultExpanded, ...(activeModule ? [activeModule.id] : [])]));
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return modules;
    const match = (s: string) => s.toLowerCase().includes(q);
    const prune = (ps: NavPage[]): NavPage[] =>
      ps.flatMap((p) => {
        const kids = prune(p.children ?? []);
        return match(p.label) || kids.length ? [{ ...p, children: match(p.label) ? p.children : kids }] : [];
      });
    return modules.flatMap((m) => {
      const pages = prune(m.pages ?? []);
      return match(m.label) || pages.length ? [{ ...m, pages: match(m.label) ? m.pages : pages }] : [];
    });
  }, [modules, query]);

  const toggle = (id: string) =>
    setExpanded((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  const isOpen = (id: string) => query.trim() !== '' || expanded.has(id);

  const go = (id: string) => onNavigate?.(id);

  const row = 'flex w-full items-center gap-2.5 text-15 transition-colors ib-focus';
  const activeRow = 'border-l-[3px] border-brand rounded-r-lg text-primary font-medium';

  const renderPage = (p: NavPage, depth: number): ReactNode => {
    const active = p.id === activeId;
    const parentOfActive = !active && contains(p, activeId);
    const hasKids = (p.children ?? []).length > 0;
    return (
      <li key={p.id}>
        <button
          type="button"
          aria-current={active ? 'page' : undefined}
          aria-expanded={hasKids ? isOpen(p.id) : undefined}
          onClick={() => (hasKids ? toggle(p.id) : go(p.id))}
          style={{ paddingLeft: depth === 1 ? 30 : 46 }}
          className={cx(row, 'justify-between rounded-lg py-2.5 pr-2.5 text-left', active ? 'bg-brand-subtle font-medium text-primary' : parentOfActive ? 'font-medium text-fg' : 'text-fg hover:bg-surface-muted')}
        >
          <span className="truncate">{p.label}</span>
          {hasKids && (
            <span className={cx('size-3.5 shrink-0 transition-transform', isOpen(p.id) && 'rotate-180')} aria-hidden>
              <CaretDownIcon />
            </span>
          )}
        </button>
        {hasKids && isOpen(p.id) && <ul>{p.children!.map((c) => renderPage(c, depth + 1))}</ul>}
      </li>
    );
  };

  return (
    <nav
      aria-label="Main"
      className={cx(
        'flex h-full shrink-0 flex-col justify-between gap-5 overflow-hidden bg-surface-chrome p-5 shadow-chrome transition-[width] duration-200',
        collapsed ? 'w-sidebar-collapsed px-3' : 'w-sidebar',
        className,
      )}
    >
      <div className="flex min-h-0 flex-col gap-5">
        <div className={cx("flex shrink-0 items-center", collapsed ? "flex-col gap-4" : "justify-between")}>
          <Logo variant={collapsed ? 'mark' : 'full'} height={collapsed ? 32 : 30} />
          <button
            type="button"
            aria-label={collapsed ? 'Expand menu' : 'Collapse menu'}
            aria-pressed={collapsed}
            onClick={() => onCollapsedChange?.(!collapsed)}
            className="inline-flex size-8 items-center justify-center rounded-md text-fg hover:bg-surface-muted ib-focus"
          >
            <span className={cx('size-icon-nav', collapsed && 'rotate-180')}>
              <CollapseSidebarIcon />
            </span>
          </button>
        </div>
        {!collapsed && (
          <label className="flex h-control-lg shrink-0 items-center gap-2.5 rounded-xl bg-surface-sunken px-5 focus-within:shadow-focus">
            <span className="size-icon-nav text-fg-muted" aria-hidden>
              <SearchIcon />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search menu"
              aria-label="Search menu"
              className="w-full min-w-0 bg-transparent text-15 text-fg-strong placeholder:text-fg-placeholder focus:outline-none"
            />
          </label>
        )}
        <ul className="-mx-1 flex min-h-0 flex-col gap-0.5 overflow-y-auto px-1">
          {filtered.length === 0 && <li className="px-5 py-3 text-13 text-fg-muted">No menu items match "{query}"</li>}
          {filtered.map((m) => {
            const hasPages = (m.pages ?? []).length > 0;
            const active = m.id === activeId;
            const holdsActive = activeModule?.id === m.id && !active;
            const open = hasPages && isOpen(m.id);
            return (
              <li key={m.id}>
                <button
                  type="button"
                  title={collapsed ? m.label : undefined}
                  aria-label={collapsed ? m.label : undefined}
                  aria-current={active ? 'page' : undefined}
                  aria-expanded={hasPages && !collapsed ? open : undefined}
                  onClick={() => {
                    if (collapsed) {
                      onCollapsedChange?.(false);
                      if (hasPages) setExpanded((s) => new Set(s).add(m.id));
                      else go(m.id);
                    } else if (hasPages) toggle(m.id);
                    else go(m.id);
                  }}
                  className={cx(
                    row,
                    'h-control-lg',
                    collapsed ? 'justify-center rounded-lg' : 'justify-between pl-5 pr-2.5',
                    active ? activeRow : holdsActive ? 'rounded-lg font-medium text-fg' : 'rounded-lg text-fg hover:bg-surface-muted',
                    collapsed && (active || holdsActive) && 'bg-brand-subtle text-primary',
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span className={cx('size-icon-nav shrink-0', (active || holdsActive) && 'text-primary')} aria-hidden>
                      {m.icon}
                    </span>
                    {!collapsed && <span className="truncate">{m.label}</span>}
                  </span>
                  {!collapsed && hasPages && (
                    <span className={cx('size-3.5 shrink-0 transition-transform', open && 'rotate-180')} aria-hidden>
                      <CaretDownIcon />
                    </span>
                  )}
                </button>
                {!collapsed && open && <ul className="flex flex-col">{m.pages!.map((p) => renderPage(p, 1))}</ul>}
              </li>
            );
          })}
        </ul>
      </div>
      {user && (
        <div className={cx('flex items-center gap-2.5 border-t border-line-subtle pt-4', collapsed && 'flex-col')}>
          <Avatar name={user.name} size="md" />
          {!collapsed && (
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-15 font-medium text-fg-strong">{user.name}</span>
              <span className="truncate text-12 text-fg-muted">{user.email}</span>
            </div>
          )}
          {onSignOut && (
            <button type="button" aria-label="Sign out" title="Sign out" onClick={onSignOut} className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-fg-muted hover:bg-surface-muted hover:text-danger ib-focus">
              <span className="size-icon-nav">
                <SignOutIcon />
              </span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
