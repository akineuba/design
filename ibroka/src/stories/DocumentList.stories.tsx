import type { Meta, StoryObj } from '@storybook/react';
import { DocumentList } from '../insurance/DocumentList';
import { Button } from '../components/Button';
import { UploadIcon } from '../icons';

const docs = [
  { id: 'd1', name: 'Policy schedule - POL-2026-00975.pdf', kind: 'Policy schedule', uploadedAt: '2026-10-05', uploadedBy: 'Ada Obi', sizeKb: 248 },
  { id: 'd2', name: 'Debit note DN-3321.pdf', kind: 'Debit note', uploadedAt: '2026-10-05', uploadedBy: 'Ada Obi', sizeKb: 96 },
  { id: 'd3', name: 'CAC certificate.png', kind: 'KYC', uploadedAt: '2026-03-14', uploadedBy: 'Kunle Ade', sizeKb: 1820 },
];
const meta = { title: 'Insurance/DocumentList', component: DocumentList, args: { documents: docs, onView: () => {}, onDownload: () => {} }, decorators: [(S) => <div className="w-[520px]"><S /></div>] } satisfies Meta<typeof DocumentList>;
export default meta;
type S = StoryObj<typeof meta>;
export const WithDocuments: S = {};
export const Empty: S = { args: { documents: [], emptyAction: <Button size="sm" variant="outline" leadingIcon={<UploadIcon />}>Upload document</Button> } };
