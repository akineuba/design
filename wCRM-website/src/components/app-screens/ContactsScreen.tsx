import { Avatar, Button, LucideChevronDownIcon, LucideCloudUploadIcon, LucidePlusIcon, PhExportLightIcon } from '@ds';
import { GridRow, Kebab, ScreenCard, SearchBox, headCell } from './parts';

const COLUMNS = '255px 313px 178px 202px 283px 1fr';

const CONTACTS = [
  ['Harry Kay', 'harykay234@yomail.com', 'Technologia', '+2349081234557', 'Oluwatobi Osanyinbi'],
  ['Deon Lion', 'doenli@yopmail.com', 'Cartier', '+2349082346571', 'Oluwatobi Osanyinbi'],
  ['Christian', 'christianolumide@yopmail.com', 'Cash Drive', '+2348163745367', 'Taiwo Ajayi'],
  ['Lukman Waliullah', 'Lukman.Waliullah@gmail.com', 'Cash Drive', '+2348000000000', 'Murphy Ogbeide'],
  ['Pam Mancha', 'emmanuel.mancha@gmail.com', 'Cash Drive', '+2348000000000', 'Murphy Ogbeide'],
  ['tmb test', 'suretester235@yopmail.com', 'tmb', '+2347034567890', 'tmb sales'],
  ['Bunmi Ajayi', 'bunmi@cashdrive.com', 'Cash Drive', '+2348182223206', 'Bamidele Olatunde'],
  ['Ogodinma Ogo', 'ogbeidemurphy@gmail.com', 'Decagon', '+2348130990162', 'Murphy Ogbeide'],
  ['John Doe', 'johnn.doee@example.com', 'TechNova Ltd', '08012345678', 'Waliyullahi Lukman'],
  ['Jane Smith', 'jane.smieth@company.com', 'N/A', '07098765432', 'Waliyullahi Lukman'],
];

function Person({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-2">
      <Avatar name={name} size="lg" className="text-body font-medium" />
      <span className="text-body text-text-primary">{name}</span>
    </span>
  );
}

/** Contacts register, rebuilt from the Contact Management screenshot (Figma image 363, 775:4577). 1400 × 659. */
export function ContactsScreen() {
  return (
    <ScreenCard
      style={{ left: 24, top: 18, width: 1346, height: 660 }}
      toolbar={
        <>
          <span className="flex items-center gap-4">
            <span className="text-label text-text-primary">
              Active Contacts <span className="font-regular text-text-secondary">(49)</span>
            </span>
            <SearchBox />
          </span>
          <span className="flex items-center gap-4">
            <Button variant="toolbar" size="xs" leadingIcon={<LucideCloudUploadIcon />}>Upload</Button>
            <Button variant="toolbar-muted" size="md" leadingIcon={<PhExportLightIcon />} trailingIcon={<LucideChevronDownIcon />}>Export</Button>
            <Button size="xs" leadingIcon={<LucidePlusIcon />}>Create Contact</Button>
          </span>
        </>
      }
    >
      <GridRow columns={COLUMNS} className="h-control-31 bg-surface-subtle">
        {['Name', 'Email address', 'Company name', 'Phone number', 'Contact owner', 'Actions'].map((h) => (
          <span key={h} className={headCell}>{h}</span>
        ))}
      </GridRow>
      {CONTACTS.map(([name, email, company, phone, owner]) => (
        <GridRow key={email} columns={COLUMNS} className="h-13.5 text-body text-text-primary">
          <Person name={name} />
          <span>{email}</span>
          <span>{company}</span>
          <span>{phone}</span>
          <Person name={owner} />
          <Kebab />
        </GridRow>
      ))}
    </ScreenCard>
  );
}
