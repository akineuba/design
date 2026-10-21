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
export const AppsIcon = icon(<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" /></>);

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

// Table toolbars and rows (accounting)
/** Three decreasing lines: the "Filters" trigger on every accounting table. */
export const FilterLinesIcon = icon(<path d="M3 7h18M6 12h12M10 17h4" />);
/** Funnel with a pen: the "More Filters" toggle. */
export const FilterEditIcon = icon(<><path d="M12.98 20.43 12 21.07c-1.33.82-3.18-.1-3.18-1.74v-5.25c0-.7-.4-1.6-.8-2.1L4.24 8.04c-.5-.5-.9-1.4-.9-2V3.73c0-1.2.9-2.1 2-2.1h13.33c1.1 0 2 .9 2 2v2.2c0 .8-.5 1.8-1 2.3" /><path d="m18.09 13.17-3.54 3.54c-.14.14-.27.4-.3.59l-.19 1.35c-.07.49.27.83.76.76l1.35-.19c.19-.03.46-.16.59-.3l3.54-3.54c.61-.61.9-1.32 0-2.22-.89-.89-1.6-.6-2.21.01ZM17.58 13.68c.3 1.08 1.14 1.92 2.22 2.22" /></>);
/** Table with columns: the "Customize Columns" button (Trial balance, 845:8824). */
export const ColumnsIcon = icon(<><rect x="2.5" y="3" width="19" height="18" rx="3" /><path d="M2.5 9h19M9.5 9v12" /></>);
export const MoreVerticalIcon = icon(<><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></>);
export const ExportIcon = icon(<><path d="M12 13v8M8.5 16.5 12 13l3.5 3.5" /><path d="M7.5 18H7a5 5 0 0 1-.6-9.96A6.5 6.5 0 0 1 19 9.5h.01A4.25 4.25 0 0 1 17 18h-.5" /></>);
export const CloudDownloadIcon = icon(<><path d="M12 13v8M8.5 17.5 12 21l3.5-3.5" /><path d="M7.5 18H7a5 5 0 0 1-.6-9.96A6.5 6.5 0 0 1 19 9.5h.01A4.25 4.25 0 0 1 17 18h-.5" /></>);
export const BulkUploadIcon = icon(<><path d="M11 3H9C4 3 3 4 3 9v6c0 5 1 6 6 6h6c5 0 6-1 6-6v-2" /><path d="M16 3h5v5M21 3l-8 8" /></>);
export const SettingIcon = icon(<><circle cx="12" cy="12" r="3" /><path d="M2 12.88v-1.76c0-1.04.85-1.9 1.9-1.9 1.81 0 2.55-1.28 1.64-2.85-.52-.9-.21-2.07.7-2.59l1.73-.99c.79-.47 1.81-.19 2.28.6l.11.19c.9 1.57 2.38 1.57 3.29 0l.11-.19c.47-.79 1.49-1.07 2.28-.6l1.73.99c.91.52 1.22 1.69.7 2.59-.91 1.57-.17 2.85 1.64 2.85 1.04 0 1.9.85 1.9 1.9v1.76c0 1.04-.85 1.9-1.9 1.9-1.81 0-2.55 1.28-1.64 2.85.52.91.21 2.07-.7 2.59l-1.73.99c-.79.47-1.81.19-2.28-.6l-.11-.19c-.9-1.57-2.38-1.57-3.29 0l-.11.19c-.47.79-1.49 1.07-2.28.6l-1.73-.99a1.9 1.9 0 0 1-.7-2.59c.91-1.57.17-2.85-1.64-2.85-1.05 0-1.9-.86-1.9-1.9Z" /></>);
/** Small arrow used as the sort indicator in table headers. */
export const SortArrowIcon = icon(<path d="M12 5v14M6 13l6 6 6-6" />);
export const EyeIcon = icon(<><path d="M15.58 12a3.58 3.58 0 1 1-7.16 0 3.58 3.58 0 0 1 7.16 0Z" /><path d="M12 20.27c3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19C18.82 5.8 15.53 3.72 12 3.72S5.18 5.8 2.89 9.4c-.9 1.41-.9 3.78 0 5.19 2.29 3.6 5.58 5.68 9.11 5.68Z" /></>);
export const EditIcon = icon(<><path d="M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2" /><path d="M16.04 3.02 8.16 10.9c-.3.3-.6.89-.66 1.32l-.43 3.01c-.16 1.09.61 1.85 1.7 1.7l3.01-.43c.42-.06 1.01-.36 1.32-.66l7.88-7.88c1.36-1.36 2-2.94 0-4.94-2-2-3.58-1.36-4.94 0ZM14.91 4.15a7.14 7.14 0 0 0 4.94 4.94" /></>);
export const PenIcon = icon(<path d="M13.26 3.6 5.05 12.29c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16ZM11.89 5.05a6.13 6.13 0 0 0 5.45 5.15M3 22h18" />);
export const BlockIcon = icon(<><circle cx="12" cy="12" r="9.5" /><path d="m5.3 5.3 13.4 13.4" /></>);
export const ReceiptIcon = icon(<><path d="M22 6v2.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2 19.11 2.01 20.11 2.45 20.83 3.17 21.55 3.9 22 4.9 22 6Z" /><path d="M2 7v14c0 .83.94 1.3 1.6.8l1.71-1.28c.4-.3.96-.26 1.32.1l1.66 1.67c.39.39 1.03.39 1.42 0l1.68-1.68c.35-.35.91-.39 1.3-.09l1.71 1.28c.66.49 1.6.02 1.6-.8V4c0-1.1.9-2 2-2H6C3 2 2 3.79 2 6v1ZM6 9h6M6.75 13h4.5" /></>);
export const MoneyReceiveIcon = icon(<><path d="M9.5 13.75c0 .97.75 1.75 1.67 1.75h1.88c.8 0 1.45-.68 1.45-1.53 0-.91-.4-1.24-.99-1.45l-3.01-1.05c-.59-.21-.99-.53-.99-1.45 0-.84.65-1.53 1.45-1.53h1.88c.92 0 1.67.78 1.67 1.75M12 7.5v9" /><path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2M17 3v4h4M22 2l-5 5" /></>);
export const UsersIcon = icon(<><path d="M9.16 10.87c-.1-.01-.22-.01-.33 0a4.42 4.42 0 0 1-4.27-4.43C4.56 3.99 6.54 2 9 2a4.435 4.435 0 0 1 .16 8.87ZM16.41 4c1.94 0 3.5 1.57 3.5 3.5 0 1.89-1.5 3.43-3.37 3.5a1.13 1.13 0 0 0-.26 0" /><path d="M4.16 14.56c-2.42 1.62-2.42 4.26 0 5.87 2.75 1.84 7.26 1.84 10.01 0 2.42-1.62 2.42-4.26 0-5.87-2.74-1.83-7.25-1.83-10.01 0ZM18.34 20c.72-.15 1.4-.44 1.96-.87 1.56-1.17 1.56-3.1 0-4.27-.55-.42-1.22-.7-1.93-.86" /></>);
export const BankIcon = icon(<><path d="M12.37 2.15 21.37 5.75c.35.14.63.56.63.93V10c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1V6.68c0-.37.28-.79.63-.93l9-3.6c.2-.08.54-.08.74 0ZM22 22H2v-3c0-.55.45-1 1-1h18c.55 0 1 .45 1 1v3ZM4 18v-7M8 18v-7M12 18v-7M16 18v-7M20 18v-7M1 22h22" /><path d="M12 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /></>);
export const SlidersIcon = icon(<path d="M22 6.5h-6M6 6.5H2M10 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM22 17.5h-4M8 17.5H2M14 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />);
export const ChartIcon = icon(<><path d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z" /><path d="M7 17v-4M12 17V7M17 17v-7" /></>);
export const DocumentIcon = icon(<><path d="M22 10v5c0 5-2 7-7 7H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h5" /><path d="M22 10h-4c-3 0-4-1-4-4V2l8 8ZM7 13h6M7 17h4" /></>);
export const HelpIcon = icon(<><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" /></>);
export const ChatIcon = icon(<path d="M8.5 19H8c-4 0-6-1-6-6V8c0-4 2-6 6-6h8c4 0 6 2 6 6v5c0 4-2 6-6 6h-.5c-.31 0-.61.15-.8.4l-1.5 2c-.66.88-1.74.88-2.4 0l-1.5-2c-.16-.22-.53-.4-.8-.4Z" />);
export const ProfileIcon = icon(<><circle cx="12" cy="8" r="4.5" /><path d="M3.5 22a8.5 8.5 0 0 1 17 0" /></>);
export const TaskIcon = icon(<path d="M11 19.5h10M11 12.5h10M11 5.5h10M3 5.5l1 1 3-3M3 12.5l1 1 3-3M3 19.5l1 1 3-3" />);
export const GlobeIcon = icon(<><circle cx="12" cy="12" r="10" /><path d="M8 3h1a28.4 28.4 0 0 0 0 18H8M15 3a28.4 28.4 0 0 1 0 18M3 16v-1a28.4 28.4 0 0 0 18 0v1M3 9a28.4 28.4 0 0 1 18 0" /></>);
export const WalletIcon = icon(<><path d="M18.04 13.55c-.42.41-.66 1-.6 1.63.09 1.08 1.08 1.87 2.16 1.87h1.9v1.19c0 2.07-1.69 3.76-3.76 3.76H6.26c-2.07 0-3.76-1.69-3.76-3.76v-6.73c0-2.07 1.69-3.76 3.76-3.76h11.48c2.07 0 3.76 1.69 3.76 3.76v1.44h-2.02c-.56 0-1.07.22-1.44.6Z" /><path d="M2.5 12.41V7.84c0-1.19.73-2.25 1.84-2.67l7.94-3c1.24-.47 2.57.45 2.57 1.78v3.8M22.56 13.97v2.06c0 .55-.44 1-1 1.02H19.6c-1.08 0-2.07-.79-2.16-1.87-.06-.63.18-1.22.6-1.63.37-.38.88-.6 1.44-.6h2.08c.56.02 1 .47 1 1.02ZM7 12h7" /></>);
export const ClockIcon = icon(<><circle cx="12" cy="12" r="10" /><path d="m15.71 15.18-3.1-1.85c-.54-.32-.98-1.09-.98-1.72v-4.1" /></>);
export const AwardIcon = icon(<><circle cx="12" cy="9" r="6" /><path d="M8.5 13.8 7 22l5-3 5 3-1.5-8.2" /></>);
export const TrainingIcon = icon(<><path d="M2 8.5 12 4l10 4.5L12 13 2 8.5Z" /><path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5M22 8.5V14" /></>);
export const KeyIcon = icon(<><circle cx="8" cy="15" r="5" /><path d="m11.5 11.5 9-9M17 6l3 3M15 8l2 2" /></>);
export const ShieldIcon = icon(<><path d="M10.49 2.23 5.5 4.11C4.35 4.54 3.41 5.9 3.41 7.12v7.43c0 1.18.78 2.73 1.73 3.44l4.3 3.21c1.41 1.06 3.73 1.06 5.14 0l4.3-3.21c.95-.71 1.73-2.26 1.73-3.44V7.12c0-1.23-.94-2.59-2.09-3.02l-4.99-1.87c-.85-.31-2.21-.31-3.04 0Z" /><path d="m9.05 11.87 1.61 1.61 4.3-4.3" /></>);
export const CoinIcon = icon(<><circle cx="12" cy="12" r="10" /><path d="M9.5 14c0 .97.75 1.75 1.67 1.75h1.88c.8 0 1.45-.68 1.45-1.53 0-.91-.4-1.24-.99-1.45l-3.01-1.05c-.59-.21-.99-.53-.99-1.45 0-.84.65-1.53 1.45-1.53h1.88c.92 0 1.67.78 1.67 1.75M12 6.5v11" /></>);
export const ScanIcon = icon(<path d="M2 9V6.5C2 4.01 4.01 2 6.5 2H9M15 2h2.5C19.99 2 22 4.01 22 6.5V9M22 16v1.5c0 2.49-2.01 4.5-4.5 4.5H16M9 22H6.5C4.01 22 2 19.99 2 17.5V15M7 12h10" />);
export const ActivityIcon = icon(<path d="M2 12h4l3-8 6 16 3-8h4" />);
export const DeviceIcon = icon(<><rect x="5" y="2" width="14" height="20" rx="3" /><path d="M10 18h4" /></>);
export const FolderIcon = icon(<path d="M22 11v6c0 4-1 5-5 5H7c-4 0-5-1-5-5V7c0-4 1-5 5-5h1.5c1.5 0 1.83.44 2.4 1.2l1.5 2c.38.5.6.8 1.6.8h3c4 0 5 1 5 5Z" />);
export const HomeIcon = icon(<path d="M9.02 2.84 3.63 7.04C2.73 7.74 2 9.23 2 10.36v7.41C2 20.09 3.89 22 6.21 22h11.58C20.11 22 22 20.09 22 17.78V10.5c0-1.21-.81-2.76-1.8-3.45l-6.18-4.33c-1.4-.98-3.65-.93-5 .12ZM12 17.99v-3" />);
