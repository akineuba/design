/** Where the source lives, for "Edit this note" links and Figma references. */
export const REPO_EDIT_BASE = 'https://github.com/akineuba/design/edit/claude/laughing-faraday-o7wp25/ibroka/';
export const FIGMA_FILE = 'https://www.figma.com/design/TiBSQBxrErJvtrBwZxRsY9/iBroka-v2';
export const figma = (nodeId: string) => `${FIGMA_FILE}?node-id=${nodeId.replace(':', '-')}`;
