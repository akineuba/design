import { useId } from 'react';
import { cx } from '../lib/cx';
import { CaretLeftIcon, CaretRightIcon } from '../icons';
import { QuickFilter } from './FilterDropdown';

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizes?: number[];
  className?: string;
}

function pageList(page: number, pages: number): Array<number | '…'> {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const set = new Set([1, pages, page - 1, page, page + 1]);
  const list = [...set].filter((p) => p >= 1 && p <= pages).sort((a, b) => a - b);
  const out: Array<number | '…'> = [];
  list.forEach((p, i) => {
    if (i && p - list[i - 1] > 1) out.push('…');
    out.push(p);
  });
  return out;
}

/** Table footer: "Showing 1-10 of 24 entries" left; pages and page size right (UI rule 26). */
export function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange, pageSizes = [10, 25, 50, 100], className }: PaginationProps) {
  const id = useId();
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);
  const btn = 'inline-flex size-[22px] items-center justify-center rounded-[5px] text-13 ib-focus disabled:cursor-not-allowed disabled:text-fg-disabled';
  return (
    <nav aria-label="Pagination" className={cx('flex flex-wrap items-center justify-between gap-3 px-4.5 py-3.5', className)}>
      <p id={id} className="text-13 text-fg-muted">
        Showing {from}-{to} of {total.toLocaleString('en-NG')} entries
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <ul className="flex items-center gap-2.5">
          <li>
            <button type="button" aria-label="Previous page" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className={cx(btn, 'text-fg-muted hover:text-fg-strong')}>
              <span className="size-3">
                <CaretLeftIcon />
              </span>
            </button>
          </li>
          {pageList(page, pages).map((p, i) =>
            p === '…' ? (
              <li key={`e${i}`} className="px-1 text-13 text-fg-muted" aria-hidden>
                …
              </li>
            ) : (
              <li key={p}>
                <button
                  type="button"
                  aria-current={p === page ? 'page' : undefined}
                  aria-label={`Page ${p}`}
                  onClick={() => onPageChange(p)}
                  className={cx(btn, 'min-w-[22px] px-1', p === page ? 'bg-primary font-semibold text-fg-inverse' : 'text-fg-strong hover:bg-surface-muted')}
                >
                  {p}
                </button>
              </li>
            ),
          )}
          <li>
            <button type="button" aria-label="Next page" disabled={page >= pages} onClick={() => onPageChange(page + 1)} className={cx(btn, 'text-fg-muted hover:text-fg-strong')}>
              <span className="size-3">
                <CaretRightIcon />
              </span>
            </button>
          </li>
        </ul>
        {onPageSizeChange && (
          <QuickFilter
            label="Rows"
            value={String(pageSize)}
            options={pageSizes.map((s) => ({ value: String(s), label: `${s} / page` }))}
            onChange={(v) => onPageSizeChange(Number(v))}
          />
        )}
      </div>
    </nav>
  );
}
