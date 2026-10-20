import * as RadixTabs from '@radix-ui/react-tabs';
import { createContext, forwardRef, useContext, type ComponentPropsWithoutRef, type ElementRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

type TabsVariant = 'underline' | 'pill' | 'dot';
const VariantContext = createContext<TabsVariant>('underline');

export interface TabsProps extends ComponentPropsWithoutRef<typeof RadixTabs.Root> {
  /**
   * - underline: page and settings tabs (red 2px underline, muted inactive) — "Accounts / Notifications / Publishing"
   * - pill: filter tabs on lists (subtle red pill) — "All records / My records / Recently updated"
   * - dot: status sub-tabs above a table, each with a coloured status dot — "All / Drafts / Scheduled / Sent"
   */
  variant?: TabsVariant;
}

export const Tabs = forwardRef<ElementRef<typeof RadixTabs.Root>, TabsProps>(function Tabs({ variant = 'underline', className, ...rest }, ref) {
  return (
    <VariantContext.Provider value={variant}>
      <RadixTabs.Root ref={ref} className={cn('flex flex-col gap-6', className)} {...rest} />
    </VariantContext.Provider>
  );
});

export const TabsList = forwardRef<ElementRef<typeof RadixTabs.List>, ComponentPropsWithoutRef<typeof RadixTabs.List>>(function TabsList({ className, ...rest }, ref) {
  const variant = useContext(VariantContext);
  return (
    <RadixTabs.List
      ref={ref}
      className={cn(
        'flex items-end',
        variant === 'underline' ? 'gap-6 border-b border-border-default' : variant === 'dot' ? 'gap-6 overflow-x-auto border-b border-border-default' : 'flex-wrap gap-2',
        className,
      )}
      {...rest}
    />
  );
});

export type TabsTone = 'neutral' | 'warning' | 'success' | 'info' | 'danger';

export interface TabsTriggerProps extends ComponentPropsWithoutRef<typeof RadixTabs.Trigger> {
  /** Count shown after the label, e.g. "Active Contacts (10)". */
  count?: number;
  icon?: ReactNode;
  /** `dot` variant only: status colour of the dot and inactive label. The active tab is always brand red. */
  tone?: TabsTone;
}

/* Figma colours the inactive label with the bright status colour; the -text tokens keep it readable. */
const dotTones: Record<TabsTone, { dot: string; text: string }> = {
  neutral: { dot: 'bg-text-muted', text: 'text-text-secondary' },
  warning: { dot: 'bg-status-warning', text: 'text-status-warning-text' },
  success: { dot: 'bg-status-success', text: 'text-status-success-text' },
  info: { dot: 'bg-status-info', text: 'text-accent-navy' },
  danger: { dot: 'bg-status-danger', text: 'text-status-danger' },
};

export const TabsTrigger = forwardRef<ElementRef<typeof RadixTabs.Trigger>, TabsTriggerProps>(function TabsTrigger(
  { count, icon, tone = 'neutral', className, children, ...rest },
  ref,
) {
  const variant = useContext(VariantContext);
  return (
    <RadixTabs.Trigger
      ref={ref}
      className={cn(
        'group inline-flex items-center whitespace-nowrap text-label transition-colors duration-fast ease-standard',
        variant !== 'dot' && 'gap-2 text-text-muted',
        'focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-4',
        variant === 'underline' &&
          '-mb-px border-b-2 border-transparent pb-3 hover:text-text-secondary data-[state=active]:border-brand-primary data-[state=active]:text-brand-primary',
        variant === 'pill' &&
          'h-8 rounded-full border border-border-default bg-surface-default px-3 text-label-sm text-text-secondary hover:border-border-strong data-[state=active]:border-brand-primary-subtle data-[state=active]:bg-brand-primary-subtle data-[state=active]:text-brand-primary',
        variant === 'dot' &&
          cn(
            '-mb-px gap-2.5 border-b-2 border-transparent px-2.5 pb-2 pt-1 font-data font-medium hover:opacity-80',
            'data-[state=active]:border-brand-primary data-[state=active]:font-semibold data-[state=active]:text-brand-primary',
            dotTones[tone].text,
          ),
        className,
      )}
      {...rest}
    >
      {variant === 'dot' && (
        <span aria-hidden="true" className={cn('size-2 shrink-0 rounded-full group-data-[state=active]:bg-brand-primary', dotTones[tone].dot)} />
      )}
      {icon}
      {children}
      {count !== undefined && (
        <span className="rounded-full bg-surface-sunken px-1.5 text-caption font-semibold text-text-secondary group-data-[state=active]:bg-brand-primary-subtle group-data-[state=active]:text-brand-primary">
          {count}
        </span>
      )}
    </RadixTabs.Trigger>
  );
});

export const TabsContent = forwardRef<ElementRef<typeof RadixTabs.Content>, ComponentPropsWithoutRef<typeof RadixTabs.Content>>(function TabsContent({ className, ...rest }, ref) {
  return <RadixTabs.Content ref={ref} className={cn('focus-visible:outline-none', className)} {...rest} />;
});
