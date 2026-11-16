import { useLocation } from 'react-router-dom';

/** Shown only in the hosted preview build: the site has no backend, so nothing is sent or charged. */
export function PreviewNote() {
  const { pathname } = useLocation();
  return (
    <p className="fixed bottom-4 left-4 z-40 max-w-modal-xs rounded-md border border-border-default bg-surface-default px-3 py-2 text-caption text-text-secondary shadow-md">
      Design preview{pathname.startsWith('/checkout') || pathname === '/contact' ? ': forms don’t submit and no payment is taken.' : ' of the wCRM website.'}
    </p>
  );
}
