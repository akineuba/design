# Figma sync

## Where the tokens came from

The w-Biz file has **no Figma variables, text styles, colour styles or effect styles**, and its own pages hold no published component library. The tokens were extracted with the Figma MCP server by reading every node on the **accounting** (`0:1`), **inventory** (`4651:44574`) and **new features** (`7004:31166`) pages and counting:

- solid fills, text colours and strokes
- font family, style, size and line height on text
- corner radius, auto-layout gap and padding
- drop shadows

The most-used values became tokens; one-off and fractional values were dropped or snapped. **New features** is the primary reference: its sidebar and top bar are the current versions. The **landing page**, **email templates** and **icons & components** pages are excluded at the team's request.

## Recommended next step in Figma

Create Figma variables that match `tokens/tokens.json` (same names, e.g. `color/primary`, `space/4`, `radius/lg`) and bind the screens to them. After that, future syncs can read variables directly instead of counting values.

## Updating tokens

1. Change the value in `tokens/tokens.json` (keep the `note`, and set `"derived": true` if it isn't in Figma).
2. Run `npm run tokens` to regenerate `src/styles/tokens.css`.
3. Run `npm run storybook` and check **Foundations** and the component matrices.
4. Update the token tables in `CLAUDE.md` if a name or value changed.
