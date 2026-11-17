// Story-only: the payroll run side panel and the Generate Payroll panel, shared by the Payroll Runs
// and Payroll Dashboard sample screens, plus small number helpers.
import { useState } from 'react';
import { Accordion, AccordionItem } from '../components/Accordion';
import { AvatarLabel } from '../components/Avatar';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { Radio, RadioGroup } from '../components/Radio';
import { Select } from '../components/Select';
import { SidePanel } from '../components/SidePanel';
import { StageProgress } from '../components/StageProgress';
import { StatCard } from '../components/StatCard';
import { StatusPill } from '../components/StatusPill';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../components/Table';
import { CloseCircleIcon, ExportIcon, TickCircleIcon } from '../icons';
import { naira, payrollEmployees, payrollStages, statusMeta, statusOrder, type PayrollRun, type RunStatus } from './payroll-data';

export const opt = (...l: string[]) => l.map((v) => ({ value: v, label: v }));
export const net = (r: PayrollRun) => r.gross - r.deductions;
/** Short form for stat cards ("₦ 76.37M"); the exact figure goes in the hint. */
export const compact = (n: number) => {
  const short = (v: number, unit: string) => `₦${Number(v.toFixed(1)).toLocaleString('en-NG')}${unit}`;
  return n >= 1e9 ? short(n / 1e9, 'B') : n >= 1e6 ? short(n / 1e6, 'M') : n >= 1e3 ? short(n / 1e3, 'K') : naira(n);
};
export const change = (cur: number, prev: number) => (prev ? ((cur - prev) / prev) * 100 : 0);

/** Current stage for StageProgress: the next stage still to happen. */
export const stageView = (status: RunStatus) => {
  if (status === 'voided') return { currentId: undefined, stages: payrollStages.map((s) => ({ ...s, status: 'upcoming' as const })) };
  const i = statusOrder.indexOf(status);
  if (status === 'paid') return { currentId: undefined, stages: payrollStages.map((s) => ({ ...s, status: 'complete' as const })) };
  return { currentId: payrollStages[i + 1].id, stages: payrollStages };
};

export function RunPanel({ run, onClose, onAdvance, onSendBack }: { run: PayrollRun | null; onClose: () => void; onAdvance: (r: PayrollRun) => void; onSendBack: (r: PayrollRun) => void }) {
  if (!run) return <SidePanel open={false} onClose={onClose} title="" />;
  const meta = statusMeta[run.status];
  const view = stageView(run.status);
  const trail = payrollStages.map((s, i) => {
    const done = run.status !== 'voided' && i <= statusOrder.indexOf(run.status);
    return { ...s, description: done ? (i === 0 ? `Ada Obi · ${run.generated}` : `Approved · ${run.generated}`) : undefined };
  });
  return (
    <SidePanel
      open
      onClose={onClose}
      size="lg"
      title={`Payroll Run · ${run.period}`}
      description={`${run.template} · ${run.id} · generated ${run.generated}`}
      footer={
        meta.next ? (
          <>
            <Button variant="outline" leadingIcon={<CloseCircleIcon />} onClick={onClose}>Cancel</Button>
            {run.status !== 'generated' && <Button variant="secondary" onClick={() => onSendBack(run)}>Send back</Button>}
            <Button leadingIcon={<TickCircleIcon />} onClick={() => onAdvance(run)}>{meta.next}</Button>
          </>
        ) : (
          <Button variant="outline" leadingIcon={<CloseCircleIcon />} onClick={onClose}>Close</Button>
        )
      }
    >
      <div className="flex items-center justify-between gap-3">
        <StatusPill tone={meta.tone}>{meta.label}</StatusPill>
        <Button variant="secondary" size="sm" leadingIcon={<ExportIcon />}>Payslips</Button>
      </div>
      <StageProgress {...view} label="Approval progress" />
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Gross pay" value={naira(run.gross)} />
        <StatCard label="Deductions" value={naira(run.deductions)} tone="error" />
        <StatCard label="Net pay" value={naira(net(run))} tone="success" />
        <StatCard label="Employees" value={run.staff} tone="primary" />
      </div>
      <Accordion variant="form" defaultValue={['employees']}>
        <AccordionItem value="employees" title="Employees in this run">
          <Table>
            <TableHead>
              <tr><TableHeaderCell>Employee</TableHeaderCell><TableHeaderCell align="right">Gross</TableHeaderCell><TableHeaderCell align="right">Net</TableHeaderCell></tr>
            </TableHead>
            <TableBody>
              {payrollEmployees.map((e) => (
                <TableRow key={e.name}>
                  <TableCell><AvatarLabel name={e.name} description={e.title} /></TableCell>
                  <TableCell align="right">{naira(e.gross)}</TableCell>
                  <TableCell align="right" emphasis="strong">{naira(e.net)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionItem>
        <AccordionItem value="trail" title="Approval trail">
          <StageProgress orientation="vertical" stages={trail} currentId={view.currentId} label="Approval trail" />
        </AccordionItem>
      </Accordion>
    </SidePanel>
  );
}

export function GeneratePanel({ open, onClose, onGenerate }: { open: boolean; onClose: () => void; onGenerate: (r: PayrollRun) => void }) {
  const [templates, setTemplates] = useState(opt('Support Staff', 'Executive Group', 'Mid-Level Staff', 'Junior Staff', 'Interns'));
  const [template, setTemplate] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>('October');
  const [scope, setScope] = useState('all');
  const [quickAdd, setQuickAdd] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const submit = () => {
    if (!template || !month) return;
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      onGenerate({ id: 'PR-2026-0129', period: `${month} 2026`, template, generated: '21 Oct 2026', generatedSort: 9999, staff: 24, gross: 6_120_000, deductions: 1_468_800, status: 'generated' });
      setTemplate(null);
    }, 700);
  };
  return (
    <>
      <SidePanel
        open={open}
        onClose={onClose}
        size="sm"
        closeOnBackdrop={false}
        title="Generate Payroll"
        description="Creates a run for the chosen period. It then goes through HR, Audit, MD and Accounts approval before payment."
        footer={
          <>
            <Button variant="outline" leadingIcon={<CloseCircleIcon />} onClick={onClose} disabled={busy}>Cancel</Button>
            <Button leadingIcon={<TickCircleIcon />} onClick={submit} loading={busy} disabled={!template || !month}>Generate</Button>
          </>
        }
      >
        <Accordion variant="form" defaultValue={['period', 'staff']}>
          <AccordionItem value="period" title="Pay period">
            <Select label="Payroll Template:" required placeholder="Select template" options={templates} value={template} onChange={setTemplate} menuAction={{ label: 'Add New', onSelect: (q) => setQuickAdd(q) }} />
            <div className="grid grid-cols-2 gap-4">
              <Select label="Month:" required options={opt('September', 'October', 'November', 'December')} value={month} onChange={setMonth} />
              <Select label="Year:" options={opt('2026', '2027')} defaultValue="2026" searchable={false} />
            </div>
            <Input label="Pay Date:" type="date" defaultValue="2026-12-28" />
          </AccordionItem>
          <AccordionItem value="staff" title="Staff and items">
            <RadioGroup label="Include:" value={scope} onChange={setScope}>
              <Radio value="all" label="All eligible staff" />
              <Radio value="selected" label="Selected staff" />
            </RadioGroup>
            {scope === 'selected' && <Select label="Staff:" placeholder="Search employees" options={payrollEmployees.map((e) => ({ value: e.name, label: e.name }))} />}
            <Checkbox label="Apply recurring benefits" defaultChecked />
            <Checkbox label="Apply flexible deductions" defaultChecked />
          </AccordionItem>
        </Accordion>
      </SidePanel>
      <Modal
        open={quickAdd !== null}
        onClose={() => setQuickAdd(null)}
        closeOnBackdrop={false}
        title="New Payroll Template"
        description="Name it now; set up salary items from Payroll › Salary Setup."
        footer={
          <>
            <Button variant="outline" leadingIcon={<CloseCircleIcon />} onClick={() => setQuickAdd(null)}>Cancel</Button>
            <Button
              leadingIcon={<TickCircleIcon />}
              disabled={!quickAdd?.trim()}
              onClick={() => { const v = quickAdd!.trim(); setTemplates([...templates, { value: v, label: v }]); setTemplate(v); setQuickAdd(null); }}
            >
              Save
            </Button>
          </>
        }
      >
        <Input label="Template Name" required autoFocus value={quickAdd ?? ''} onChange={(e) => setQuickAdd(e.target.value)} />
      </Modal>
    </>
  );
}
