import checkCircle from '../assets/shared/check-circle.svg';

/** 24px red-tint circle with the check-circle glyph (Figma `check-circle` chips, 691:5071 / 349:5978). */
export function CheckChip() {
  return (
    <span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-site-red-tint">
      <img src={checkCircle} alt="" className="size-3" />
    </span>
  );
}
