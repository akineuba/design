import type { ImgHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import logoFull from '../../assets/wbizmanager-logo.png';
import logoMark from '../../assets/wbizmanager-mark.png';
import logoFullDark from '../../assets/wbizmanager-logo-dark.png';
import logoMarkDark from '../../assets/wbizmanager-mark-dark.png';

export interface LogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** full: mark and wordmark (sidebar). mark: the symbol alone (collapsed sidebar, favicons). */
  variant?: 'full' | 'mark';
  /** md: 32px tall (default). sm: 24px, for the NavMenu header. */
  size?: 'sm' | 'md';
}

/**
 * wBizManager logo, from the brand assets supplied by the design team. Sized by height.
 * * Dark mode shows the white version supplied by design; only the image
 * for the current theme is displayed.
 */
export function Logo({ variant = 'full', size = 'md', alt = 'wBizManager', className, ...rest }: LogoProps) {
  const full = variant === 'full';
  const base = cx(size === 'sm' ? 'h-6' : 'h-control-xs', 'w-auto', className);
  return (
    <>
      <img src={full ? logoFull : logoMark} alt={alt} className={cx(base, 'block dark:hidden')} {...rest} />
      <img src={full ? logoFullDark : logoMarkDark} alt={alt} className={cx(base, 'hidden dark:block')} {...rest} />
    </>
  );
}
