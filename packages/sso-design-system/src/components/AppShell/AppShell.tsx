import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface AppShellProps {
  sidebar: ReactNode;
  topbar: ReactNode;
  children: ReactNode;
  /** Constrain content to --sso-size-content-max. Off for wide tables. */
  constrained?: boolean;
  className?: string;
}

/** Signed-in page frame: sidebar + top bar + scrolling content. Adds the `sso-root` scope. */
export function AppShell({ sidebar, topbar, children, constrained = true, className }: AppShellProps) {
  return (
    <div className={cx('sso-root', 'sso-shell', className)}>
      {sidebar}
      <div className="sso-shell__main">
        {topbar}
        <main className="sso-shell__content">
          <div className={cx('sso-shell__inner', constrained && 'is-constrained')}>{children}</div>
        </main>
      </div>
    </div>
  );
}

/** Vertical rhythm for page sections (24px). */
export function Stack({ gap = 6, children, className }: { gap?: 2 | 3 | 4 | 5 | 6 | 8; children: ReactNode; className?: string }) {
  return <div className={cx('sso-stack', className)} style={{ gap: `var(--sso-space-${gap})` }}>{children}</div>;
}

/** Responsive equal-width grid. */
export function Grid({ min = 220, gap = 4, children, className }: { min?: number; gap?: 3 | 4 | 5 | 6; children: ReactNode; className?: string }) {
  return (
    <div className={cx('sso-grid', className)} style={{ gap: `var(--sso-space-${gap})`, gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))` }}>
      {children}
    </div>
  );
}
