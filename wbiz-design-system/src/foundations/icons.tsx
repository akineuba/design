// Story-only icons in the Vuesax "linear" style the Figma screens use (20px, 1.5 stroke, currentColor).
// Production apps should import icons from the team's icon package instead.
import type { SVGProps } from 'react';

const Base = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props} />
);

export const PlusIcon = () => <Base><path d="M6 12h12M12 18V6" /></Base>;
export const ImportIcon = () => <Base><path d="M9 11v6l2-2M9 17l-2-2" /><path d="M22 10v5c0 5-2 7-7 7H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h5" /><path d="M22 10h-4c-3 0-4-1-4-4V2l8 8Z" /></Base>;
export const TrashIcon = () => <Base><path d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14" /></Base>;
export const CopyIcon = () => <Base><rect x="8" y="8" width="13" height="13" rx="3" /><path d="M16 8V6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h2" /></Base>;
export const CalendarIcon = () => <Base><path d="M8 2v3M16 2v3M3.5 9.09h17M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" /></Base>;
export const SearchIcon = () => <Base><circle cx="11.5" cy="11.5" r="9.5" /><path d="m22 22-2-2" /></Base>;
export const ArrowDownIcon = () => <Base><path d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95" /></Base>;
