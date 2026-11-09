import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert, Toast, ToastProvider, useToast } from '../components/overlays';
import { Button } from '../components/primitives';

export default { title: 'Components/Alert', component: Alert, tags: ['autodocs'], args: { tone: 'info', title: 'Renewal coming up', children: 'Telematics Suite for Apex OEM Group renews on 15 Nov 2026.' } } satisfies Meta<typeof Alert>;
type S = StoryObj<typeof Alert>;
export const Info: S = {};
export const Success: S = { args: { tone: 'success', title: 'Subscription created', children: '120 seats were added to Fleet Diagnostics Pro.' } };
export const Warning: S = { args: { tone: 'warning', title: 'Seats running low', children: '188 of 200 seats are in use.', actions: <button className="ae-linkbtn">Request more seats</button> } };
export const ErrorSummary: S = { args: { tone: 'error', title: 'Fix 2 fields to continue', children: <ul><li>Billing email is not a valid address</li><li>Seat count must be at least 1</li></ul> } };
export const Dismissible: S = { args: { onDismiss: () => {} } };
