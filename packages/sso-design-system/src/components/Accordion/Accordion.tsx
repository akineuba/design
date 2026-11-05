import { useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cx } from '../../utils/cx';

export interface AccordionProps {
  title: ReactNode;
  /** Inline markers next to the title (Tag / StatusPill). */
  meta?: ReactNode;
  /** Content shown on the right of the header row, e.g. price. */
  aside?: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

/** Expandable card. Used for one-per-organisation subscription blocks. */
export function Accordion({ title, meta, aside, defaultOpen = false, open, onOpenChange, children }: AccordionProps) {
  const [inner, setInner] = useState(defaultOpen);
  const isOpen = open ?? inner;
  const id = useId();
  const toggle = () => {
    setInner(!isOpen);
    onOpenChange?.(!isOpen);
  };
  return (
    <section className={cx('sso-accordion', isOpen && 'is-open')}>
      <h3 className="sso-accordion__heading">
        <button type="button" className="sso-accordion__trigger" aria-expanded={isOpen} aria-controls={`${id}-panel`} onClick={toggle}>
          <span className="sso-accordion__title">{title}</span>
          {meta && <span className="sso-accordion__meta">{meta}</span>}
          <span className="sso-accordion__spacer" />
          {aside && <span className="sso-accordion__aside">{aside}</span>}
          <ChevronDown className="sso-accordion__chevron" aria-hidden />
        </button>
      </h3>
      {isOpen && (
        <div id={`${id}-panel`} className="sso-accordion__panel">
          {children}
        </div>
      )}
    </section>
  );
}
