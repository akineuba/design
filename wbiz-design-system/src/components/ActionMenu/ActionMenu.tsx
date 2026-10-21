import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { MoreVerticalIcon } from '../../icons';

export type ActionTone = 'view' | 'edit' | 'delete' | 'link' | 'positive';

export interface ActionMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  /** Colour from Figma: view grey, edit amber, delete red, link blue, positive green. */
  tone?: ActionTone;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface ActionMenuProps {
  items: ActionMenuItem[];
  /** Accessible name for the kebab button, e.g. "Actions for Daniel Olabode". */
  label: string;
  /** Custom trigger content. Defaults to the vertical kebab. */
  trigger?: ReactNode;
  className?: string;
}

const toneClass: Record<ActionTone, string> = {
  view: 'text-action-view',
  edit: 'text-action-edit',
  delete: 'text-action-delete',
  link: 'text-action-link',
  positive: 'text-action-positive',
};

/**
 * Row actions behind a kebab button. Figma: actions (Customers, 191:3853): white, 1px line-subtle
 * border, 4px radius, Roboto 14 items with 16px icons, each coloured by what it does.
 * The menu is positioned against the viewport so table scroll containers do not clip it.
 */
export function ActionMenu({ items, label, trigger, className }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [style, setStyle] = useState<CSSProperties>({});
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuId = useId();
  const enabled = items.filter((i) => !i.disabled);

  const place = useCallback(() => {
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    const below = window.innerHeight - r.bottom > 220;
    setStyle({
      position: 'fixed',
      right: window.innerWidth - r.right,
      ...(below ? { top: r.bottom + 4 } : { bottom: window.innerHeight - r.top + 4 }),
    });
  }, []);

  useLayoutEffect(() => { if (open) place(); }, [open, place]);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled])')[active]?.focus();
  }, [open, active]);

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !btnRef.current?.contains(t)) setOpen(false);
    };
    const shut = () => setOpen(false);
    document.addEventListener('mousedown', close);
    window.addEventListener('resize', shut);
    window.addEventListener('scroll', shut, true);
    return () => {
      document.removeEventListener('mousedown', close);
      window.removeEventListener('resize', shut);
      window.removeEventListener('scroll', shut, true);
    };
  }, [open]);

  const select = (item: ActionMenuItem) => {
    if (item.disabled) return;
    setOpen(false);
    btnRef.current?.focus();
    item.onSelect?.();
  };

  const onMenuKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => (a + 1) % enabled.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => (a - 1 + enabled.length) % enabled.length); }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0); }
    else if (e.key === 'End') { e.preventDefault(); setActive(enabled.length - 1); }
    else if (e.key === 'Escape' || e.key === 'Tab') { setOpen(false); btnRef.current?.focus(); }
  };

  return (
    <div className={cx('inline-flex align-middle', className)}>
      <button
        ref={btnRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => { setActive(0); setOpen((o) => !o); }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            setActive(e.key === 'ArrowDown' ? 0 : enabled.length - 1);
            setOpen(true);
          }
        }}
        className={cx(
          'inline-flex size-control-xs items-center justify-center rounded-lg text-fg-muted transition-colors',
          'hover:bg-surface-muted focus-visible:outline-none focus-visible:shadow-focus',
          open && 'bg-surface-muted',
        )}
      >
        {trigger ?? <span className="size-icon"><MoreVerticalIcon /></span>}
      </button>
      {open && (
        <ul
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={label}
          onKeyDown={onMenuKey}
          style={style}
          className="z-30 flex min-w-action-menu flex-col gap-1 rounded-sm border border-line-subtle bg-surface p-2 shadow-md"
        >
          {items.map((item) => (
            <li key={item.id} role="none">
              <button
                type="button"
                role="menuitem"
                tabIndex={-1}
                aria-disabled={item.disabled || undefined}
                onClick={() => select(item)}
                className={cx(
                  'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left font-data text-sm transition-colors',
                  'hover:bg-surface-muted focus:bg-surface-muted focus:outline-none',
                  item.disabled ? 'cursor-not-allowed text-fg-disabled' : toneClass[item.tone ?? 'view'],
                )}
              >
                {item.icon && <span className="inline-flex size-icon-sm shrink-0" aria-hidden>{item.icon}</span>}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
