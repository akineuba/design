import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../lib/cx';

/**
 * Marketing-site layout helpers (landing page only, not used in the app).
 * They only arrange library components; every colour, size and radius still comes from tokens.
 */

/** Centres content at the marketing page width with responsive side padding. */
export function Container({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('mx-auto w-full max-w-content px-5 md:px-10', className)} {...rest}>
      {children}
    </div>
  );
}

/** A full-width page band with the standard vertical rhythm. */
export function Section({ className, children, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <section className={cx('py-16 md:py-24', className)} {...rest}>
      {children}
    </section>
  );
}

/** Small teal label above a heading. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx('text-13 font-semibold uppercase tracking-wider text-primary', className)}>{children}</p>;
}

type HeadingSize = 'hero' | 'statement' | 'section' | 'card';
const headingSize: Record<HeadingSize, string> = {
  hero: 'text-40 md:text-64',
  statement: 'text-40 md:text-56',
  section: 'text-30 md:text-40',
  card: 'text-20 md:text-24',
};

/** Marketing heading in sentence case. Hero and statement sizes use the derived display tokens. */
export function Heading({
  as: Tag = 'h2',
  size = 'section',
  className,
  children,
}: {
  as?: 'h1' | 'h2' | 'h3';
  size?: HeadingSize;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cx('text-balance font-bold tracking-tight', headingSize[size], className)}>{children}</Tag>;
}

/** Lead paragraph under a heading. */
export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx('text-15 text-fg-muted md:text-18', className)}>{children}</p>;
}

/** Round icon badge used in trust rows and feature lists. */
export function IconBadge({ icon, tone = 'teal', size = 'md' }: { icon: ReactNode; tone?: 'teal' | 'ink' | 'white'; size?: 'md' | 'lg' }) {
  const tones = {
    teal: 'bg-brand-subtle text-primary',
    ink: 'bg-secondary text-fg-inverse',
    white: 'bg-surface text-primary',
  };
  return (
    <span className={cx('inline-flex shrink-0 items-center justify-center rounded-full', tones[tone], size === 'lg' ? 'size-16' : 'size-12')} aria-hidden>
      <span className={size === 'lg' ? 'size-7.5' : 'size-icon-lg'}>{icon}</span>
    </span>
  );
}
