import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { MoreVertical } from 'lucide-react';
import { cx } from '../../utils/cx';

export interface ActionMenuItem {
  label: string;
  icon?: ReactNode;
  onSelect?: () => void;
  tone?: 'default' | 'danger';
  disabled?: boolean;
}

export interface ActionMenuProps {
  items: ActionMenuItem[];
  /** Accessible name of the trigger, e.g. "Actions for Adam Smith". */
  label?: string;
  trigger?: ReactNode;
  align?: 'start' | 'end';
  /** Replaces the default 32px ⋮ trigger styling (e.g. the top-bar profile button). */
  triggerClassName?: string;
  /** Optional header inside the menu (e.g. signed-in email). */
  header?: ReactNode;
}

/** Row-level ⋮ menu. */
export function ActionMenu({ items, label = 'More actions', trigger, align = 'end', triggerClassName, header }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    ref.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);
  return (
    <div className="sso-menu" ref={ref}>
      <button type="button" className={triggerClassName ?? 'sso-menu__trigger'} aria-haspopup="menu" aria-expanded={open} aria-controls={id} aria-label={label} onClick={() => setOpen(!open)}>
        {trigger ?? <MoreVertical />}
      </button>
      {open && (
        <div id={id} role="menu" className={cx('sso-menu__list', `sso-menu__list--${align}`)}>
          {header && <div className="sso-menu__header">{header}</div>}
          {items.map((it) => (
            <button
              key={it.label}
              type="button"
              role="menuitem"
              disabled={it.disabled}
              className={cx('sso-menu__item', it.tone === 'danger' && 'sso-menu__item--danger')}
              onClick={() => { it.onSelect?.(); setOpen(false); }}
            >
              {it.icon}
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
