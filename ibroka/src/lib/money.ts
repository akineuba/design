/** Naira formatting helpers shared by MoneyDisplay, MoneyInput, SummaryCard and tables. */
export type Currency = 'NGN' | 'USD' | 'GBP' | 'EUR';

const SYMBOL: Record<Currency, string> = { NGN: '₦', USD: '$', GBP: '£', EUR: '€' };

export function currencySymbol(currency: Currency = 'NGN'): string {
  return SYMBOL[currency];
}

/** Full amount with two decimals: ₦3,000,000.00. Negative values get a leading minus: -₦17,500.00 */
export function formatMoney(amount: number, currency: Currency = 'NGN', decimals = 2): string {
  const abs = Math.abs(amount).toLocaleString('en-NG', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${amount < 0 ? '-' : ''}${SYMBOL[currency]}${abs}`;
}

/** Shortened amount for summary cards and chart axes: ₦15.2M, ₦980K, ₦1.4B */
export function formatMoneyShort(amount: number, currency: Currency = 'NGN'): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';
  const units: Array<[number, string]> = [
    [1e12, 'T'],
    [1e9, 'B'],
    [1e6, 'M'],
    [1e3, 'K'],
  ];
  for (const [n, u] of units) {
    if (abs >= n) {
      const v = abs / n;
      return `${sign}${SYMBOL[currency]}${v.toLocaleString('en-NG', { maximumFractionDigits: v < 10 ? 1 : 0 })}${u}`;
    }
  }
  return `${sign}${SYMBOL[currency]}${abs.toLocaleString('en-NG')}`;
}

/** Plain count with thousands separators: 3,232 */
export function formatCount(n: number): string {
  return n.toLocaleString('en-NG');
}

/** Table date: 18 Jul 2026. Heading date: 18 July 2026 (wBiz proposal B3). */
export function formatDate(d: Date | string, style: 'table' | 'heading' = 'table'): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: style === 'table' ? 'short' : 'long',
    year: 'numeric',
  });
}

/** Whole days from today to the date. Negative when it has passed. */
export function daysUntil(d: Date | string, today: Date = new Date()): number {
  const date = typeof d === 'string' ? new Date(d) : d;
  const a = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const b = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((a - b) / 86_400_000);
}
