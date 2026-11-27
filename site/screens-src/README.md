# Product screens for the guide

The screenshots on the Product Verse pages are rendered from the product component libraries,
not drawn by hand:

| Folder | Library branch | Screens |
|---|---|---|
| `wbiz/` | `wbizmanager-component-library` | `wbiz-dashboard`, `wbiz-invoice`, `wbiz-requisition`, `wbiz-workspace` |
| `wcrm/` | `wCRM-component-library` | `crm-dashboard`, `crm-create-company` |

All names, amounts and counts are sample data.

## Regenerate

1. Check out the library branch and install it (`npm ci` in its folder).
2. Copy `Screens.tsx` and `main.tsx` into the library's `src/_shots/`, and `shots.html` into the library root.
3. Run `npx vite --port 5181` in the library folder.
4. Capture at 2×: `node capture.js http://localhost:5181/shots.html <outDir> 2 <screen names…>`
   (needs Playwright).
5. Crop and export to `../assets/screens/*.webp`. The crop boxes and marker positions are in
   `SHOTS` in `../index.html`. Marker positions are percentages of the cropped image.
