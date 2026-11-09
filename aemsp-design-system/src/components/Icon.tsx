import icons from '../icons/icons.json';

export type IconName = keyof typeof icons;
export const iconNames = Object.keys(icons) as IconName[];
export const iconSource = (n: IconName) => (icons as Record<string, { source: string }>)[n].source;

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  label?: string;
  style?: React.CSSProperties;
}

/** Icons come from the same Iconify sets used in the AEMSP Figma file (akar-icons, coolicons, tabler…), bundled offline. */
export function Icon({ name, size = 18, className = '', label, style }: IconProps) {
  const ic = (icons as Record<string, { viewBox: string; body: string }>)[name];
  if (!ic) return null;
  return (
    <svg
      className={`ae-icon ${className}`}
      width={size}
      height={size}
      viewBox={ic.viewBox}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={style}
      dangerouslySetInnerHTML={{ __html: ic.body }}
    />
  );
}
