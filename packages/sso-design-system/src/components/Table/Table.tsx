import type { ReactNode } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { cx } from '../../utils/cx';

export interface Column<T> {
  key: string;
  header: ReactNode;
  render: (row: T) => ReactNode;
  width?: number | string;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
}

export interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  sort?: { key: string; direction: 'asc' | 'desc' };
  onSort?: (key: string) => void;
  /** Toolbar rendered inside the card, above the header row (search, filters, export). */
  toolbar?: ReactNode;
  /** Footer inside the card (usually <Pagination />). */
  footer?: ReactNode;
  empty?: ReactNode;
  caption?: string;
}

/** Data table inside a rounded card. Comfortable 56px rows. */
export function Table<T>({ columns, rows, rowKey, sort, onSort, toolbar, footer, empty, caption }: TableProps<T>) {
  return (
    <div className="sso-table-card">
      {toolbar && <div className="sso-table-card__toolbar">{toolbar}</div>}
      <div className="sso-table-scroll">
        <table className="sso-table">
          {caption && <caption className="sso-visually-hidden">{caption}</caption>}
          <thead>
            <tr>
              {columns.map((c) => {
                const active = sort?.key === c.key;
                const SortIcon = !active ? ArrowUpDown : sort!.direction === 'asc' ? ArrowUp : ArrowDown;
                return (
                  <th
                    key={c.key}
                    style={{ width: c.width, textAlign: c.align }}
                    aria-sort={active ? (sort!.direction === 'asc' ? 'ascending' : 'descending') : undefined}
                  >
                    {c.sortable && onSort ? (
                      <button type="button" className={cx('sso-table__sort', active && 'is-active')} onClick={() => onSort(c.key)}>
                        {c.header}
                        <SortIcon aria-hidden />
                      </button>
                    ) : (
                      c.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="sso-table__empty">{empty ?? 'Nothing to show yet.'}</td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={rowKey(r)}>
                  {columns.map((c) => (
                    <td key={c.key} style={{ textAlign: c.align }}>{c.render(r)}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {footer && <div className="sso-table-card__footer">{footer}</div>}
    </div>
  );
}

export interface PaginationProps {
  page: number;
  pageCount: number;
  total: number;
  pageSize: number;
  /** Plural noun for the summary, e.g. "users". */
  noun?: string;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageCount, total, pageSize, noun = 'results', onPageChange }: PaginationProps) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  return (
    <nav className="sso-pagination" aria-label="Pagination">
      <p className="sso-pagination__summary">
        Showing <strong>{from}–{to}</strong> of <strong>{total}</strong> {noun}
      </p>
      <div className="sso-pagination__controls">
        <button type="button" className="sso-pagination__btn" onClick={() => onPageChange(page - 1)} disabled={page <= 1} aria-label="Previous page">
          <ChevronLeft />
        </button>
        <span className="sso-pagination__page">Page {page} of {pageCount}</span>
        <button type="button" className="sso-pagination__btn" onClick={() => onPageChange(page + 1)} disabled={page >= pageCount} aria-label="Next page">
          <ChevronRight />
        </button>
      </div>
    </nav>
  );
}
