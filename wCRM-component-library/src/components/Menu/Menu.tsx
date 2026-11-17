import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

/** Row and record actions menu (Figma `context-menu`: View / Edit / Delete). */
export const Menu = RadixMenu.Root;
export const MenuTrigger = RadixMenu.Trigger;
export const MenuGroup = RadixMenu.Group;

export const MenuContent = forwardRef<ElementRef<typeof RadixMenu.Content>, ComponentPropsWithoutRef<typeof RadixMenu.Content>>(function MenuContent(
  { className, sideOffset = 4, align = 'end', ...rest },
  ref,
) {
  return (
    <RadixMenu.Portal>
      <RadixMenu.Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        className={cn(
          'z-50 flex min-w-menu flex-col gap-1 rounded-md border border-border-default bg-surface-default p-2 shadow-menu',
          'data-[state=open]:animate-pop-in',
          className,
        )}
        {...rest}
      />
    </RadixMenu.Portal>
  );
});

export type MenuItemTone = 'default' | 'info' | 'warning' | 'danger';

export interface MenuItemProps extends ComponentPropsWithoutRef<typeof RadixMenu.Item> {
  icon?: ReactNode;
  /** Figma colours actions by intent: View (info), Edit (warning), Delete (danger). */
  tone?: MenuItemTone;
  /** Right-aligned hint, e.g. a keyboard shortcut. */
  shortcut?: string;
}

const tones: Record<MenuItemTone, string> = {
  default: 'text-text-primary',
  info: 'text-accent-navy',
  warning: 'text-status-warning-text',
  danger: 'text-status-danger data-[highlighted]:bg-status-danger-subtle',
};

export const MenuItem = forwardRef<ElementRef<typeof RadixMenu.Item>, MenuItemProps>(function MenuItem(
  { icon, tone = 'default', shortcut, className, children, ...rest },
  ref,
) {
  return (
    <RadixMenu.Item
      ref={ref}
      className={cn(
        'flex h-control-sm cursor-pointer select-none items-center gap-2.5 rounded-sm px-3 text-body-sm font-medium outline-none',
        'data-[highlighted]:bg-surface-subtle data-[disabled]:cursor-not-allowed data-[disabled]:text-text-muted [&_svg]:size-3.5',
        tones[tone],
        className,
      )}
      {...rest}
    >
      {icon}
      <span className="flex-1">{children}</span>
      {shortcut && <span className="text-caption text-text-muted">{shortcut}</span>}
    </RadixMenu.Item>
  );
});

export const MenuLabel = forwardRef<ElementRef<typeof RadixMenu.Label>, ComponentPropsWithoutRef<typeof RadixMenu.Label>>(function MenuLabel({ className, ...rest }, ref) {
  return <RadixMenu.Label ref={ref} className={cn('px-3 pb-1 pt-2 text-overline text-text-secondary', className)} {...rest} />;
});

export const MenuSeparator = forwardRef<ElementRef<typeof RadixMenu.Separator>, ComponentPropsWithoutRef<typeof RadixMenu.Separator>>(function MenuSeparator({ className, ...rest }, ref) {
  return <RadixMenu.Separator ref={ref} className={cn('-mx-2 my-1 h-px bg-border-default', className)} {...rest} />;
});
