import type { KnownStatus } from '../components/StatusPill';
import type { PolicyClass } from '../insurance/PolicyCard';

/** Fixed "today" so expiry badges and dates render the same in every story and screenshot. */
export const TODAY = new Date(2026, 9, 18);

export interface PolicyRow {
  id: string;
  policyNo: string;
  client: string;
  type: string;
  policyClass: PolicyClass;
  insurer: string;
  premium: number;
  start: string;
  end: string;
  status: KnownStatus;
}

export const POLICIES: PolicyRow[] = [
  { id: 'p1', policyNo: 'POL-2026-00975', client: 'Kestrel Oil & Gas Ltd', type: 'All Risk', policyClass: 'fire', insurer: 'Harbor General Assurance', premium: 1_845_000, start: '2025-10-30', end: '2026-10-30', status: 'Expiring' },
  { id: 'p2', policyNo: 'POL-2026-00990', client: 'Chidi Okafor', type: 'Motor Comprehensive', policyClass: 'motor', insurer: 'Lagoon Mutual', premium: 162_500, start: '2026-01-12', end: '2027-01-11', status: 'Active' },
  { id: 'p3', policyNo: 'POL-2026-00987', client: 'Adaeze Nwosu', type: 'Aviation Hull', policyClass: 'aviation', insurer: 'Crestline Re', premium: 6_164_000, start: '2025-09-25', end: '2026-09-25', status: 'Expired' },
  { id: 'p4', policyNo: 'POL-2026-00906', client: 'Bamidele Farms', type: 'Agric Insurance', policyClass: 'agric', insurer: 'Harbor General Assurance', premium: 450_000, start: '2026-03-01', end: '2027-02-28', status: 'Active' },
  { id: 'p5', policyNo: 'POL-2026-00982', client: 'Northgate Technologies', type: 'Group Life', policyClass: 'health', insurer: 'Savannah Life', premium: 2_880_000, start: '2026-06-01', end: '2027-05-31', status: 'Pending approval' },
  { id: 'p6', policyNo: 'POL-2026-00984', client: 'Ifeoma Bello', type: 'Fire & Special Perils', policyClass: 'fire', insurer: 'Lagoon Mutual', premium: 3_000_000, start: '2025-11-15', end: '2026-11-15', status: 'Expiring' },
  { id: 'p7', policyNo: 'POL-2026-00977', client: 'Ola Adeyemi', type: 'Motor Third Party', policyClass: 'motor', insurer: 'Crestline Re', premium: 15_000, start: '2025-09-11', end: '2026-09-11', status: 'Lapsed' },
  { id: 'p8', policyNo: 'POL-2026-00978', client: 'Femi Adeoye', type: 'Health Plus', policyClass: 'health', insurer: 'Savannah Life', premium: 115_000, start: '2026-07-01', end: '2027-06-30', status: 'Draft' },
  { id: 'p9', policyNo: 'POL-2026-00991', client: 'Tobi Logistics', type: 'Goods in Transit', policyClass: 'other', insurer: 'Harbor General Assurance', premium: 720_000, start: '2026-02-01', end: '2027-01-31', status: 'Renewed' },
  { id: 'p10', policyNo: 'POL-2026-00993', client: 'Grace Eze', type: 'Motor Comprehensive', policyClass: 'motor', insurer: 'Lagoon Mutual', premium: 210_000, start: '2026-08-20', end: '2027-08-19', status: 'Cancelled' },
];

export const CLIENT_OPTIONS = [
  { value: 'c1', label: 'Kestrel Oil & Gas Ltd', description: 'accounts@kestrel.example' },
  { value: 'c2', label: 'Chidi Okafor', description: 'chidi.okafor@example.com' },
  { value: 'c3', label: 'Adaeze Nwosu', description: 'adaeze@example.com' },
  { value: 'c4', label: 'Bamidele Farms', description: 'info@bamidelefarms.example' },
  { value: 'c5', label: 'Northgate Technologies', description: 'hr@northgate.example' },
  { value: 'c6', label: 'Ifeoma Bello', description: 'ifeoma.bello@example.com' },
];

export const INSURER_OPTIONS = [
  { value: 'i1', label: 'Harbor General Assurance' },
  { value: 'i2', label: 'Lagoon Mutual' },
  { value: 'i3', label: 'Crestline Re' },
  { value: 'i4', label: 'Savannah Life' },
];

export const CLASS_OPTIONS = [
  { value: 'motor', label: 'Motor' },
  { value: 'fire', label: 'Fire & Special Perils' },
  { value: 'agric', label: 'Agric' },
  { value: 'aviation', label: 'Aviation' },
  { value: 'health', label: 'Health & Life' },
  { value: 'transit', label: 'Goods in Transit' },
];

export const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'Active', label: 'Active' },
  { value: 'Expiring', label: 'Expiring' },
  { value: 'Expired', label: 'Expired' },
  { value: 'Pending approval', label: 'Pending approval' },
  { value: 'Draft', label: 'Draft' },
];

export const PREMIUM_BY_DAY = [
  { day: 'Mon', premium: 1_900_000, commission: 380_000 },
  { day: 'Tue', premium: 3_050_000, commission: 610_000 },
  { day: 'Wed', premium: 2_300_000, commission: 460_000 },
  { day: 'Thu', premium: 750_000, commission: 150_000 },
  { day: 'Fri', premium: 2_080_000, commission: 416_000 },
  { day: 'Sat', premium: 2_120_000, commission: 424_000 },
  { day: 'Sun', premium: 2_150_000, commission: 430_000 },
];

export const CASH_FLOW = [
  { month: 'May', income: 8_200_000, expense: 5_100_000 },
  { month: 'Jun', income: 9_400_000, expense: 6_300_000 },
  { month: 'Jul', income: 7_800_000, expense: 5_900_000 },
  { month: 'Aug', income: 11_200_000, expense: 6_800_000 },
  { month: 'Sep', income: 10_100_000, expense: 7_200_000 },
  { month: 'Oct', income: 12_600_000, expense: 7_000_000 },
];

export const CLAIMS_BY_MONTH = [
  { month: 'Jan', motor: 12, fire: 4 },
  { month: 'Feb', motor: 9, fire: 7 },
  { month: 'Mar', motor: 6, fire: 5 },
  { month: 'Apr', motor: 8, fire: 3 },
  { month: 'May', motor: 14, fire: 6 },
  { month: 'Jun', motor: 15, fire: 9 },
];

export const HEADCOUNT = [
  { name: 'Admin', staff: 3 },
  { name: 'Human Resource', staff: 3 },
  { name: 'Accounts', staff: 2 },
  { name: 'Operations', staff: 1 },
  { name: 'Finance', staff: 1 },
  { name: 'Business Development', staff: 1 },
  { name: 'Cyber Security', staff: 1 },
  { name: 'Product Sales', staff: 1 },
];

export const NOTIFICATIONS = [
  { id: 'n1', title: '5 policies expire this week', body: 'Kestrel Oil & Gas Ltd, Ifeoma Bello and 3 others. Send renewal notices.', time: '10 min ago', unread: true },
  { id: 'n2', title: 'Claim CLM-0412 approved', body: 'Lagoon Mutual approved ₦1,250,000 for Chidi Okafor (motor accident).', time: '2h ago', unread: true },
  { id: 'n3', title: 'Premium received', body: '₦2,880,000 from Northgate Technologies, Group Life.', time: 'Yesterday', unread: false },
];

export const USER = { name: 'Ada Obi', email: 'ada.obi@ibroka.example', role: 'Admin' };
