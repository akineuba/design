import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

/** Checkout header: logo + Back (Figma `Frame 18`, 367:11362). */
export function CheckoutHeader({ backTo }: { backTo?: string }) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 border-b border-border-module-header bg-surface-default shadow-site-header">
      <div className="relative flex items-center gap-20 px-25 py-2.5">
        <div className="flex flex-1 items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={() => (backTo ? navigate(backTo) : navigate(-1))}
            className="flex items-center gap-2.5 rounded-callout px-6 py-3 text-body font-medium text-accent-navy-hover hover:bg-accent-navy-subtle focus-visible:outline-none focus-visible:shadow-focus"
          >
            <span aria-hidden="true" className="font-bold">←</span>
            Back
          </button>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
