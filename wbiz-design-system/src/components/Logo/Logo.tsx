import type { ImgHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import logoFull from '../../assets/wbizmanager-logo.png';
import logoMark from '../../assets/wbizmanager-mark.png';

export interface LogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** full: mark and wordmark (sidebar). mark: the symbol alone (collapsed sidebar, favicons). */
  variant?: 'full' | 'mark';
}

/**
 * wBizManager logo, from the brand asset supplied by the design team. Sized by height.
 * There is no dark-mode asset yet, so in dark mode the PNG is inverted and its hues rotated
 * back: the navy wordmark turns light and the blue and red stay close to brand.
 */
export function Logo({ variant = 'full', alt = 'wBizManager', className, ...rest }: LogoProps) {
  return (
    <img
      src={variant === 'full' ? logoFull : logoMark}
      alt={alt}
      className={cx('block h-control-xs w-auto dark:invert dark:hue-rotate-180', className)}
      {...rest}
    />
  );
}
