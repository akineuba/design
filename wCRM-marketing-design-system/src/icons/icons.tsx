import type { SVGProps } from 'react';

/*
 * Line icons matching the Figma set (vuesax linear / lucide style: 24px grid, 2px stroke, round caps).
 * They inherit size from the parent ([&>svg]:size-4 in components) and colour from currentColor.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = (paths: JSX.Element, name: string) => {
  const Icon = (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {paths}
    </svg>
  );
  Icon.displayName = name;
  return Icon;
};

export const PlusIcon = base(<><path d="M5 12h14" /><path d="M12 5v14" /></>, 'PlusIcon');
export const SearchIcon = base(<><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>, 'SearchIcon');
/** vuesax/linear/filter, exported from Figma `filter/Property 1=linear` (18px grid, 1.5 stroke). */
export const FilterIcon = (props: IconProps) => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={1.5} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M4.05 1.575h9.9c.825 0 1.5.675 1.5 1.5v1.65c0 .6-.375 1.35-.75 1.725L11.476 9.3c-.45.375-.75 1.125-.75 1.725v3.225c0 .45-.3 1.05-.675 1.275l-1.05.675c-.975.6-2.325-.075-2.325-1.275V10.95c0-.525-.3-1.2-.6-1.575l-2.85-3c-.375-.375-.675-1.05-.675-1.5V3.15c0-.9.675-1.575 1.5-1.575Z" />
    <path d="M8.198 1.575 4.5 7.5" />
  </svg>
);
FilterIcon.displayName = 'FilterIcon';

/* View-toggle glyphs, exported from Figma `btn-list-view` / `btn-calendar-view` (16px live area, 2px stroke). */
const viewIcon = (paths: JSX.Element, name: string) => {
  const Icon = (props: IconProps) => (
    <svg viewBox="12 12 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true" {...props}>
      {paths}
    </svg>
  );
  Icon.displayName = name;
  return Icon;
};
export const ListIcon = viewIcon(<path d="M14 15.333h.007M14 20h.007M14 24.667h.007M17.333 15.333H26M17.333 20H26m-8.667 4.667H26" />, 'ListIcon');
export const CalendarIcon = viewIcon(<path d="M17.333 13.333V16m5.334-2.667V16M14 18.667h12m-10.667-4h9.334c.736 0 1.333.597 1.333 1.333v9.334c0 .736-.597 1.333-1.333 1.333h-9.334A1.333 1.333 0 0 1 14 25.334V16c0-.736.597-1.333 1.333-1.333Z" />, 'CalendarIcon');
export const CloseIcon = base(<><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>, 'CloseIcon');
export const ChevronDownIcon = base(<path d="m6 9 6 6 6-6" />, 'ChevronDownIcon');
export const MoreIcon = base(<><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></>, 'MoreIcon');
export const EyeIcon = base(<><path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0" /><circle cx="12" cy="12" r="3" /></>, 'EyeIcon');
export const PencilIcon = base(<path d="M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z" />, 'PencilIcon');
export const TrashIcon = base(<><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>, 'TrashIcon');
export const UploadIcon = base(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m17 8-5-5-5 5" /><path d="M12 3v12" /></>, 'UploadIcon');
export const DownloadIcon = base(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /><path d="M12 15V3" /></>, 'DownloadIcon');
export const HistoryIcon = base(<><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></>, 'HistoryIcon');
export const UsersIcon = base(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>, 'UsersIcon');
export const MailIcon = base(<><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>, 'MailIcon');
export const GridIcon = base(<><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></>, 'GridIcon');
export const TrendUpIcon = base(<><path d="M22 7 13.5 15.5 8.5 10.5 2 17" /><path d="M16 7h6v6" /></>, 'TrendUpIcon');
export const TrendDownIcon = base(<><path d="M22 17 13.5 8.5 8.5 13.5 2 7" /><path d="M16 17h6v-6" /></>, 'TrendDownIcon');
export const SendIcon = base(<><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" /></>, 'SendIcon');
export const CheckIcon = base(<path d="M20 6 9 17l-5-5" />, 'CheckIcon');
export const CopyIcon = base(<><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></>, 'CopyIcon');
