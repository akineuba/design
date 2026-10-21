// Story-only sample data for the Payroll Runs page (redesign of the Payroll Generation screen).
import type { Stage } from '../components/StageProgress';
import type { StatusTone } from '../components/StatusPill';

export type RunStatus = 'generated' | 'hr' | 'audit' | 'md' | 'accts' | 'paid' | 'voided';

/** The approval chain a payroll run goes through. Each status means that stage is done. */
export const payrollStages: Stage[] = [
  { id: 'generated', label: 'Generated' },
  { id: 'hr', label: 'HR Approval' },
  { id: 'audit', label: 'Audit Approval' },
  { id: 'md', label: 'MD Approval' },
  { id: 'accts', label: 'Accounts Approval' },
  { id: 'paid', label: 'Paid' },
];

export const statusMeta: Record<RunStatus, { label: string; tone: StatusTone; next?: string }> = {
  generated: { label: 'Awaiting HR', tone: 'warning', next: 'Approve (HR)' },
  hr: { label: 'HR Approved', tone: 'info', next: 'Approve (Audit)' },
  audit: { label: 'Audit Approved', tone: 'info', next: 'Approve (MD)' },
  md: { label: 'MD Approved', tone: 'info', next: 'Approve (Accounts)' },
  accts: { label: 'Accts Approved', tone: 'info', next: 'Mark as Paid' },
  paid: { label: 'Paid', tone: 'success' },
  voided: { label: 'Voided', tone: 'neutral' },
};

export const statusOrder: RunStatus[] = ['generated', 'hr', 'audit', 'md', 'accts', 'paid'];

export interface PayrollRun {
  id: string;
  period: string;
  template: string;
  generated: string;
  generatedSort: number;
  staff: number;
  gross: number;
  deductions: number;
  status: RunStatus;
}

export const naira = (n: number) => `₦ ${n.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const templates = ['Support Staff', 'Executive Group', 'Mid-Level Staff', 'Junior Staff', 'Interns', 'Contract Staff'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const statuses: RunStatus[] = ['paid', 'accts', 'paid', 'accts', 'accts', 'hr', 'generated', 'generated', 'generated', 'generated', 'md', 'audit', 'paid', 'voided'];

export const payrollRuns: PayrollRun[] = Array.from({ length: 28 }, (_, i) => {
  const month = 10 - (i % 11);
  const staff = [28, 11, 25, 6, 20, 17, 4, 9, 14, 5, 32, 12, 8, 22][i % 14];
  const gross = staff * [178_500, 412_000, 265_000, 148_000, 98_000, 133_000][i % 6];
  const day = 28 - (i % 5);
  return {
    id: `PR-2026-${String(100 + 28 - i).padStart(4, '0')}`,
    period: `${months[month]} 2026`,
    template: templates[i % templates.length],
    generated: `${day} ${months[month].slice(0, 3)} 2026`,
    generatedSort: (month + 1) * 100 + day,
    staff,
    gross,
    deductions: Math.round(gross * (0.22 + (i % 5) * 0.015)),
    status: statuses[i % statuses.length],
  };
});

export const payrollEmployees = [
  { name: 'Ada Obi', title: 'Finance Manager', gross: 850_000, net: 611_400 },
  { name: 'Daniel Olabode', title: 'Operations Lead', gross: 620_000, net: 452_600 },
  { name: 'Amaka Nwosu', title: 'HR Officer', gross: 410_000, net: 305_450 },
  { name: 'Ibrahim Musa', title: 'Sales Executive', gross: 365_000, net: 274_700 },
  { name: 'Deborah Akinola', title: 'Buyer', gross: 298_000, net: 226_480 },
];
