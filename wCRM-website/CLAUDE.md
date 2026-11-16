# wCRM website: notes for contributors and AI assistants

Read [`README.md`](README.md) first, then the design-system rules in [`../wCRM-marketing-design-system/CLAUDE.md`](../wCRM-marketing-design-system/CLAUDE.md).

* Figma: file `EIQlA9M6mP2KlskFFy2X2U`, section `homepage x subsciption` (`2621:4227`). Each page component names its frame id.
* Use design-system tokens and components first; add a website token to `tokens/site-tokens.json` (with `figma` node ids)
  only when no design-system token has the exact value, then run `npm run tokens`.
* Never use Tailwind arbitrary values (`[...]`) for colour, spacing or type. Illustration geometry (hero card offsets,
  ribbon transforms) is kept next to the artwork with a Figma reference.
* Download assets with the Figma MCP into `src/assets/<area>/`; never reference temporary Figma URLs at runtime.
* Before committing: `npm run build` (checks tokens, types and the production build).
