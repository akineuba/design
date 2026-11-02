import { useEffect, useId, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { usePopover } from '../lib/usePopover';
import { MoreIcon } from '../icons';

export type ActionTone = 'default' | 'edit' | 'danger' | 'link' | 'positive';

export interface ActionItem {
  label: string;
  icon?: ReactNode;
  /** Colour by meaning (UI rule 14): View default, Edit amber, Delete red, navigation link, money-in positive. */
  tone?: ActionTone;
  onSelect: () => void;
  disabled?: boolean;
}

export interface ActionMenuProps {
  items: ActionItem[];
  /** Accessible name for the ⋯ button: "Actions for ASG Oil & Gas". */
  'aria-label': string;
  align?: 'left' | 'right';
  defaultOpen?: boolean;
}

const toneCls: Record<ActionTone, string> = {
  default: 'text-fg-strong',
  edit: 'text-warning',
  danger: 'text-danger',
  link: 'text-info',
  positive: 'text-success',
};

/** Row actions behind the ⋯ button at the end of a table row: View, Edit, Delete, then related actions. */
export function ActionMenu({ items, align = 'right', defaultOpen, ...aria }: ActionMenuProps) {
  const { open, setOpen, close, rootRef, triggerRef } = usePopover<HTMLDivElement>(defaultOpen);
  const menuId = useId();
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  useEffect(() => {
    if (open && !defaultOpen) itemRefs.current.find((b) => b && !b.disabled)?.focus();
  }, [open, defaultOpen]);
  const onKey = (e: KeyboardEvent) => {
    if (!['ArrowDown', 'ArrowUp'].includes(e.key)) return;
    e.preventDefault();
    const btns = itemRefs.current.filter((b): b is HTMLButtonElement => !!b && !b.disabled);
    const i = btns.indexOf(document.activeElement as HTMLButtonElement);
    btns[(i + (e.key === 'ArrowDown' ? 1 : -1) + btns.length) % btns.length]?.focus();
  };
  return (
    <div ref={rootRef} className="relative inline-flex">
      <button
        ref={triggerRef}
        type="button"
        aria-label={aria['aria-label']}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(!open)}
        className={cx('inline-flex size-8 items-center justify-center rounded-md text-fg-muted hover:bg-surface-muted hover:text-fg-strong ib-focus', open && 'bg-surface-muted text-fg-strong')}
      >
        <span className="size-icon">
          <MoreIcon />
        </span>
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          onKeyDown={onKey}
          className={cx(
            'absolute top-full z-30 mt-1 min-w-[180px] animate-fade-in rounded-md border border-line-subtle bg-surface py-1 shadow-pop',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          {items.map((it, i) => (
            <button
              key={it.label}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              role="menuitem"
              type="button"
              disabled={it.disabled}
              onClick={() => {
                it.onSelect();
                close();
              }}
              className={cx(
                'flex w-full items-center gap-2.5 px-4 py-2 text-left text-13 font-medium hover:bg-surface-muted focus-visible:bg-surface-muted focus-visible:outline-none disabled:cursor-not-allowed disabled:text-fg-disabled',
                !it.disabled && toneCls[it.tone ?? 'default'],
              )}
            >
              {it.icon && (
                <span className="size-icon-sm shrink-0" aria-hidden>
                  {it.icon}
                </span>
              )}
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
