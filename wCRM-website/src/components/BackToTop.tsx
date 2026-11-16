import { useEffect, useState } from 'react';
import { LucideArrowUpIcon, cn } from '@ds';

/** Distance scrolled (px) before the button appears: about one screen below the header. */
const SHOW_AFTER = 480;

/**
 * Floating "Back to top" button, lower right on every page. It fades and rises in once the page is scrolled and
 * scrolls smoothly to the top (instantly when the visitor prefers reduced motion; see index.css).
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > SHOW_AFTER);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0 })}
      className={cn(
        'fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center rounded-full bg-brand-primary text-text-inverse shadow-lg',
        'duration-site-slow hover:-translate-y-0.5 hover:bg-brand-primary-hover focus-visible:outline-none focus-visible:shadow-focus',
        visible ? 'opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
      )}
    >
      <LucideArrowUpIcon className="size-5" />
    </button>
  );
}
