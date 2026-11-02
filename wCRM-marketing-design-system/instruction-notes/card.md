## When to use
| Card | Use it when |
|---|---|
| `StatCard` | Headline numbers above a list. The first card in a stats row is `featured` (gradient). |
| `SummaryCard` | Short totals with a coloured icon tile. |
| `MetricCard` | A metric with a breakdown (email performance). |
| `ModuleCard` | Choosing a module or channel. |
| `ActivityFeed` | Recent activity on the dashboard. |
| `Card` | Any other grouped content. |

## Content
Labels are short nouns; trends say what they compare against ("vs last month"). Use `invert` when a drop is good (unsubscribes).

## Clickable stats rows
When a stats row filters the list below it, give each `StatCard` an `onClick` and `selected`. The card becomes a toggle button (`aria-pressed`): click to select, click again to clear. Wrap the row in `role="group"` with an `aria-label`.

Pick the `tone` that matches what the card counts:

| Tone | Selected fill | Use for |
|---|---|---|
| `success` | green gradient | A good or complete count ("With birthday", "Active") |
| `brand` | red gradient | A count that needs attention ("Without birthday", "Failed") |
| `info` | blue gradient | Time-based counts ("Upcoming", "Next 30 days") |
| `warning` | amber gradient | Pending or at-risk counts ("Scheduled", "Expiring") |
| `navy` | indigo gradient | Neutral totals ("Total contacts") |

States: rest, hover (lighter fill and border), pressed, keyboard focus ring, selected (gradient, white text), disabled. Use `hint` for a muted line under the value ("Next 30 days").

## Dark mode
Cards follow the theme automatically. Card fill is `#1E1E2E`, labels `#9C9FB5`, hints `#6B6D8C`; selected gradients are the same in both themes.
