import { useId, type ComponentType, type CSSProperties, type SVGProps } from 'react';
import { cn } from '@ds';

/*
 * 3D icon built from a design-system glyph: the outline is drawn several times, each a little lower and to the right
 * in the darker brand red (the extrusion), then once more on top with a light-to-dark brand gradient (the face) and
 * a soft shadow on the ground. Colours are design-system tokens, so the icon sits on either theme. Offsets, the
 * gradient angle and the shadow are illustration geometry, kept here with the artwork.
 */

const DEPTH = 7; // extrusion layers
const STEP = { x: 0.55, y: 0.85 }; // px per layer

export interface Icon3DProps {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Stroke width that makes the glyph chunky at 64px (lucide 16px glyphs ≈ 2, vuesax 24px glyphs ≈ 2.4). */
  stroke: number;
  label: string;
  className?: string;
}

export function Icon3D({ Icon, stroke, label, className }: Icon3DProps) {
  const id = `icon3d-${useId().replace(/:/g, '')}`;
  return (
    <span role="img" aria-label={label} className={cn('relative flex items-center justify-center overflow-hidden rounded-lg bg-brand-primary-subtle', className)}>
      <svg aria-hidden="true" className="absolute size-0">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: 'var(--color-mobile-selected-border)' }} />
            <stop offset="22%" style={{ stopColor: 'var(--color-brand-primary-alt)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--color-brand-primary-hover)' }} />
          </linearGradient>
        </defs>
      </svg>
      {/* Ground shadow */}
      <span aria-hidden="true" className="absolute bottom-4 h-2.5 w-14 rounded-full bg-text-black opacity-20 blur-sm" />
      <span aria-hidden="true" className="relative size-16 -translate-x-1 -translate-y-1">
        {Array.from({ length: DEPTH }, (_, i) => DEPTH - i).map((n) => (
          <Icon
            key={n}
            strokeWidth={stroke}
            className="absolute inset-0 size-full text-brand-primary-hover"
            style={{ transform: `translate(${n * STEP.x}px, ${n * STEP.y}px)`, filter: `brightness(${0.55 + (DEPTH - n) * 0.04})` } as CSSProperties}
          />
        ))}
        <Icon strokeWidth={stroke} className="site-icon-3d-face absolute inset-0 size-full" style={{ '--site-icon-3d-face': `url(#${id})` } as CSSProperties} />
      </span>
    </span>
  );
}
