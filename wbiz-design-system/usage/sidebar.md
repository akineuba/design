## When to use
The app's main navigation, on every screen. There is one menu for the whole platform.

## Structure
Three levels: **module** (Accounting) › **page** (Fixed Assets) › **sub-page** (Asset Category). Any level can be a group.
- Add new screens to the existing module where users would look for them; avoid new top-level modules.
- Keep labels short; long labels are truncated with the full text on hover.

## States
| State | Use it when |
|---|---|
| Active page | `activeId` = the current page. Its module is tinted with the blue indicator. |
| Expanded groups | The active page's groups open automatically; others stay as the user left them. |
| Collapsed rail | Narrow screens or when the user collapses it. |
