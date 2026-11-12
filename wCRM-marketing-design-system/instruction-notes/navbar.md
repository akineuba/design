## When to use
The app header across the top of every desktop screen. One per page, above the `Sidebar`.

## Content
- **Greeting:** "Hi {first name}".
- **Title:** the current page, with its parent for settings pages ("Settings - Social Media").
- **Right side:** keep the order notifications, apps, theme toggle, account.

## How it behaves
| Control | Does |
|---|---|
| Menu (left) | Opens and closes the sidebar. Pass `sidebarOpen` and `sidebarId` so screen readers know what it controls. |
| Bell | Opens notifications. `hasUnreadNotifications` shows the red dot. |
| Apps | Opens the app switcher. |
| Sun / moon | Switches light and dark mode (`theme`, `onThemeToggle`). Set `data-theme` on `<html>` in the handler. |
| Avatar | Opens the account menu. Shows the user's initials, or `userAvatarSrc`. |

Every control is a labelled button with a hover fill and the keyboard focus ring.
