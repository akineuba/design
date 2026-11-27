// Guide screenshots for Wragby Product Verse, built only from the wCRM component library.
// Scratch harness (not part of the library): rendered at /shots.html#<screen> and captured with Playwright.
import type { ReactNode } from 'react';
import {
  Accordion, AccordionItem, ActivityFeed, Avatar, Badge, Button, Card, CardHeader, Drawer, DrawerContent, Input, NavMenu,
  Pagination, ProgressBar, Select, StatCard, Table, TableBody, TableCard, TableCell, TableCellStack, TableHead, TableHeader,
  TableRow, TopBar,
} from '../index';
import { businessSections, businessSettings } from '../components/NavMenu/NavMenu.fixtures';
import {
  Buildings2Icon, ExportIcon, LucideAwardIcon, LucideCalendarIcon, LucidePlusIcon, LucideSearchIcon, PeopleIcon,
  StatusUpBoldIcon, FilterIcon,
} from '../icons';

/** App frame: Business Development sidebar on the left, the app header above the page. */
function Frame({ active, title, children }: { active: string; title: string; children: ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface-canvas">
      <NavMenu sections={businessSections} settings={businessSettings} activeId={active} onLogout={() => {}} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar greeting="Hi Sarah" title={title} userName="Sarah Kalu" hasUnreadNotifications theme={document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'} />
        <main className="min-w-0 flex-1 overflow-hidden p-6">
          <div className="flex flex-col gap-5">{children}</div>
        </main>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Dashboard */
const topCustomers = [
  { name: 'Zenith Logistics', sector: 'Logistics', won: '₦18.4m', deals: 4 },
  { name: 'Quantum Solutions', sector: 'Technology', won: '₦12.9m', deals: 3 },
  { name: 'Cash Drive Ltd', sector: 'Finance', won: '₦9.7m', deals: 2 },
  { name: 'Technologia', sector: 'Technology', won: '₦7.2m', deals: 2 },
];
const activity = [
  { id: '1', actor: 'Tunde Bello', title: 'Won “ERP rollout, phase 2”', meta: 'Zenith Logistics · ₦6.5m', time: '2h ago' },
  { id: '2', actor: 'Amaka Nwosu', title: 'Moved “Fleet tracking” to Proposal', meta: 'Cash Drive Ltd', time: '4h ago' },
  { id: '3', actor: 'Sarah Kalu', title: 'Added 3 contacts', meta: 'Quantum Solutions', time: 'Yesterday' },
  { id: '4', actor: 'Ifeanyi Obi', title: 'Logged a meeting', meta: 'Technologia · Discovery call', time: 'Yesterday' },
];

function Dashboard() {
  return (
    <Frame active="dashboard" title="Business Development - Dashboard">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-heading-xl font-semibold text-text-primary">Good afternoon, Sarah</h1>
          <p className="text-body text-text-secondary">FY 2026 · Q4 so far</p>
        </div>
        <div className="flex gap-3">
          <Select label="Period" hideLabel size="sm" defaultValue="q4" options={[{ value: 'q4', label: 'Q4 2026' }, { value: 'fy', label: 'FY 2026' }]} />
          <Button leadingIcon={<LucidePlusIcon />}>Create deal</Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <StatCard featured icon={<StatusUpBoldIcon />} label="Open deals" value="54" trend={{ value: '12%', direction: 'up', label: 'vs Q3' }} />
        <StatCard icon={<LucideAwardIcon />} label="Deals won" value="37" trend={{ value: '8%', direction: 'up', label: 'vs Q3' }} />
        <StatCard icon={<Buildings2Icon />} label="Companies" value="312" hint="18 new this quarter" />
        <StatCard icon={<PeopleIcon />} label="Contacts" value="1,204" hint="64 new this quarter" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader title="Deal status" count="128" />
          <div className="mt-4 flex flex-col gap-4">
            <ProgressBar label="Open" value={42} valueLabel="54" tone="navy" />
            <ProgressBar label="Won" value={29} valueLabel="37" tone="success" />
            <ProgressBar label="Lost" value={16} valueLabel="21" tone="brand" />
            <ProgressBar label="On hold" value={13} valueLabel="16" tone="warning" />
          </div>
        </Card>
        <Card padding="none" className="overflow-hidden">
          <div className="p-5 pb-3"><CardHeader title="Top customers" action={<Button variant="link" size="sm">View all</Button>} /></div>
          <Table>
            <TableHeader><TableRow><TableHead>Company</TableHead><TableHead align="right">Won</TableHead></TableRow></TableHeader>
            <TableBody>
              {topCustomers.map((c) => (
                <TableRow key={c.name}>
                  <TableCell><TableCellStack primary={c.name} secondary={`${c.sector} · ${c.deals} deals`} /></TableCell>
                  <TableCell align="right" emphasis>{c.won}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Card>
          <CardHeader title="Recent activity" />
          <ActivityFeed className="mt-4" items={activity} />
        </Card>
      </div>
      <Card>
        <CardHeader title="Q4 target by salesperson" action={<Button variant="link" size="sm">Open Budgets</Button>} />
        <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-4">
          <ProgressBar label="Tunde Bello" value={86} valueLabel="₦25.8m of ₦30m" tone="success" />
          <ProgressBar label="Sarah Kalu" value={71} valueLabel="₦21.3m of ₦30m" />
          <ProgressBar label="Amaka Nwosu" value={58} valueLabel="₦14.5m of ₦25m" tone="navy" />
          <ProgressBar label="Ifeanyi Obi" value={34} valueLabel="₦6.8m of ₦20m" tone="warning" />
        </div>
      </Card>
    </Frame>
  );
}

/* ------------------------------------------------------------------ Create a company */
const companies = [
  { name: 'Zenith Logistics', industry: 'Logistics', owner: 'Tunde Bello', contacts: 6, deals: 4, phone: '+234 802 114 9921', status: 'Customer' },
  { name: 'Quantum Solutions', industry: 'Technology', owner: 'Sarah Kalu', contacts: 9, deals: 3, phone: '+234 809 551 0172', status: 'Customer' },
  { name: 'Cash Drive Ltd', industry: 'Finance', owner: 'Amaka Nwosu', contacts: 4, deals: 2, phone: '+234 803 662 4410', status: 'Prospect' },
  { name: 'Technologia', industry: 'Technology', owner: 'Ifeanyi Obi', contacts: 3, deals: 2, phone: '+233 24 551 0920', status: 'Prospect' },
  { name: 'Greenfield Foods', industry: 'FMCG', owner: 'Sarah Kalu', contacts: 5, deals: 1, phone: '+234 805 330 1185', status: 'Lead' },
  { name: 'Harbour Health', industry: 'Healthcare', owner: 'Tunde Bello', contacts: 2, deals: 0, phone: '+254 712 440 980', status: 'Lead' },
  { name: 'Northwind Energy', industry: 'Energy', owner: 'Amaka Nwosu', contacts: 7, deals: 3, phone: '+234 806 912 7734', status: 'Customer' },
];
const tone = { Customer: 'success', Prospect: 'info', Lead: 'neutral' } as const;

function CreateCompany() {
  return (
    <Frame active="companies" title="Business Development - Companies">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-heading-xl font-semibold text-text-primary">Companies</h1>
          <p className="text-body text-text-secondary">Organisations you do business with.</p>
        </div>
      </div>
      <TableCard
        toolbar={
          <div className="flex w-full items-center justify-between gap-3">
            <Input label="Search companies" hideLabel size="toolbar" placeholder="Search" leadingIcon={<LucideSearchIcon />} />
            <div className="flex gap-2">
              <Button variant="toolbar" leadingIcon={<FilterIcon />}>Filter</Button>
              <Button variant="toolbar" leadingIcon={<ExportIcon />}>Export</Button>
              <Button leadingIcon={<LucidePlusIcon />}>Create company</Button>
            </div>
          </div>
        }
        footer={<Pagination page={1} pageSize={10} totalItems={312} onPageChange={() => {}} itemLabel="companies" />}
      >
        <Table>
          <TableHeader><TableRow><TableHead>Company</TableHead><TableHead>Industry</TableHead><TableHead>Owner</TableHead><TableHead>Phone</TableHead><TableHead align="right">Contacts</TableHead><TableHead align="right">Deals</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            {companies.map((c) => (
              <TableRow key={c.name}>
                <TableCell emphasis><span className="flex items-center gap-2.5"><Avatar name={c.name} />{c.name}</span></TableCell>
                <TableCell>{c.industry}</TableCell>
                <TableCell>{c.owner}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell align="right">{c.contacts}</TableCell>
                <TableCell align="right">{c.deals}</TableCell>
                <TableCell><Badge tone={tone[c.status as keyof typeof tone]} dot>{c.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableCard>
      <Drawer open>
        <DrawerContent
          title="Create company"
          description="Add an organisation, then attach its contacts and deals."
          footer={<><Button variant="outline">Cancel</Button><Button>Create company</Button></>}
        >
          <Input label="Company name" defaultValue="Lagoon Ventures Ltd" required />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Industry" defaultValue="tech" options={[{ value: 'tech', label: 'Technology' }, { value: 'fin', label: 'Finance' }, { value: 'log', label: 'Logistics' }]} />
            <Select label="Status" defaultValue="lead" options={[{ value: 'lead', label: 'Lead' }, { value: 'prospect', label: 'Prospect' }, { value: 'customer', label: 'Customer' }]} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Select label="Country code" defaultValue="ng" options={[{ value: 'ng', label: '🇳🇬 +234' }, { value: 'gh', label: '🇬🇭 +233' }, { value: 'ke', label: '🇰🇪 +254' }]} />
            <div className="col-span-2"><Input label="Phone number" defaultValue="803 551 0217" /></div>
          </div>
          <Input label="Email address" defaultValue="hello@lagoonventures.ng" />
          <Input label="Website" defaultValue="www.lagoonventures.ng" />
          <Select label="Account owner" defaultValue="sarah" options={[{ value: 'sarah', label: 'Sarah Kalu' }, { value: 'tunde', label: 'Tunde Bello' }]} />
          <Accordion type="multiple" defaultValue={['address']}>
            <AccordionItem value="address" title="Address">
              <Input label="Street address" defaultValue="14 Admiralty Way, Lekki Phase 1" />
            </AccordionItem>
            <AccordionItem value="social" title="Social Media Information">
              <Input label="LinkedIn" placeholder="linkedin.com/company/…" />
            </AccordionItem>
          </Accordion>
        </DrawerContent>
      </Drawer>
    </Frame>
  );
}

const screens: Record<string, () => ReactNode> = {
  'crm-dashboard': () => <Dashboard />,
  'crm-create-company': () => <CreateCompany />,
};
export function Screen({ name }: { name: string }) {
  const S = screens[name] ?? screens['crm-dashboard'];
  return <>{S()}</>;
}
void LucideCalendarIcon;
