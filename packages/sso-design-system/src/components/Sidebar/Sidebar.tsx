import type { MouseEvent, ReactNode } from 'react';
import { ChevronRight, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cx } from '../../utils/cx';
import { Logo } from '../Logo/Logo';

export interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  href?: string;
}

export interface SidebarProps {
  items: NavItem[];
  activeId: string;
  onNavigate?: (id: string, e: MouseEvent) => void;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
  /** Pinned to the bottom (e.g. help link, version). */
  footer?: ReactNode;
}

/**
 * SSO portal sidebar. White rail, flat list, the active item is a solid
 * primary-blue pill with a trailing chevron. Shows the SSO Portal logo.
 */
export function Sidebar({ items, activeId, onNavigate, collapsed = false, onToggleCollapsed, footer }: SidebarProps) {
  return (
    <aside className={cx('sso-sidebar', collapsed && 'is-collapsed')} aria-label="Main navigation">
      <div className="sso-sidebar__header">
        <Logo variant={collapsed ? 'mark' : 'sso'} height={collapsed ? 32 : 40} />
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
        <ul className="sso-sidebar__list">
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={item.href ?? '#'}
                  className={cx('sso-nav-item', active && 'is-active')}
                  aria-current={active ? 'page' : undefined}
                  title={collapsed ? item.label : undefined}
                  onClick={(e) => onNavigate?.(item.id, e)}
                >
                  <span className="sso-nav-item__icon" aria-hidden>{item.icon}</span>
                  <span className="sso-nav-item__label">{item.label}</span>
                  {active && <ChevronRight className="sso-nav-item__chevron" aria-hidden />}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      {footer && <div className="sso-sidebar__footer">{footer}</div>}
    </aside>
  );
}
