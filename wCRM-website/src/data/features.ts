import type { ComponentType, SVGProps } from 'react';
import {
  CategoryIcon,
  FilterIcon,
  LucideActivityIcon,
  LucideAwardIcon,
  LucideCalendarIcon,
  LucideChartLineIcon,
  LucideCheckCircleIcon,
  LucideCloudUploadIcon,
  LucideKeyIcon,
  LucideMailIcon,
  LucidePhoneIcon,
  LucideSearchIcon,
  LucideUserIcon,
  PeopleIcon,
  PhExportLightIcon,
} from '@ds';

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export interface FeatureDetail {
  id: 'contact-management' | 'deal-management' | 'activities-reporting' | 'budget-targets';
  title: string;
  /** Hero headline, split so the second part can be set in brand red like the homepage hero. */
  headline: [string, string];
  lead: string;
  proof: string[];
  capabilities: { title: string; body: string; icon: Icon }[];
  steps: { title: string; body: string }[];
  cta: string;
}

/**
 * Feature pages (preview). Copy is drawn from the homepage and the product screens; no figures or quotes are invented.
 */
export const FEATURE_DETAILS: FeatureDetail[] = [
  {
    id: 'contact-management',
    title: 'Contact Management',
    headline: ['Every customer relationship, ', 'in one place.'],
    lead: 'Store and search customer profiles, import contact lists, and keep every relationship detail at your fingertips.',
    proof: ['Import contact lists', 'Assign contact owners', 'Search in seconds'],
    capabilities: [
      { title: 'Unified customer profiles', body: 'Names, emails, phone numbers and companies sit on one record that the whole team works from.', icon: PeopleIcon },
      { title: 'Import contact lists', body: 'Upload the lists you already keep and bring every contact into wCRM in one step.', icon: LucideCloudUploadIcon },
      { title: 'Instant search', body: 'Find any contact by name, email or company from the top of the register.', icon: LucideSearchIcon },
      { title: 'Contact owners', body: 'Give every contact an owner so it is always clear who looks after the relationship.', icon: LucideUserIcon },
      { title: 'Calls and emails on record', body: 'Sync emails and calendar events from Microsoft 365 or Google straight into the contact.', icon: LucidePhoneIcon },
      { title: 'Export any time', body: 'Download the register, or a filtered slice of it, for reporting and audits.', icon: PhExportLightIcon },
    ],
    steps: [
      { title: 'Import your contacts', body: 'Upload a list or add contacts one by one with company and phone details.' },
      { title: 'Assign owners', body: 'Hand each contact to the person responsible for the relationship.' },
      { title: 'Keep history together', body: 'Calls, emails and deals collect on the profile as your team works.' },
    ],
    cta: 'Bring every customer into one CRM',
  },
  {
    id: 'deal-management',
    title: 'Deal Management',
    headline: ['Track every deal from ', 'first call to close.'],
    lead: 'Track every opportunity from qualification to closure with pipelines, deal stages, and ownership controls.',
    proof: ['Reusable deal stages', 'Profit on every deal', 'Role-based ownership'],
    capabilities: [
      { title: 'Pipelines and stages', body: 'Define sales pipelines and reusable deal stages that guide opportunities from qualification to closure.', icon: CategoryIcon },
      { title: 'Complete deal profiles', body: 'Capture company, contacts, owner, stage, value and commercial details in one place.', icon: LucideUserIcon },
      { title: 'Won, lost and open at a glance', body: 'Totals for open, closed-won and closed-lost deals sit above the register.', icon: LucideCheckCircleIcon },
      { title: 'Profit and expected profit', body: 'See the profit on every deal and what the open pipeline is expected to return.', icon: LucideChartLineIcon },
      { title: 'Collaborators', body: 'Record the contributors and departments on every deal.', icon: PeopleIcon },
      { title: 'Ownership and access', body: 'Role-based access controls decide who can see and change each deal.', icon: LucideKeyIcon },
    ],
    steps: [
      { title: 'Create the deal', body: 'Add the company, owner, value and close date.' },
      { title: 'Move it through stages', body: 'Update the stage as the opportunity progresses; totals update with it.' },
      { title: 'Close and measure', body: 'Mark it won or lost and see the profit land in your numbers.' },
    ],
    cta: 'Close deals faster with wCRM',
  },
  {
    id: 'activities-reporting',
    title: 'Activities & Reporting',
    headline: ['See the work behind ', 'every number.'],
    lead: 'Log emails, calls, meetings, and tasks in a unified timeline with performance trends and exportable reports.',
    proof: ['One activity timeline', 'Live dashboards', 'Exportable reports'],
    capabilities: [
      { title: 'Unified timeline', body: 'Emails, calls, meetings and tasks in one timeline per contact and deal.', icon: LucideActivityIcon },
      { title: 'Meetings and tasks', body: 'Schedule meetings and tasks and see what is due across the team.', icon: LucideCalendarIcon },
      { title: 'Email and calendar sync', body: 'Activity from Microsoft 365 or Google lands in CRM records automatically.', icon: LucideMailIcon },
      { title: 'Goal realization', body: 'Track overall progress against target with a single figure.', icon: LucideAwardIcon },
      { title: 'Revenue by business stream', body: 'See how each stream contributes and compare target with achievement.', icon: LucideChartLineIcon },
      { title: 'Exportable reports', body: 'Export performance breakdowns for the period and stream you need.', icon: PhExportLightIcon },
    ],
    steps: [
      { title: 'Log the activity', body: 'Calls, meetings and tasks are logged or synced as they happen.' },
      { title: 'Watch the trends', body: 'Dashboards summarise volume, pipeline value and conversion live.' },
      { title: 'Share the report', body: 'Export the breakdown for reviews and board packs.' },
    ],
    cta: 'Turn activity into insight',
  },
  {
    id: 'budget-targets',
    title: 'Budget & Targets',
    headline: ['Plan budgets. ', 'Hit targets.'],
    lead: 'Plan sales budgets, distribute targets across teams, and measure achievement against closed deals.',
    proof: ['Budgets by period', 'Targets by team', 'Variance at a glance'],
    capabilities: [
      { title: 'Budgets by period and department', body: 'Plan budgets for each period and department in one place.', icon: LucideCalendarIcon },
      { title: 'Target allocation', body: 'Distribute targets across teams and practice areas, and see what is still unallocated.', icon: PeopleIcon },
      { title: 'Achievement against closed deals', body: 'Achieved figures come straight from deals closed in wCRM.', icon: LucideAwardIcon },
      { title: 'Variance at a glance', body: 'See how far each allocation is ahead of or behind its target.', icon: LucideChartLineIcon },
      { title: 'Revenue streams', body: 'Link each allocation to the revenue streams that feed it.', icon: CategoryIcon },
      { title: 'Filter by allocation type', body: 'Switch between practice areas and other allocation views.', icon: FilterIcon },
    ],
    steps: [
      { title: 'Set the target', body: 'Enter the total target for the period.' },
      { title: 'Allocate it', body: 'Split it across practice areas, teams and revenue streams.' },
      { title: 'Measure achievement', body: 'Closed deals update achieved, unachieved and variance automatically.' },
    ],
    cta: 'Plan your next sales year in wCRM',
  },
];
