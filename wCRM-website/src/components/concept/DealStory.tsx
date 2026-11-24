import {
  Avatar,
  Badge,
  Button,
  CallCallingOutlineIcon,
  LucideCalendarIcon,
  LucideCheckCircleIcon,
  LucideCheckIcon,
  LucideClockIcon,
  LucideMailIcon,
  LucideXCircleIcon,
  ProgressBar,
  cn,
} from '@ds';
import { CloseUp, Field, QualPill, StagePill, type Stage } from './parts';

/*
 * "See it at work": three close-ups that follow one deal, Cloud Backup Partnership (Bluewave Telecoms, ₦5,400,000),
 * from logging a meeting, to moving its stage, to its effect on the Managed Services sales target. Sample data; the
 * deal and owners come from the current Deals register. Target: ₦41.6M achieved before the win, ₦47.0M after (of ₦60M).
 */

function DealHeader({ stage }: { stage: Stage }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-default bg-surface-default px-5 py-3.5">
      <span className="flex min-w-0 flex-col">
        <span className="text-heading-3 text-text-primary">Cloud Backup Partnership</span>
        <span className="text-caption text-text-secondary">Bluewave Telecoms · ₦5,400,000 · Owner Ifeoma Nwosu</span>
      </span>
      <StagePill stage={stage} />
    </div>
  );
}

/* 1 · Log the meeting */

const TYPES = [
  { label: 'Call', icon: <CallCallingOutlineIcon /> },
  { label: 'Meeting', icon: <LucideCalendarIcon /> },
  { label: 'Email', icon: <LucideMailIcon /> },
  { label: 'Task', icon: <LucideCheckIcon /> },
];

export function MeetingCloseUp() {
  return (
    <CloseUp label="Logging a meeting on the Cloud Backup Partnership deal: proposal walkthrough with Bluewave on 18 November, with notes">
      <DealHeader stage="Proposal Sent" />
      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-4 rounded-callout border border-border-subtle bg-surface-default p-5">
          <span className="text-label text-text-primary">Log activity</span>
          <span className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {TYPES.map((t) => (
              <span
                key={t.label}
                className={cn(
                  'flex items-center justify-center gap-1.5 rounded-md border py-1.5 text-caption font-semibold [&>svg]:size-3.5',
                  t.label === 'Meeting' ? 'border-brand-primary bg-brand-primary-subtle text-brand-primary' : 'border-border-default text-text-secondary',
                )}
              >
                {t.icon}
                {t.label}
              </span>
            ))}
          </span>
          <Field label="Title">Proposal walkthrough with Bluewave IT</Field>
          <span className="grid grid-cols-2 gap-3">
            <Field label="Date" icon={<LucideCalendarIcon />}>18 Nov 2026</Field>
            <Field label="Time" icon={<LucideClockIcon />}>10:00 – 11:00</Field>
          </span>
          <span className="flex flex-col gap-1.5">
            <span className="text-caption font-medium text-text-secondary">Attendees</span>
            <span className="flex flex-wrap gap-2">
              {['Ifeoma Nwosu', 'Kunle Adeyemi'].map((n) => (
                <span key={n} className="flex items-center gap-1.5 rounded-full border border-border-default py-0.5 pl-0.5 pr-2.5 text-caption text-text-primary">
                  <Avatar name={n} size="sm" />
                  {n}
                </span>
              ))}
            </span>
          </span>
          <Field label="Notes">IT approved the backup proposal. Finance signs off on Friday.</Field>
          <span className="flex justify-end gap-2">
            <Button variant="outline" size="xs">Cancel</Button>
            <Button size="xs">Save activity</Button>
          </span>
        </div>
      </div>
    </CloseUp>
  );
}

/* 2 · Move the stage */

const STAGES: Stage[] = ['Discovery', 'Site Survey', 'Site Quotation', 'Proposal Sent', 'Closed Won', 'Closed Lost'];

export function StageCloseUp() {
  return (
    <CloseUp label="Changing the Cloud Backup Partnership deal stage from Proposal Sent to Closed Won; a confirmation says the stage was updated">
      <DealHeader stage="Proposal Sent" />
      <div className="relative flex flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-callout border border-border-subtle bg-surface-default px-4 py-3">
          <span className="flex flex-col">
            <span className="text-label-sm text-text-primary">Deal stage</span>
            <span className="text-caption-sm text-text-secondary">Qualification</span>
          </span>
          <span className="flex items-center gap-2">
            <QualPill score={4} />
            <StagePill stage="Proposal Sent" open />
          </span>
        </div>
        {/* Open stage menu */}
        <ul className="ml-auto flex w-popover flex-col gap-0.5 rounded-md border border-border-default bg-surface-default p-1.5 shadow-menu">
          {STAGES.map((s) => (
            <li
              key={s}
              className={cn(
                'flex items-center justify-between rounded-sm px-3 py-2 text-body-sm',
                s === 'Closed Won' ? 'bg-status-success-subtle font-semibold text-status-success-text' : s === 'Proposal Sent' ? 'text-text-secondary' : 'text-text-primary',
              )}
            >
              <span className="flex items-center gap-2">
                {s === 'Closed Won' && <LucideCheckCircleIcon className="size-4" />}
                {s === 'Closed Lost' && <LucideXCircleIcon className="size-4 text-status-danger" />}
                {s}
              </span>
              {s === 'Proposal Sent' && <span className="text-caption-sm">Current</span>}
            </li>
          ))}
        </ul>
        {/* Confirmation */}
        <div className="flex items-start gap-3 rounded-md border border-border-default border-l-status-success bg-surface-default p-3.5 shadow-lg">
          <LucideCheckCircleIcon className="mt-0.5 size-4 shrink-0 text-status-success-strong" />
          <span className="flex flex-col gap-0.5">
            <span className="text-label-sm text-text-primary">Stage updated to Closed Won</span>
            <span className="text-caption text-text-secondary">₦5,400,000 now counts towards the Managed Services Q4 target.</span>
          </span>
        </div>
      </div>
    </CloseUp>
  );
}

/* 3 · See the effect on the target */

const WINS = [
  { name: 'Cloud Backup Partnership', amount: '₦5,400,000', when: 'Just now', fresh: true },
  { name: 'Managed IT Support Contract', amount: '₦9,600,000', when: '05 Nov' },
  { name: 'Loan Origination Portal', amount: '₦4,800,000', when: '05 Nov' },
];

export function TargetCloseUp() {
  return (
    <CloseUp label="Managed Services Q4 target: ₦47,000,000 of ₦60,000,000 achieved, 78%, up from 69% after Cloud Backup Partnership closed">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-default bg-surface-default px-5 py-3.5">
        <span className="flex flex-col">
          <span className="text-heading-3 text-text-primary">Managed Services · Q4 2026</span>
          <span className="text-caption text-text-secondary">Budgets › Practice area allocations</span>
        </span>
        <Badge tone="success">+₦5,400,000 just now</Badge>
      </div>
      <div className="flex flex-col gap-4 p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ['Target', '₦60,000,000', 'text-text-primary'],
            ['Achieved', '₦47,000,000', 'text-status-success-strong'],
            ['Variance', '₦-13,000,000', 'text-status-danger'],
          ].map(([label, value, tone]) => (
            <div key={label} className="flex flex-col gap-1 rounded-callout border border-border-subtle bg-surface-default p-3.5">
              <span className="text-caption font-medium text-text-secondary">{label}</span>
              <span className={cn('text-heading-3', tone)}>{value}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 rounded-callout border border-border-subtle bg-surface-default p-4">
          <ProgressBar label="Target achieved" value={78} valueLabel="78%" tone="success" />
          <span className="text-caption text-text-secondary">Up from 69% before Cloud Backup Partnership closed.</span>
        </div>
        <div className="flex flex-col rounded-callout border border-border-subtle bg-surface-default">
          <span className="px-4 pb-1 pt-3 text-label-sm text-text-primary">Closed won this quarter</span>
          {WINS.map((w) => (
            <span key={w.name} className={cn('flex items-center justify-between gap-3 px-4 py-2.5 text-body-sm', w.fresh ? 'bg-status-success-subtle' : 'border-t border-border-subtle')}>
              <span className={cn('min-w-0', w.fresh ? 'font-semibold text-status-success-text' : 'text-text-primary')}>{w.name}</span>
              <span className="flex shrink-0 items-center gap-4">
                <span className="whitespace-nowrap text-caption text-text-secondary">{w.when}</span>
                <span className="font-semibold text-text-primary">{w.amount}</span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </CloseUp>
  );
}
