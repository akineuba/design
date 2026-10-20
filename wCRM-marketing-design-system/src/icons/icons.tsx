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
export const FilterIcon = base(<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />, 'FilterIcon');
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
