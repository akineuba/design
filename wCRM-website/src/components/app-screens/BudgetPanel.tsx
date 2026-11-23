import { ProgressBar } from '@ds';

/*
 * Second panel for the Budgets app shot, under BudgetScreen (which is 400px tall) so the page fills its AppFrame.
 * Not in Figma; design-system ProgressBar rows. Figures are the three allocations from BudgetScreen.
 */
const ROWS: { label: string; value: number; valueLabel: string; tone: 'success' | 'warning' }[] = [
  { label: 'tmb · ₦3,000,000 achieved of ₦3,000,000', value: 100, valueLabel: '100%', tone: 'success' },
  { label: 'Test · ₦52,500,000 achieved of ₦50,000,000', value: 100, valueLabel: '105%', tone: 'success' },
  { label: 'Artificial Intelligence · ₦10,300,000 achieved of ₦100,000,000', value: 10, valueLabel: '10%', tone: 'warning' },
];

export function BudgetPanel() {
  return (
    <div className="absolute flex flex-col gap-5 rounded-callout bg-surface-default p-6 shadow-sm" style={{ left: 38, top: 420, width: 1322, height: 250 }}>
      <span className="flex items-center justify-between">
        <span className="text-site-body-lg font-semibold text-text-primary">Achievement by practice area</span>
        <span className="text-caption text-text-secondary">FY 2026 · from closed deals</span>
      </span>
      {ROWS.map((r) => (
        <ProgressBar key={r.label} label={r.label} value={r.value} valueLabel={r.valueLabel} tone={r.tone} />
      ))}
    </div>
  );
}
