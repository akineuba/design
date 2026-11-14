import { useId, useState, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { CaretDownIcon } from '../icons';

export interface AccordionProps {
  title: ReactNode;
  /** Right-side summary when closed: "3 fields missing", a total. */
  meta?: ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  /** card = bordered section of a long form (UI rule 29). plain = list rows without a box. */
  variant?: 'card' | 'plain';
  children: ReactNode;
}

/** Collapsible section. Long forms split into these with the first open (UI rule 29). */
export function Accordion({ title, meta, defaultOpen = false, disabled, variant = 'card', children }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={cx(variant === 'card' ? 'rounded-lg border border-line-subtle bg-surface' : 'border-b border-line-subtle')}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-p`}
          disabled={disabled}
          onClick={() => setOpen(!open)}
          className={cx('flex w-full items-center justify-between gap-4 text-left ib-focus disabled:cursor-not-allowed disabled:text-fg-disabled', variant === 'card' ? 'rounded-lg px-4.5 py-4' : 'py-3.5', 'text-15 font-semibold text-fg-strong')}
        >
          <span>{title}</span>
          <span className="flex items-center gap-3">
            {meta && <span className="text-13 font-normal text-fg-muted">{meta}</span>}
            <span className={cx('size-icon-nav text-fg-strong transition-transform', open && 'rotate-180')} aria-hidden>
              <CaretDownIcon />
            </span>
          </span>
        </button>
      </h3>
      <div id={`${id}-p`} role="region" hidden={!open} className={cx(variant === 'card' ? 'border-t border-line-subtle px-4.5 py-4' : 'pb-4')}>
        {children}
      </div>
    </div>
  );
}
