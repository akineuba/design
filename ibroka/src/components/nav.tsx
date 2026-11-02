import type { ReactNode } from 'react';
import {
  AccountBrokerIcon,
  AccountingIcon,
  AdministrationIcon,
  DashboardIcon,
  HumanResourcesIcon,
  InsuranceIcon,
  ReportsIcon,
  SettingsIcon,
} from '../icons';

export interface NavPage {
  id: string;
  label: string;
  href?: string;
  /** Third level (UI rule 18: three levels at most). */
  children?: NavPage[];
}

export interface NavModule {
  id: string;
  label: string;
  icon: ReactNode;
  href?: string;
  pages?: NavPage[];
}

/** The iBroka menu, from Figma "fully extended nav". Duplicate "Transactions" under Accounting removed. */
export const IBROKA_NAV: NavModule[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, href: '#' },
  {
    id: 'hr',
    label: 'Human Resources',
    icon: <HumanResourcesIcon />,
    pages: [
      { id: 'employees', label: 'Employees' },
      { id: 'hr-config', label: 'HR Configuration' },
      { id: 'leaves', label: 'Leaves' },
      { id: 'recruitment', label: 'Recruitment' },
      { id: 'assets', label: 'Company Assets' },
      { id: 'appraisals', label: 'Appraisals' },
      { id: 'payroll', label: 'Payroll', children: [{ id: 'payroll-runs', label: 'Payroll Runs' }, { id: 'payslips', label: 'Payslips' }] },
      { id: 'my-profile', label: 'My Profile' },
    ],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    icon: <InsuranceIcon />,
    pages: [
      { id: 'clients', label: 'Clients' },
      { id: 'policies', label: 'Policies' },
      { id: 'approvals', label: 'Approval Management' },
      { id: 'claims', label: 'Claims' },
      { id: 'insurers', label: 'Insurers' },
      { id: 'policy-docs', label: 'Policy Documents' },
    ],
  },
  {
    id: 'accounting',
    label: 'Accounting',
    icon: <AccountingIcon />,
    pages: [
      { id: 'coa', label: 'Chart of Accounts' },
      { id: 'journals', label: 'Journals' },
      { id: 'receive-premium', label: 'Receive Premium' },
      { id: 'cancellations', label: 'Cancellations' },
      { id: 'transactions', label: 'Transactions' },
      { id: 'opening-balance', label: 'Opening Balance' },
      { id: 'bank-rec', label: 'Bank Reconciliation' },
    ],
  },
  {
    id: 'broker',
    label: 'Account Broker',
    icon: <AccountBrokerIcon />,
    pages: [{ id: 'remittance', label: 'Remittance', children: [{ id: 'remit-new', label: 'New Remittance' }, { id: 'remit-history', label: 'Remittance History' }] }],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <ReportsIcon />,
    pages: [
      { id: 'trial-balance', label: 'Trial Balance' },
      { id: 'pnl', label: 'Profit & Loss' },
      { id: 'balance-sheet', label: 'Balance Sheet' },
      { id: 'gl', label: 'General Ledger' },
      { id: 'aging', label: 'Receivables Aging' },
      { id: 'remit-schedule', label: 'Remittance Schedule' },
      { id: 'statement', label: 'Customer Statement' },
      { id: 'payable-rec', label: 'Payable Reconciliation' },
      { id: 'remit-exposure', label: 'Remittance Exposure' },
      { id: 'insurance-reports', label: 'Insurance Reports' },
    ],
  },
  {
    id: 'admin',
    label: 'Administration',
    icon: <AdministrationIcon />,
    pages: [
      { id: 'users', label: 'Users' },
      { id: 'kyc', label: 'Customer KYC' },
      { id: 'support', label: 'Support' },
      { id: 'faq', label: 'FAQ' },
      { id: 'contact', label: 'Contact Us' },
      { id: 'terms', label: 'Terms & Conditions' },
      { id: 'organisation', label: 'Organisation' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    pages: [
      { id: 'currencies', label: 'Currencies' },
      { id: 'income-types', label: 'Income Types' },
      { id: 'expense-types', label: 'Expense Types' },
      { id: 'payment-types', label: 'Payment Types' },
      { id: 'account-config', label: 'Account Configuration' },
      { id: 'account-subtypes', label: 'Account Subtypes' },
      { id: 'accounting-accounts', label: 'Accounting Accounts' },
      { id: 'fiscal-calendar', label: 'Fiscal Calendar' },
      { id: 'accounting-migration', label: 'Accounting Migration' },
    ],
  },
];
