/** JS mirror of tokens.css, for docs and for code that can't read CSS variables. */

export const colorGroups = {
  Brand: {
    'brand-navy': '#121F4B',
    'brand-red': '#E8001B',
  },
  Primary: {
    primary: '#0070FF',
    'primary-hover': '#0062E0',
    'primary-active': '#0055C2',
    'primary-subtle': '#EBF3FE',
    'primary-soft': '#F0F4FF',
    'primary-border': '#B8D4FF',
  },
  Text: {
    'fg-ink': '#0F172A',
    'fg-strong': '#1E293B',
    fg: '#334155',
    'fg-subtle': '#475569',
    'fg-muted': '#64748B',
    'fg-faint': '#94A3B8',
    'fg-disabled': '#CBD5E1',
  },
  'Lines & surfaces': {
    'line-subtle': '#F1F5F9',
    line: '#E2E8F0',
    'line-strong': '#CBD5E1',
    'line-field': '#D5DCE5',
    surface: '#FFFFFF',
    'surface-page': '#FCFCFD',
    'surface-inset': '#F8FAFC',
    'surface-control': '#F1F5F9',
    'surface-sunken': '#F4F5F7',
  },
  'Status (shared with ERP)': {
    success: '#00C167',
    error: '#FF2E3B',
    warning: '#D1C700',
    'warning-strong': '#FF9500',
    info: '#0070FF',
    neutral: '#667085',
    danger: '#E81E25',
  },
} as const;

export const typeScale = [
  { token: '5xl', px: 32, weight: 700, use: 'Hero numbers, sign-in heading' },
  { token: '4xl', px: 28, weight: 700, use: 'Page title, stat values' },
  { token: '3xl', px: 24, weight: 700, use: 'Prices, result titles' },
  { token: '2xl', px: 20, weight: 700, use: 'Dialog / panel titles' },
  { token: 'xl', px: 18, weight: 700, use: 'Card titles, accordion titles' },
  { token: 'lg', px: 16, weight: 600, use: 'App tile name, emphasis' },
  { token: 'nav', px: 15, weight: 500, use: 'Sidebar items' },
  { token: 'md', px: 14, weight: 400, use: 'Body, inputs, buttons, table cells' },
  { token: 'sm', px: 13, weight: 500, use: 'Labels, helper rows, field labels' },
  { token: 'xs', px: 12, weight: 700, use: 'Eyebrows (uppercase), chips' },
  { token: '2xs', px: 11, weight: 700, use: 'Table headers, tags (uppercase)' },
] as const;

export const radii = { xs: 4, sm: 6, md: 8, lg: 12, xl: 16, full: 9999 } as const;
export const spacing = [2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48] as const;
export const shadows = {
  xs: '0 1px 2px rgba(15, 23, 42, 0.05)',
  card: '0 4px 10px rgba(15, 23, 42, 0.04)',
  md: '0 10px 24px rgba(15, 23, 42, 0.10)',
  dialog: '0 20px 40px -8px rgba(15, 23, 42, 0.24)',
  focus: '0 0 0 4px rgba(0, 112, 255, 0.24)',
} as const;
