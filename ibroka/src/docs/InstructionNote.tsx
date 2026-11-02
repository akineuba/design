import { Markdown } from '@storybook/blocks';
import { REPO_EDIT_BASE } from './links';

const notes = import.meta.glob('../../instruction-notes/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>;

/** "Components/Button" -> instruction-notes/Button.md */
export function InstructionNote({ title }: { title: string }) {
  const name = title.split('/').pop()!.replace(/\s+/g, '');
  const key = `../../instruction-notes/${name}.md`;
  const md = notes[key];
  if (!md) return null;
  return (
    <div className="sb-unstyled ib-note my-6 rounded-xl border border-line-subtle bg-surface-chrome px-6 py-5 font-sans text-15 text-fg-strong">
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-11 font-semibold uppercase tracking-wide text-primary">Instruction note</span>
        <a
          className="text-12 text-primary underline"
          href={`${REPO_EDIT_BASE}instruction-notes/${name}.md`}
          target="_blank"
          rel="noreferrer"
        >
          Edit this note
        </a>
      </div>
      <Markdown>{md}</Markdown>
    </div>
  );
}
