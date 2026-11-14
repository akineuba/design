import { useState, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { FieldSizeContext } from './Field';
import { Button } from './Button';
import { CaretDownIcon, CheckIcon } from '../icons';

export interface FilterBarProps {
  /** Card title above the filters (Figma charts page: "Text"). */
  title?: ReactNode;
  /** Main filters, always shown (Date first). */
  children: ReactNode;
  /** Extra filters revealed by "More filters" (UI rule 20). */
  more?: ReactNode;
  onApply: () => void;
  applying?: boolean;
  /** Link at the far right of the second row: "Advanced". */
  advanced?: ReactNode;
  className?: string;
}

/** Report filter card under the page title. Nothing reloads until Apply (UI rule 21). Fields are 34px. */
export function FilterBar({ title, children, more, onApply, applying, advanced, className }: FilterBarProps) {
  const [open, setOpen] = useState(false);
  return (
    <FieldSizeContext.Provider value="filter">
      <section className={cx('flex flex-col gap-4 rounded-lg bg-surface px-4.5 py-4.5 shadow-card', className)}>
        {title && <h2 className="text-18 font-semibold text-fg-strong">{title}</h2>}
        <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
          <div className="flex flex-1 flex-wrap items-end gap-x-5 gap-y-3 [&>*]:w-[224px]">{children}</div>
          <div className="flex items-center gap-2.5">
            {more && (
              <Button variant="tertiary" size="sm" aria-expanded={open} onClick={() => setOpen(!open)} trailingIcon={<span className={cx('block transition-transform', open && 'rotate-180')}><CaretDownIcon /></span>}>
                {open ? 'Fewer filters' : 'More filters'}
              </Button>
            )}
            <Button size="sm" leadingIcon={<CheckIcon />} loading={applying} onClick={onApply}>
              Apply
            </Button>
          </div>
        </div>
        {more && open && (
          <div className="flex flex-wrap items-end gap-x-5 gap-y-3 border-t border-line-subtle pt-4">
            <div className="flex flex-1 flex-wrap items-end gap-x-5 gap-y-3 [&>*]:w-[224px]">{more}</div>
            {advanced}
          </div>
        )}
      </section>
    </FieldSizeContext.Provider>
  );
}
