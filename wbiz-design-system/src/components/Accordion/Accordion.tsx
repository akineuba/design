import { createContext, useContext, useId, useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ChevronDownIcon } from '../../icons';

type AccordionCtx = { isOpen: (id: string) => boolean; toggle: (id: string) => void } | null;
const Ctx = createContext<AccordionCtx>(null);

export interface AccordionProps {
  children: ReactNode;
  /** `single` keeps one section open at a time; `multiple` lets any number stay open. */
  type?: 'single' | 'multiple';
  /** Item values open on first render. */
  defaultValue?: string[];
  className?: string;
}

/** Stack of collapsible form sections with 16px between them. */
export function Accordion({ children, type = 'multiple', defaultValue = [], className }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultValue);
  const ctx: AccordionCtx = {
    isOpen: (id) => open.includes(id),
    toggle: (id) =>
      setOpen((cur) =>
        cur.includes(id) ? cur.filter((x) => x !== id) : type === 'single' ? [id] : [...cur, id],
      ),
  };
  return (
    <Ctx.Provider value={ctx}>
      <div className={cx('flex w-full flex-col gap-4', className)}>{children}</div>
    </Ctx.Provider>
  );
}

export interface AccordionItemProps {
  title: ReactNode;
  children: ReactNode;
  /** Identifies the item inside an `Accordion`. */
  value?: string;
  /** Uncontrolled initial state when used on its own. */
  defaultOpen?: boolean;
  /** Controlled state when used on its own. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Content on the right of the header, before the chevron (e.g. a status pill or count). */
  meta?: ReactNode;
  disabled?: boolean;
  className?: string;
}

/**
 * Collapsible section. Figma: block-basic-info (new features, 7092:1482): white card, 1px line-subtle
 * border, 12px radius, 50px header (16/24 padding, Inter Semibold 15) and a 24px-padded body with 20px gaps.
 */
export function AccordionItem({
  title,
  children,
  value,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  meta,
  disabled,
  className,
}: AccordionItemProps) {
  const group = useContext(Ctx);
  const autoId = useId();
  const id = value ?? autoId;
  const [inner, setInner] = useState(defaultOpen);
  const open = group ? group.isOpen(id) : openProp ?? inner;
  const toggle = () => {
    if (disabled) return;
    if (group) group.toggle(id);
    else {
      if (openProp === undefined) setInner(!open);
      onOpenChange?.(!open);
    }
  };
  const headerId = `${autoId}-header`;
  const panelId = `${autoId}-panel`;

  return (
    <section className={cx('w-full overflow-hidden rounded-panel border border-line-subtle bg-surface', className)}>
      <h3 className="m-0">
        <button
          id={headerId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          disabled={disabled}
          onClick={toggle}
          className={cx(
            'flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-sans text-15 font-semibold text-fg-strong transition-colors',
            'focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:text-fg-disabled',
            !disabled && 'hover:bg-surface-page',
            open && 'border-b border-line-subtle',
          )}
        >
          <span className="min-w-0 truncate">{title}</span>
          <span className="flex shrink-0 items-center gap-3">
            {meta}
            <span className={cx('size-icon-sm text-icon-muted transition-transform duration-200', open && 'rotate-180')}>
              <ChevronDownIcon />
            </span>
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={headerId} hidden={!open} className={cx(open ? 'flex' : 'hidden', 'flex-col gap-5 p-6')}>
        {children}
      </div>
    </section>
  );
}
