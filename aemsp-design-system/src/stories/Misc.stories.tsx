import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge, Tag, Tooltip, ProgressBar, Skeleton, Divider, Logo, NumberValue, NegativeValue, Button } from '../components/primitives';

export default { title: 'Components/Small parts', tags: ['autodocs'], parameters: { docs: { description: { component: 'Badges, tags, tooltips, progress, skeletons, dividers, logo and number formatting.' } } } } satisfies Meta;
type S = StoryObj;
const row: React.CSSProperties = { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' };

export const Badges: S = { render: () => <div style={row}><Badge>4</Badge><Badge tone="blue">6</Badge><Badge tone="red">12</Badge><Badge tone="navy">New</Badge></div> };
export const Tags: S = { render: () => <div style={row}><Tag>OEM</Tag><Tag variant="filled" icon="building">Dealer</Tag><Tag variant="accent" onRemove={() => {}}>Status: Active</Tag><Tag variant="accent" onRemove={() => {}}>Region: EMEA</Tag></div> };
export const Tooltips: S = { render: () => <div style={{ ...row, padding: '40px 0 0' }}><Tooltip content="Exact value: 256,298" open><Button variant="outline">Hover me</Button></Tooltip></div> };
export const Progress: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 420 }}>
      <ProgressBar value={42} label="Default" /><ProgressBar value={88} tone="warning" label="Warning" /><ProgressBar value={100} tone="error" label="Error" /><ProgressBar value={64} tone="success" size="sm" label="Small" />
    </div>
  ),
};
export const Skeletons: S = { render: () => <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 360 }}><div style={row}><Skeleton w={35} h={35} r={99} /><Skeleton w={140} /></div><Skeleton h={10} /><Skeleton w="70%" h={10} /></div> };
export const Dividers: S = { render: () => <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 420 }}><Divider /><Divider label="Billing details" /></div> };
export const LogoFull: S = { name: 'Logo', render: () => <div style={row}><span style={{ background: 'var(--navy-900)', padding: '12px 18px', borderRadius: 8 }}><Logo /></span><span style={{ background: 'var(--navy-900)', padding: '12px 14px', borderRadius: 8 }}><Logo variant="mark" /></span><Logo inverse={false} /></div> };
export const Numbers: S = {
  name: 'Number formatting',
  render: () => (
    <table className="ae-table" style={{ maxWidth: 520 }}>
      <thead><tr><th>Raw</th><th>Shown</th><th>Rule</th></tr></thead>
      <tbody>
        <tr><td>3232</td><td><NumberValue value={3232} /></td><td>Below 10,000 → full</td></tr>
        <tr><td>2562988</td><td><NumberValue value={2562988} /></td><td>Abbreviated, hover for exact</td></tr>
        <tr><td>398222</td><td><NumberValue value={398222} /></td><td>Abbreviated</td></tr>
        <tr><td>2208</td><td><NumberValue value={2208} money /></td><td>Money, full</td></tr>
        <tr><td>256298</td><td><NumberValue value={256298} money /></td><td>Money, compact</td></tr>
        <tr><td>-14</td><td><NegativeValue>14</NegativeValue></td><td>Negative: red + icon</td></tr>
      </tbody>
    </table>
  ),
};
