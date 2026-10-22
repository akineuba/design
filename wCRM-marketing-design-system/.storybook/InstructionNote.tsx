import { Markdown, useOf } from '@storybook/blocks';

// Instruction Notes live in plain Markdown files in /instruction-notes so anyone can edit them
// without touching code. File name = component name in kebab-case (FilterButton -> filter-button.md).
const files = import.meta.glob('../instruction-notes/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

/** Where the "Edit this note" link points. Change the branch here once the work is merged. */
export const EDIT_BASE = 'https://github.com/akineuba/design/edit/claude/beautiful-pasteur-5d0hgq/wCRM-marketing-design-system/';

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();

/** "Instruction Note" block at the top of each component's Docs page. */
export function InstructionNote() {
  const { preparedMeta } = useOf('meta', ['meta']);
  const name = preparedMeta.title.split('/').pop() ?? '';
  const file = `${kebab(name)}.md`;
  const md = files[`../instruction-notes/${file}`];
  if (!md) return null;
  return (
    <section className="sb-unstyled my-6 rounded-lg border border-border-default bg-surface-subtle p-6 font-sans text-body text-text-primary">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-sans text-heading-2 text-text-primary">Instruction Note</h2>
        <a className="font-sans text-caption text-text-link underline" href={`${EDIT_BASE}instruction-notes/${file}`} target="_blank" rel="noreferrer">
          Edit this note (instruction-notes/{file})
        </a>
      </div>
      <div className="wcrm-note">
        <Markdown>{md}</Markdown>
      </div>
    </section>
  );
}
