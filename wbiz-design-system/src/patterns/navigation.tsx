// Story-only: the full wBizManager menu, transcribed from the fully unfolded sidebar reference the
// design team supplied. Labels the reference truncates are completed; groups whose sub-pages are
// collapsed in the reference (e.g. Inventory Reports, Employee Records) are listed as single pages.
// Payroll Management's pages come from the Payroll Generation screen (labels title-cased to match the menu).
import type { ReactNode } from 'react';
import type { NavItem } from '../components/Sidebar';
import {
  ActivityIcon, AwardIcon, BagIcon, BankIcon, BarChartIcon, BookIcon, BoxIcon, BriefcaseIcon, CalculatorIcon,
  CalendarIcon, CartIcon, ChartIcon, ChatIcon, ClipboardCheckIcon, ClockIcon, CoinIcon, CopyIcon, DeviceIcon,
  DocumentIcon, EditIcon, FolderIcon, GlobeIcon, GridIcon, HelpIcon, HomeIcon, KeyIcon, LayersIcon, MoneyReceiveIcon,
  PrinterIcon, ProfileIcon, ReceiptIcon, ScanIcon, SettingIcon, ShieldIcon, SlidersIcon, TagIcon, TaskIcon,
  TrainingIcon, TransferIcon, UsersIcon, WalletIcon,
} from '../icons';

const slug = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

type Spec = [label: string, icon: ReactNode, children?: Spec[]];

const build = (specs: Spec[], parent = ''): NavItem[] =>
  specs.map(([label, icon, children]) => {
    const id = parent ? `${parent}/${slug(label)}` : slug(label);
    return { id, label, icon, href: children ? undefined : `#${id}`, children: children && build(children, id) };
  });

const menu: Spec[] = [
  ['Accounting', <CalculatorIcon />, [
    ['Chart of Accounts', <BarChartIcon />],
    ['Journal', <BookIcon />],
    ['Journal Templates', <CopyIcon />],
    ['Fixed Assets', <BankIcon />, [
      ['Asset Category', <LayersIcon />],
      ['Asset', <BoxIcon />],
      ['Asset Lines', <DocumentIcon />],
      ['Revaluation', <TransferIcon />],
      ['Disposal', <BagIcon />],
      ['Posting Groups', <GridIcon />],
    ]],
    ['Budgets', <WalletIcon />],
    ['Bank Reconciliation', <TransferIcon />],
    ['Period Closing', <CalendarIcon />],
    ['Approvals', <ClockIcon />],
  ]],
  ['Sales', <CartIcon />, [
    ['Invoices', <ReceiptIcon />],
    ['Customers', <UsersIcon />],
    ['Credit Notes', <DocumentIcon />],
    ['Receive Payment', <MoneyReceiveIcon />],
  ]],
  ['Purchases', <BagIcon />, [
    ['Bills', <ReceiptIcon />],
    ['Debit Notes', <DocumentIcon />],
    ['Vendors', <UsersIcon />],
    ['RFQs', <ClipboardCheckIcon />],
    ['Bills Settlement', <DocumentIcon />],
  ]],
  ['Approvals', <ClipboardCheckIcon />],
  ['Inventory', <BoxIcon />, [
    ['Items', <BoxIcon />],
    ['Stock Update', <ClipboardCheckIcon />],
    ['Item Journal', <BookIcon />],
    ['Transfers', <TransferIcon />],
    ['Stock Count', <ClipboardCheckIcon />],
    ['Item Ledger Entries', <DocumentIcon />],
    ['Cost Layers', <LayersIcon />],
    ['Inventory Inquiry', <ScanIcon />],
    ['Inventory Reports', <BarChartIcon />],
    ['Barcode Scanning', <ScanIcon />],
    ['Movement Monitoring', <ActivityIcon />],
    ['Requisitions', <ClipboardCheckIcon />],
    ['Labels', <TagIcon />],
    ['Printing', <PrinterIcon />],
    ['Devices', <DeviceIcon />],
  ]],
  ['Reports', <DocumentIcon />, [
    ['General Ledger', <BookIcon />],
    ['Trial Balance', <BarChartIcon />],
    ['Statement of Profit or Loss', <ChartIcon />],
    ['Statement of Financial Position', <DocumentIcon />],
    ['Customer Aging', <UsersIcon />],
    ['Vendor Aging', <UsersIcon />],
    ['Asset Report', <DocumentIcon />],
    ['Disposal Report', <DocumentIcon />],
  ]],
  ['Commercial', <BriefcaseIcon />, [
    ['Dashboard', <BarChartIcon />],
    ['Tender Register', <DocumentIcon />],
    ['My Tasks', <TaskIcon />],
    ['Clients', <UsersIcon />],
    ['Documents', <FolderIcon />],
    ['Admin', <SettingIcon />],
  ]],
  ['Projects', <LayersIcon />, [
    ['Portfolio Management', <BriefcaseIcon />],
    ['Project', <FolderIcon />],
    ['WBS Template', <CopyIcon />],
    ['Quotation', <ReceiptIcon />],
    ['Profitability', <ChartIcon />],
    ['Project Reports', <DocumentIcon />],
    ['Manufacturing', <BoxIcon />],
  ]],
  ['Human Resources', <ProfileIcon />, [
    ['Dashboard', <BarChartIcon />],
    ['Recruitment Management', <BriefcaseIcon />, [
      ['Dashboard', <BarChartIcon />],
      ['Job Descriptions', <DocumentIcon />],
      ['JD Approvals', <ClipboardCheckIcon />],
      ['Manpower Requisitions', <DocumentIcon />],
      ['Manpower Approvals', <ClipboardCheckIcon />],
      ['Job Postings', <GlobeIcon />],
      ['Careers Site', <GlobeIcon />],
      ['Candidates', <UsersIcon />],
      ['Interviews', <CalendarIcon />],
      ['Background Checks', <ShieldIcon />],
      ['Reports & Analytics', <ChartIcon />],
    ]],
    ['Employee Records', <UsersIcon />],
    ['Onboarding Management', <ClipboardCheckIcon />],
    ['Attendance Management', <ActivityIcon />],
    ['Performance Management', <AwardIcon />],
    ['Payroll Management', <CoinIcon />, [
      ['Dashboard', <BarChartIcon />],
      ['Salary Setup', <WalletIcon />],
      ['Salary Additions', <ChartIcon />],
      ['Salary Deductions', <ActivityIcon />],
      ['Flexible Deductions', <LayersIcon />],
      ['Recurring Benefits', <AwardIcon />],
      ['Tax Config', <SettingIcon />],
      ['Payroll Runs', <ReceiptIcon />],
      ['Inclusions & Exclusions', <UsersIcon />],
      ['Pending Payrolls', <ClockIcon />],
    ]],
    ['Loan Management', <WalletIcon />, [
      ['Dashboard', <BarChartIcon />],
      ['Applications', <DocumentIcon />],
      ['Approvals (Step 1)', <ClipboardCheckIcon />],
      ['Approvals (Step 2)', <ClipboardCheckIcon />],
      ['Apply for Loan', <EditIcon />],
      ['My Loans', <WalletIcon />],
      ['Loan Types', <LayersIcon />],
      ['Disbursements', <MoneyReceiveIcon />],
      ['History', <ClockIcon />],
      ['Reports', <DocumentIcon />],
    ]],
    ['Expense Management', <ReceiptIcon />, [
      ['Dashboard', <BarChartIcon />],
      ['New Claim', <DocumentIcon />],
      ['New Requisition', <DocumentIcon />],
      ['My Expenses', <WalletIcon />],
      ['My Advances', <CoinIcon />],
      ['Team Expenses', <UsersIcon />],
      ['Approval Inbox', <ClipboardCheckIcon />],
      ['Finance Workspace', <BriefcaseIcon />],
      ['Policies', <ShieldIcon />],
      ['Settings', <SettingIcon />],
      ['Reports', <DocumentIcon />],
    ]],
    ['Training Management', <TrainingIcon />, [
      ['Dashboard', <BarChartIcon />],
      ['Programs', <BookIcon />],
      ['Budgets', <CoinIcon />],
      ['Trainings', <TrainingIcon />],
      ['Providers', <UsersIcon />],
      ['Requests', <DocumentIcon />],
      ['My Trainings', <BookIcon />],
      ['Reports & Compliance', <DocumentIcon />],
    ]],
    ['Learning Management', <BookIcon />, [
      ['Dashboard', <BarChartIcon />],
      ['Catalog', <GridIcon />],
      ['My Learning', <BookIcon />],
    ]],
  ]],
  ['Settings', <SettingIcon />, [
    ['Admin Center', <HomeIcon />],
    ['Approval Settings', <ClipboardCheckIcon />, [
      ['Dashboard', <BarChartIcon />],
      ['Approval Tracking', <ActivityIcon />],
      ['Audit Log', <DocumentIcon />],
      ['Approval Workflow', <TransferIcon />],
      ['Approver Profiles', <UsersIcon />],
      ['Module Settings', <SettingIcon />],
      ['Services', <GridIcon />],
    ]],
    ['Posting Settings', <SlidersIcon />, [
      ['Inventory Posting Groups', <BoxIcon />],
      ['Customer Posting Groups', <UsersIcon />],
      ['Vendor Posting Groups', <UsersIcon />],
      ['Project Posting Groups', <FolderIcon />],
      ['Inventory Posting Setup', <BoxIcon />],
      ['VAT Posting Setup', <ReceiptIcon />],
      ['Posting Groups Setup', <GridIcon />],
    ]],
    ['Currency Setup', <CoinIcon />],
    ['Dimension Setup', <BarChartIcon />],
    ['Default Account', <BankIcon />],
    ['Taxes', <ReceiptIcon />],
    ['Credit Note Reasons', <DocumentIcon />],
    ['Inventory Settings', <BoxIcon />],
    ['Opening Balance', <DocumentIcon />],
    ['HR Settings', <ProfileIcon />, [
      ['Configuration', <SettingIcon />],
      ['Public Holidays', <CalendarIcon />],
    ]],
    ['Master Data', <LayersIcon />],
    ['Project Settings', <FolderIcon />],
    ['Budget Enforcement', <ShieldIcon />],
    ['Markup Settings', <TagIcon />],
    ['Number Series', <KeyIcon />],
  ]],
  ['Help & Support', <HelpIcon />, [
    ['Help Center', <HelpIcon />],
    ['FAQs', <ChatIcon />],
    ['Knowledge Base', <BookIcon />],
  ]],
];

export const appNavigation: NavItem[] = build(menu);
