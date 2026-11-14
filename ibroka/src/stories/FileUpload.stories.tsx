import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FileUpload, type UploadedFile } from '../components/FileUpload';

const files: UploadedFile[] = [
  { id: '1', name: 'Policy schedule - POL-2026-00975.pdf', size: 248_000 },
  { id: '2', name: 'Vehicle photo front.jpg', size: 1_920_000, progress: 64 },
  { id: '3', name: 'Driver licence.heic', size: 3_100_000, error: 'HEIC isn’t supported. Upload a PDF, JPG or PNG.' },
];
const meta = { title: 'Components/FileUpload', component: FileUpload, args: { label: 'Claim evidence', files: [], onAdd: () => {}, onRemove: () => {} }, decorators: [(S) => <div className="w-[480px]"><S /></div>] } satisfies Meta<typeof FileUpload>;
export default meta;
type S = StoryObj<typeof meta>;
export const Empty: S = {};
export const WithFiles: S = { args: { files } };
export const Disabled: S = { args: { disabled: true } };
export const Interactive: S = {
  render: (a) => {
    const [fs, setFs] = useState<UploadedFile[]>([]);
    return <FileUpload {...a} files={fs} onAdd={(add) => setFs([...fs, ...add.map((f) => ({ id: f.name + f.size, name: f.name, size: f.size }))])} onRemove={(id) => setFs(fs.filter((f) => f.id !== id))} />;
  },
};
