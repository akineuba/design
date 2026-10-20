import { cn } from '../../utils/cn';

export interface PaginationProps {
  /** 1-based current page. */
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
  /** Noun used in the summary: "Showing 1-10 of 49 entries". */
  itemLabel?: string;
  className?: string;
}

/** Page numbers with ellipses: always first, last, current ±1. */
export function pageRange(page: number, pageCount: number): (number | 'gap')[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1);
  const pages = new Set([1, pageCount, page - 1, page, page + 1].filter((p) => p >= 1 && p <= pageCount));
  if (page <= 3) [2, 3, 4].forEach((p) => pages.add(p));
  if (page >= pageCount - 2) [pageCount - 3, pageCount - 2, pageCount - 1].forEach((p) => pages.add(p));
  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | 'gap')[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push('gap');
    out.push(p);
  });
  return out;
}

const Arrow = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === 'left' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
  </svg>
);

/** Table footer pagination (Figma Contacts list: "Showing 1-10 of 49 entries", red current page, "10 / page"). */
export function Pagination({ page, pageSize, totalItems, onPageChange, pageSizeOptions = [10, 20, 50], onPageSizeChange, itemLabel = 'entries', className }: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));
  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);
  const navBase = 'inline-flex size-8 items-center justify-center rounded-sm text-body-sm focus-visible:outline-none focus-visible:shadow-focus';
  const navBtn = cn(navBase, 'text-text-secondary hover:bg-surface-subtle disabled:cursor-not-allowed disabled:text-border-strong disabled:hover:bg-transparent');
  const currentBtn = cn(navBase, 'bg-brand-primary font-semibold text-text-inverse hover:bg-brand-primary-hover');

  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-3', className)}>
      <p className="text-body-sm text-text-muted">
        Showing <span className="font-semibold text-text-primary">{from}-{to}</span> of <span className="font-semibold text-text-primary">{totalItems}</span> {itemLabel}
      </p>
      <div className="flex items-center gap-3">
        <nav aria-label="Pagination" className="flex items-center gap-1">
          <button type="button" className={navBtn} onClick={() => onPageChange(page - 1)} disabled={page <= 1} aria-label="Previous page">
            <Arrow dir="left" />
          </button>
          {pageRange(page, pageCount).map((p, i) =>
            p === 'gap' ? (
              <span key={`gap-${i}`} className="inline-flex size-8 items-center justify-center text-body-sm text-text-muted" aria-hidden="true">…</span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={p === page ? 'page' : undefined}
                aria-label={`Page ${p}`}
                className={p === page ? currentBtn : navBtn}
              >
                {p}
              </button>
            ),
          )}
          <button type="button" className={navBtn} onClick={() => onPageChange(page + 1)} disabled={page >= pageCount} aria-label="Next page">
            <Arrow dir="right" />
          </button>
        </nav>
        {onPageSizeChange && (
          <label className="relative inline-flex items-center">
            <span className="sr-only">Rows per page</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-8 appearance-none rounded-sm border border-border-default bg-surface-default pl-3 pr-8 text-body-sm text-text-primary hover:border-border-strong focus-visible:outline-none focus-visible:shadow-focus"
            >
              {pageSizeOptions.map((s) => (
                <option key={s} value={s}>{s} / page</option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-2.5 size-3 text-text-secondary" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
          </label>
        )}
      </div>
    </div>
  );
}
