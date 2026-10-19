import type { Meta, StoryObj } from '@storybook/react';
import tokens from '../../tokens/tokens.json';

type Leaf = { value: string; note?: string; derived?: boolean; lineHeight?: string };
type Group = Record<string, Leaf | Record<string, Leaf>>;

const isLeaf = (x: unknown): x is Leaf => typeof x === 'object' && x !== null && 'value' in x;
const varName = (path: string[]) => `--wbiz-${path.filter((p) => p !== 'DEFAULT').map((p) => p.replace('.', '_')).join('-')}`;

function flatten(group: Group, root: string) {
  const rows: Array<{ path: string[]; leaf: Leaf }> = [];
  for (const [k, v] of Object.entries(group)) {
    if (isLeaf(v)) rows.push({ path: [root, k], leaf: v });
    else for (const [k2, v2] of Object.entries(v)) rows.push({ path: [root, k, k2], leaf: v2 });
  }
  return rows;
}

const Note = ({ leaf }: { leaf: Leaf }) => (
  <span className="text-xs text-fg-muted">
    {leaf.derived && <span className="mr-1 rounded-full bg-warning px-1 py-0.5 text-2xs font-semibold text-fg-inverse">derived</span>}
    {leaf.note}
  </span>
);

const meta = { title: 'Foundations', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(var(--wbiz-size-field),1fr))] gap-4 font-sans">
      {flatten(tokens.color as Group, 'color').map(({ path, leaf }) => (
        <div key={path.join('.')} className="flex items-start gap-3 rounded-lg border border-line-subtle bg-surface p-3">
          <div className="size-control-lg shrink-0 rounded-md border border-line-subtle" style={{ background: `var(${varName(path)})` }} />
          <div className="flex min-w-0 flex-col gap-0.5">
            <code className="text-xs font-semibold text-fg-strong">{path.slice(1).filter((p) => p !== 'DEFAULT').join('-')}</code>
            <code className="break-all text-2xs text-fg-muted">{leaf.value}</code>
            <Note leaf={leaf} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="flex flex-col gap-4 font-sans">
      {Object.entries(tokens.fontSize as Record<string, Leaf>).map(([k, leaf]) => (
        <div key={k} className="grid grid-cols-[auto_auto_1fr] items-baseline gap-6 border-b border-line-subtle pb-3">
          <code className="text-xs text-fg-muted">text-{k}</code>
          <code className="text-xs text-fg-muted">{leaf.value} / {leaf.lineHeight}</code>
          <span className="text-fg-strong" style={{ fontSize: `var(${varName(['fontSize', k])})`, lineHeight: `var(${varName(['lineHeight', k])})` }}>
            Manage your daily work in one place
          </span>
        </div>
      ))}
      <div className="flex gap-6 pt-2 text-md text-fg-strong">
        <span className="font-regular">Inter Regular</span>
        <span className="font-medium">Inter Medium</span>
        <span className="font-semibold">Inter Semibold</span>
        <span className="font-data">Roboto (data)</span>
      </div>
    </div>
  ),
};

export const SpacingAndRadius: Story = {
  name: 'Spacing & radius',
  render: () => (
    <div className="flex flex-col gap-8 font-sans">
      <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-4 gap-y-2">
        {Object.entries(tokens.space as Record<string, Leaf>).map(([k, leaf]) => (
          <div key={k} className="contents">
            <code className="text-xs text-fg-muted">space-{k}</code>
            <code className="text-2xs text-fg-muted">{leaf.value}</code>
            <div className="h-3 rounded-xs bg-primary" style={{ width: `var(${varName(['space', k])})` }} />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {Object.entries(tokens.radius as Record<string, Leaf>).map(([k, leaf]) => (
          <div key={k} className="flex flex-col items-center gap-1">
            <div className="size-12 border border-primary bg-primary-subtle" style={{ borderRadius: `var(${varName(['radius', k])})` }} />
            <code className="text-2xs text-fg-muted">{k} · {leaf.value}</code>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-6">
        {(['xs', 'md', 'focus'] as const).map((k) => (
          <div key={k} className="flex flex-col items-center gap-2">
            <div className="size-12 rounded-lg bg-surface" style={{ boxShadow: `var(${varName(['shadow', k])})` }} />
            <code className="text-2xs text-fg-muted">shadow-{k}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};
