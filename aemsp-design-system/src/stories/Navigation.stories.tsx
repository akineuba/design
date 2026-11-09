import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, Accordion, ActionMenu, Breadcrumb } from '../components/layout';
import { SegmentedControl } from '../components/forms';

export default { title: 'Components/Tabs', component: Tabs, tags: ['autodocs'], parameters: { surface: 'white', docs: { description: { component: 'Underline tabs from the Figma (13px, 2px blue underline). Inactive tabs use the AA-safe muted grey.' } } } } satisfies Meta<typeof Tabs>;
type S = StoryObj<typeof Tabs>;
export const Interactive: S = { args: { items: [{ id: 'a', label: 'All organisations' }, { id: 'b', label: 'OEMs' }, { id: 'c', label: 'Dealers' }, { id: 'd', label: 'Fleets' }] } };
export const WithCounts: S = { args: { items: [{ id: 'p', label: 'Pending', count: 6 }, { id: 'a', label: 'Approved', count: 128 }, { id: 'r', label: 'Rejected', count: 9 }] } };
export const SecondSelected: S = { args: { value: 'b', items: [{ id: 'a', label: 'Text' }, { id: 'b', label: 'Text' }] } };
