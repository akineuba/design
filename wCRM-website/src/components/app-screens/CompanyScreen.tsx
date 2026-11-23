import {
  Avatar,
  Badge,
  Button,
  Buildings2Icon,
  CallCallingOutlineIcon,
  LucideCalendarIcon,
  LucideChartLineIcon,
  LucideMailIcon,
  LucidePencilIcon,
  LucidePlusIcon,
  Profile2UserIcon,
  StatCard,
  Table,
  TableBody,
  TableCard,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ds';
import { Kebab, SearchBox } from './parts';

/*
 * Company record (not in Figma; built for the marketing site on design-system components). 1400 × 797, the content
 * area of an AppFrame. Names, deals and amounts are the sample data the other rebuilt screens already use for
 * Cash Drive, so the screens agree with each other.
 */

const STATS = [
  { label: 'Open pipeline', value: '₦50,000,000', hint: '1 open deal', icon: <LucideChartLineIcon /> },
  { label: 'Won this year', value: '₦35,900,000', hint: '2 deals closed won', icon: <LucideChartLineIcon /> },
  { label: 'Contacts', value: '5', hint: '3 owners', icon: <Profile2UserIcon /> },
  { label: 'Last activity', value: '2 days ago', hint: 'Meeting · CRM Solution', icon: <LucideCalendarIcon /> },
];

const CONTACTS = [
  ['Christian Olumide', 'Head of Operations', 'christianolumide@yopmail.com', 'Taiwo Ajayi'],
  ['Lukman Waliullah', 'IT Manager', 'Lukman.Waliullah@gmail.com', 'Murphy Ogbeide'],
  ['Pam Mancha', 'Procurement Lead', 'emmanuel.mancha@gmail.com', 'Murphy Ogbeide'],
  ['Bunmi Ajayi', 'Finance Director', 'bunmi@cashdrive.com', 'Bamidele Olatunde'],
  ['Kemi Adeyemi', 'Product Manager', 'kemi.adeyemi@cashdrive.com', 'Bamidele Olatunde'],
];

const DEALS: { name: string; stage: string; tone: 'success' | 'info'; amount: string }[] = [
  { name: 'CRM Solution', stage: 'Meeting', tone: 'info', amount: '₦50,000,000' },
  { name: 'WBiz customization', stage: 'Closed Won', tone: 'success', amount: '₦35,000,000' },
  { name: 'Cursort implementation', stage: 'Closed Won', tone: 'success', amount: '₦900,000' },
];

const ACTIVITY = [
  { icon: <LucideCalendarIcon />, text: 'Meeting with Lukman Waliullah', meta: 'CRM Solution · 2 days ago' },
  { icon: <LucideMailIcon />, text: 'Proposal sent to Bunmi Ajayi', meta: 'CRM Solution · 5 days ago' },
  { icon: <CallCallingOutlineIcon />, text: 'Call with Christian Olumide', meta: 'WBiz customization · 2 weeks ago' },
];

export function CompanyScreen() {
  return (
    <>
      {/* Header */}
      <div className="absolute flex items-center justify-between rounded-callout border border-border-subtle bg-surface-default px-6" style={{ left: 24, top: 14, width: 1346, height: 104 }}>
        <span className="flex items-center gap-4">
          <span className="flex size-avatar-56 items-center justify-center rounded-lg bg-accent-navy-subtle text-accent-navy-hover">
            <Buildings2Icon className="size-7" />
          </span>
          <span className="flex flex-col gap-1.5">
            <span className="flex items-center gap-3">
              <span className="text-heading-xl text-text-primary">Cash Drive Ltd</span>
              <Badge tone="success">Active customer</Badge>
            </span>
            <span className="flex items-center gap-4 text-body-sm text-text-secondary">
              <span>Fintech</span>
              <span>Lagos, Nigeria</span>
              <span>cashdrive.com</span>
              <span className="flex items-center gap-1.5">
                Owner <Avatar name="Oluwatobi Osanyinbi" size="sm" /> <span className="text-text-primary">Oluwatobi Osanyinbi</span>
              </span>
            </span>
          </span>
        </span>
        <span className="flex items-center gap-2">
          <Button variant="outline" size="sm" leadingIcon={<LucidePencilIcon />}>Edit</Button>
          <Button size="sm" leadingIcon={<LucidePlusIcon />}>Create Deal</Button>
        </span>
      </div>

      {/* KPI row */}
      <div className="absolute grid grid-cols-4 gap-3.75" style={{ left: 24, top: 134, width: 1346 }}>
        {STATS.map((s, i) => (
          <StatCard key={s.label} label={s.label} value={s.value} hint={s.hint} icon={s.icon} featured={i === 0} />
        ))}
      </div>

      {/* Contacts */}
      <TableCard
        className="absolute"
        style={{ left: 24, top: 286, width: 846, height: 492 }}
        toolbar={
          <>
            <span className="flex items-center gap-4">
              <span className="text-label text-text-primary">
                Contacts <span className="font-regular text-text-secondary">(5)</span>
              </span>
              <SearchBox />
            </span>
            <Button size="xs" leadingIcon={<LucidePlusIcon />}>Add Contact</Button>
          </>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {CONTACTS.map(([name, role, email, owner]) => (
              <TableRow key={name}>
                <TableCell emphasis>
                  <span className="flex items-center gap-2"><Avatar name={name} size="sm" />{name}</span>
                </TableCell>
                <TableCell>{role}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{owner}</TableCell>
                <TableCell align="right"><Kebab /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableCard>

      {/* Deals and activity */}
      <div className="absolute flex flex-col gap-4" style={{ left: 886, top: 286, width: 484 }}>
        <div className="flex flex-col gap-3 rounded-lg border border-border-default bg-surface-default p-5">
          <span className="flex items-center justify-between">
            <span className="text-heading-3 text-text-primary">Deals</span>
            <span className="text-caption text-text-secondary">3 deals · ₦85,900,000</span>
          </span>
          {DEALS.map((d) => (
            <span key={d.name} className="flex items-center justify-between border-t border-border-subtle pt-3 text-body-sm">
              <span className="flex flex-col gap-1">
                <span className="font-semibold text-accent-navy-hover">{d.name}</span>
                <Badge tone={d.tone} size="sm">{d.stage}</Badge>
              </span>
              <span className="font-semibold text-text-primary">{d.amount}</span>
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-3 rounded-lg border border-border-default bg-surface-default p-5">
          <span className="text-heading-3 text-text-primary">Recent activity</span>
          {ACTIVITY.map((a) => (
            <span key={a.text} className="flex items-start gap-3 text-body-sm">
              <span className="flex size-icon-tile shrink-0 items-center justify-center rounded-sm bg-surface-canvas text-accent-navy-hover [&>svg]:size-4">{a.icon}</span>
              <span className="flex flex-col gap-0.5">
                <span className="text-text-primary">{a.text}</span>
                <span className="text-caption text-text-secondary">{a.meta}</span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
