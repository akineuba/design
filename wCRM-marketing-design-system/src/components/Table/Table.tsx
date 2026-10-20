import {
  forwardRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react';
import { cn } from '../../utils/cn';

/*
 * Data table primitives matching the marketing list screens (Contacts, Companies, Social accounts, User management):
 * white card, radius-lg, 1px border-default, F8FAFC header with 11px uppercase labels, 52px rows, 20px side padding.
 * Compose them with real <table> semantics; Pagination and toolbar sit outside the <table> inside `TableCard`.
 */

export interface TableCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Toolbar above the table: search, selectors, primary action. */
  toolbar?: ReactNode;
  /** Footer below the table, usually `Pagination`. */
  footer?: ReactNode;
}

export const TableCard = forwardRef<HTMLDivElement, TableCardProps>(function TableCard({ toolbar, footer, className, children, ...rest }, ref) {
  return (
    <div ref={ref} className={cn('relative overflow-hidden rounded-lg border border-border-default bg-surface-default', className)} {...rest}>
      {toolbar && <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-default px-5 py-4">{toolbar}</div>}
      <div className="relative w-full overflow-x-auto">{children}</div>
      {footer && <div className="border-t border-border-default px-5 py-3.5">{footer}</div>}
    </div>
  );
});

export const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(function Table({ className, ...rest }, ref) {
  return <table ref={ref} className={cn('w-full border-collapse text-left font-sans', className)} {...rest} />;
});

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(function TableHeader({ className, ...rest }, ref) {
  return <thead ref={ref} className={cn('bg-surface-subtle', className)} {...rest} />;
});

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(function TableBody({ className, ...rest }, ref) {
  return <tbody ref={ref} className={cn('bg-surface-default [&>tr:last-child]:border-b-0', className)} {...rest} />;
});

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Highlights a selected row (bulk selection). */
  selected?: boolean;
  /** Adds hover feedback for rows that open a record. */
  interactive?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow({ selected, interactive, className, ...rest }, ref) {
  return (
    <tr
      ref={ref}
      aria-selected={selected || undefined}
      className={cn(
        'border-b border-border-default transition-colors duration-fast',
        selected ? 'bg-accent-navy-subtle' : interactive && 'hover:bg-surface-subtle',
        interactive && 'cursor-pointer',
        className,
      )}
      {...rest}
    />
  );
});

export type SortDirection = 'asc' | 'desc' | false;

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'right' | 'center';
  /** Makes the header a sort button. Pass the current direction or `false` when unsorted. */
  sort?: SortDirection;
  onSort?: () => void;
}

const SortIcon = ({ dir }: { dir: SortDirection }) => (
  <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m7 9 5-5 5 5" className={dir === 'asc' ? 'opacity-100' : 'opacity-30'} />
    <path d="m7 15 5 5 5-5" className={dir === 'desc' ? 'opacity-100' : 'opacity-30'} />
  </svg>
);

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { align = 'left', sort, onSort, className, children, ...rest },
  ref,
) {
  const sortable = onSort !== undefined;
  return (
    <th
      ref={ref}
      scope="col"
      aria-sort={sort === 'asc' ? 'ascending' : sort === 'desc' ? 'descending' : sortable ? 'none' : undefined}
      className={cn(
        'h-table-header whitespace-nowrap border-b border-border-default px-5 text-overline text-text-muted',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        className,
      )}
      {...rest}
    >
      {sortable ? (
        <button
          type="button"
          onClick={onSort}
          className={cn('-mx-1 inline-flex items-center gap-1 rounded-xs px-1 uppercase hover:text-text-secondary focus-visible:outline-none focus-visible:shadow-focus', sort && 'text-text-secondary')}
        >
          {children}
          <SortIcon dir={sort ?? false} />
        </button>
      ) : (
        children
      )}
    </th>
  );
});

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'right' | 'center';
  /** Primary column style: semibold navy name (Figma contact/company name). */
  emphasis?: boolean;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell({ align = 'left', emphasis, className, ...rest }, ref) {
  return (
    <td
      ref={ref}
      className={cn(
        'h-table-row px-5 py-3 align-middle text-body-sm',
        emphasis ? 'font-semibold text-accent-navy-hover' : 'text-text-secondary',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        className,
      )}
      {...rest}
    />
  );
});

export interface TableEmptyProps {
  colSpan: number;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
}

/** Empty or no-results state rendered as a single full-width row. */
export function TableEmpty({ colSpan, title, description, action, icon }: TableEmptyProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-5 py-12">
        <div className="mx-auto flex max-w-modal-sm flex-col items-center gap-2 text-center">
          {icon && <span className="mb-2 inline-flex size-12 items-center justify-center rounded-full bg-brand-primary-subtle text-brand-primary [&>svg]:size-5">{icon}</span>}
          <p className="text-heading-3 text-text-primary">{title}</p>
          {description && <p className="text-body-sm text-text-secondary">{description}</p>}
          {action && <div className="mt-3">{action}</div>}
        </div>
      </td>
    </tr>
  );
}

/** Loading placeholder rows. Announce loading once on the table container with `aria-busy`. */
export function TableSkeleton({ rows = 5, columns }: { rows?: number; columns: number }) {
  return (
    <>
      {Array.from({ length: rows }, (_, r) => (
        <tr key={r} className="border-b border-border-default" aria-hidden="true">
          {Array.from({ length: columns }, (_, c) => (
            <td key={c} className="h-table-row px-5 py-3">
              <span className={cn('block h-3 animate-shimmer rounded-full bg-surface-sunken', c === 0 ? 'w-3/4' : 'w-1/2')} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export interface TableExpandableRowProps {
  /** Cells for the summary row. The toggle cell is appended automatically. */
  cells: ReactNode;
  /** Content shown in a full-width row underneath when expanded. */
  children: ReactNode;
  colSpan: number;
  defaultExpanded?: boolean;
  /** Accessible name for the toggle, e.g. "Show contacts for Acme Corp". */
  toggleLabel: string;
}

/** Summary row that expands to nested detail (Figma `company-row-expanded`: company → its contacts). */
export function TableExpandableRow({ cells, children, colSpan, defaultExpanded = false, toggleLabel }: TableExpandableRowProps) {
  const [open, setOpen] = useState(defaultExpanded);
  return (
    <>
      <TableRow className={cn(open && 'border-b-0')}>
        {cells}
        <TableCell align="right" className="w-12">
          <button
            type="button"
            aria-expanded={open}
            aria-label={toggleLabel}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex size-8 items-center justify-center rounded-md text-text-muted hover:bg-surface-subtle hover:text-text-secondary focus-visible:outline-none focus-visible:shadow-focus"
          >
            <svg viewBox="0 0 24 24" className={cn('size-4 transition-transform duration-fast', open && 'rotate-180')} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
          </button>
        </TableCell>
      </TableRow>
      {open && (
        <tr className="border-b border-border-default bg-surface-subtle">
          <td colSpan={colSpan} className="px-5 pb-4 pt-1">{children}</td>
        </tr>
      )}
    </>
  );
}
