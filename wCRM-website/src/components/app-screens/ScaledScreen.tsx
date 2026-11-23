import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

/**
 * How the screen fills its box, matching the crop Figma used for the screenshot it replaces:
 * - cover: fill the box, centred (image 363, Contact Management)
 * - top: fit the width, anchored to the top (images 364 and 367)
 * - left: fit the height, anchored to the left (image 366)
 */
export type ScreenFit = 'cover' | 'top' | 'left';

/** Zoom to one region instead: its left/top edge and width in native px fill the box's width. */
export interface ScreenFocus {
  x: number;
  y: number;
  w: number;
}

interface ScaledScreenProps {
  /** Native size the screen is laid out at, in px. */
  width: number;
  height: number;
  fit: ScreenFit;
  /** Optional crop: overrides `fit` and scales so this region fills the box's width (marketing crops). */
  focus?: ScreenFocus;
  /** Accessible description of the illustration. */
  label: string;
  children: ReactNode;
}

/**
 * Renders a full-size product screen and scales it into its parent, like an `<img>` with object-fit.
 * The screen is built from design-system tokens, so it follows the light / dark theme. It is an illustration:
 * the subtree is `inert` (not focusable, not clickable) and exposed to assistive tech as one image.
 */
export function ScaledScreen({ width, height, fit, focus, label, children }: ScaledScreenProps) {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  let transform = 'scale(0)';
  if (size && focus) {
    const s = size.w / focus.w;
    transform = `translate(${-focus.x * s}px, ${-focus.y * s}px) scale(${s})`;
  } else if (size) {
    const s = fit === 'cover' ? Math.max(size.w / width, size.h / height) : fit === 'top' ? size.w / width : size.h / height;
    const x = fit === 'cover' ? (size.w - width * s) / 2 : 0;
    const y = fit === 'cover' ? (size.h - height * s) / 2 : 0;
    transform = `translate(${x}px, ${y}px) scale(${s})`;
  }

  return (
    <div ref={box} role="img" aria-label={label} className="absolute inset-0 overflow-hidden">
      <div
        aria-hidden="true"
        {...({ inert: '' } as object)}
        className="pointer-events-none absolute left-0 top-0 origin-top-left select-none bg-surface-canvas font-sans"
        style={{ width, height, transform }}
      >
        {children}
      </div>
    </div>
  );
}
