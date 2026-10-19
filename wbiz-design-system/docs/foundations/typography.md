# Typography

## Families

| Token | Family | Use |
|---|---|---|
| `font-sans` | Inter | Buttons, inputs, labels, headings |
| `font-data` | Roboto | Tables, ledgers, dense screen copy |

The Figma screens mix both: controls are Inter, while Roboto Regular 14/20 is the single most-used text style (tables and form labels on older screens). New UI should default to Inter and use `font-data` only for tabular data.

## Scale

| Class | Size / line height | Use |
|---|---|---|
| `text-2xs` | 10 / 14 | Chart axis labels, tags |
| `text-xs` | 12 / 18 | Field labels (`font-medium`) |
| `text-sm` | 14 / 20 | Default: buttons, inputs, body, helper text |
| `text-md` | 16 / 24 | Emphasised body |
| `text-lg` | 20 / 28 | Section titles |
| `text-xl` | 24 / 32 | Page titles (`font-semibold`) |
| `text-2xl` | 32 / 40 | Dashboard figures |

Each class sets size and line height together. Weights: `font-regular`, `font-medium`, `font-semibold`.
