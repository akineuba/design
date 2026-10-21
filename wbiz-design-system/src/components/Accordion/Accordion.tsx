import { createContext, useContext, useId, useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ChevronDownIcon } from '../../icons';

export type AccordionVariant = 'card' | 'form';
type AccordionCtx = { isOpen: (id: string) => boolean; toggle: (id: string) => void; variant: AccordionVariant } | null;
const Ctx = createContext<AccordionCtx>(null);

export interface AccordionProps {
  children: ReactNode;
  /** `single` keeps one section open at a time; `multiple` lets any number stay open. */
  type?: 'single' | 'multiple';
  /** Item values open on first render. */
  defaultValue?: string[];
  /** card: new features form blocks. form: accounting side-panel sections. Applies to every item. */
  variant?: AccordionVariant;
  className?: string;
}

/** Stack of collapsible form sections with 16px between them. */
export function Accordion({ children, type = 'multiple', defaultValue = [], variant = 'card', className }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultValue);
  const ctx: AccordionCtx = {
    isOpen: (id) => open.includes(id),
    toggle: (id) =>
      setOpen((cur) =>
        cur.includes(id) ? cur.filter((x) => x !== id) : type === 'single' ? [id] : [...cur, id],
      ),
    variant,
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
  /** Overrides the group's variant. */
  variant?: AccordionVariant;
  className?: string;
}

/**
 * Collapsible section. Figma: block-basic-info (new features, 7092:1482): white card, 1px line-subtle
 * border, 12px radius, 50px header (16/24 padding, Inter Semibold 15) and a 24px-padded body with 20px gaps.
 * The `form` variant is the side-panel section (New Customer, accounting 209:4142): #D1D5DB border,
 * 10px radius, Roboto Medium 15 black header, no divider, 10px side padding and 16px between fields.
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
  variant: variantProp,
  className,
}: AccordionItemProps) {
  const group = useContext(Ctx);
  const variant = variantProp ?? group?.variant ?? 'card';
  const form = variant === 'form';
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
    <section className={cx('w-full overflow-hidden border bg-surface', form ? 'rounded-xl border-line-field' : 'rounded-panel border-line-subtle', className)}>
      <h3 className="m-0">
        <button
          id={headerId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          disabled={disabled}
          onClick={toggle}
          className={cx(
            'flex w-full items-center justify-between gap-4 text-left text-15 transition-colors',
            form ? 'px-2.5 py-4 font-data font-medium text-fg-black' : 'px-6 py-4 font-sans font-semibold text-fg-strong',
            'focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:text-fg-disabled',
            !disabled && 'hover:bg-surface-page',
            open && !form && 'border-b border-line-subtle',
          )}
        >
          <span className="min-w-0 truncate">{title}</span>
          <span className="flex shrink-0 items-center gap-3">
            {meta}
            <span className={cx('transition-transform duration-200', form ? 'size-icon text-fg-black' : 'size-icon-sm text-icon-muted', open && 'rotate-180')}>
              <ChevronDownIcon />
            </span>
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={headerId} hidden={!open} className={cx(open ? 'flex' : 'hidden', 'flex-col', form ? 'gap-4 px-2.5 pb-4' : 'gap-5 p-6')}>
        {children}
      </div>
    </section>
  );
}
