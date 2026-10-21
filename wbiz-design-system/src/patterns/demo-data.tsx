// Story-only sample content, modelled on the accounting screens in Figma (primary source for tables).
import type { StatusTone } from '../components/StatusPill';

export const FIGMA = 'https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=';

export { appNavigation } from './navigation';

export const currentUser = { name: 'Ada Obi', role: 'Super User', initials: 'AO' };

/* Customers (Sales > Customers, 191:3274) ---------------------------------------------------------- */
export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  receivables: string;
  type: 'Individual' | 'Business';
}

const people = ['Daniel Olabode', 'Damilola Audu', 'Deborah Akinola', 'Chinedu Eze', 'Funmi Adebayo', 'Ibrahim Musa', 'Ngozi Okeke', 'Tunde Bakare'];
export const customers: Customer[] = people.map((name, i) => {
  const [first, last] = name.split(' ');
  return {
    id: `CUS-${String(101 + i).padStart(4, '0')}`,
    name,
    company: i % 3 === 2 ? 'Quantum Solutions' : 'wBizmanager',
    email: `${first[0]}${last}@wbiz.com`.toLowerCase(),
    phone: `091 817 01${String(90 + i)}`,
    receivables: `₦ ${(300000 - i * 12500).toLocaleString('en-NG')}.00`,
    type: i % 3 === 2 ? 'Business' : 'Individual',
  };
});

/* Bills (Purchases > Bills, 4183:23454) ------------------------------------------------------------- */
export interface Bill {
  id: string;
  date: string;
  createdBy: string;
  vendor: string;
  due: string;
  overdueDays?: number;
  amount: string;
  balance: string;
  status: { label: string; tone: StatusTone };
}

export const bills: Bill[] = [
  { id: 'TO/IR/00136', date: '18th July 2025', createdBy: 'Daniel Olabode', vendor: 'Daniel Olabode', due: '18th Nov 2025', amount: '₦ 10,000.00', balance: '₦ 0.00', status: { label: 'Paid', tone: 'success' } },
  { id: 'TO/IR/00137', date: '18th July 2025', createdBy: 'Damilola Audu', vendor: 'Damilola Audu', due: '18th Nov 2025', amount: '₦ 10,000.00', balance: '₦ 10,000.00', status: { label: 'Awaiting Payment', tone: 'info' } },
  { id: 'TO/IR/00138', date: '18th July 2025', createdBy: 'Deborah Akinola', vendor: 'Deborah Akinola', due: '18th Nov 2025', overdueDays: 5, amount: '₦ 10,000.00', balance: '₦ 8,000.00', status: { label: 'Overdue', tone: 'error' } },
  { id: 'TO/IR/00139', date: '19th July 2025', createdBy: 'Daniel Olabode', vendor: 'Ngozi Okeke', due: '19th Nov 2025', amount: '₦ 24,500.00', balance: '₦ 24,500.00', status: { label: 'Pending Approval', tone: 'warning' } },
  { id: 'TO/IR/00140', date: '20th July 2025', createdBy: 'Damilola Audu', vendor: 'Tunde Bakare', due: '20th Nov 2025', overdueDays: 15, amount: '₦ 10,000.00', balance: '₦ 10,000.00', status: { label: 'Overdue', tone: 'error' } },
  { id: 'TO/IR/00141', date: '21st July 2025', createdBy: 'Deborah Akinola', vendor: 'Ibrahim Musa', due: '21st Nov 2025', amount: '₦ 6,200.00', balance: '₦ 3,100.00', status: { label: 'Partially Paid', tone: 'neutral' } },
];

/* Chart of Accounts (1871:19163): a tree ----------------------------------------------------------- */
export interface Account {
  code: string;
  name: string;
  balance: string;
  statement: 'Balance Sheet' | 'Income Statement';
  parent: string;
  active?: boolean;
  children?: Account[];
}

const leaf = (code: string, name: string, balance: string, parent: string, active: boolean): Account => ({ code, name, balance, statement: 'Balance Sheet', parent, active });

export const accounts: Account[] = [
  {
    code: '100000', name: 'Balance Sheet', balance: '-', statement: 'Balance Sheet', parent: '-',
    children: [
      {
        code: '102000', name: 'Asset', balance: '-', statement: 'Balance Sheet', parent: 'Balance Sheet',
        children: [
          {
            code: '102200', name: 'Current Asset', balance: '-', statement: 'Balance Sheet', parent: 'Asset',
            children: [
              {
                code: '102300', name: 'Cash and Cash Receivables', balance: '-', statement: 'Balance Sheet', parent: 'Current Asset',
                children: [
                  leaf('102310', 'Office Equipment', '20,100,000.00', 'Cash and Cash Receivables', true),
                  leaf('102320', 'Petty Cash', '1,250,000.00', 'Cash and Cash Receivables', false),
                  leaf('102330', 'Bank: Main Account', '84,400,000.00', 'Cash and Cash Receivables', true),
                ],
              },
            ],
          },
        ],
      },
      {
        code: '200000', name: 'Liabilities', balance: '-', statement: 'Balance Sheet', parent: 'Balance Sheet',
        children: [
          leaf('201100', 'Accounts Payable', '6,820,000.00', 'Liabilities', true),
          leaf('201200', 'VAT Payable', '940,000.00', 'Liabilities', true),
        ],
      },
    ],
  },
];

/* Trial balance (845:8824): grouped report rows ---------------------------------------------------- */
export interface TrialBalanceLine {
  name: string;
  code: string;
  opening: string;
  debit: string;
  credit: string;
  balance: string;
  closing: string;
}

export const trialBalance: Array<{ group: string; lines: TrialBalanceLine[]; total: TrialBalanceLine }> = [
  {
    group: 'Assets',
    lines: [
      { name: 'Cash at Bank', code: '1001', opening: '1,200,000.00', debit: '450,000.00', credit: '120,000.00', balance: '330,000.00', closing: '1,530,000.00' },
      { name: 'Accounts Receivable', code: '1100', opening: '640,000.00', debit: '210,000.00', credit: '95,000.00', balance: '115,000.00', closing: '755,000.00' },
      { name: 'Office Equipment', code: '1500', opening: '2,010,000.00', debit: '0.00', credit: '0.00', balance: '0.00', closing: '2,010,000.00' },
    ],
    total: { name: 'Total assets', code: '', opening: '3,850,000.00', debit: '660,000.00', credit: '215,000.00', balance: '445,000.00', closing: '4,295,000.00' },
  },
  {
    group: 'Liabilities',
    lines: [
      { name: 'Accounts Payable', code: '2001', opening: '420,000.00', debit: '60,000.00', credit: '180,000.00', balance: '-120,000.00', closing: '540,000.00' },
      { name: 'VAT Payable', code: '2100', opening: '94,000.00', debit: '0.00', credit: '35,000.00', balance: '-35,000.00', closing: '129,000.00' },
    ],
    total: { name: 'Total liabilities', code: '', opening: '514,000.00', debit: '60,000.00', credit: '215,000.00', balance: '-155,000.00', closing: '669,000.00' },
  },
];

/* Employees (hr): the people table with initials avatars ------------------------------------------- */
export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  title: string;
  startDate: string;
  status: { label: string; tone: StatusTone };
}

export const employees: Employee[] = [
  { id: 'EMP-0012', name: 'Sure Tester', email: 'sure.tester@wbiz.com', department: 'Finance', title: 'Accountant', startDate: '04 Mar 2022', status: { label: 'Active', tone: 'success' } },
  { id: 'EMP-0013', name: 'Daniel Olabode', email: 'daniel.olabode@wbiz.com', department: 'Operations', title: 'Operations Lead', startDate: '12 Jan 2021', status: { label: 'Active', tone: 'success' } },
  { id: 'EMP-0014', name: 'Amaka Nwosu', email: 'amaka.nwosu@wbiz.com', department: 'Human Resources', title: 'HR Officer', startDate: '01 Aug 2023', status: { label: 'On Leave', tone: 'warning' } },
  { id: 'EMP-0015', name: 'Ibrahim Musa', email: 'ibrahim.musa@wbiz.com', department: 'Sales', title: 'Sales Executive', startDate: '15 May 2024', status: { label: 'Probation', tone: 'info' } },
  { id: 'EMP-0016', name: 'Deborah Akinola', email: 'deborah.akinola@wbiz.com', department: 'Procurement', title: 'Buyer', startDate: '20 Feb 2020', status: { label: 'Exited', tone: 'neutral' } },
];

/* Generic option lists ------------------------------------------------------------------------------ */
export const salutations = ['Mr', 'Mrs', 'Ms', 'Dr'].map((v) => ({ value: v, label: v }));
export const accountTypes = ['Asset', 'Liability', 'Equity', 'Income', 'Expense'].map((v) => ({ value: v.toLowerCase(), label: v }));
