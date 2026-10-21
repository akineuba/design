import { Markdown, useOf } from '@storybook/blocks';

// Usage guidance lives in plain Markdown files in /usage so anyone can edit it without touching code.
// File name = component name in kebab-case (SidePanel -> usage/side-panel.md).
const files = import.meta.glob('../usage/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

/** Where the "Edit this guidance" link points. Change the branch here if the default branch differs. */
const EDIT_BASE = 'https://github.com/akineuba/design/edit/claude/clever-feynman-f56zyl/wbiz-design-system/usage/';

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();

export function UsageGuidance() {
  const { preparedMeta } = useOf('meta', ['meta']);
  const name = preparedMeta.title.split('/').pop() ?? '';
  const file = `${kebab(name)}.md`;
  const md = files[`../usage/${file}`];
  if (!md) return null;
  return (
    <section className="sb-unstyled my-6 rounded-xl border border-line-subtle bg-surface-page p-6 font-sans text-sm text-fg">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-sans text-lg font-semibold text-fg-ink">Usage guidance</h2>
        <a className="font-sans text-xs text-primary underline" href={EDIT_BASE + file} target="_blank" rel="noreferrer">
          Edit this guidance (usage/{file})
        </a>
      </div>
      <div className="wbiz-usage">
        <Markdown>{md}</Markdown>
      </div>
    </section>
  );
}
