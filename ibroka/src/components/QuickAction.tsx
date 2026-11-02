import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../lib/cx';

export type QuickActionTone = 'teal' | 'blue' | 'green' | 'red' | 'ink';

export interface QuickActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  children: ReactNode;
  /**
   * Fill colour. Figma: Add Transaction teal, HR Management blue, Add Expense green, Delete red.
   * Shades are darkened so white text passes AA. Use red only for a destructive shortcut.
   */
  tone?: QuickActionTone;
}

const tones: Record<QuickActionTone, string> = {
  teal: 'bg-primary hover:bg-primary-hover',
  blue: 'bg-info hover:brightness-95',
  green: 'bg-success hover:brightness-95',
  red: 'bg-danger hover:bg-danger-hover',
  ink: 'bg-secondary hover:bg-secondary-hover',
};

/** Large shortcut tile in the dashboard's "Quick Actions" row. Figma: 56px tall, 10px radius, icon 24 + Medium 15. */
export function QuickAction({ icon, tone = 'teal', className, children, type = 'button', ...rest }: QuickActionProps) {
  return (
    <button
      type={type}
      className={cx('flex h-14 min-w-0 items-center gap-2.5 rounded-lg px-6 text-left text-15 font-medium text-fg-inverse transition ib-focus', tones[tone], className)}
      {...rest}
    >
      <span className="size-6 shrink-0" aria-hidden>
        {icon}
      </span>
      <span className="truncate">{children}</span>
    </button>
  );
}
