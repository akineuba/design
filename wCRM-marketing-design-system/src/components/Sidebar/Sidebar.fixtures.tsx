/* Example navigation data shared by the Sidebar and Navbar stories. */
import {
  Buildings2OutlineIcon,
  CallCallingOutlineIcon,
  CarbonEmailIcon,
  CategoryIcon,
  LucideCalendarIcon,
  LucideChartLineIcon,
  LucideInboxIcon,
  MessagesOutlineIcon,
  PeopleIcon,
  Profile2UserOutlineIcon,
  SolarPlanetLinearIcon,
} from '../../icons';
import type { SidebarSection, SidebarSettings } from './Sidebar';

/** Figma marketing sidebar (1514:7196). */
export const marketingSections: SidebarSection[] = [
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

export const marketingSettings: SidebarSettings = {
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
export const businessSections: SidebarSection[] = [
  {
    id: 'business',
    label: 'Business Development',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <CategoryIcon /> },
      { id: 'budgets', label: 'Budgets', icon: <LucideChartLineIcon /> },
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
      { id: 'companies', label: 'Companies', icon: <Buildings2OutlineIcon /> },
      { id: 'contacts', label: 'Contacts', icon: <Profile2UserOutlineIcon /> },
      { id: 'activity', label: 'Activity', icon: <LucideCalendarIcon /> },
      { id: 'orbit', label: 'Orbit AI', icon: <SolarPlanetLinearIcon /> },
    ],
  },
];

export const businessSettings: SidebarSettings = {
  defaultOpen: true,
  items: [
    { id: 'settings-organization', label: 'Organization' },
    { id: 'settings-access', label: 'Users & access' },
    { id: 'settings-sales', label: 'Sales' },
    { id: 'settings-you', label: 'You' },
  ],
};
