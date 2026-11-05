import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import { ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cx } from '../../utils/cx';
import { Logo } from '../Logo/Logo';

export interface NavItem {
  id: string;
  label: string;
  /** Required on top-level items; sub-items are text-only. */
  icon?: ReactNode;
  href?: string;
  /** Count shown as an amber badge (e.g. items waiting for review). */
  badge?: number;
  /** Sub-items. The parent becomes an expandable group. */
  children?: NavItem[];
}

export interface SidebarProps {
  items: NavItem[];
  activeId: string;
  onNavigate?: (id: string, e: MouseEvent) => void;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
  /** Items pinned to the bottom of the panel (e.g. Settings, Help). */
  footerItems?: NavItem[];
}

const containsActive = (item: NavItem, activeId: string) => !!item.children?.some((c) => c.id === activeId);

/**
 * SSO portal sidebar, styled after the ERP nav v2 panel: a soft panel on a grey rail,
 * 18px grey outline icons, 14px text, and a raised white pill with blue text for the
 * current page. Groups expand to text-only sub-items beside a guide line.
 */
export function Sidebar({ items, activeId, onNavigate, collapsed = false, onToggleCollapsed, footerItems }: SidebarProps) {
  const [open, setOpen] = useState<Set<string>>(() => new Set(items.filter((i) => containsActive(i, activeId)).map((i) => i.id)));

  useEffect(() => {
    const parent = items.find((i) => containsActive(i, activeId));
    if (parent) setOpen((s) => (s.has(parent.id) ? s : new Set(s).add(parent.id)));
  }, [activeId, items]);

  const toggle = (id: string) => setOpen((s) => {
    const n = new Set(s);
    if (n.has(id)) n.delete(id); else n.add(id);
    return n;
  });

  const renderItem = (item: NavItem) => {
    const isGroup = !!item.children?.length;
    const active = item.id === activeId;
    const groupActive = isGroup && containsActive(item, activeId);
    const expanded = isGroup && open.has(item.id) && !collapsed;
    const content = (
      <>
        <span className="sso-nav-item__icon" aria-hidden>{item.icon}</span>
        <span className="sso-nav-item__label">{item.label}</span>
        {item.badge !== undefined && item.badge > 0 && <span className="sso-nav-badge">{item.badge > 99 ? '99+' : item.badge}</span>}
        {isGroup && (expanded ? <ChevronDown className="sso-nav-item__chevron" aria-hidden /> : <ChevronRight className="sso-nav-item__chevron" aria-hidden />)}
      </>
    );
    return (
      <li key={item.id}>
        {isGroup ? (
          <button
            type="button"
            className={cx('sso-nav-item', 'sso-nav-item--group', groupActive && 'is-within')}
            aria-expanded={expanded}
            title={collapsed ? item.label : undefined}
            onClick={() => (collapsed ? onToggleCollapsed?.() : toggle(item.id))}
          >
            {content}
          </button>
        ) : (
          <a
            href={item.href ?? '#'}
            className={cx('sso-nav-item', active && 'is-active')}
            aria-current={active ? 'page' : undefined}
            title={collapsed ? item.label : undefined}
            onClick={(e) => onNavigate?.(item.id, e)}
          >
            {content}
          </a>
        )}
        {expanded && (
          <ul className="sso-nav-sub">
            {item.children!.map((c) => {
              const subActive = c.id === activeId;
              return (
                <li key={c.id}>
                  <a
                    href={c.href ?? '#'}
                    className={cx('sso-nav-subitem', subActive && 'is-active')}
                    aria-current={subActive ? 'page' : undefined}
                    onClick={(e) => onNavigate?.(c.id, e)}
                  >
                    <span className="sso-nav-item__label">{c.label}</span>
                    {c.badge !== undefined && c.badge > 0 && <span className="sso-nav-badge">{c.badge > 99 ? '99+' : c.badge}</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside className={cx('sso-sidebar', collapsed && 'is-collapsed')} aria-label="Main navigation">
      <div className="sso-sidebar__panel">
        <div className="sso-sidebar__header">
          <Logo variant={collapsed ? 'mark' : 'sso'} height={collapsed ? 26 : 30} />
          {onToggleCollapsed && (
            <button
              type="button"
              className="sso-sidebar__collapse"
              onClick={onToggleCollapsed}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!collapsed}
            >
              {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
            </button>
          )}
        </div>
        <nav className="sso-sidebar__nav">
          <ul className="sso-sidebar__list">{items.map(renderItem)}</ul>
        </nav>
        {footerItems && footerItems.length > 0 && (
          <ul className="sso-sidebar__list sso-sidebar__footer">{footerItems.map(renderItem)}</ul>
        )}
      </div>
    </aside>
  );
}
