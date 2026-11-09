import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, IconButton, Avatar, AvatarLabel, AvatarStack, StatusPill, Badge, Tag, Tooltip, ProgressBar, Skeleton, Divider, Logo, NumberValue, NegativeValue } from '../components/primitives';

const row: React.CSSProperties = { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' };

/* ---------- Button ---------- */
const bmeta: Meta<typeof Button> = {
  title: 'Components/Button', component: Button, tags: ['autodocs'],
  args: { children: 'Button', variant: 'primary', icon: 'add' },
  argTypes: { icon: { control: 'text' }, iconEnd: { control: 'text' } },
  parameters: { docs: { description: { component: 'Buttons from the Figma file. **One primary per area**; red only for destructive actions. `confirm` (blue) and `cancel` are used in modal and side-panel footers.' } } },
};
export default bmeta;
type B = StoryObj<typeof Button>;
export const Primary: B = {};
export const Secondary: B = { args: { variant: 'secondary' } };
export const Outline: B = { args: { variant: 'outline', icon: 'export' } };
export const Destructive: B = { args: { variant: 'danger', icon: 'trash', children: 'Delete' } };
export const DestructiveOutline: B = { args: { variant: 'danger-outline', icon: 'add', size: 'sm' } };
export const LinkOutline: B = { args: { variant: 'link-outline', icon: undefined, size: 'sm', children: 'View all' } };
export const ModalPair: B = { name: 'Modal pair (cancel + confirm)', render: () => <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 520 }}><Button variant="cancel" size="lg" block>Cancel</Button><Button variant="confirm" size="lg" block>Create Role</Button></div> };
export const Disabled: B = { args: { disabled: true } };
export const Loading: B = { args: { loading: true, children: 'Saving…' } };
export const IconOnly: B = { render: () => <div style={row}><Button iconOnly icon="edit" variant="outline">Edit</Button><Button iconOnly icon="trash" variant="danger-outline">Delete</Button><IconButton icon="bell" label="Notifications" badge={3} /><IconButton icon="help" label="Help" /></div> };
export const Sizes: B = { render: () => <div style={row}><Button size="sm" icon="add">Small</Button><Button icon="add">Medium</Button><Button size="lg" variant="confirm">Large</Button></div> };
export const Matrix: B = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, max-content)', gap: 14, alignItems: 'center' }}>
      {(['primary', 'secondary', 'outline', 'danger', 'danger-outline', 'link-outline', 'confirm', 'cancel', 'ghost'] as const).map((v) => (
        <React.Fragment key={v}><code style={{ fontSize: 12 }}>{v}</code><Button variant={v} icon="add">Button</Button><Button variant={v} size="sm" icon="add">Button</Button></React.Fragment>
      ))}
    </div>
  ),
};
