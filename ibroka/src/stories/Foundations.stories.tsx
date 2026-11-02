import type { Meta, StoryObj } from '@storybook/react';
import tokens from '../../tokens/tokens.json';
import * as Icons from '../icons';

type Leaf = { value: string; dark?: string; note?: string; derived?: boolean; lineHeight?: string };
type Group = { [k: string]: Leaf | Group };
const isLeaf = (n: unknown): n is Leaf => typeof n === 'object' && n !== null && 'value' in n;
const varName = (p: string[]) => `--ib-${p.filter((x) => x !== 'DEFAULT').map((x) => x.replace('.', '_')).join('-')}`;
function flatten(g: Group, path: string[] = []): Array<{ path: string[]; leaf: Leaf }> {
  return Object.entries(g).flatMap(([k, v]) => (k.startsWith('$') ? [] : isLeaf(v) ? [{ path: [...path, k], leaf: v }] : flatten(v as Group, [...path, k])));
}
const Note = ({ leaf }: { leaf: Leaf }) => (
  <span className="text-11 text-fg-muted">
    {leaf.derived && <span className="mr-1 rounded-full bg-status-warning-bg px-1.5 py-0.5 font-semibold text-status-warning-fg">derived</span>}
    {leaf.note}
  </span>
);

const meta = { title: 'Foundations', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type S = StoryObj;

/** Every colour token, light value with its dark value. "Derived" means not in Figma or changed for contrast. */
export const Colors: S = {
  render: () => {
    const groups = Object.entries(tokens.color as unknown as Group);
    return (
      <div className="flex flex-col gap-8">
        {groups.map(([g, node]) => (
          <section key={g}>
            <h2 className="mb-3 text-18 font-bold capitalize text-fg-strong">{g}</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3">
              {(isLeaf(node) ? [{ path: [], leaf: node }] : flatten(node as Group)).map(({ path, leaf }) => {
                const full = ['color', g, ...path];
                return (
                  <div key={full.join('.')} className="flex items-start gap-3 rounded-lg border border-line-subtle bg-surface p-3">
                    <div className="size-12 shrink-0 rounded-md border border-line-subtle" style={{ background: `var(${varName(full)})` }} />
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <code className="text-12 font-semibold text-fg-strong">{[g, ...path].filter((p) => p !== 'DEFAULT').join('-')}</code>
                      <code className="break-all text-11 text-fg-muted">
                        {leaf.value}
                        {leaf.dark && ` · dark ${leaf.dark}`}
                      </code>
                      <Note leaf={leaf} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    );
  },
};

export const Typography: S = {
  render: () => (
    <div className="flex flex-col gap-4">
      {Object.entries(tokens.fontSize as Record<string, Leaf>).map(([k, leaf]) => (
        <div key={k} className="grid grid-cols-[80px_110px_1fr] items-baseline gap-6 border-b border-line-subtle pb-3">
          <code className="text-12 text-fg-muted">text-{k}</code>
          <code className="text-12 text-fg-muted">
            {leaf.value} / {leaf.lineHeight}
          </code>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-fg-strong" style={{ fontSize: leaf.value, lineHeight: leaf.lineHeight }}>
              Policies expiring this month
            </span>
            <Note leaf={leaf} />
          </div>
        </div>
      ))}
      <div className="flex flex-wrap gap-6 pt-2 text-18 text-fg-strong">
        <span className="font-normal">Instrument Sans Regular 400</span>
        <span className="font-medium">Medium 500</span>
        <span className="font-semibold">SemiBold 600</span>
        <span className="font-bold">Bold 700</span>
      </div>
    </div>
  ),
};

export const SpacingAndRadius: S = {
  name: 'Spacing, radius & shadow',
  render: () => (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-[70px_60px_1fr] items-center gap-x-4 gap-y-2">
        {Object.entries(tokens.space as Record<string, Leaf>).map(([k, leaf]) => (
          <div key={k} className="contents">
            <code className="text-12 text-fg-muted">space-{k}</code>
            <code className="text-11 text-fg-muted">{leaf.value}</code>
            <div className="flex items-center gap-3">
              <div className="h-3 rounded-sm bg-brand" style={{ width: leaf.value }} />
              <Note leaf={leaf} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-6">
        {Object.entries(tokens.radius as Record<string, Leaf>).map(([k, leaf]) => (
          <div key={k} className="flex w-28 flex-col items-center gap-1 text-center">
            <div className="size-16 border-2 border-brand bg-brand-subtle" style={{ borderRadius: leaf.value }} />
            <code className="text-11 text-fg-muted">
              {k} · {leaf.value}
            </code>
            <Note leaf={leaf} />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-8">
        {Object.entries(tokens.shadow as Record<string, Leaf>).map(([k, leaf]) => (
          <div key={k} className="flex w-32 flex-col items-center gap-2 text-center">
            <div className="size-16 rounded-lg bg-surface" style={{ boxShadow: `var(--ib-shadow-${k})` }} />
            <code className="text-11 text-fg-muted">shadow-{k}</code>
            <Note leaf={leaf} />
          </div>
        ))}
      </div>
    </div>
  ),
};

/** Phosphor, filled weight. Import from `src/icons` only. Line glyphs (plus, close, check) use bold. */
export const IconSet: S = {
  name: 'Icons',
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
      {Object.entries(Icons).map(([name, I]) => (
        <div key={name} className="flex flex-col items-center gap-2 rounded-lg border border-line-subtle bg-surface p-3 text-center">
          <span className="size-6 text-fg-strong">
            <I />
          </span>
          <code className="break-all text-11 text-fg-muted">{name}</code>
        </div>
      ))}
    </div>
  ),
};
