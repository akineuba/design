// Line icons in the Vuesax "linear" style used across the w-Biz screens: 24px grid, 1.5 stroke,
// round caps, currentColor. They fill their container, so size them with a wrapper (e.g. `size-icon`).
import type { SVGProps } from 'react';

export type IconProps = SVGProps<SVGSVGElement>;

const Base = ({ children, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    focusable="false"
    {...props}
  >
    {children}
  </svg>
);

const icon = (paths: JSX.Element) => (props: IconProps) => <Base {...props}>{paths}</Base>;

// Actions
export const PlusIcon = icon(<path d="M6 12h12M12 18V6" />);
export const AddCircleIcon = icon(<><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 16V8" /></>);
export const MinusCircleIcon = icon(<><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></>);
export const CloseIcon = icon(<path d="m6 6 12 12M18 6 6 18" />);
export const CloseCircleIcon = icon(<><circle cx="12" cy="12" r="10" /><path d="m9.17 14.83 5.66-5.66M14.83 14.83 9.17 9.17" /></>);
export const CheckIcon = icon(<path d="m5 12.5 4.5 4.5L19 7.5" />);
export const TickCircleIcon = icon(<><circle cx="12" cy="12" r="10" /><path d="m7.75 12 2.83 2.83 5.67-5.66" /></>);
export const TrashIcon = icon(<path d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14" />);
export const CopyIcon = icon(<><rect x="8" y="8" width="13" height="13" rx="3" /><path d="M16 8V6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h2" /></>);
export const ImportIcon = icon(<><path d="M9 11v6l2-2M9 17l-2-2" /><path d="M22 10v5c0 5-2 7-7 7H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h5" /><path d="M22 10h-4c-3 0-4-1-4-4V2l8 8Z" /></>);
export const FolderAddIcon = icon(<><path d="M12 17v-6M15 14H9" /><path d="M22 11v6c0 4-1 5-5 5H7c-4 0-5-1-5-5V7c0-4 1-5 5-5h1.5c1.5 0 1.83.44 2.4 1.2l1.5 2c.38.5.6.8 1.6.8h3c4 0 5 1 5 5Z" /></>);

// Navigation and chevrons
export const ChevronDownIcon = icon(<path d="m6 9 6 6 6-6" />);
export const ChevronUpIcon = icon(<path d="m18 15-6-6-6 6" />);
export const ChevronLeftIcon = icon(<path d="m15 18-6-6 6-6" />);
export const ChevronRightIcon = icon(<path d="m9 18 6-6-6-6" />);
export const ArrowDownIcon = icon(<path d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95" />);

// Fields and toolbars
export const SearchIcon = icon(<><circle cx="11.5" cy="11.5" r="9.5" /><path d="m22 22-2-2" /></>);
export const CalendarIcon = icon(<path d="M8 2v3M16 2v3M3.5 9.09h17M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" />);
export const FilterIcon = icon(<path d="M5.4 2.1h13.2c1.1 0 2 .9 2 2v2.2c0 .8-.5 1.8-1 2.3l-4.3 3.8c-.6.5-1 1.5-1 2.3v4.3c0 .6-.4 1.4-.9 1.7L12 21.6c-1.3.8-3.1-.1-3.1-1.7v-5.3c0-.7-.4-1.6-.8-2.1L4.3 8.5c-.5-.5-.9-1.4-.9-2V4.2c0-1.2.9-2.1 2-2.1Z" />);
export const ListIcon = icon(<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />);
export const GridIcon = icon(<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>);

// Top bar
export const BellIcon = icon(<path d="M12.02 2.91c-3.31 0-6 2.69-6 6v2.89c0 .61-.26 1.54-.57 2.06L4.3 15.77c-.71 1.18-.22 2.49 1.08 2.93a20.9 20.9 0 0 0 13.27 0c1.21-.4 1.74-1.83 1.08-2.93l-1.15-1.91c-.3-.52-.56-1.45-.56-2.06V8.91c0-3.3-2.7-6-6-6ZM15.02 19.06a3 3 0 0 1-6 0" />);
export const MoonIcon = icon(<path d="M2.03 12.42c.36 5.15 4.73 9.34 9.96 9.57a10.48 10.48 0 0 0 9.11-4.38c.6-.91.33-1.51-.53-1.35-1.41.25-2.87.15-4.2-.33a7.5 7.5 0 0 1-4.68-7.24 7.43 7.43 0 0 1 .5-2.68c.39-.98-.07-1.48-1.04-1.13A10.43 10.43 0 0 0 2.03 12.42Z" />);
export const SunIcon = icon(<><circle cx="12" cy="12" r="4.5" /><path d="M12 2v1.5M12 20.5V22M4.93 4.93 6 6M18 18l1.07 1.07M2 12h1.5M20.5 12H22M4.93 19.07 6 18M18 6l1.07-1.07" /></>);
export const SparkleIcon = icon(<path d="M12 3c.5 3.6 2.4 5.5 6 6-3.6.5-5.5 2.4-6 6-.5-3.6-2.4-5.5-6-6 3.6-.5 5.5-2.4 6-6ZM19 15c.25 1.8 1.2 2.75 3 3-1.8.25-2.75 1.2-3 3-.25-1.8-1.2-2.75-3-3 1.8-.25 2.75-1.2 3-3ZM5 2.5c.2 1.2.8 1.8 2 2-1.2.2-1.8.8-2 2-.2-1.2-.8-1.8-2-2 1.2-.2 1.8-.8 2-2Z" />);
export const AppsIcon = icon(<path d="M3 3h5v5H3zM9.5 3h5v5h-5zM16 3h5v5h-5zM3 9.5h5v5H3zM9.5 9.5h5v5h-5zM16 9.5h5v5h-5zM3 16h5v5H3zM9.5 16h5v5h-5zM16 16h5v5h-5z" />);

// Modules (sidebar)
export const CalculatorIcon = icon(<><rect x="4" y="2" width="16" height="20" rx="3" /><path d="M8 6.5h8M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01" /></>);
export const CartIcon = icon(<><path d="M2 2h1.74c1.08 0 1.93.93 1.84 2l-.83 9.96A2.8 2.8 0 0 0 7.54 17h10.65c1.44 0 2.7-1.18 2.81-2.61l.54-7.5c.12-1.66-1.14-3.01-2.81-3.01H5.82" /><circle cx="16.25" cy="20.75" r="1.25" /><circle cx="8.25" cy="20.75" r="1.25" /><path d="M9 8h12" /></>);
export const BagIcon = icon(<path d="M8.5 7.67V6.7c0-2.25 1.81-4.46 4.06-4.67A4.5 4.5 0 0 1 17.5 6.5v1.38M9 22h6c4.02 0 4.74-1.61 4.95-3.57l.75-6C20.97 9.99 20.27 8 16 8H8c-4.27 0-4.97 1.99-4.7 4.43l.75 6C4.26 20.39 4.98 22 9 22Z" />);
export const ClipboardCheckIcon = icon(<><path d="M8 2h8v4H8z" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></>);
export const BoxIcon = icon(<><path d="m3.17 7.44 8.83 5.11 8.77-5.08M12 21.61v-9.07" /><path d="M9.93 2.48 4.59 5.44c-1.21.67-2.2 2.35-2.2 3.73v5.65c0 1.38.99 3.06 2.2 3.73l5.34 2.97c1.14.63 3.01.63 4.15 0l5.34-2.97c1.21-.67 2.2-2.35 2.2-3.73V9.17c0-1.38-.99-3.06-2.2-3.73l-5.34-2.97c-1.15-.63-3.01-.63-4.15.01Z" /></>);
export const UserLockIcon = icon(<><circle cx="10" cy="7" r="4" /><path d="M3 21a7 7 0 0 1 10.5-6.06" /><rect x="15" y="16" width="6" height="5" rx="1" /><path d="M16.5 16v-1.5a1.5 1.5 0 0 1 3 0V16" /></>);
export const BookIcon = icon(<path d="M22 16.74V4.67c0-1.2-.98-2.09-2.17-1.99h-.06c-2.1.18-5.29 1.25-7.07 2.37l-.17.11c-.29.18-.77.18-1.06 0l-.25-.15C9.44 3.9 6.26 2.84 4.16 2.67 2.97 2.57 2 3.47 2 4.66v12.08c0 .96.78 1.86 1.74 1.98l.29.04c2.17.29 5.52 1.39 7.44 2.44l.04.02c.27.15.7.15.96 0 1.92-1.06 5.28-2.17 7.46-2.46l.33-.04c.96-.12 1.74-1.02 1.74-1.98ZM12 5.49v15" />);
export const TransferIcon = icon(<path d="M20.5 14.99 15.49 20M3.5 14.99h17M3.5 9.01 8.51 4M20.5 9.01h-17" />);
export const LayersIcon = icon(<path d="m13.01 2.92 5.9 2.62c1.7.75 1.7 1.99 0 2.74l-5.9 2.62c-.67.3-1.77.3-2.44 0l-5.9-2.62c-1.7-.75-1.7-1.99 0-2.74l5.9-2.62c.67-.3 1.77-.3 2.44 0ZM3 11c0 .84.63 1.81 1.4 2.15l6.79 3.02c.52.23 1.11.23 1.62 0l6.79-3.02c.77-.34 1.4-1.31 1.4-2.15M3 16c0 .93.55 1.77 1.4 2.15l6.79 3.02c.52.23 1.11.23 1.62 0l6.79-3.02A2.35 2.35 0 0 0 21 16" />);
export const BarChartIcon = icon(<path d="M5 20v-6M12 20V9M19 20V4" />);
export const BriefcaseIcon = icon(<><path d="M8 22h8c4.02 0 4.74-1.61 4.95-3.57l.75-8C21.97 7.99 21.27 6 17 6H7c-4.27 0-4.97 1.99-4.7 4.43l.75 8C3.26 20.39 3.98 22 8 22ZM8 6v-.8C8 3.43 8 2 11.2 2h1.6C16 2 16 3.43 16 5.2V6" /><path d="M21.65 11A16.5 16.5 0 0 1 12 14c-3.5 0-6.86-1.07-9.65-2.95" /></>);
export const TagIcon = icon(<><path d="m4.17 15.3 4.53 4.53a4.78 4.78 0 0 0 6.75 0l4.39-4.39a4.78 4.78 0 0 0 0-6.75L15.3 4.17a4.75 4.75 0 0 0-3.6-1.39l-5 .24c-2 .09-3.59 1.68-3.69 3.67l-.24 5c-.06 1.35.45 2.66 1.4 3.61Z" /><circle cx="9.5" cy="9.5" r="2.5" /></>);
export const PrinterIcon = icon(<path d="M7.25 7h9.5V5c0-2-.75-3-3-3h-3.5c-2.25 0-3 1-3 3v2ZM16 15v4c0 2-1 3-3 3h-2c-2 0-3-1-3-3v-4h8ZM21 10v5c0 2-1 3-3 3h-2v-3H8v3H6c-2 0-3-1-3-3v-5c0-2 1-3 3-3h12c2 0 3 1 3 3ZM17 15H7M7 11h3" />);
