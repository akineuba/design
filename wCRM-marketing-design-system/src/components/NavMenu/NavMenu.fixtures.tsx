/* Example navigation data for the NavMenu stories and tests. */
import {
  Buildings2Icon,
  Buildings2OutlineIcon,
  CallCallingOutlineIcon,
  CarbonEmailIcon,
  CategoryIcon,
  LucideCalendarIcon,
  LucideChartLineIcon,
  LucideInboxIcon,
  MessagesOutlineIcon,
  PeopleIcon,
  Profile2UserIcon,
  Profile2UserOutlineIcon,
  SolarPlanetLinearIcon,
} from '../../icons';
import type { NavMenuSection, NavMenuSettings } from './NavMenu';

/** Figma marketing sidebar (1514:7196). */
export const marketingSections: NavMenuSection[] = [
  {
    id: 'marketing',
    label: 'Marketing',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <CategoryIcon /> },
      { id: 'audience', label: 'Audience', icon: <PeopleIcon /> },
      { id: 'email', label: 'E-mail', icon: <CarbonEmailIcon /> },
      { id: 'social', label: 'Social Media', icon: <MessagesOutlineIcon /> },
      { id: 'campaigns', label: 'Campaigns', icon: <Profile2UserOutlineIcon /> },
      { id: 'companies', label: 'Companies', icon: <Buildings2OutlineIcon /> },
      { id: 'contacts', label: 'Contacts', icon: <CallCallingOutlineIcon /> },
    ],
  },
];

export const marketingSettings: NavMenuSettings = {
  showChevrons: false,
  items: [
    { id: 'settings-organisation', label: 'Organisation' },
    { id: 'settings-notifications', label: 'Notifications' },
    { id: 'settings-social', label: 'Social Media' },
    { id: 'settings-email', label: 'E-mail' },
    { id: 'settings-profile', label: 'Profile' },
    { id: 'settings-users', label: 'User Management' },
    { id: 'settings-entities', label: 'Entities' },
  ],
};

/** Business Development sidebar from the product reference: an expandable Reports group and the Settings dropdown. */
export const businessSections: NavMenuSection[] = [
  {
    id: 'business',
    label: 'Business Development',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <CategoryIcon /> },
      { id: 'budgets', label: 'Budgets', icon: <LucideChartLineIcon className="stroke-1" /> },
      {
        id: 'reports',
        label: 'Reports',
        icon: <LucideInboxIcon />,
        children: [
          { id: 'report-performance', label: 'Performance Report' },
          { id: 'report-activity', label: 'Activity Report' },
          { id: 'report-collaboration', label: 'Collaboration Report' },
          { id: 'report-birthdays', label: 'Birthdays' },
          { id: 'report-tasks', label: 'Task Report' },
        ],
      },
      { id: 'deals', label: 'Deals', icon: <PeopleIcon /> },
      { id: 'companies', label: 'Companies', icon: <Buildings2Icon /> },
      { id: 'contacts', label: 'Contacts', icon: <Profile2UserIcon /> },
      { id: 'activity', label: 'Activity', icon: <LucideCalendarIcon className="stroke-1" /> },
      { id: 'orbit', label: 'Orbit AI', icon: <SolarPlanetLinearIcon className="stroke-1.5" /> },
    ],
  },
];

export const businessSettings: NavMenuSettings = {
  items: [
    { id: 'settings-organization', label: 'Organization' },
    { id: 'settings-access', label: 'Users & access' },
    { id: 'settings-sales', label: 'Sales' },
    { id: 'settings-you', label: 'You' },
  ],
};
