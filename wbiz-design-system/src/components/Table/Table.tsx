import {
  forwardRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react';
import { cx } from '../../utils/cx';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '../../icons';

/* ------------------------------------------------------------------------------------------------
 * Primitives. Figma: table-card on Consumption Requisitions (new features, 7053:5545).
 * Header row 38px on surface-page, Roboto Semibold 12 fg-muted. Body rows 54px, Roboto 14 fg-strong,
 * 1px line-subtle dividers, 24px outer padding and 16px between cells.
 * ---------------------------------------------------------------------------------------------- */

export type TableAlign = 'left' | 'center' | 'right';
const alignClass: Record<TableAlign, string> = { left: 'text-left', center: 'text-center', right: 'text-right' };

/** Scroll container + table. Wide tables scroll horizontally inside the card instead of the page. */
export const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(function Table(
  { className, ...rest },
  ref,
) {
  return (
    <div className="w-full overflow-x-auto">
      <table ref={ref} className={cx('w-full border-collapse font-data', className)} {...rest} />
    </div>
  );
});

export function TableHead({ className, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cx('bg-surface-page', className)} {...rest} />;
}

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Highlights the row (e.g. the record open in a side panel). */
  selected?: boolean;
  /** Adds hover feedback and a pointer for clickable rows. */
  interactive?: boolean;
}

export function TableRow({ selected, interactive, className, ...rest }: TableRowProps) {
  return (
    <tr
      aria-selected={selected || undefined}
      className={cx(
        'border-b border-line-subtle bg-surface',
        interactive && 'cursor-pointer hover:bg-surface-page',
        selected && 'bg-primary-tint hover:bg-primary-tint',
        className,
      )}
      {...rest}
    />
  );
}

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign;
}

export function TableHeaderCell({ align = 'left', className, ...rest }: TableHeaderCellProps) {
  return (
    <th
      scope="col"
      className={cx(
        'h-row-head whitespace-nowrap border-b border-line-subtle px-2 py-3 text-xs font-semibold text-fg-muted first:pl-6 last:pr-6',
        alignClass[align],
        className,
      )}
      {...rest}
    />
  );
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign;
}

export function TableCell({ align = 'left', className, ...rest }: TableCellProps) {
  return (
    <td
      className={cx('h-row px-2 py-4 text-sm text-fg-strong first:pl-6 last:pr-6', alignClass[align], className)}
      {...rest}
    />
  );
}

/* ------------------------------------------------------------------------------------------------
 * Card chrome: container, toolbar, footer.
 * ---------------------------------------------------------------------------------------------- */

/** White card with a 1px line-subtle border and 10px radius that holds a toolbar, table and footer. */
export function TableCard({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('w-full min-w-0 overflow-hidden rounded-xl border border-line-subtle bg-surface', className)} {...rest} />;
}

/** Row above the table: search on the left, filters and actions on the right. Wraps on narrow screens. */
export function TableToolbar({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx('flex flex-wrap items-center justify-between gap-3 border-b border-line-subtle p-4', className)}
      {...rest}
    />
  );
}

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Accessible name; the visible placeholder is not a label. */
  'aria-label': string;
}

/** 32px search box used in table toolbars. */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { className, ...rest },
  ref,
) {
  return (
    <label
      className={cx(
        'flex h-control-xs w-field max-w-full items-center gap-2.5 rounded-lg border border-line-subtle bg-surface px-4',
        'focus-within:border-primary focus-within:shadow-focus',
        className,
      )}
    >
      <span className="inline-flex size-icon-sm shrink-0 text-fg-placeholder">
        <SearchIcon />
      </span>
      <input
        ref={ref}
        type="search"
        className="h-full min-w-0 flex-1 bg-transparent font-data text-sm text-fg-strong outline-none placeholder:text-fg-placeholder"
        {...rest}
      />
    </label>
  );
});

export interface TableFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Left-hand summary, e.g. "Showing 1 to 4 of 4 entries". */
  summary?: ReactNode;
}

export function TableFooter({ summary, className, children, ...rest }: TableFooterProps) {
  return (
    <div className={cx('flex flex-wrap items-center justify-between gap-3 bg-surface-page p-4', className)} {...rest}>
      <p className="font-data text-sm text-fg-muted">{summary}</p>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Pagination. Figma draws the active page (32px, primary, 6px radius) and the per-page select.
 * Inactive pages and previous/next buttons are derived from the same metrics.
 * ---------------------------------------------------------------------------------------------- */

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
  className?: string;
}

function pageList(page: number, count: number): Array<number | 'gap'> {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const set = new Set([1, count, page - 1, page, page + 1].filter((p) => p >= 1 && p <= count));
  const sorted = [...set].sort((a, b) => a - b);
  const out: Array<number | 'gap'> = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push('gap');
    out.push(p);
  });
  return out;
}

const pageBtn =
  'inline-flex size-control-xs items-center justify-center rounded-md font-data text-sm transition-colors ' +
  'focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:text-fg-disabled';

export function Pagination({
  page,
  pageCount,
  onPageChange,
  pageSize,
  pageSizeOptions = [10, 20, 50],
  onPageSizeChange,
  className,
}: PaginationProps) {
  const pages = pageList(page, Math.max(pageCount, 1));
  return (
    <nav aria-label="Pagination" className={cx('flex flex-wrap items-center gap-3', className)}>
      <div className="flex items-center gap-1">
        {pageCount > 1 && (
          <button type="button" aria-label="Previous page" className={cx(pageBtn, 'text-fg-muted hover:bg-surface-muted')} disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            <span className="size-icon-sm"><ChevronLeftIcon /></span>
          </button>
        )}
        {pages.map((p, i) =>
          p === 'gap' ? (
            <span key={`gap-${i}`} className="px-1 font-data text-sm text-fg-muted" aria-hidden>…</span>
          ) : (
            <button
              key={p}
              type="button"
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
              onClick={() => onPageChange(p)}
              className={cx(
                pageBtn,
                p === page ? 'bg-primary font-semibold text-fg-inverse' : 'text-fg-strong hover:bg-surface-muted',
              )}
            >
              {p}
            </button>
          ),
        )}
        {pageCount > 1 && (
          <button type="button" aria-label="Next page" className={cx(pageBtn, 'text-fg-muted hover:bg-surface-muted')} disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
            <span className="size-icon-sm"><ChevronRightIcon /></span>
          </button>
        )}
      </div>
      {pageSize !== undefined && onPageSizeChange && (
        <label className="relative inline-flex items-center">
          <span className="sr-only">Rows per page</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-control-xs cursor-pointer appearance-none rounded-md border border-line-subtle bg-surface py-1.5 pl-3 pr-8 font-data text-13 text-fg-strong focus-visible:outline-none focus-visible:shadow-focus"
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>{n}/page</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 size-icon-xs text-fg-strong"><ChevronDownIcon /></span>
        </label>
      )}
    </nav>
  );
}

/* ------------------------------------------------------------------------------------------------
 * DataTable: column-driven table with loading and empty states, built from the primitives.
 * ---------------------------------------------------------------------------------------------- */

export interface DataTableColumn<Row> {
  key: string;
  header: ReactNode;
  /** Cell content. Defaults to `row[key]`. */
  render?: (row: Row) => ReactNode;
  align?: TableAlign;
  /** Extra classes for this column's cells, e.g. a min-width token. */
  className?: string;
}

export interface DataTableProps<Row> {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  getRowId: (row: Row) => string;
  /** Shows skeleton rows instead of data. */
  loading?: boolean;
  /** Number of skeleton rows while loading. */
  loadingRows?: number;
  /** Shown when there are no rows and not loading. */
  empty?: ReactNode;
  onRowClick?: (row: Row) => void;
  selectedRowId?: string;
  /** Accessible table caption (visually hidden). */
  caption?: string;
}

export function DataTable<Row>({
  columns,
  rows,
  getRowId,
  loading = false,
  loadingRows = 4,
  empty = 'No records yet.',
  onRowClick,
  selectedRowId,
  caption,
}: DataTableProps<Row>) {
  return (
    <Table aria-busy={loading || undefined}>
      {caption && <caption className="sr-only">{caption}</caption>}
      <TableHead>
        <tr>
          {columns.map((c) => (
            <TableHeaderCell key={c.key} align={c.align} className={c.className}>
              {c.header}
            </TableHeaderCell>
          ))}
        </tr>
      </TableHead>
      <TableBody>
        {loading ? (
          Array.from({ length: loadingRows }, (_, i) => (
            <TableRow key={`sk-${i}`}>
              {columns.map((c) => (
                <TableCell key={c.key} className={c.className}>
                  <span className="block h-3 w-full animate-pulse rounded-sm bg-surface-muted" />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="px-6 py-12 text-center font-data text-sm text-fg-muted">
              {empty}
            </td>
          </tr>
        ) : (
          rows.map((row) => {
            const id = getRowId(row);
            return (
              <TableRow
                key={id}
                interactive={Boolean(onRowClick)}
                selected={selectedRowId === id}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map((c) => (
                  <TableCell key={c.key} align={c.align} className={c.className}>
                    {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? '')}
                  </TableCell>
                ))}
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
