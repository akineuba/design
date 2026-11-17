import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { EyeIcon, MoreIcon, PencilIcon, TrashIcon } from '../../icons';
import { cn } from '../../utils/cn';
import { IconButton } from '../IconButton';
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger, type MenuItemTone } from '../Menu';

/*
 * Row-level actions for tables. Three patterns appear in the marketing screens:
 * 1. RowActionsMenu – "…" trigger (radius-xs box, 14px icon) opening the context menu (View / Edit / Delete).
 * 2. RowActionLink  – inline text action with an icon, e.g. "👁 View" in the Campaigns table.
 * 3. RowActionButtons – inline icon buttons (edit, delete) that can stay hidden until the row is hovered or focused.
 */

export interface RowAction {
  label: string;
  icon?: ReactNode;
  tone?: MenuItemTone;
  onSelect?: () => void;
  disabled?: boolean;
  /** Draw a divider above this item (put destructive actions last, after a separator). */
  separated?: boolean;
}

export interface RowActionsMenuProps {
  /** Record name for the trigger's accessible name: "Actions for {recordName}". */
  recordName: string;
  /** Custom actions. When omitted, the standard View / Edit / Delete set is built from the handlers below. */
  actions?: RowAction[];
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  align?: 'start' | 'center' | 'end';
}

/** Overflow menu for a table row (Figma `more-horizontal` + `context-menu`). */
export function RowActionsMenu({ recordName, actions, onView, onEdit, onDelete, align = 'end' }: RowActionsMenuProps) {
  const defaults: (RowAction | false | undefined)[] = [
    onView && { label: 'View', icon: <EyeIcon />, tone: 'info', onSelect: onView },
    onEdit && { label: 'Edit', icon: <PencilIcon />, tone: 'warning', onSelect: onEdit },
    onDelete && { label: 'Delete', icon: <TrashIcon />, tone: 'danger', onSelect: onDelete },
  ];
  const items = actions ?? defaults.filter((a): a is RowAction => Boolean(a));

  return (
    <Menu modal={false}>
      <MenuTrigger asChild>
        <button
          type="button"
          aria-label={`Actions for ${recordName}`}
          className={cn(
            'inline-flex size-6 items-center justify-center rounded-xs text-text-secondary transition-colors duration-fast',
            'hover:bg-surface-sunken hover:text-text-primary focus-visible:outline-none focus-visible:shadow-focus',
            'data-[state=open]:bg-surface-sunken data-[state=open]:text-text-primary [&>svg]:size-3.5',
          )}
        >
          <MoreIcon />
        </button>
      </MenuTrigger>
      <MenuContent align={align}>
        {items.map((a) => (
          <div key={a.label} className="contents">
            {a.separated && <MenuSeparator />}
            <MenuItem tone={a.tone} icon={a.icon} disabled={a.disabled} onSelect={a.onSelect}>
              {a.label}
            </MenuItem>
          </div>
        ))}
      </MenuContent>
    </Menu>
  );
}

type RowActionLinkProps =
  | ({ href: string; icon?: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ href?: undefined; icon?: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>);

const linkClass =
  'inline-flex items-center gap-1 rounded-xs px-1 py-1 text-body-sm font-medium text-text-link transition-colors duration-fast ' +
  'hover:bg-status-info-subtle focus-visible:outline-none focus-visible:shadow-focus [&>svg]:size-3.5';

/**
 * Inline text action in a row (Figma Campaigns table "View": eye icon + 13/500 label, radius-xs, 4px inset).
 * Renders an `<a>` when `href` is set, otherwise a button. Add a visually hidden record name for context.
 */
export const RowActionLink = forwardRef<HTMLAnchorElement & HTMLButtonElement, RowActionLinkProps>(function RowActionLink(
  { icon = <EyeIcon />, className, children = 'View', ...rest },
  ref,
) {
  if (rest.href !== undefined) {
    return (
      <a ref={ref} className={cn(linkClass, className)} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {icon}
        {children}
      </a>
    );
  }
  const { type = 'button', ...btn } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button ref={ref} type={type} className={cn(linkClass, className)} {...btn}>
      {icon}
      {children}
    </button>
  );
});

export interface TableLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Monospaced numerals for codes and IDs (Figma campaign code "60210"). */
  numeric?: boolean;
}

/** Link to a related record inside a cell, `text-link` blue (#3366E5). */
export const TableLink = forwardRef<HTMLAnchorElement, TableLinkProps>(function TableLink({ numeric, className, ...rest }, ref) {
  return (
    <a
      ref={ref}
      className={cn(
        'rounded-xs text-body-sm text-text-link underline-offset-2 hover:underline focus-visible:outline-none focus-visible:shadow-focus',
        numeric && 'tabular-nums',
        className,
      )}
      {...rest}
    />
  );
});

export interface RowActionButton {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  /** Danger buttons turn red on hover. */
  danger?: boolean;
}

export interface RowActionButtonsProps {
  /** Record name appended to each accessible name: "Edit Summer Sale". */
  recordName: string;
  actions: RowActionButton[];
  /** Hide until the row is hovered or something in it has focus. Touch screens always show them. */
  revealOnHover?: boolean;
}

/** Inline icon buttons at the end of a row (edit, duplicate, delete). */
export function RowActionButtons({ recordName, actions, revealOnHover = false }: RowActionButtonsProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1',
        revealOnHover &&
          'transition-opacity duration-fast [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:focus-within:opacity-100 [@media(hover:hover)]:group-hover/row:opacity-100',
      )}
    >
      {actions.map((a) => (
        <IconButton
          key={a.label}
          size="sm"
          aria-label={`${a.label} ${recordName}`}
          icon={a.icon}
          onClick={a.onClick}
          tone={a.danger ? 'danger' : 'default'}
        />
      ))}
    </div>
  );
}
