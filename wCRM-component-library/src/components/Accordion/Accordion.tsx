import * as RadixAccordion from '@radix-ui/react-accordion';
import { createContext, forwardRef, useContext, type ComponentPropsWithoutRef, type ElementRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

type AccordionVariant = 'section' | 'card';
const VariantContext = createContext<AccordionVariant>('section');

type RootProps = ComponentPropsWithoutRef<typeof RadixAccordion.Root>;
export type AccordionProps = RootProps & {
  /**
   * - section: collapsible form groups inside drawers ("Social Media Information", "Birthday settings")
   * - card: bordered preference rows with a title, description and trailing control (notification settings)
   */
  variant?: AccordionVariant;
};

export const Accordion = forwardRef<ElementRef<typeof RadixAccordion.Root>, AccordionProps>(function Accordion({ variant = 'section', className, ...rest }, ref) {
  return (
    <VariantContext.Provider value={variant}>
      <RadixAccordion.Root
        ref={ref}
        className={cn('flex flex-col', variant === 'card' ? 'gap-4' : 'divide-y divide-border-default', className)}
        {...(rest as RootProps)}
      />
    </VariantContext.Provider>
  );
});

export interface AccordionItemProps extends Omit<ComponentPropsWithoutRef<typeof RadixAccordion.Item>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** Control rendered before the chevron, e.g. a `Switch`. It does not toggle the panel. */
  actions?: ReactNode;
}

const Chevron = () => (
  <svg viewBox="0 0 24 24" className="size-3.5 shrink-0 text-text-secondary transition-transform duration-base ease-standard group-data-[state=open]:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const AccordionItem = forwardRef<ElementRef<typeof RadixAccordion.Item>, AccordionItemProps>(function AccordionItem(
  { title, description, actions, className, children, ...rest },
  ref,
) {
  const variant = useContext(VariantContext);
  const card = variant === 'card';
  return (
    <RadixAccordion.Item
      ref={ref}
      className={cn(card && 'rounded-lg border border-border-default bg-surface-default', className)}
      {...rest}
    >
      <RadixAccordion.Header className={cn('flex items-center gap-3', card ? 'px-5' : '')}>
        <RadixAccordion.Trigger
          className={cn(
            'group flex flex-1 items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:opacity-50',
            card ? 'py-5' : 'py-2.5',
          )}
        >
          <span className="flex flex-col gap-1">
            <span className={card ? 'text-label text-text-strong' : 'text-label-sm font-bold text-text-primary'}>{title}</span>
            {description && <span className="text-caption text-text-secondary">{description}</span>}
          </span>
          {!actions && <Chevron />}
        </RadixAccordion.Trigger>
        {actions && (
          <div className="flex items-center gap-3">
            {actions}
            <RadixAccordion.Trigger aria-label="Toggle details" className="group inline-flex size-6 items-center justify-center rounded-xs focus-visible:outline-none focus-visible:shadow-focus">
              <Chevron />
            </RadixAccordion.Trigger>
          </div>
        )}
      </RadixAccordion.Header>
      <RadixAccordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className={cn('flex flex-col gap-4', card ? 'px-5 pb-5' : 'pb-4 pt-1')}>{children}</div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
});
