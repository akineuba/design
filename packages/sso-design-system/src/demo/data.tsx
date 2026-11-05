import { BookOpen, Box, Briefcase, Building2, CalendarClock, FileText, ShoppingCart, UserPlus, Users } from 'lucide-react';

export const currentUser = { name: 'Adaola Johnson', role: 'Account owner' };
export const currentTenant = 'Wragby Group';

export interface DemoUser { id: string; name: string; email: string; roles: string[]; entities: number; status: 'Active' | 'Inactive' | 'Invited' }
export const users: DemoUser[] = [
  { id: 'u1', name: 'Abdulrahman Garba', email: 'abdulrahman.garba@company.com', roles: ['Employee', 'Accountant'], entities: 2, status: 'Active' },
  { id: 'u2', name: 'Adam Smith', email: 'asmith@yopmail.com', roles: ['Employee'], entities: 3, status: 'Active' },
  { id: 'u3', name: 'Aisha Garba', email: 'aishagarba@yopmail.com', roles: ['Employee'], entities: 1, status: 'Invited' },
  { id: 'u4', name: 'Alex Ferguson', email: 'alex.ferguson@yopmail.com', roles: ['Employee', 'Manager'], entities: 1, status: 'Active' },
  { id: 'u5', name: 'Bola Adeyemi', email: 'bola.adeyemi@company.com', roles: ['Approver'], entities: 2, status: 'Inactive' },
];

export interface DemoTenant { id: string; name: string; primary?: boolean; plan: string; code: string; entities: number; status: 'Active' | 'Expired' | 'Trial' }
export const tenants: DemoTenant[] = [
  { id: 't1', name: 'Wragby Group (Head Office)', primary: true, plan: 'Full ERP', code: 'WRAGBY_MAIN', entities: 3, status: 'Active' },
  { id: 't2', name: 'Wragby Services Limited', plan: 'HR Suite', code: 'WRAGBY_SVC', entities: 1, status: 'Active' },
  { id: 't3', name: 'Wragby Finance', plan: 'Finance', code: 'WRAGBY_FIN', entities: 2, status: 'Trial' },
  { id: 't4', name: 'Eko Logistics', plan: 'Inventory', code: 'EKO_LOG', entities: 1, status: 'Expired' },
];

export const apps = [
  { name: 'Accounting', icon: <BookOpen /> },
  { name: 'Inventory', icon: <Box /> },
  { name: 'Procurement', icon: <ShoppingCart /> },
  { name: 'Projects & Commercial', icon: <Briefcase /> },
  { name: 'HR', icon: <Users /> },
];

export const activity = [
  { id: 'a1', icon: <FileText />, title: 'Invoice paid', detail: 'Full ERP annual subscription', time: '2h ago' },
  { id: 'a2', icon: <UserPlus />, title: '2 users added', detail: 'Wragby Group (Head Office)', time: 'Yesterday' },
  { id: 'a3', icon: <Building2 />, title: 'Entity created', detail: 'Wragby Services Limited', time: '3 Nov' },
  { id: 'a4', icon: <CalendarClock />, title: 'Renewal scheduled', detail: '9 August 2027', time: '1 Nov' },
];

export const setupSteps = [
  { id: 's1', label: 'Add tax and registered address', done: true },
  { id: 's2', label: 'Upload invoice logo', done: true },
  { id: 's3', label: 'Connect your identity provider', done: true },
  { id: 's4', label: 'Invite your team' },
  { id: 's5', label: 'Assign roles and entity access' },
];

export const plans = [
  {
    org: 'Wragby Group (Head Office)', primary: true,
    planName: 'Full ERP', planDescription: 'Organisations that want one connected business system.', price: '₦1,200,000',
    features: ['Accounting', 'Inventory', 'Procurement', 'Projects & Commercial', 'HR', 'Configurable approvals'],
  },
  {
    org: 'Wragby Services Limited',
    planName: 'HR Suite', planDescription: 'Organisations that need essential HR and payroll.', price: '₦600,000',
    features: ['Employee management', 'Payroll', 'Leave management', 'Recruitment', 'Performance reviews'],
  },
  {
    org: 'Wragby Finance',
    planName: 'Finance', planDescription: 'Finance teams that need accounting with item and stock information.', price: '₦600,000',
    features: ['Accounting', 'Invoicing', 'Budgeting', 'Financial reporting', 'Bank reconciliation'],
  },
];

export const billing = [
  { label: 'Started', value: '9 Aug 2026' },
  { label: 'Current term', value: '9 Aug 2026 – 8 Aug 2027' },
  { label: 'Billing cycle', value: 'Annual' },
  { label: 'Payment method', value: 'Debit card ·· 4242' },
];
