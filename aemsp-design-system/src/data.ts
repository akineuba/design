import type { Subscription, ApprovalRequest, PermRow, ActivityEvent } from './components/domain';

export interface OrgRow { id: string; name: string; contact: string; type: 'OEM' | 'Dealer' | 'Fleet' | 'Partner'; licences: number; overdue: number; status: 'Active' | 'Overdue' | 'Pending' | 'Suspended'; products: string; region: string; mrr: number; }
export const ORGS: OrgRow[] = [
  { id: 'o1', name: 'Northwind Motors', contact: 'Ada Lovelace', type: 'OEM', licences: 1240, overdue: 0, status: 'Active', products: 'Fleet Diagnostics Pro, Service Manuals Plus', region: 'UK & Ireland', mrr: 48200 },
  { id: 'o2', name: 'Apex OEM Group', contact: 'Tunde Bakare', type: 'OEM', licences: 980, overdue: 3, status: 'Overdue', products: 'Telematics Suite, Parts Catalogue', region: 'EMEA', mrr: 36950 },
  { id: 'o3', name: 'Kestrel Autos', contact: 'Mei Chen', type: 'Dealer', licences: 214, overdue: 0, status: 'Pending', products: 'Service Manuals Plus', region: 'APAC', mrr: 7420 },
  { id: 'o4', name: 'Harbor Fleet Ltd', contact: 'Grace Obi', type: 'Fleet', licences: 156, overdue: 1, status: 'Active', products: 'Fleet Diagnostics Pro', region: 'UK & Ireland', mrr: 5980 },
  { id: 'o5', name: 'Volta Mobility', contact: 'Lars Nilsen', type: 'Partner', licences: 72, overdue: 2, status: 'Suspended', products: 'Telematics Suite', region: 'Nordics', mrr: 2150 },
  { id: 'o6', name: 'Crescent Trucks', contact: 'Amara Diallo', type: 'OEM', licences: 610, overdue: 0, status: 'Active', products: 'Parts Catalogue, Warranty Hub', region: 'Americas', mrr: 22340 },
  { id: 'o7', name: 'Summit Dealers Co.', contact: 'Priya Raman', type: 'Dealer', licences: 98, overdue: 4, status: 'Overdue', products: 'Service Manuals Plus, Warranty Hub', region: 'EMEA', mrr: 3310 },
];
export const ORG_STATUS: Record<OrgRow['status'], 'success' | 'error' | 'warning' | 'neutral'> = { Active: 'success', Overdue: 'error', Pending: 'warning', Suspended: 'neutral' };

export const SUBSCRIPTIONS: Subscription[] = [
  { product: 'Fleet Diagnostics Pro', vendor: 'AEMSP Core', plan: 'Enterprise', status: 'active', seatsUsed: 842, seats: 1000, price: 18400, cycle: 'month', renewDays: 112, renewDate: '24 Feb 2027', autoRenew: true, initials: 'FD' },
  { product: 'Telematics Suite', vendor: 'Orbit Data', plan: 'Business', status: 'expiring', seatsUsed: 188, seats: 200, price: 6250, cycle: 'month', renewDays: 12, renewDate: '15 Nov 2026', initials: 'TS' },
  { product: 'Service Manuals Plus', vendor: 'AEMSP Core', plan: 'Standard', status: 'active', seatsUsed: 410, seats: 400, price: 42000, cycle: 'year', renewDays: 241, renewDate: '02 Jul 2027', initials: 'SM' },
  { product: 'Warranty Hub', vendor: 'ClaimLine', plan: 'Trial', status: 'trial', seatsUsed: 14, seats: 25, price: 0, cycle: 'month', renewDays: 9, renewDate: '12 Nov 2026', initials: 'WH' },
];

export const APPROVALS: ApprovalRequest[] = [
  { id: 'a1', title: 'Add 120 seats to Fleet Diagnostics Pro', org: 'Northwind Motors', requester: 'Ada Lovelace', type: 'Seat increase', amount: 2208, submitted: '12 min ago', priority: 'high' },
  { id: 'a2', title: 'Upgrade Telematics Suite to Enterprise', org: 'Apex OEM Group', requester: 'Tunde Bakare', type: 'Plan upgrade', amount: 4100, submitted: '2 hr ago' },
  { id: 'a3', title: 'New subscription: Warranty Hub', org: 'Crescent Trucks', requester: 'Amara Diallo', type: 'New subscription', amount: 9600, submitted: 'Yesterday' },
  { id: 'a4', title: 'Renew Service Manuals Plus (12 months)', org: 'Kestrel Autos', requester: 'Mei Chen', type: 'Renewal', amount: 7420, submitted: 'Yesterday' },
  { id: 'a5', title: 'Cancel Parts Catalogue', org: 'Summit Dealers Co.', requester: 'Priya Raman', type: 'Cancellation', submitted: '2 days ago' },
];

export const PERMISSIONS: PermRow[] = [
  { id: 'p1', section: 'Organisations', module: 'Organisations', description: 'OEMs, dealers, fleets and partners', allowed: ['view', 'create', 'edit'] },
  { id: 'p2', section: 'Organisations', module: 'Contacts', allowed: ['view', 'create', 'edit', 'delete'], available: ['view', 'create', 'edit', 'delete', 'export'] },
  { id: 'p3', section: 'Partner Centre', module: 'Subscriptions', description: 'Plans, seats and renewals', allowed: ['view', 'edit'] },
  { id: 'p4', section: 'Partner Centre', module: 'Licences', description: 'Licence keys and assignments', allowed: ['view'], available: ['view', 'create', 'edit', 'delete', 'export'] },
  { id: 'p5', section: 'Partner Centre', module: 'Approval Management', allowed: ['view', 'approve'], available: ['view', 'approve'] },
  { id: 'p6', section: 'Reporting', module: 'Reports & Insight Metrics', allowed: ['view', 'export'], available: ['view', 'export'] },
  { id: 'p7', section: 'Administration', module: 'Users & Roles', allowed: [], available: ['view', 'create', 'edit', 'delete'] },
  { id: 'p8', section: 'Administration', module: 'Billing settings', allowed: [], available: ['view', 'edit'] },
];

export const WEEK = [
  { d: 'Mon', v: 120, r: 82 }, { d: 'Tue', v: 200, r: 140 }, { d: 'Wed', v: 150, r: 121 }, { d: 'Thu', v: 80, r: 95 },
  { d: 'Fri', v: 70, r: 60 }, { d: 'Sat', v: 110, r: 74 }, { d: 'Sun', v: 130, r: 101 },
];
export const MONTHS = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'].map((m, i) => ({
  m, mrr: Math.round(96000 + i * 4200 + Math.sin(i) * 3500), churn: Math.round(4200 + Math.cos(i * 1.3) * 1100), seats: 2900 + i * 95,
}));
export const BY_OEM_TYPE = [
  { label: 'OEMs', value: 2830 }, { label: 'Dealers', value: 1310 }, { label: 'Fleets', value: 640 }, { label: 'Partners', value: 290 },
];

/* Platform dashboard data (from the live AEMSP platform overview) */
export const PLATFORM = { amountUsed: 106351.10, organizations: 199, oems: 1, roles: 6 };
/* Bar read off the platform chart; its axis labels were mis-rendered, so AIICO's value is approximate. */
export const USAGE_BY_ORG = [
  { org: 'AIICO', amount: 740 }, { org: 'Edo', amount: 0 }, { org: 'OPay', amount: 0 }, { org: 'ALPHABETA', amount: 0 },
  { org: 'Axa-Mansard', amount: 0 }, { org: 'First', amount: 0 }, { org: 'Environmental', amount: 0 }, { org: 'Asharami', amount: 0 },
];
export const BUDGET_EVENTS: ActivityEvent[] = [
  { id: 'e1', kind: 'budget', unread: true, title: 'Monthly budget exceeded', date: '29 Oct 2026', org: 'Food Concepts Plc.',
    body: 'Subscription e75fe07c-de25-40e5-9c35-97073e73aa09: month-to-date usage is USD 8,357.86 against a budget of USD 7,900.00 (105.80%). Amount over budget: USD 457.86.' },
  { id: 'e2', kind: 'budget', unread: true, title: 'Monthly budget reached 80%', date: '29 Oct 2026', org: 'Food Concepts Plc.',
    body: 'Subscription e75fe07c-de25-40e5-9c35-97073e73aa09: month-to-date usage is USD 8,357.86 against a budget of USD 7,900.00 (105.80%). Amount over budget: USD 457.86.' },
  { id: 'e3', kind: 'budget', unread: true, title: 'Monthly budget exceeded', date: '29 Oct 2026',
    body: 'Subscription cad4d8da-8d3c-48f5-bae4-b1655d141bf6.' },
];
