import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, StatCard } from '../components/layout';
import { Button, StatusPill } from '../components/primitives';

const meta: Meta<typeof Card> = {
  title: 'Components/Card', component: Card, tags: ['autodocs'],
  args: { title: 'Seat requests', children: <p className="ae-muted" style={{ margin: 0 }}>Card content goes here.</p> },
  parameters: { docs: { description: { component: 'The Figma card: 5px radius, hairline border, soft shadow, 20px title, actions on the right.' } } },
};
export default meta;
type S = StoryObj<typeof Card>;
export const WithActions: S = { args: { actions: <><Button icon="add">Add seats</Button><Button variant="outline" icon="export">Export</Button></> } };
export const WithSubtitle: S = { args: { subtitle: 'Last 7 days', actions: <Button size="sm" variant="outline" icon="add">Button</Button> } };
export const Divided: S = { args: { divided: true, title: 'Recent activity' } };
export const WithFooter: S = { args: { footer: <Button size="sm" variant="link-outline">View all</Button> } };
export const Plain: S = { args: { title: undefined } };
