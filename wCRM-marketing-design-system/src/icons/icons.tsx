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

/**
 * vuesax/outline/calendar, exported from the desktop Figma `filter-button` (1230:26011). Filled outline glyph on a
 * 20px grid (path data copied verbatim; the viewBox offsets it out of the 94 × 40 button frame); this is the icon the labelled "Filter" button uses.
 */
export const CalendarOutlineIcon = (props: IconProps) => (
  <svg viewBox="16 10 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M22.6665 14.792C22.3248 14.792 22.0415 14.5087 22.0415 14.167V11.667C22.0415 11.3253 22.3248 11.042 22.6665 11.042C23.0082 11.042 23.2915 11.3253 23.2915 11.667V14.167C23.2915 14.5087 23.0082 14.792 22.6665 14.792Z" />
    <path d="M29.3335 14.792C28.9918 14.792 28.7085 14.5087 28.7085 14.167V11.667C28.7085 11.3253 28.9918 11.042 29.3335 11.042C29.6752 11.042 29.9585 11.3253 29.9585 11.667V14.167C29.9585 14.5087 29.6752 14.792 29.3335 14.792Z" />
    <path d="M23.0833 22.0829C22.975 22.0829 22.8667 22.058 22.7667 22.0163C22.6583 21.9746 22.575 21.9163 22.4917 21.8413C22.3417 21.6829 22.25 21.4746 22.25 21.2496C22.25 21.1413 22.275 21.0329 22.3167 20.9329C22.3583 20.8329 22.4167 20.7413 22.4917 20.6579C22.575 20.5829 22.6583 20.5246 22.7667 20.4829C23.0667 20.3579 23.4417 20.4246 23.675 20.6579C23.825 20.8163 23.9167 21.0329 23.9167 21.2496C23.9167 21.2996 23.9083 21.358 23.9 21.4163C23.8917 21.4663 23.875 21.5163 23.85 21.5663C23.8333 21.6163 23.8083 21.6663 23.775 21.7163C23.75 21.7579 23.7083 21.7996 23.675 21.8413C23.5167 21.9913 23.3 22.0829 23.0833 22.0829Z" />
    <path d="M25.9998 22.0837C25.8915 22.0837 25.7832 22.0587 25.6832 22.0171C25.5748 21.9754 25.4915 21.917 25.4082 21.842C25.2582 21.6837 25.1665 21.4754 25.1665 21.2504C25.1665 21.142 25.1915 21.0337 25.2332 20.9337C25.2748 20.8337 25.3332 20.7421 25.4082 20.6587C25.4915 20.5837 25.5748 20.5254 25.6832 20.4837C25.9832 20.3504 26.3582 20.4254 26.5915 20.6587C26.7415 20.8171 26.8332 21.0337 26.8332 21.2504C26.8332 21.3004 26.8248 21.3587 26.8165 21.4171C26.8082 21.4671 26.7915 21.5171 26.7665 21.5671C26.7498 21.6171 26.7248 21.667 26.6915 21.717C26.6665 21.7587 26.6248 21.8004 26.5915 21.842C26.4332 21.992 26.2165 22.0837 25.9998 22.0837Z" />
    <path d="M28.9168 22.0837C28.8085 22.0837 28.7002 22.0587 28.6002 22.0171C28.4918 21.9754 28.4085 21.917 28.3252 21.842C28.2918 21.8004 28.2585 21.7587 28.2252 21.717C28.1918 21.667 28.1668 21.6171 28.1502 21.5671C28.1252 21.5171 28.1085 21.4671 28.1002 21.4171C28.0918 21.3587 28.0835 21.3004 28.0835 21.2504C28.0835 21.0337 28.1752 20.8171 28.3252 20.6587C28.4085 20.5837 28.4918 20.5254 28.6002 20.4837C28.9085 20.3504 29.2752 20.4254 29.5085 20.6587C29.6585 20.8171 29.7502 21.0337 29.7502 21.2504C29.7502 21.3004 29.7418 21.3587 29.7335 21.4171C29.7252 21.4671 29.7085 21.5171 29.6835 21.5671C29.6668 21.6171 29.6418 21.667 29.6085 21.717C29.5835 21.7587 29.5418 21.8004 29.5085 21.842C29.3502 21.992 29.1335 22.0837 28.9168 22.0837Z" />
    <path d="M23.0833 25C22.975 25 22.8667 24.975 22.7667 24.9333C22.6667 24.8917 22.575 24.8333 22.4917 24.7583C22.3417 24.6 22.25 24.3833 22.25 24.1667C22.25 24.0583 22.275 23.95 22.3167 23.85C22.3583 23.7417 22.4167 23.65 22.4917 23.575C22.8 23.2667 23.3667 23.2667 23.675 23.575C23.825 23.7333 23.9167 23.95 23.9167 24.1667C23.9167 24.3833 23.825 24.6 23.675 24.7583C23.5167 24.9083 23.3 25 23.0833 25Z" />
    <path d="M25.9998 25C25.7832 25 25.5665 24.9083 25.4082 24.7583C25.2582 24.6 25.1665 24.3833 25.1665 24.1667C25.1665 24.0583 25.1915 23.95 25.2332 23.85C25.2748 23.7417 25.3332 23.65 25.4082 23.575C25.7165 23.2667 26.2832 23.2667 26.5915 23.575C26.6665 23.65 26.7248 23.7417 26.7665 23.85C26.8082 23.95 26.8332 24.0583 26.8332 24.1667C26.8332 24.3833 26.7415 24.6 26.5915 24.7583C26.4332 24.9083 26.2165 25 25.9998 25Z" />
    <path d="M28.9168 25.0004C28.7002 25.0004 28.4835 24.9087 28.3252 24.7587C28.2502 24.6837 28.1918 24.5921 28.1502 24.4838C28.1085 24.3838 28.0835 24.2754 28.0835 24.1671C28.0835 24.0587 28.1085 23.9504 28.1502 23.8504C28.1918 23.7421 28.2502 23.6504 28.3252 23.5754C28.5168 23.3838 28.8085 23.2921 29.0752 23.3504C29.1335 23.3587 29.1835 23.3754 29.2335 23.4004C29.2835 23.4171 29.3335 23.4421 29.3835 23.4754C29.4252 23.5004 29.4668 23.5421 29.5085 23.5754C29.6585 23.7338 29.7502 23.9504 29.7502 24.1671C29.7502 24.3837 29.6585 24.6004 29.5085 24.7587C29.3502 24.9087 29.1335 25.0004 28.9168 25.0004Z" />
    <path d="M33.0832 18.2002H18.9165C18.5748 18.2002 18.2915 17.9169 18.2915 17.5752C18.2915 17.2335 18.5748 16.9502 18.9165 16.9502H33.0832C33.4248 16.9502 33.7082 17.2335 33.7082 17.5752C33.7082 17.9169 33.4248 18.2002 33.0832 18.2002Z" />
    <path d="M29.3333 28.9587H22.6667C19.625 28.9587 17.875 27.2087 17.875 24.167V17.0837C17.875 14.042 19.625 12.292 22.6667 12.292H29.3333C32.375 12.292 34.125 14.042 34.125 17.0837V24.167C34.125 27.2087 32.375 28.9587 29.3333 28.9587ZM22.6667 13.542C20.2833 13.542 19.125 14.7003 19.125 17.0837V24.167C19.125 26.5503 20.2833 27.7087 22.6667 27.7087H29.3333C31.7167 27.7087 32.875 26.5503 32.875 24.167V17.0837C32.875 14.7003 31.7167 13.542 29.3333 13.542H22.6667Z" />
  </svg>
);
CalendarOutlineIcon.displayName = 'CalendarOutlineIcon';

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
