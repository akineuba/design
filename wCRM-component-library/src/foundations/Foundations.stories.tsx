import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import tokens from '../../tokens/tokens.json';
import * as Icons from '../icons';

/*
 * Token pages generated straight from tokens/tokens.json, so they can never drift from the source.
 * Each swatch reads its CSS variable, which proves the generated stylesheet matches the JSON too.
 */

type Leaf = { value: string; usage?: string; derived?: string | boolean; figmaUses?: number };
const cssVar = (...parts: string[]) => `var(--${parts.map((p) => p.replace('.', '_')).join('-')})`;

const meta = { title: 'Foundations', parameters: { layout: 'padded', controls: { disable: true } } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function TokenMeta({ leaf }: { leaf: Leaf }) {
  return (
    <span className="text-caption text-text-secondary">
      {leaf.derived && <span className="mr-1 rounded-full bg-status-warning-subtle px-1.5 py-0.5 text-overline text-status-warning-text">derived</span>}
      {leaf.usage}
      {leaf.figmaUses ? <span className="text-text-muted"> · {leaf.figmaUses} uses in Figma</span> : null}
    </span>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-heading-3 capitalize text-text-primary">{title}</h2>
      {children}
    </section>
  );
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-8 font-sans">
      {Object.entries(tokens.color).map(([group, entries]) => (
        <Group key={group} title={group}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {Object.entries(entries as Record<string, Leaf>).map(([name, leaf]) => (
              <div key={name} className="flex items-start gap-3 rounded-md border border-border-default bg-surface-default p-3">
                <div className="size-control-lg shrink-0 rounded-sm border border-border-default" style={{ background: cssVar('color', group, name) }} />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <code className="text-label-sm text-text-primary">{group}-{name}</code>
                  <code className="break-all text-caption text-text-secondary">{leaf.value}</code>
                  <TokenMeta leaf={leaf} />
                </div>
              </div>
            ))}
          </div>
        </Group>
      ))}
      <Group title="gradient">
        {Object.entries(tokens.gradient as Record<string, Leaf>).map(([name, leaf]) => (
          <div key={name} className="flex items-center gap-3">
            <div className="h-control-lg w-field-sm rounded-md" style={{ background: cssVar('gradient', name) }} />
            <div className="flex flex-col"><code className="text-label-sm">bg-{name}</code><TokenMeta leaf={leaf} /></div>
          </div>
        ))}
      </Group>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="flex flex-col gap-6 font-sans">
      <Group title="Type scale">
        {Object.entries(tokens.typography as Record<string, { size: string; lineHeight: string; weight: string; usage?: string }>).map(([k, t]) => (
          <div key={k} className="grid grid-cols-1 items-baseline gap-2 border-b border-border-default pb-3 md:grid-cols-4">
            <code className="text-label-sm text-text-primary">text-{k}</code>
            <code className="text-caption text-text-secondary">{t.size} / {t.lineHeight} / {t.weight}</code>
            <span className="text-text-primary md:col-span-2" style={{ fontSize: cssVar('text', k, 'size'), lineHeight: cssVar('text', k, 'line-height'), fontWeight: cssVar('text', k, 'weight') }}>Manage your marketing in one place</span>
            {t.usage && <span className="text-caption text-text-secondary md:col-span-4">{t.usage}</span>}
          </div>
        ))}
      </Group>
      <Group title="Families">
        {Object.entries(tokens.font.family as Record<string, Leaf>).map(([k, leaf]) => (
          <div key={k} className="flex flex-col gap-1 border-b border-border-default pb-3">
            <span className="text-heading-2 text-text-primary" style={{ fontFamily: cssVar('font', k) }}>Aa Bb Cc 0123 · {k}</span>
            <TokenMeta leaf={leaf} />
          </div>
        ))}
      </Group>
      <Group title="Weights">
        <div className="flex flex-wrap gap-6 text-heading-3 text-text-primary">
          {Object.keys(tokens.font.weight).map((w) => (
            <span key={w} style={{ fontWeight: cssVar('font-weight', w) }}>{w}</span>
          ))}
        </div>
      </Group>
    </div>
  ),
};

export const SpacingAndRadius: Story = {
  name: 'Spacing & radius',
  render: () => (
    <div className="flex flex-col gap-8 font-sans">
      <Group title="Spacing">
        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-4 gap-y-2">
          {Object.entries(tokens.space as Record<string, Leaf>)
            .sort(([a], [b]) => parseFloat(a) - parseFloat(b))
            .map(([k, leaf]) => (
              <div key={k} className="contents">
                <code className="text-caption text-text-secondary">space-{k}</code>
                <code className="text-caption text-text-secondary">{leaf.value}</code>
                <div className="h-3 rounded-xs bg-brand-primary" style={{ width: cssVar('space', k) }} />
              </div>
            ))}
        </div>
      </Group>
      <Group title="Radius">
        <div className="flex flex-wrap gap-6">
          {Object.entries(tokens.radius as Record<string, Leaf>).map(([k, leaf]) => (
            <div key={k} className="flex flex-col items-center gap-1">
              <div className="size-12 border border-brand-primary bg-brand-primary-subtle" style={{ borderRadius: cssVar('radius', k) }} />
              <code className="text-caption text-text-secondary">rounded-{k} · {leaf.value}</code>
            </div>
          ))}
        </div>
      </Group>
    </div>
  ),
};

export const Elevation: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 bg-surface-canvas p-8 font-sans">
      {Object.entries(tokens.shadow as Record<string, Leaf>).map(([k, leaf]) => (
        <div key={k} className="flex w-popover flex-col gap-2">
          <div className="h-24 rounded-lg bg-surface-default" style={{ boxShadow: cssVar('shadow', k) }} />
          <code className="text-label-sm text-text-primary">shadow-{k}</code>
          <code className="break-all text-caption text-text-secondary">{leaf.value}</code>
          <TokenMeta leaf={leaf} />
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-x-8 gap-y-2 font-sans md:grid-cols-2">
      {Object.entries(tokens.size as Record<string, Leaf>).map(([k, leaf]) => (
        <div key={k} className="flex items-baseline justify-between gap-3 border-b border-border-default py-2">
          <code className="text-label-sm text-text-primary">size-{k}</code>
          <code className="text-caption text-text-secondary">{leaf.value}</code>
          <span className="flex-1 text-right"><TokenMeta leaf={leaf} /></span>
        </div>
      ))}
    </div>
  ),
};

export const Iconography: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-3 font-sans sm:grid-cols-4 lg:grid-cols-6">
      {Object.entries(Icons)
        .filter(([name, C]) => typeof C === 'function' && /Icon$|Spinner|AlertCircle/.test(name))
        .map(([name, C]) => {
          const Icon = C as (p: { className?: string }) => JSX.Element;
          return (
            <div key={name} className="flex flex-col items-center gap-2 rounded-md border border-border-default bg-surface-default p-4 text-text-primary">
              <Icon className="size-6" />
              <code className="text-caption text-text-secondary">{name}</code>
            </div>
          );
        })}
    </div>
  ),
};

