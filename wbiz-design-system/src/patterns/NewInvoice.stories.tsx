import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState, type ReactNode } from 'react';
import { Shell } from './shell';
import { Accordion, AccordionItem } from '../components/Accordion';
import { Alert } from '../components/Alert';
import { AvatarLabel } from '../components/Avatar';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { ColumnCustomizer, type ColumnCustomizerValue } from '../components/ColumnCustomizer';
import { FileUpload, type UploadedFile } from '../components/FileUpload';
import { Input } from '../components/Input';
import { Logo } from '../components/Logo';
import { Modal } from '../components/Modal';
import { PageHeader } from '../components/PageHeader';
import { RichTextField } from '../components/RichTextField';
import { SegmentedControl } from '../components/SegmentedControl';
import { Select } from '../components/Select';
import { StatusPill } from '../components/StatusPill';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../components/Table';
import {
  CloseCircleIcon, CopyPlusIcon, DownloadIcon, EyeIcon, MoneyReceiveIcon, PlusIcon, SaveIcon, SearchIcon, SendIcon,
  TickCircleIcon, TrashIcon,
} from '../icons';
import { customers as customerSeed } from './demo-data';
import {
  addDays, arAccounts, catalog as catalogSeed, currencies, entryTypes, invoiceTaxes, isoToday, lineTaxes, locations,
  longDate, money, paymentTerms, projects as projectSeed, revenueAccounts, uoms, type CatalogItem, type Currency, type EntryType,
} from './invoice-data';

/* ------------------------------------------------------------------------------------------------
 * Model
 * ---------------------------------------------------------------------------------------------- */

interface Line {
  id: number;
  type: EntryType;
  item: string | null;
  description: string;
  qty: string;
  uom: string | null;
  price: string;
  discount: string;
  tax: string | null;
  location: string | null;
}

let nextId = 1;
const blankLine = (type: EntryType = 'product'): Line => ({ id: nextId++, type, item: null, description: '', qty: '1', uom: null, price: '', discount: '', tax: 'vat', location: null });
/** Catalogue prices are in naira; convert to the invoice currency at its rate. */
const priceIn = (ngn: number, rate: number) => (ngn ? (ngn / (rate || 1)).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '');
const lineFrom = (c: CatalogItem, qty = 1, rate = 1): Line => ({ ...blankLine(c.type), item: c.value, description: c.description, uom: c.uom || null, price: priceIn(c.price, rate), tax: c.tax, qty: String(qty) });

const num = (s: string) => {
  const n = Number(String(s).replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
};
const lineAmount = (l: Line) => num(l.qty) * num(l.price) * (1 - Math.min(Math.max(num(l.discount), 0), 100) / 100);
const isBlank = (l: Line) => !l.item && !l.description && !num(l.price);
/** Shows typed numbers with thousands separators once the field loses focus. */
const pretty = (s: string, decimals = 2) => (s.trim() === '' ? '' : num(s).toLocaleString('en-NG', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }));

const INVOICE_NO = 'INV-2026-0142';
const OPTIONAL_COLUMNS = [
  { key: 'type', label: 'Entry type' },
  { key: 'uom', label: 'Unit of measure' },
  { key: 'discount', label: 'Line discount' },
  { key: 'tax', label: 'Tax' },
  { key: 'location', label: 'Location' },
];

/* ------------------------------------------------------------------------------------------------
 * Quick-add modal (rule 1: add a missing value without leaving the screen)
 * ---------------------------------------------------------------------------------------------- */

function QuickAdd({ title, description, nameLabel, initial, extra, onSave, onClose }: { title: string; description: string; nameLabel: string; initial: string | null; extra?: ReactNode; onSave: (name: string) => void; onClose: () => void }) {
  const [name, setName] = useState(initial ?? '');
  return (
    <Modal
      open={initial !== null}
      onClose={onClose}
      closeOnBackdrop={false}
      title={title}
      description={description}
      footer={
        <>
          <Button variant="outline" leadingIcon={<CloseCircleIcon />} onClick={onClose}>Cancel</Button>
          <Button leadingIcon={<TickCircleIcon />} disabled={!name.trim()} onClick={() => onSave(name.trim())}>Save</Button>
        </>
      }
    >
      <Input label={nameLabel} required value={name} onChange={(e) => setName(e.target.value)} />
      {extra}
    </Modal>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------------------------------------- */

interface InvoiceProps {
  /** Start with sample lines filled in. */
  filled?: boolean;
  /** Start in another currency. */
  currency?: Currency;
}

function NewInvoicePage({ filled = false, currency: startCurrency = 'NGN' }: InvoiceProps) {
  const today = isoToday();
  const [customerList, setCustomerList] = useState(customerSeed);
  const [catalog, setCatalog] = useState(catalogSeed);
  const [projectList, setProjectList] = useState(projectSeed);

  const [customer, setCustomer] = useState<string | null>(filled ? customerSeed[2].id : null);
  const [invoiceDate, setInvoiceDate] = useState(today);
  const [terms, setTerms] = useState('net30');
  const [dueDate, setDueDate] = useState(addDays(today, 30));
  const [currency, setCurrency] = useState<Currency>(startCurrency);
  const [rate, setRate] = useState(String(currencies[startCurrency].rate));
  const [serviceRef, setServiceRef] = useState(filled ? 'SE-88412' : '');
  const [project, setProject] = useState<string | null>(filled ? projectSeed[0] && projectSeed[0].value : null);
  const [lines, setLines] = useState<Line[]>(() =>
    filled ? [lineFrom(catalogSeed[4], 3, currencies[startCurrency].rate), lineFrom(catalogSeed[5], 2, currencies[startCurrency].rate), { ...lineFrom(catalogSeed[1], 4, currencies[startCurrency].rate), discount: '10' }] : [blankLine()],
  );
  const [discountMode, setDiscountMode] = useState<'percent' | 'amount'>('percent');
  const [discount, setDiscount] = useState(filled ? '5' : '');
  const [extraTaxes, setExtraTaxes] = useState<string[]>(filled ? ['wht'] : []);
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState<UploadedFile[]>(filled ? [{ id: 'po', name: 'PO-ZF-2291.pdf', size: 248_000 }] : []);
  const [arAccount, setArAccount] = useState<string | null>('11000');
  const [revAccount, setRevAccount] = useState<string | null>('40000');
  const [view, setView] = useState<ColumnCustomizerValue>({ columns: ['type', 'uom', 'discount', 'tax'], options: [] });

  const [status, setStatus] = useState<'draft' | 'saved' | 'issued' | 'discarded'>('draft');
  const [errors, setErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState(false);
  const [quickCustomer, setQuickCustomer] = useState<string | null>(null);
  const [quickItem, setQuickItem] = useState<{ line: number; name: string } | null>(null);
  const [quickProject, setQuickProject] = useState<string | null>(null);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [confirm, setConfirm] = useState<null | 'clear' | 'discard'>(null);
  const [preview, setPreview] = useState(false);

  const locked = status === 'issued';
  const show = (k: string) => view.columns.includes(k);
  const ccy = currencies[currency];
  const rateNum = currency === 'NGN' ? 1 : num(rate);
  const cust = customerList.find((c) => c.id === customer);

  /* Totals: Balance due = Subtotal - Global discount + Taxes. Line taxes apply after the discount is spread across lines. */
  const totals = useMemo(() => {
    const subtotal = lines.reduce((s, l) => s + lineAmount(l), 0);
    const disc = Math.min(discountMode === 'percent' ? (subtotal * Math.min(num(discount), 100)) / 100 : num(discount), subtotal);
    const share = subtotal ? 1 - disc / subtotal : 1;
    const byTax: Record<string, number> = {};
    lines.forEach((l) => {
      const t = l.tax && lineTaxes[l.tax];
      if (t && t.rate) byTax[l.tax!] = (byTax[l.tax!] ?? 0) + lineAmount(l) * share * t.rate;
    });
    const taxable = subtotal - disc;
    const invTax = extraTaxes.map((k) => ({ key: k, label: invoiceTaxes[k].label, amount: taxable * invoiceTaxes[k].rate }));
    const taxes = Object.values(byTax).reduce((a, b) => a + b, 0) + invTax.reduce((a, b) => a + b.amount, 0);
    return { subtotal, disc, byTax, invTax, taxes, total: subtotal - disc + taxes };
  }, [lines, discount, discountMode, extraTaxes]);

  const touch = () => { setTouched(true); if (status === 'saved') setStatus('draft'); };
  const updateLine = (id: number, patch: Partial<Line>) => { touch(); setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l))); };
  const pickItem = (id: number, value: string) => {
    const c = catalog.find((x) => x.value === value);
    if (!c) return;
    updateLine(id, { item: value, description: c.description, uom: c.uom || null, price: priceIn(c.price, rateNum), tax: c.tax });
  };
  const changeTerms = (t: string) => {
    touch();
    setTerms(t);
    const d = paymentTerms.find((p) => p.value === t)!.days;
    if (d >= 0) setDueDate(addDays(invoiceDate, d));
  };
  const changeInvoiceDate = (v: string) => {
    touch();
    setInvoiceDate(v);
    const d = paymentTerms.find((p) => p.value === terms)!.days;
    if (d >= 0 && v) setDueDate(addDays(v, d));
  };
  // Changing currency converts the unit prices already entered at the old and new rates.
  const changeCurrency = (c: string) => {
    touch();
    const next = currencies[c as Currency].rate;
    const factor = rateNum / next;
    setLines((ls) => ls.map((l) => (l.price ? { ...l, price: pretty(String(num(l.price) * factor)) } : l)));
    setCurrency(c as Currency);
    setRate(String(next));
  };

  const validate = () => {
    const e: string[] = [];
    if (!customer) e.push('Choose a customer.');
    const real = lines.filter((l) => !isBlank(l));
    if (!real.length) e.push('Add at least one line item.');
    real.forEach((l, i) => {
      if (!l.item) e.push(`Line ${i + 1}: choose an item or account.`);
      if (num(l.qty) <= 0) e.push(`Line ${i + 1}: quantity must be more than 0.`);
    });
    if (dueDate && dueDate < invoiceDate) e.push('The due date is before the invoice date.');
    if (currency !== 'NGN' && rateNum <= 0) e.push('Enter an exchange rate above 0.');
    if (totals.total < 0) e.push('The balance due is negative. Check the discount and taxes.');
    setErrors(e);
    return e.length === 0;
  };
  const issue = () => { if (validate()) { setLines((ls) => ls.filter((l) => !isBlank(l))); setStatus('issued'); setPreview(false); } };
  const reset = () => {
    setCustomer(null); setInvoiceDate(today); setTerms('net30'); setDueDate(addDays(today, 30)); setCurrency('NGN'); setRate('1');
    setServiceRef(''); setProject(null); setLines([blankLine()]); setDiscount(''); setExtraTaxes([]); setNotes(''); setFiles([]);
    setErrors([]); setTouched(false);
  };

  const custOptions = customerList.map((c) => ({ value: c.id, label: c.name }));
  const itemOptions = (t: EntryType) => catalog.filter((c) => c.type === t).map((c) => ({ value: c.value, label: c.label }));
  const realLines = lines.filter((l) => !isBlank(l));
  const lineError = (l: Line) => errors.length > 0 && !isBlank(l) && !l.item;

  return (
    <Shell activeId="sales/invoices" breadcrumbs={[{ label: 'Sales', href: '#' }, { label: 'Invoices', href: '#' }, { label: locked ? INVOICE_NO : 'New Invoice' }]}>
      <PageHeader
        title={locked ? `Invoice ${INVOICE_NO}` : 'New Invoice'}
        description={locked ? `Issued to ${cust?.name} on ${longDate(invoiceDate)}` : `${INVOICE_NO} · Bill a customer for products, services or other income.`}
        back={{ label: 'Invoices', href: '#' }}
        actions={<StatusPill tone={locked ? 'info' : status === 'saved' ? 'neutral' : 'warning'}>{locked ? 'Awaiting Payment' : status === 'saved' ? 'Draft saved' : 'Draft'}</StatusPill>}
      />

      {status === 'discarded' && (
        <Alert tone="info" title="Invoice discarded" actions={<Button size="sm" variant="secondary" onClick={() => setStatus('draft')}>Start a new invoice</Button>}>
          In the app this returns to the Invoices list.
        </Alert>
      )}
      {locked && (
        <Alert
          tone="success"
          title={`${INVOICE_NO} issued to ${cust?.name}`}
          actions={<>
            <Button size="sm" variant="secondary" leadingIcon={<DownloadIcon />}>Download PDF</Button>
            <Button size="sm" leadingIcon={<MoneyReceiveIcon />}>Receive Payment</Button>
          </>}
        >
          Balance due {money(totals.total, currency)}, due {longDate(dueDate)}. The invoice has been posted and emailed to {cust?.email}.
        </Alert>
      )}
      {errors.length > 0 && !locked && (
        <Alert tone="error" title="Fix these before issuing the invoice" onDismiss={() => setErrors([])}>
          <ul className="list-disc pl-5">{errors.map((e) => <li key={e}>{e}</li>)}</ul>
        </Alert>
      )}

      {locked && (
        <InvoiceDocument
          customer={cust}
          invoiceDate={invoiceDate}
          dueDate={dueDate}
          terms={paymentTerms.find((p) => p.value === terms)?.label ?? ''}
          serviceRef={serviceRef}
          currency={currency}
          lines={realLines}
          catalog={catalog}
          totals={totals}
          notes={notes}
          draft={false}
          files={files}
        />
      )}
      {locked && (
        <div className="sticky -bottom-8 z-10 -mx-8 -mb-8 flex flex-wrap items-center justify-between gap-3 border-t border-line-subtle bg-surface px-8 py-4">
          <span className="font-sans text-sm text-fg-muted">Issued {longDate(invoiceDate)} · due {longDate(dueDate)}</span>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" leadingIcon={<DownloadIcon />}>Download PDF</Button>
            <Button variant="secondary" leadingIcon={<PlusIcon />} onClick={() => { reset(); setStatus('draft'); }}>New invoice</Button>
            <Button leadingIcon={<MoneyReceiveIcon />}>Receive Payment</Button>
          </div>
        </div>
      )}

      {status !== 'discarded' && !locked && (
        <>
          {/* Header fields ------------------------------------------------------------------- */}
          <Card
            title="Invoice details"
            actions={
              <div className="flex flex-col items-end">
                <span className="font-sans text-xs text-fg-muted">Balance due</span>
                <span className="font-sans text-xl font-bold text-fg-ink">{money(totals.total, currency)}</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="md:col-span-2">
                <Select
                  label="Customer"
                  required
                  placeholder="Search customers"
                  options={custOptions}
                  value={customer}
                  onChange={(v) => { touch(); setCustomer(v); }}
                  disabled={locked}
                  error={errors.length && !customer ? 'Choose a customer.' : undefined}
                  menuAction={{ label: 'Add New', onSelect: (q) => setQuickCustomer(q) }}
                />
              </div>
              <Input label="Invoice Date" required type="date" value={invoiceDate} onChange={(e) => changeInvoiceDate(e.target.value)} disabled={locked} />
              <Select label="Payment Terms" options={paymentTerms.map(({ value, label }) => ({ value, label }))} value={terms} onChange={changeTerms} searchable={false} disabled={locked} />
              <Input
                label="Due Date"
                required
                type="date"
                value={dueDate}
                min={invoiceDate}
                onChange={(e) => { touch(); setDueDate(e.target.value); setTerms('custom'); }}
                hint={terms === 'custom' ? 'Set by hand' : `From ${paymentTerms.find((p) => p.value === terms)?.label}`}
                disabled={locked}
              />
              <Select label="Currency" options={(Object.keys(currencies) as Currency[]).map((k) => ({ value: k, label: currencies[k].label }))} value={currency} onChange={changeCurrency} disabled={locked} />
              <Input
                label="Exchange Rate"
                inputMode="decimal"
                value={currency === 'NGN' ? '1' : rate}
                onChange={(e) => { touch(); setRate(e.target.value); }}
                readOnly={currency === 'NGN'}
                disabled={locked}
                hint={currency === 'NGN' ? 'Base currency' : `1 ${currency} = ₦ ${num(rate).toLocaleString('en-NG')}`}
              />
              <Input label="Service Entry Ref." placeholder="Optional, e.g. order or service no." value={serviceRef} onChange={(e) => { touch(); setServiceRef(e.target.value); }} disabled={locked} />
              <div className="md:col-span-2">
              <Select
                label="Project"
                placeholder="No project"
                options={projectList}
                value={project}
                onChange={(v) => { touch(); setProject(v); }}
                disabled={locked}
                hint="Optional. Counts this income towards the project's profitability."
                menuAction={{ label: 'Add New', onSelect: (q) => setQuickProject(q) }}
              />
              </div>
            </div>
            {cust && (
              <div className="flex flex-wrap items-center gap-x-10 gap-y-3 rounded-lg bg-surface-page px-4 py-3">
                <AvatarLabel name={cust.name} description={cust.email} />
                <div className="flex flex-col"><span className="font-sans text-xs text-fg-muted">Company</span><span className="font-sans text-sm text-fg-ink">{cust.company}</span></div>
                <div className="flex flex-col"><span className="font-sans text-xs text-fg-muted">Phone</span><span className="font-sans text-sm text-fg-ink">{cust.phone}</span></div>
                <div className="flex flex-col"><span className="font-sans text-xs text-fg-muted">Outstanding receivables</span><span className="font-sans text-sm font-medium text-fg-ink">{cust.receivables}</span></div>
              </div>
            )}
          </Card>

          {/* Line items ------------------------------------------------------------------------ */}
          <Card
            title="Line items"
            description={`${realLines.length} line${realLines.length === 1 ? '' : 's'} · amounts in ${currency}`}
            actions={!locked && <ColumnCustomizer label="Customize Invoice" variant="secondary" columns={OPTIONAL_COLUMNS} value={view} onChange={setView} />}
          >
            <div className="-mx-6">
            <Table aria-label="Invoice lines" className="min-w-line-grid table-fixed">
              <TableHead>
                <tr>
                  <TableHeaderCell compact className="w-control-md">#</TableHeaderCell>
                  {show('type') && <TableHeaderCell compact className="w-col-md">Type</TableHeaderCell>}
                  <TableHeaderCell compact>Item &amp; description</TableHeaderCell>
                  <TableHeaderCell compact className="w-col-sm" align="right">Qty</TableHeaderCell>
                  {show('uom') && <TableHeaderCell compact className="w-col-sm">UoM</TableHeaderCell>}
                  <TableHeaderCell compact className="w-col-md" align="right">Unit price</TableHeaderCell>
                  {show('discount') && <TableHeaderCell compact className="w-col-sm" align="right">Disc. %</TableHeaderCell>}
                  {show('tax') && <TableHeaderCell compact className="w-col-md">Tax</TableHeaderCell>}
                  {show('location') && <TableHeaderCell compact className="w-col-md">Location</TableHeaderCell>}
                  <TableHeaderCell compact className="w-col-md" align="right">Amount</TableHeaderCell>
                  {!locked && <TableHeaderCell compact className="w-control-md"><span className="sr-only">Remove</span></TableHeaderCell>}
                </tr>
              </TableHead>
              <TableBody>
                {lines.map((l, i) => {
                  const n = i + 1;
                  return (
                    <TableRow key={l.id} className="align-top">
                      <TableCell compact className="pt-4 text-fg-muted">{n}</TableCell>
                      {show('type') && (
                        <TableCell compact>
                          <Select aria-label={`Entry type, line ${n}`} size="sm" options={entryTypes} value={l.type} searchable={false} disabled={locked}
                            onChange={(v) => updateLine(l.id, { type: v as EntryType, item: null, description: '', price: '', uom: null })} />
                        </TableCell>
                      )}
                      <TableCell compact className="whitespace-normal">
                        <div className="flex flex-col gap-1.5">
                          <Select
                            aria-label={`Item, line ${n}`}
                            size="sm"
                            placeholder={l.type === 'gl' ? 'Search accounts' : l.type === 'service' ? 'Search services' : 'Search products'}
                            options={itemOptions(l.type)}
                            value={l.item}
                            onChange={(v) => pickItem(l.id, v)}
                            disabled={locked}
                            error={lineError(l) ? 'Required' : undefined}
                            menuAction={l.type === 'gl' ? undefined : { label: 'Add New', onSelect: (q) => setQuickItem({ line: l.id, name: q }) }}
                          />
                          <Input aria-label={`Description, line ${n}`} size="sm" placeholder="Description" value={l.description} disabled={locked} onChange={(e) => updateLine(l.id, { description: e.target.value })} />
                        </div>
                      </TableCell>
                      <TableCell compact>
                        <Input aria-label={`Quantity, line ${n}`} size="sm" inputMode="decimal" className="text-right" value={l.qty} disabled={locked} onChange={(e) => updateLine(l.id, { qty: e.target.value })} />
                      </TableCell>
                      {show('uom') && (
                        <TableCell compact>
                          <Select aria-label={`Unit of measure, line ${n}`} size="sm" placeholder="-" options={uoms} value={l.uom} disabled={locked} onChange={(v) => updateLine(l.id, { uom: v })} />
                        </TableCell>
                      )}
                      <TableCell compact>
                        <Input aria-label={`Unit price, line ${n}`} size="sm" inputMode="decimal" className="text-right" placeholder="0.00" value={l.price} disabled={locked} onChange={(e) => updateLine(l.id, { price: e.target.value })} onBlur={() => updateLine(l.id, { price: pretty(l.price) })} />
                      </TableCell>
                      {show('discount') && (
                        <TableCell compact>
                          <Input aria-label={`Discount percent, line ${n}`} size="sm" inputMode="decimal" className="text-right" placeholder="0" value={l.discount} disabled={locked} onChange={(e) => updateLine(l.id, { discount: e.target.value })} />
                        </TableCell>
                      )}
                      {show('tax') && (
                        <TableCell compact>
                          <Select aria-label={`Tax, line ${n}`} size="sm" options={Object.entries(lineTaxes).map(([value, t]) => ({ value, label: t.label }))} value={l.tax} searchable={false} disabled={locked} onChange={(v) => updateLine(l.id, { tax: v })} />
                        </TableCell>
                      )}
                      {show('location') && (
                        <TableCell compact>
                          <Select aria-label={`Location, line ${n}`} size="sm" placeholder="Any" options={locations} value={l.location} disabled={locked} onChange={(v) => updateLine(l.id, { location: v })} />
                        </TableCell>
                      )}
                      <TableCell compact align="right" emphasis="strong" className="pt-4">{money(lineAmount(l), currency)}</TableCell>
                      {!locked && (
                        <TableCell compact className="pt-2.5">
                          <Button variant="tertiary" size="sm" iconOnly aria-label={`Remove line ${n}`} className="text-error"
                            onClick={() => { touch(); setLines((ls) => (ls.length === 1 ? [blankLine()] : ls.filter((x) => x.id !== l.id))); }}>
                            <TrashIcon />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            </div>
            {!locked && (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" leadingIcon={<PlusIcon />} onClick={() => { touch(); setLines((ls) => [...ls, blankLine(ls[ls.length - 1]?.type)]); }}>Add line</Button>
                  <Button variant="secondary" leadingIcon={<CopyPlusIcon />} onClick={() => setBulkOpen(true)}>Add multiple items</Button>
                </div>
                <Button variant="destructive" leadingIcon={<CloseCircleIcon />} disabled={!realLines.length} onClick={() => setConfirm('clear')}>Clear all lines</Button>
              </div>
            )}
          </Card>

          {/* Notes, attachments, accounting + totals -------------------------------------------- */}
          <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
            <div className="flex flex-col gap-6 xl:col-span-2">
              <Card title="Notes & attachments">
                <RichTextField
                  label="Customer notes"
                  placeholder="Payment instructions, terms or a thank-you note. The customer sees this on the invoice."
                  onChange={(h) => { touch(); setNotes(h); }}
                  disabled={locked}
                  hint="Shown on the invoice and in the email to the customer."
                />
                <FileUpload label="Attachments" files={files} onFilesChange={(f) => { touch(); setFiles(f); }} accept=".pdf,.png,.jpg,.jpeg,.docx,.xlsx" hint="PDF, images, Word or Excel · up to 10 MB each" disabled={locked} />
              </Card>
              <Accordion>
                <AccordionItem title="Accounting details" meta={<span className="font-sans text-xs font-regular text-fg-muted">Override default posting accounts</span>}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Select label="Accounts Receivable" options={arAccounts} value={arAccount} onChange={setArAccount} disabled={locked} />
                    <Select label="Sales Revenue" options={revenueAccounts} value={revAccount} onChange={setRevAccount} disabled={locked} />
                  </div>
                </AccordionItem>
              </Accordion>
            </div>

            <Card title="Summary" className="xl:sticky xl:top-0">
              <dl className="flex flex-col gap-3 font-sans text-sm">
                <div className="flex justify-between gap-4"><dt className="text-fg-muted">Subtotal</dt><dd className="font-medium text-fg-ink">{money(totals.subtotal, currency)}</dd></div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-fg-muted">Discount</dt>
                    <dd className="font-medium text-error">{totals.disc ? `− ${money(totals.disc, currency)}` : money(0, currency)}</dd>
                  </div>
                  {!locked && (
                    <div className="flex items-center gap-2">
                      <SegmentedControl appearance="boxed" aria-label="Discount type" value={discountMode} onChange={(v) => { touch(); setDiscountMode(v as 'percent' | 'amount'); }}
                        options={[{ value: 'percent', label: '%' }, { value: 'amount', label: ccy.symbol }]} />
                      <Input aria-label="Invoice discount" size="sm" inputMode="decimal" placeholder="0" value={discount} onChange={(e) => { touch(); setDiscount(e.target.value); }} />
                    </div>
                  )}
                </div>
                {Object.entries(totals.byTax).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4"><dt className="text-fg-muted">{lineTaxes[k].label} <span className="text-xs">(lines)</span></dt><dd className="font-medium text-fg-ink">{money(v, currency)}</dd></div>
                ))}
                {totals.invTax.map((t) => (
                  <div key={t.key} className="flex items-center justify-between gap-4">
                    <dt className="flex items-center gap-1 text-fg-muted">
                      {t.label}
                      {!locked && (
                        <button type="button" aria-label={`Remove ${t.label}`} onClick={() => { touch(); setExtraTaxes(extraTaxes.filter((x) => x !== t.key)); }} className="inline-flex size-5 items-center justify-center rounded-sm text-fg-muted hover:text-error focus-visible:outline-none focus-visible:shadow-focus">
                          <span className="size-icon-xs"><CloseCircleIcon /></span>
                        </button>
                      )}
                    </dt>
                    <dd className={t.amount < 0 ? 'font-medium text-error' : 'font-medium text-fg-ink'}>{t.amount < 0 ? `− ${money(-t.amount, currency)}` : money(t.amount, currency)}</dd>
                  </div>
                ))}
                {!locked && Object.keys(invoiceTaxes).some((k) => !extraTaxes.includes(k)) && (
                  <Select
                    aria-label="Add tax"
                    size="sm"
                    placeholder="+ Add tax or charge"
                    searchable={false}
                    value={null}
                    options={Object.entries(invoiceTaxes).filter(([k]) => !extraTaxes.includes(k)).map(([value, t]) => ({ value, label: t.label }))}
                    onChange={(v) => { touch(); setExtraTaxes([...extraTaxes, v]); }}
                  />
                )}
                <div className="flex justify-between gap-4 border-t border-line-subtle pt-3"><dt className="text-fg-muted">Total</dt><dd className="font-semibold text-fg-ink">{money(totals.total, currency)}</dd></div>
              </dl>
              <div className="flex flex-col gap-1 rounded-lg bg-primary-muted px-4 py-3">
                <span className="font-sans text-xs font-medium text-primary">Balance due</span>
                <span className="font-sans text-xl font-bold text-primary">{money(totals.total, currency)}</span>
                {currency !== 'NGN' && <span className="font-sans text-xs text-fg-muted">≈ {money(totals.total * rateNum, 'NGN')} at 1 {currency} = ₦ {rateNum.toLocaleString('en-NG')}</span>}
                <span className="font-sans text-xs text-fg-muted">Due {longDate(dueDate)}</span>
              </div>
            </Card>
          </div>

          {/* Sticky action bar ------------------------------------------------------------------ */}
          <div className="sticky -bottom-8 z-10 -mx-8 -mb-8 flex flex-wrap items-center justify-between gap-3 border-t border-line-subtle bg-surface px-8 py-4">
            <Button variant="outline" leadingIcon={<CloseCircleIcon />} onClick={() => (touched ? setConfirm('discard') : setStatus('discarded'))}>Discard</Button>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="mr-2 font-sans text-sm text-fg-muted">Balance due <strong className="text-fg-ink">{money(totals.total, currency)}</strong></span>
                  <Button variant="secondary" leadingIcon={<SaveIcon />} onClick={() => { setStatus('saved'); setTouched(false); }}>Save draft</Button>
                  <Button variant="secondary" leadingIcon={<EyeIcon />} onClick={() => setPreview(true)}>Preview</Button>
                  <Button leadingIcon={<SendIcon />} onClick={issue}>Issue Invoice</Button>
                </div>
          </div>
        </>
      )}

      {/* Modals --------------------------------------------------------------------------------- */}
      {quickCustomer !== null && (
        <QuickAdd
          title="New Customer"
          description="Only the essentials. Add billing details later in Sales › Customers."
          nameLabel="Display Name"
          initial={quickCustomer}
          extra={<Input label="Email" type="email" />}
          onClose={() => setQuickCustomer(null)}
          onSave={(name) => {
            const id = `CUS-${Date.now()}`;
            setCustomerList([...customerList, { id, name, company: name, email: '-', phone: '-', receivables: '₦ 0.00', type: 'Business' }]);
            setCustomer(id);
            setQuickCustomer(null);
          }}
        />
      )}
      {quickItem && (
        <QuickAdd
          title="New Item"
          description="Create the item now; stock and accounts can be set up in Inventory › Items."
          nameLabel="Item Name"
          initial={quickItem.name}
          onClose={() => setQuickItem(null)}
          onSave={(name) => {
            const type = lines.find((l) => l.id === quickItem.line)?.type ?? 'product';
            const c: CatalogItem = { value: `new-${Date.now()}`, label: name, type, description: '', uom: 'unit', price: 0, tax: 'vat' };
            setCatalog([...catalog, c]);
            updateLine(quickItem.line, { item: c.value, uom: 'unit', tax: 'vat' });
            setQuickItem(null);
          }}
        />
      )}
      {quickProject !== null && (
        <QuickAdd title="New Project" description="Set budgets and tasks later in Projects." nameLabel="Project Name" initial={quickProject}
          onClose={() => setQuickProject(null)}
          onSave={(name) => { const v = `PRJ-NEW · ${name}`; setProjectList([...projectList, { value: v, label: v }]); setProject(v); setQuickProject(null); }} />
      )}
      {bulkOpen && <BulkAdd catalog={catalog} onClose={() => setBulkOpen(false)} onAdd={(items) => { touch(); setLines((ls) => [...ls.filter((l) => !isBlank(l)), ...items.map((c) => lineFrom(c, 1, rateNum))]); setBulkOpen(false); }} />}
      <Modal
        open={confirm !== null}
        onClose={() => setConfirm(null)}
        closeOnBackdrop={false}
        title={confirm === 'clear' ? 'Clear all lines?' : 'Discard this invoice?'}
        description={confirm === 'clear' ? `This removes all ${realLines.length} lines. You can add them again.` : 'Everything you entered is lost. This can’t be undone.'}
        footer={<>
          <Button variant="outline" leadingIcon={<CloseCircleIcon />} onClick={() => setConfirm(null)}>{confirm === 'clear' ? 'Keep lines' : 'Keep editing'}</Button>
          <Button variant="destructive" leadingIcon={<TrashIcon />} onClick={() => { if (confirm === 'clear') { setLines([blankLine()]); touch(); } else { reset(); setStatus('discarded'); } setConfirm(null); }}>
            {confirm === 'clear' ? 'Clear all lines' : 'Discard invoice'}
          </Button>
        </>}
      />
      <Modal
        open={preview}
        onClose={() => setPreview(false)}
        size="lg"
        title={locked ? `Invoice ${INVOICE_NO}` : 'Preview'}
        description={locked ? undefined : 'This is how the customer will see the invoice. Nothing is sent until you issue it.'}
        footer={<>
          <Button variant="outline" leadingIcon={<CloseCircleIcon />} onClick={() => setPreview(false)}>Close</Button>
          <Button variant="secondary" leadingIcon={<DownloadIcon />}>Download PDF</Button>
          {!locked && <Button leadingIcon={<SendIcon />} onClick={issue}>Issue Invoice</Button>}
        </>}
      >
        <InvoiceDocument
          customer={cust}
          invoiceDate={invoiceDate}
          dueDate={dueDate}
          terms={paymentTerms.find((p) => p.value === terms)?.label ?? ''}
          serviceRef={serviceRef}
          currency={currency}
          lines={realLines}
          catalog={catalog}
          totals={totals}
          notes={notes}
          draft={!locked}
        />
      </Modal>
    </Shell>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Bulk add: pick several items at once
 * ---------------------------------------------------------------------------------------------- */

function BulkAdd({ catalog, onAdd, onClose }: { catalog: CatalogItem[]; onAdd: (items: CatalogItem[]) => void; onClose: () => void }) {
  const [picked, setPicked] = useState<string[]>([]);
  const [q, setQ] = useState('');
  const list = catalog.filter((c) => c.type !== 'gl' && c.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <Modal
      open
      onClose={onClose}
      size="lg"
      title="Add multiple items"
      description="Tick the products and services to add. Each becomes a line with quantity 1."
      footer={<>
        <Button variant="outline" leadingIcon={<CloseCircleIcon />} onClick={onClose}>Cancel</Button>
        <Button leadingIcon={<PlusIcon />} disabled={!picked.length} onClick={() => onAdd(catalog.filter((c) => picked.includes(c.value)))}>
          {picked.length ? `Add ${picked.length} item${picked.length === 1 ? '' : 's'}` : 'Add items'}
        </Button>
      </>}
    >
      <Input aria-label="Search items" placeholder="Search products and services" leadingIcon={<SearchIcon />} value={q} onChange={(e) => setQ(e.target.value)} />
      <Table aria-label="Items">
        <TableHead>
          <tr><TableHeaderCell className="w-checkbox"><span className="sr-only">Select</span></TableHeaderCell><TableHeaderCell>Item</TableHeaderCell><TableHeaderCell>Type</TableHeaderCell><TableHeaderCell>UoM</TableHeaderCell><TableHeaderCell align="right">Unit price</TableHeaderCell></tr>
        </TableHead>
        <TableBody>
          {list.map((c) => {
            const on = picked.includes(c.value);
            return (
              <TableRow key={c.value} selected={on} interactive onClick={() => setPicked(on ? picked.filter((x) => x !== c.value) : [...picked, c.value])}>
                <TableCell><span className="flex" onClick={(e) => e.stopPropagation()}><Checkbox aria-label={`Select ${c.label}`} checked={on} onChange={() => setPicked(on ? picked.filter((x) => x !== c.value) : [...picked, c.value])} /></span></TableCell>
                <TableCell emphasis="strong">{c.label}</TableCell>
                <TableCell className="capitalize">{c.type}</TableCell>
                <TableCell>{c.uom}</TableCell>
                <TableCell align="right">{money(c.price, 'NGN')}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Modal>
  );
}

/* ------------------------------------------------------------------------------------------------
 * The document as the customer sees it (Preview)
 * ---------------------------------------------------------------------------------------------- */

function InvoiceDocument({ customer, invoiceDate, dueDate, terms, serviceRef, currency, lines, catalog, totals, notes, draft, files = [] }: {
  customer?: (typeof customerSeed)[number]; invoiceDate: string; dueDate: string; terms: string; serviceRef: string; currency: Currency;
  lines: Line[]; catalog: CatalogItem[]; totals: { subtotal: number; disc: number; byTax: Record<string, number>; invTax: { key: string; label: string; amount: number }[]; total: number };
  notes: string; draft: boolean; files?: UploadedFile[];
}) {
  const label = (v: string | null) => catalog.find((c) => c.value === v)?.label ?? '-';
  return (
    <article className="flex flex-col gap-6 rounded-lg border border-line-subtle bg-surface p-8 font-sans text-sm text-fg">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="text-xs text-fg-muted">Wragby Business Solutions · 12 Admiralty Way, Lekki, Lagos · billing@wragby.com</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xl font-bold text-fg-ink">INVOICE</span>
          <span className="text-fg-muted">{INVOICE_NO}</span>
          {draft && <StatusPill tone="warning">Draft</StatusPill>}
        </div>
      </header>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <div className="col-span-2 flex flex-col gap-0.5">
          <span className="text-xs text-fg-muted">Bill to</span>
          <span className="font-semibold text-fg-ink">{customer?.name ?? 'No customer selected'}</span>
          {customer && <><span>{customer.company}</span><span>{customer.email}</span></>}
        </div>
        <div className="flex flex-col gap-0.5"><span className="text-xs text-fg-muted">Invoice date</span><span className="text-fg-ink">{longDate(invoiceDate)}</span><span className="mt-2 text-xs text-fg-muted">Terms</span><span className="text-fg-ink">{terms}</span></div>
        <div className="flex flex-col gap-0.5"><span className="text-xs text-fg-muted">Due date</span><span className="text-fg-ink">{longDate(dueDate)}</span>{serviceRef && <><span className="mt-2 text-xs text-fg-muted">Reference</span><span className="text-fg-ink">{serviceRef}</span></>}</div>
      </div>
      <Table aria-label="Invoice lines preview">
        <TableHead>
          <tr><TableHeaderCell>Item</TableHeaderCell><TableHeaderCell align="right">Qty</TableHeaderCell><TableHeaderCell align="right">Unit price</TableHeaderCell><TableHeaderCell align="right">Disc.</TableHeaderCell><TableHeaderCell align="right">Amount</TableHeaderCell></tr>
        </TableHead>
        <TableBody>
          {lines.length ? lines.map((l) => (
            <TableRow key={l.id}>
              <TableCell className="whitespace-normal"><span className="flex flex-col"><span className="font-medium text-fg-ink">{label(l.item)}</span>{l.description && <span className="text-xs text-fg-muted">{l.description}</span>}</span></TableCell>
              <TableCell align="right">{l.qty} {l.uom ?? ''}</TableCell>
              <TableCell align="right">{money(num(l.price), currency)}</TableCell>
              <TableCell align="right">{num(l.discount) ? `${num(l.discount)}%` : '-'}</TableCell>
              <TableCell align="right" emphasis="strong">{money(lineAmount(l), currency)}</TableCell>
            </TableRow>
          )) : <TableRow><TableCell colSpan={5} className="text-center">No lines yet</TableCell></TableRow>}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <dl className="flex w-full max-w-field flex-col gap-2">
          <div className="flex justify-between"><dt className="text-fg-muted">Subtotal</dt><dd>{money(totals.subtotal, currency)}</dd></div>
          {totals.disc > 0 && <div className="flex justify-between"><dt className="text-fg-muted">Discount</dt><dd>− {money(totals.disc, currency)}</dd></div>}
          {Object.entries(totals.byTax).map(([k, v]) => <div key={k} className="flex justify-between"><dt className="text-fg-muted">{lineTaxes[k].label}</dt><dd>{money(v, currency)}</dd></div>)}
          {totals.invTax.map((t) => <div key={t.key} className="flex justify-between"><dt className="text-fg-muted">{t.label}</dt><dd>{t.amount < 0 ? `− ${money(-t.amount, currency)}` : money(t.amount, currency)}</dd></div>)}
          <div className="flex justify-between border-t border-line-subtle pt-2 text-md font-bold text-fg-ink"><dt>Balance due</dt><dd>{money(totals.total, currency)}</dd></div>
        </dl>
      </div>
      {notes && (
        <section className="flex flex-col gap-1 border-t border-line-subtle pt-4">
          <span className="text-xs text-fg-muted">Notes</span>
          {/* Story only: in the app, sanitise rich text before rendering it. */}
          <div className="wbiz-rich" dangerouslySetInnerHTML={{ __html: notes }} />
        </section>
      )}
      {files.length > 0 && (
        <section className="flex flex-col gap-1 border-t border-line-subtle pt-4">
          <span className="text-xs text-fg-muted">Attachments</span>
          <ul className="flex flex-wrap gap-2">{files.map((f) => <li key={f.id} className="rounded-md bg-surface-muted px-2 py-1 text-xs text-fg">{f.name}</li>)}</ul>
        </section>
      )}
    </article>
  );
}

/* ------------------------------------------------------------------------------------------------ */

const meta = {
  title: 'Patterns/New Invoice',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Invoice creation page built from library components and the UI rules. It is a full page, not a side panel: documents with line items are the ' +
          'exception in proposal B1. Customer, item and project dropdowns are searchable with quick-add modals (rule 1); payment terms set the due date; ' +
          'the line grid adds, edits, bulk-adds and clears lines; totals follow Subtotal − Discount + Taxes; Preview opens a large centred modal; ' +
          'Discard and Clear all lines ask first (rule 5); Issue validates and locks the invoice.',
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

/** Empty new invoice: today's date, Net 30, NGN at rate 1, one blank line. */
export const New: Story = { render: () => <NewInvoicePage /> };
/** Filled in: customer, three lines (one with a line discount), 5% invoice discount, withholding tax and an attachment. */
export const FilledIn: Story = { render: () => <NewInvoicePage filled /> };
/** A US-dollar invoice: amounts in USD with the naira equivalent under the balance due. */
export const ForeignCurrency: Story = { render: () => <NewInvoicePage filled currency="USD" /> };
