// Story-only catalogue and rules for the New Invoice page.
export type EntryType = 'product' | 'service' | 'gl';
export type Currency = 'NGN' | 'USD' | 'GBP' | 'EUR';

export interface CatalogItem {
  value: string;
  label: string;
  type: EntryType;
  description: string;
  uom: string;
  price: number;
  tax: string;
}

export const entryTypes = [
  { value: 'product', label: 'Product' },
  { value: 'service', label: 'Service' },
  { value: 'gl', label: 'GL Account' },
];

export const catalog: CatalogItem[] = [
  { value: 'itm-paper', label: 'A4 Paper (80gsm)', type: 'product', description: 'A4 copier paper, 80gsm, 500 sheets per ream', uom: 'ream', price: 6_500, tax: 'vat' },
  { value: 'itm-toner', label: 'HP LaserJet Toner 305A', type: 'product', description: 'Original HP toner cartridge, black', uom: 'unit', price: 85_000, tax: 'vat' },
  { value: 'itm-chair', label: 'Office Chair (Ergonomic)', type: 'product', description: 'Mesh back, adjustable arms and lumbar support', uom: 'unit', price: 145_000, tax: 'vat' },
  { value: 'svc-support', label: 'IT Support', type: 'service', description: 'On-site technical support', uom: 'hour', price: 25_000, tax: 'vat' },
  { value: 'svc-impl', label: 'Software Implementation', type: 'service', description: 'wBizManager implementation and configuration', uom: 'day', price: 350_000, tax: 'vat' },
  { value: 'svc-training', label: 'Staff Training', type: 'service', description: 'Half-day training session, up to 15 staff', uom: 'session', price: 120_000, tax: 'exempt' },
  { value: 'gl-4001', label: '4001 · Sales Revenue', type: 'gl', description: '', uom: '', price: 0, tax: 'vat' },
  { value: 'gl-4100', label: '4100 · Consulting Income', type: 'gl', description: '', uom: '', price: 0, tax: 'vat' },
  { value: 'gl-4200', label: '4200 · Other Income', type: 'gl', description: '', uom: '', price: 0, tax: 'exempt' },
];

export const uoms = ['unit', 'ream', 'hour', 'day', 'session', 'kg', 'litre', 'box'].map((u) => ({ value: u, label: u }));

/** Per-line taxes. */
export const lineTaxes: Record<string, { label: string; rate: number }> = {
  vat: { label: 'VAT 7.5%', rate: 0.075 },
  exempt: { label: 'Exempt', rate: 0 },
};

/** Invoice-level taxes. A negative rate is withheld from the total. */
export const invoiceTaxes: Record<string, { label: string; rate: number }> = {
  wht: { label: 'Withholding tax 5%', rate: -0.05 },
  service: { label: 'Service charge 10%', rate: 0.1 },
  stamp: { label: 'Stamp duty 0.5%', rate: 0.005 },
};

export const paymentTerms = [
  { value: 'receipt', label: 'Due on Receipt', days: 0 },
  { value: 'net7', label: 'Net 7', days: 7 },
  { value: 'net15', label: 'Net 15', days: 15 },
  { value: 'net30', label: 'Net 30', days: 30 },
  { value: 'net45', label: 'Net 45', days: 45 },
  { value: 'net60', label: 'Net 60', days: 60 },
  { value: 'custom', label: 'Custom', days: -1 },
];

export const currencies: Record<Currency, { label: string; symbol: string; rate: number }> = {
  NGN: { label: 'NGN · Nigerian Naira', symbol: '₦', rate: 1 },
  USD: { label: 'USD · US Dollar', symbol: '$', rate: 1_580 },
  GBP: { label: 'GBP · Pound Sterling', symbol: '£', rate: 2_010 },
  EUR: { label: 'EUR · Euro', symbol: '€', rate: 1_710 },
};

export const locations = ['Head Office (Lagos)', 'Ikeja Warehouse', 'Abuja Branch', 'Port Harcourt Depot'].map((l) => ({ value: l, label: l }));
export const projects = ['PRJ-014 · ERP Rollout, Zenith Foods', 'PRJ-019 · Network Upgrade', 'PRJ-022 · Annual Support 2026'].map((p) => ({ value: p, label: p }));
export const arAccounts = [{ value: '11000', label: '11000 · Accounts Receivable' }, { value: '11010', label: '11010 · Accounts Receivable (Foreign)' }];
export const revenueAccounts = [{ value: '40000', label: '40000 · Sales Revenue' }, { value: '41000', label: '41000 · Service Revenue' }];

export const money = (n: number, ccy: Currency) =>
  `${currencies[ccy].symbol} ${n.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const isoToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const addDays = (iso: string, days: number) => {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d + days);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
};

export const longDate = (iso: string) => {
  if (!iso) return '-';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};
