import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import { MoreVertical } from 'lucide-react';
import { cx } from '../../utils/cx';

/** Colour by what the action does (same as the ERP ActionMenu). */
export type ActionTone = 'view' | 'edit' | 'delete' | 'link' | 'positive';

export interface ActionMenuItem {
  id?: string;
  label: string;
  icon?: ReactNode;
  tone?: ActionTone;
  onSelect?: () => void;
  disabled?: boolean;
}

export interface ActionMenuProps {
  items: ActionMenuItem[];
  /** Accessible name of the trigger, e.g. "Actions for AIM Group". */
  label: string;
  /** Custom trigger content. Defaults to the vertical kebab. */
  trigger?: ReactNode;
  /** Replaces the 32px kebab button styling (e.g. the top-bar profile button). */
  triggerClassName?: string;
  /** Optional header inside the menu (e.g. signed-in email). */
  header?: ReactNode;
  className?: string;
}

/**
 * Row actions behind a kebab button, as in the ERP: white popup, 1px line-subtle border,
 * 4px radius, 14px items with 16px icons coloured by tone. Positioned against the
 * viewport so table scroll containers don't clip it. Arrow keys, Home, End, Esc.
 */
export function ActionMenu({ items, label, trigger, triggerClassName, header, className }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(0);
  const [style, setStyle] = useState<CSSProperties>({});
  const btn = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLUListElement>(null);
  const id = useId();
  const enabled = items.filter((i) => !i.disabled);

  const place = useCallback(() => {
    const r = btn.current?.getBoundingClientRect();
    if (!r) return;
    const below = window.innerHeight - r.bottom > 220;
    setStyle({ position: 'fixed', right: window.innerWidth - r.right, ...(below ? { top: r.bottom + 4 } : { bottom: window.innerHeight - r.top + 4 }) });
  }, []);

  useLayoutEffect(() => { if (open) place(); }, [open, place]);
  useEffect(() => {
    if (open) menu.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled])')[focus]?.focus();
  }, [open, focus]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!menu.current?.contains(t) && !btn.current?.contains(t)) setOpen(false);
    };
    const close = () => setOpen(false);
    document.addEventListener('mousedown', onDown);
    window.addEventListener('resize', close);
    window.addEventListener('scroll', close, true);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('resize', close);
      window.removeEventListener('scroll', close, true);
    };
  }, [open]);

  const select = (it: ActionMenuItem) => {
    if (it.disabled) return;
    setOpen(false);
    btn.current?.focus();
    it.onSelect?.();
  };
  const onKey = (e: KeyboardEvent) => {
    const n = enabled.length;
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocus((f) => (f + 1) % n); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setFocus((f) => (f - 1 + n) % n); }
    else if (e.key === 'Home') { e.preventDefault(); setFocus(0); }
    else if (e.key === 'End') { e.preventDefault(); setFocus(n - 1); }
    else if (e.key === 'Escape' || e.key === 'Tab') { setOpen(false); btn.current?.focus(); }
  };

  return (
    <div className={cx('sso-menu', className)}>
      <button
        ref={btn}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        className={triggerClassName ?? 'sso-menu__trigger'}
        onClick={() => { setFocus(0); setOpen((o) => !o); }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            setFocus(e.key === 'ArrowDown' ? 0 : enabled.length - 1);
            setOpen(true);
          }
        }}
      >
        {trigger ?? <MoreVertical aria-hidden />}
      </button>
      {open && (
        <ul ref={menu} id={id} role="menu" aria-label={label} onKeyDown={onKey} style={style} className="sso-menu__list">
          {header && <li role="none" className="sso-menu__header">{header}</li>}
          {items.map((it) => (
            <li role="none" key={it.id ?? it.label}>
              <button
                type="button"
                role="menuitem"
                tabIndex={-1}
                aria-disabled={it.disabled || undefined}
                onClick={() => select(it)}
                className={cx('sso-menu__item', !it.disabled && `sso-menu__item--${it.tone ?? 'view'}`)}
              >
                {it.icon && <span className="sso-menu__icon" aria-hidden>{it.icon}</span>}
                {it.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
