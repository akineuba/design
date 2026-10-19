# Spacing & layout

## Spacing scale

`0.5`=2 · `1`=4 · `2`=8 · `2.5`=10 · `3`=12 · `4`=16 · `5`=20 · `6`=24 · `7.5`=30 · `8`=32 · `10`=40 · `12`=48 (px)

The scale follows the gaps and padding the screens actually use. 10px exists because every button and field uses 10px vertical padding. Off-grid values in Figma (5, 15, 18px) snap to the nearest step.

## Control sizes

| Token | Value | Use |
|---|---|---|
| `control-sm` | 34px | Filter chips, compact fields |
| `control-md` | 40px | Default button and input height |
| `control-lg` | 46px | Prominent form actions |
| `icon` | 20px | Icon slot in buttons and inputs |

## Radius & shadow

`rounded-lg` (8px) is the default for buttons, inputs and cards. `rounded-2xl` (16px) is for badges and `rounded-full` for avatars and pills. `shadow-xs` sits under primary and soft buttons, `shadow-md` under menus, and `shadow-focus` is the keyboard focus ring.

## Auto Layout → CSS

| Figma | CSS / Tailwind |
|---|---|
| Horizontal auto layout | `flex` |
| Vertical auto layout | `flex flex-col` |
| Item spacing | `gap-*` |
| Padding | `px-*` / `py-*` |
| Fill container | `flex-1` or `w-full` (add `min-w-0` for text) |
| Hug contents | default (no width) |
| Space between | `justify-between` |
| Wrap | `flex-wrap` or `grid` with `auto-fill` |

Never reproduce Figma's absolute x/y positions. Let the layout flow.
