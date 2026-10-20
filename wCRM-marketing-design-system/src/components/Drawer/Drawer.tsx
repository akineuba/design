import * as RadixDialog from '@radix-ui/react-dialog';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { focusFirstField } from '../../utils/focus';

export const Drawer = RadixDialog.Root;
export const DrawerTrigger = RadixDialog.Trigger;
export const DrawerClose = RadixDialog.Close;

export interface DrawerContentProps extends Omit<ComponentPropsWithoutRef<typeof RadixDialog.Content>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** Sticky footer actions (Cancel / Save). */
  footer?: ReactNode;
}

/** Right-hand side sheet for create and edit forms (Figma `new contact`, `create user`, `email config`; 462px). */
export const DrawerContent = forwardRef<ElementRef<typeof RadixDialog.Content>, DrawerContentProps>(function DrawerContent(
  { title, description, footer, className, children, onOpenAutoFocus = focusFirstField, ...rest },
  ref,
) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 z-50 bg-surface-overlay data-[state=open]:animate-fade-in" />
      <RadixDialog.Content
        ref={ref}
        onOpenAutoFocus={onOpenAutoFocus}
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-drawer max-w-full flex-col bg-surface-default shadow-lg',
          'focus-visible:outline-none data-[state=open]:animate-slide-in-right',
          className,
        )}
        {...rest}
      >
        <div className="flex items-start justify-between gap-4 px-8 pb-5 pt-8">
          <div className="flex flex-col gap-1">
            <RadixDialog.Title className="text-heading-1 text-text-primary">{title}</RadixDialog.Title>
            {description ? (
              <RadixDialog.Description className="text-body-sm text-text-secondary">{description}</RadixDialog.Description>
            ) : (
              <RadixDialog.Description className="sr-only">{typeof title === 'string' ? title : 'Panel'}</RadixDialog.Description>
            )}
          </div>
          <RadixDialog.Close aria-label="Close" className="-mr-1 inline-flex size-8 shrink-0 items-center justify-center rounded-md text-text-primary hover:bg-surface-subtle focus-visible:outline-none focus-visible:shadow-focus">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </RadixDialog.Close>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-8 pb-6">{children}</div>
        {footer && <div className="flex justify-end gap-3 border-t border-border-default px-8 py-4">{footer}</div>}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
});
