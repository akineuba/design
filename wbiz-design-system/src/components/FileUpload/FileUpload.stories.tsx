import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FileUpload, type UploadedFile } from './FileUpload';
import { FIGMA } from '../../patterns/demo-data';

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
  args: { label: 'Attachments', files: [], onFilesChange: () => {} },
  decorators: [(Story) => <div className="w-full max-w-dialog"><Story /></div>],
  parameters: { layout: 'padded', design: { url: FIGMA + '282-6176' }, docs: { description: { component: 'Attach supporting documents to a record: drop files or browse, see each file with its size, remove before saving. Files over the size limit are refused with a message.' } } },
} satisfies Meta<typeof FileUpload>;
export default meta;
type Story = StoryObj<typeof meta>;

const Live = (props: { initial?: UploadedFile[]; disabled?: boolean }) => {
  const [files, setFiles] = useState<UploadedFile[]>(props.initial ?? []);
  return <FileUpload label="Attachments" files={files} onFilesChange={setFiles} disabled={props.disabled} hint="PDF, images, Word or Excel · up to 10 MB each" />;
};

export const Empty: Story = { render: () => <Live /> };
export const WithFiles: Story = { render: () => <Live initial={[{ id: '1', name: 'PO-ZF-2291.pdf', size: 248_000 }, { id: '2', name: 'Delivery-note-0412.jpg', size: 1_840_000 }]} /> };
export const Disabled: Story = { render: () => <Live disabled initial={[{ id: '1', name: 'PO-ZF-2291.pdf', size: 248_000 }]} /> };
