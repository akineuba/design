// Story-only sample content taken from the "new features" screens in Figma.
import type { NavItem } from '../components/Sidebar';
import type { StatusTone } from '../components/StatusPill';
import {
  BagIcon, BarChartIcon, BookIcon, BoxIcon, BriefcaseIcon, CalculatorIcon, CartIcon,
  ClipboardCheckIcon, LayersIcon, PrinterIcon, TagIcon, TransferIcon, UserLockIcon,
} from '../icons';

export const FIGMA = 'https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=';

/** Approximation of the wBizManager mark for stories; use the real logo asset in apps. */
export const Logo = ({ compact = false }: { compact?: boolean }) => (
  <span className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-fg-strong">
    <svg viewBox="0 0 40 40" className="size-6" aria-hidden>
      <path d="M33.5 13.5A15 15 0 1 1 26 5.6" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="21.5" cy="14.5" r="4.6" className="fill-error" />
      <circle cx="17" cy="24.5" r="6" fill="currentColor" />
    </svg>
    {!compact && <span>wBizManager</span>}
  </span>
);

export const navItems: NavItem[] = [
  { id: 'accounting', label: 'Accounting', icon: <CalculatorIcon />, children: [
    { id: 'journal', label: 'Journal', icon: <BookIcon /> },
    { id: 'reconcile', label: 'Reconcile', icon: <TransferIcon /> },
  ] },
  { id: 'sales', label: 'Sales', icon: <CartIcon />, children: [{ id: 'invoices', label: 'Invoices', icon: <TagIcon /> }] },
  { id: 'purchases', label: 'Purchases', icon: <BagIcon />, children: [{ id: 'bills', label: 'Bills', icon: <TagIcon /> }] },
  { id: 'approvals', label: 'Approvals', icon: <ClipboardCheckIcon /> },
  { id: 'inventory', label: 'Inventory', icon: <BoxIcon />, children: [
    { id: 'admin-inventory', label: 'Admin Inventory', icon: <UserLockIcon /> },
    { id: 'items', label: 'Items', icon: <BoxIcon /> },
    { id: 'stock-update', label: 'Stock Update', icon: <ClipboardCheckIcon /> },
    { id: 'item-journal', label: 'Item Journal', icon: <BookIcon /> },
    { id: 'transfers', label: 'Transfers', icon: <TransferIcon /> },
    { id: 'cost-layers', label: 'Cost Layers', icon: <LayersIcon /> },
    { id: 'printing', label: 'Printing', icon: <PrinterIcon /> },
  ] },
  { id: 'reports', label: 'Reports', icon: <BarChartIcon />, children: [{ id: 'pl', label: 'Profit & Loss', icon: <BarChartIcon /> }] },
  { id: 'commercial', label: 'Commercial', icon: <BriefcaseIcon />, children: [{ id: 'contracts', label: 'Contracts', icon: <BriefcaseIcon /> }] },
];

export interface Requisition {
  id: string;
  date: string;
  requester: string;
  department: string;
  location: string;
  required: string;
  qty: number;
  status: { label: string; tone: StatusTone };
}

export const requisitions: Requisition[] = [
  { id: 'CR-000248', date: '20 Aug 2026', requester: 'Chris Clinton', department: 'Finance & Accounts', location: 'Head Office', required: '22 Aug 2026', qty: 16, status: { label: 'Pending Approval', tone: 'warning' } },
  { id: 'CR-000247', date: '19 Aug 2026', requester: 'Amaka Nwosu', department: 'Human Resources', location: 'Head Office', required: '21 Aug 2026', qty: 11, status: { label: 'Ready for Issue', tone: 'info' } },
  { id: 'CR-000246', date: '18 Aug 2026', requester: 'David Okafor', department: 'Operations', location: 'Maintenance Workshop', required: '20 Aug 2026', qty: 30, status: { label: 'Partially Issued', tone: 'neutral' } },
  { id: 'CR-000245', date: '15 Aug 2026', requester: 'Sarah Adeyemi', department: 'Administration', location: 'Administrative Office', required: '17 Aug 2026', qty: 7, status: { label: 'Completed', tone: 'success' } },
];
