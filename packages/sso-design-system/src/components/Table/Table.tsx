import { forwardRef, type HTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { cx } from '../../utils/cx';
import { ActionMenu, type ActionMenuItem } from '../ActionMenu/ActionMenu';
import { Checkbox } from '../Field/Field';

/* Mirrors the ERP table kit: TableCard › TableToolbar › DataTable › TableFooter + Pagination. */

export type SortDirection = 'asc' | 'desc';
export interface SortState { key: string; direction: SortDirection }

export interface Column<T> {
  key: string;
  header: ReactNode;
  render?: (row: T) => ReactNode;
  align?: 'left' | 'center' | 'right';
  /** `none` = muted text, `strong` = medium ink (the row's name), `link` = primary. */
  emphasis?: 'none' | 'strong' | 'link';
  sortable?: boolean;
  width?: number | string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  /** default: 44px rows. comfortable: 54px rows. */
  density?: 'default' | 'comfortable';
  sort?: SortState | null;
  onSortChange?: (sort: SortState | null) => void;
  /**
   * Row actions. Adds an "Actions" column. Two or more items go in a kebab menu;
   * a single item shows inline as a text button (no menu needed).
   */
  rowActions?: (row: T) => ActionMenuItem[];
  actionsHeader?: string;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectedIdsChange?: (ids: string[]) => void;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  empty?: ReactNode;
  caption?: string;
}

const nextSort = (cur: SortState | null | undefined, key: string): SortState | null =>
  cur?.key !== key ? { key, direction: 'desc' } : cur.direction === 'desc' ? { key, direction: 'asc' } : null;

export function DataTable<T>({
  columns, rows, getRowId, density = 'default', sort, onSortChange, rowActions, actionsHeader = 'Actions',
  selectable, selectedIds = [], onSelectedIdsChange, onRowClick, loading, empty = 'No records yet.', caption,
}: DataTableProps<T>) {
  const colCount = columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0);
  const ids = rows.map(getRowId);
  const selCount = ids.filter((i) => selectedIds.includes(i)).length;
  const allSel = ids.length > 0 && selCount === ids.length;
  return (
    <div className="sso-table-scroll">
      <table className={cx('sso-table', density === 'comfortable' && 'sso-table--comfortable')} aria-busy={loading || undefined}>
        {caption && <caption className="sso-visually-hidden">{caption}</caption>}
        <thead>
          <tr>
            {selectable && (
              <th className="sso-table__check">
                <Checkbox
                  aria-label={allSel ? 'Deselect all rows' : 'Select all rows'}
                  checked={allSel}
                  indeterminate={selCount > 0 && !allSel}
                  onChange={() => onSelectedIdsChange?.(allSel ? selectedIds.filter((i) => !ids.includes(i)) : [...new Set([...selectedIds, ...ids])])}
                />
              </th>
            )}
            {columns.map((c) => {
              const dir = sort?.key === c.key ? sort.direction : null;
              return (
                <th
                  key={c.key}
                  scope="col"
                  style={{ width: c.width, textAlign: c.align }}
                  aria-sort={c.sortable && onSortChange ? (dir === 'asc' ? 'ascending' : dir === 'desc' ? 'descending' : 'none') : undefined}
                >
                  {c.sortable && onSortChange ? (
                    <button type="button" className={cx('sso-table__sort', dir && 'is-sorted')} onClick={() => onSortChange(nextSort(sort, c.key))}>
                      {c.header}
                      <ChevronDown aria-hidden className={cx(dir === 'asc' && 'is-asc')} />
                    </button>
                  ) : c.header}
                </th>
              );
            })}
            {rowActions && <th scope="col" style={{ textAlign: 'center' }}>{actionsHeader}</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 4 }, (_, r) => (
              <tr key={`sk-${r}`}>
                {Array.from({ length: colCount }, (_, c) => <td key={c}><span className="sso-table__skeleton" /></td>)}
              </tr>
            ))
          ) : rows.length === 0 ? (
            <tr><td colSpan={colCount} className="sso-table__empty">{empty}</td></tr>
          ) : (
            rows.map((row) => {
              const id = getRowId(row);
              const selected = selectedIds.includes(id);
              return (
                <tr
                  key={id}
                  aria-selected={selected || undefined}
                  className={cx(onRowClick && 'is-interactive', selected && 'is-selected')}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {selectable && (
                    <td onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        aria-label={`Select row ${id}`}
                        checked={selected}
                        onChange={() => onSelectedIdsChange?.(selected ? selectedIds.filter((i) => i !== id) : [...selectedIds, id])}
                      />
                    </td>
                  )}
                  {columns.map((c) => (
                    <td key={c.key} style={{ textAlign: c.align }} className={`sso-table__cell--${c.emphasis ?? 'none'}`}>
                      {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? '')}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="sso-table__actions" onClick={(e) => e.stopPropagation()}>
                      <RowActionCell id={id} items={rowActions(row)} />
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

function RowActionCell({ id, items }: { id: string; items: ActionMenuItem[] }) {
  if (items.length === 0) return null;
  if (items.length === 1) {
    const it = items[0]!;
    return (
      <button
        type="button"
        className={cx('sso-row-action', !it.disabled && `sso-menu__item--${it.tone ?? 'view'}`)}
        disabled={it.disabled}
        aria-label={`${it.label} ${id}`}
        onClick={it.onSelect}
      >
        {it.icon && <span className="sso-menu__icon" aria-hidden>{it.icon}</span>}
        {it.label}
      </button>
    );
  }
  return <ActionMenu label={`Actions for ${id}`} items={items} />;
}

/** White card that holds a table: 10px radius, 1px line-subtle border. */
export function TableCard({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('sso-table-card', className)} {...rest} />;
}

/** Row above the table: left group (search, filters) and right group (Export, Add New). */
export function TableToolbar({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('sso-table-toolbar', className)} {...rest} />;
}

export function ToolbarGroup({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('sso-table-toolbar__group', className)} {...rest} />;
}

export const TableSearch = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function TableSearch({ className, ...rest }, ref) {
  return (
    <label className={cx('sso-table-search', className)}>
      <Search aria-hidden />
      <input ref={ref} type="search" {...rest} />
    </label>
  );
});

/** Footer: "Showing 1 to 10 of 93 entries" then pagination, right-aligned. */
export function TableFooter({ summary, children, className }: { summary: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div className={cx('sso-table-footer', className)}>
      <p className="sso-table-footer__summary">{summary}</p>
      {children}
    </div>
  );
}

/** Helper for the ERP summary wording. */
export const entriesSummary = (page: number, pageSize: number, total: number) =>
  `Showing ${total === 0 ? 0 : (page - 1) * pageSize + 1} to ${Math.min(page * pageSize, total)} of ${total} entries`;

function pageList(page: number, count: number): Array<number | 'gap'> {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const keep = [...new Set([1, count, page - 1, page, page + 1].filter((p) => p >= 1 && p <= count))].sort((a, b) => a - b);
  const out: Array<number | 'gap'> = [];
  keep.forEach((p, i) => { if (i > 0 && p - keep[i - 1]! > 1) out.push('gap'); out.push(p); });
  return out;
}

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** "Page [n]" jump field. */
  showJump?: boolean;
}

export function Pagination({ page, pageCount, onPageChange, showJump = true }: PaginationProps) {
  const count = Math.max(pageCount, 1);
  const go = (p: number) => onPageChange(Math.min(Math.max(p, 1), count));
  return (
    <nav aria-label="Pagination" className="sso-pagination">
      <div className="sso-pagination__pages">
        <button type="button" aria-label="Previous page" className="sso-page-btn" disabled={page <= 1} onClick={() => go(page - 1)}><ChevronLeft /></button>
        {pageList(page, count).map((p, i) =>
          p === 'gap' ? (
            <span key={`gap-${i}`} className="sso-pagination__gap" aria-hidden>…</span>
          ) : (
            <button
              key={p}
              type="button"
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
              className={cx('sso-page-btn', p === page && 'is-current')}
              onClick={() => go(p)}
            >
              {p}
            </button>
          ),
        )}
        <button type="button" aria-label="Next page" className="sso-page-btn" disabled={page >= count} onClick={() => go(page + 1)}><ChevronRight /></button>
      </div>
      {showJump && (
        <label className="sso-pagination__jump">
          Page
          <input type="number" min={1} max={count} value={page} onChange={(e) => { const n = Number(e.target.value); if (n) go(n); }} />
        </label>
      )}
    </nav>
  );
}
