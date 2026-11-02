import { cx } from '../lib/cx';
import { DOT, MARK_PATH, MARK_VIEWBOX, WORD_PATH, WORD_VIEWBOX } from './logo-paths';

export interface LogoProps {
  /** full = "iBroka" wordmark (sidebar). mark = the "i" alone (collapsed sidebar, favicon). */
  variant?: 'full' | 'mark';
  /** Height in px. Figma sidebar: 40. */
  height?: number;
  /** White ink for dark backgrounds. */
  inverse?: boolean;
  className?: string;
}

/**
 * iBroka wordmark: black "iBroka" with the brand-teal dot on the i. Vector rebuild of the Figma bitmap
 * (image 12, 109×40) in Instrument Sans Bold; replace the paths with the master SVG when design supplies it.
 */
export function Logo({ variant = 'full', height = 40, inverse = false, className }: LogoProps) {
  const ink = inverse ? '#FFFFFF' : 'var(--ib-color-secondary)';
  const dot = 'var(--ib-color-brand)';
  if (variant === 'mark') {
    return (
      <svg viewBox={MARK_VIEWBOX} height={height} role="img" aria-label="iBroka" className={cx('shrink-0', className)}>
        <path fill={ink} d={MARK_PATH} />
        <circle fill={dot} cx={DOT.cx} cy={DOT.cy} r={DOT.r} />
      </svg>
    );
  }
  return (
    <svg viewBox={WORD_VIEWBOX} height={height} role="img" aria-label="iBroka" className={cx('shrink-0', className)}>
      <path fill={ink} d={WORD_PATH} />
      <circle fill={dot} cx={DOT.cx} cy={DOT.cy} r={DOT.r} />
    </svg>
  );
}
