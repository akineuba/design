import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload, RichTextField } from '../components/forms';
export default { title: 'Components/FileUpload', component: FileUpload, tags: ['autodocs'], parameters: { surface: 'white' }, decorators: [(S: any) => <div style={{ maxWidth: 520 }}><S /></div>] } satisfies Meta<typeof FileUpload>;
type S = StoryObj<typeof FileUpload>;
export const Empty: S = { args: { label: 'Contract documents' } };
export const WithFiles: S = { args: { label: 'Contract documents', files: [{ name: 'Northwind_MSA_2026.pdf', size: '2.4 MB', progress: 100 }, { name: 'Seat_schedule.xlsx', size: '0.3 MB', progress: 62 }, { name: 'Scan_0042.tiff', size: '14 MB', error: 'TIFF files aren’t supported. Upload a PDF, PNG or JPG.' }] } };
export const Disabled: S = { args: { label: 'Contract documents', disabled: true } };
