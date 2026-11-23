# wCRM website

Marketing site and plan checkout for Wragby **wCRM**, built from the Figma section
[`homepage x subsciption`](https://www.figma.com/design/EIQlA9M6mP2KlskFFy2X2U/wCRM-updates?node-id=2621-4227) on top of the
wCRM design system in [`../wCRM-marketing-design-system`](../wCRM-marketing-design-system).

```bash
cd wCRM-website
npm install
npm run dev        # http://localhost:5173
npm run build      # tokens:check + typecheck + production build in dist/
```

The design system is consumed **from source**: you do not need to install or build it. Vite aliases `@ds` to
`../wCRM-marketing-design-system/src` and dedupes React, Radix and clsx so the design system's imports resolve to this
app's `node_modules`.

## Pages

| Route | Figma frame |
|---|---|
| `/` | `wCRM business dev home page` (691:4900): hero, features grid, stats bar, workflow cards, why choose us, plans, FAQ |
| `/pricing` | `crm-pricing-page` (231:636): Monthly / Annual switch, plan cards, "Compare every included feature" table (`/pricing#compare` opens it; the homepage "View comparisons" button links there) |
| `/contact` | `crm-contact-sales` (231:1058) → sent state (367:10351) |
| `/features/:id` | Not in Figma; built in the site's style. One page per homepage feature (`contact-management`, `deal-management`, `activities-reporting`, `budget-targets`): hero with the product screen, capabilities, how it works, related features, call-to-action band. Content lives in `src/data/features.ts` |
| `/concept` | Not in Figma; a concept homepage that applies a classic corporate-site layout (utility bar, photo hero, overlapping modules card, values band, "Streamline Your Sales Workflow", closing band) to wCRM, built from the site's components. "What wCRM does" is a bento grid of the seven Business Development modules (Budgets, Reports, Deals, Companies, Contacts, Activity, Orbit AI): each card holds a product widget (sample data, design-system tokens) or a product shot, with the title and description over a bottom vignette and the sidebar's design-system icon. Cards, widgets and the vignette (`bg-site-vignette`, built on `surface-subtle`) follow the page theme. Product shots come from `src/components/MarketingShots.tsx`: full pages without the top bar in the "See it at work" browser frames, inset (straight) Deals and Company windows in the bento. "Streamline Your Sales Workflow" uses the homepage section's copy, a supplied handshake photo and supplied 3D icons (`src/assets/concept/`, cut out of the supplied sheet with transparent backgrounds). Cards link onward with a round ↗ icon (bento cards, the "See it at work" window, the Streamline cards) instead of section "See more" buttons. Screenshot: [`docs/concept-homepage-placeholders.jpg`](docs/concept-homepage-placeholders.jpg) |
| `/concept/suggestions` | The same page with the remaining proposed changes, each marked by a numbered note: product card in the hero, a social-proof band, a photo in the values band, stock photos for resources, and a sales-rep photo beside the closing Contact us button. Screenshot of an earlier revision (before the bento modules): [`docs/concept-homepage-suggestions.jpg`](docs/concept-homepage-suggestions.jpg) |
| `/concept/screens` | Export sheet: every "See it at work" shot (sidebar and content, no top bar) at its native 1617 × 797. Exported PNGs (full, inset, bento and Streamline in both themes; 2×) are in [`docs/screens/`](docs/screens) |
| `/checkout/configure` | `crm-configure-plan` (231:956, several organisations 367:10622) + `wcrm-add-orgs-modal` (372:2334) |
| `/checkout/account` | `wcrm-create-account` (372:2542) + `successful popup` (372:3583) |
| `/checkout/verify` | `otp-verification` (372:3189) |
| `/checkout/company` | `wcrm-company-details` (372:2618) |
| `/checkout/review` | `wcrm-review` (372:2692) + `edit-modal` (372:3262) |
| `/checkout/payment` | `wcrm-payment`: methods (372:2780), card (372:2925), transfer (372:3444) + `Success-Card` (372:3555) |

Header "Features" lists the site's four features (Contact Management, Deal Management, Activities & Reporting,
Budget & Targets) in the layout of Figma's `feature-list-card` (364:8564), with design-system icons; each opens its
feature page. Each "Built for Business Development" card has a "Learn more" link to its feature page. A "Back to top" button appears lower right once a page is scrolled.
The hero leaderboard uses the design-system `Avatar` (initials).
The sun button switches the dark theme (`data-theme="dark"`), which every design-system and site token follows; in
dark mode the navy outline buttons ("Sign In", "Learn More") become the design system's solid #4F46E5 secondary button.

## Motion

Durations and easing are the design-system motion tokens (120ms fast, 200ms base, `cubic-bezier(0.2, 0, 0, 1)`) plus a
320ms `duration-site-slow`; keyframes live in `tailwind.config.js`. All motion is switched off under
`prefers-reduced-motion`.

* Every button and link eases its colours and dips slightly while pressed; cards lift on hover.
* Pages fade up on navigation; the Features menu drops in with its items staggered; dialogs fade and scale in and out.
* The Monthly / Annual pill slides and prices ease in; FAQ rows expand with the chevron turning over; the compare table expands.
* Checkout: the current step pops in the stepper, seat amounts and totals ease in when they change, new organisation
  cards slide in, the payment views slide between method list and method, and success icons pop.
* Invalid forms shake and their messages fade in; the theme switch cross-fades the whole page.

## Styling

* **Design-system first.** Colours, type, spacing, radii and shadows come from the design-system Tailwind preset and
  `tokens.css`. Where a Figma value equals a design-system token, that token is used (for example `#0070FF` is
  `text-link-bright`, `#10B981` is `status-connected`).
* **Website tokens** for values the design system does not have live in [`tokens/site-tokens.json`](tokens/site-tokens.json),
  each with its Figma node: the pricing red `#EA001B`, homepage ink `#090D26`, the Pro card `#000021`, Poppins /
  Outfit / Onest headings, page widths, card shadows and the stats-bar gradient. `npm run tokens` regenerates
  `src/styles/site-tokens.css`; `tailwind.config.js` maps them onto utilities (`text-site-red`, `shadow-site-plan`,
  `w-site-summary`, …). Don't add raw hex or px values to components.
* **Components reused from the design system:** `Button` (modal and review actions), `Menu` (Features), `Modal` /
  `ModalClose` (dialog behaviour), `cn`, `focusFirstField`, plus Radix Accordion and Checkbox for the FAQ, compare
  table and terms box. Website-only pieces (`SiteButton`, `PlanCards`, `OrderSummary`, `SeatStepper`, form fields)
  sit in `src/components` and `src/checkout`.
* All images and icons are the exported Figma assets in `src/assets` (no redrawn glyphs), with one exception: the four
  product screenshots in the homepage feature cards (Figma images 363, 364, 367, 366) are **rebuilt in HTML** in
  `src/components/app-screens` (contacts register, deals register, reports charts, budget allocations) so they follow
  the dark theme. Each screen is laid out at its native 1400px width on design-system tokens (`Button`, `Avatar`,
  `Badge`, Figma icons) and `ScaledScreen` scales it into the card with the same crop the PNG used. The screens are
  `inert` illustrations, announced as one image each.

### Marketing product shots

`src/components/app-screens/AppFrame.tsx` puts a rebuilt screen inside the wCRM app window made from design-system
components: `TopBar` and `NavMenu` with the Business Development sidebar data (`NavMenu.fixtures` `businessSections`).
`CompanyScreen` (company record) and `BudgetPanel` (achievement by practice area, design-system `ProgressBar`) were added
for the concept page; they reuse the sample names, deals and amounts of the other screens. `MarketingShots.tsx` offers
`FullShot` (whole window; `header={false}` drops the top bar), `CropShot` (zoom to a native-px region through
`ScaledScreen`'s `focus`) and `InsetShot` (window set in from the card's corner, running off its edges). All are live HTML, so they follow the dark theme.

## Behaviour and data

Checkout state lives in `src/checkout/CheckoutContext.tsx` (in memory; a reload starts over). There is no backend:
forms validate locally and payments are simulated.

* **Seats and prices.** Each organisation allocates Pro, Starter and Enterprise seats at ₦6,000, ₦8,100 and ₦10,800 per
  seat per year. Those rates reproduce the Figma rows for the default 30 Pro + 20 Starter seats.
* **Discount codes** in the `XXX-XXXX-XXXX-XXXX` format take 10% off; **VAT** of 7.5% is added at the payment step.
* **Additional organisations** copy the primary organisation's allocation; the Edit modal changes plan seats per
  organisation and can remove extra organisations.
* **Sign-in with Google / Microsoft** skips email verification; any 6-digit code passes verification.
* **Bank transfer** shows the account details and stays on "Confirming transaction status"; card payment shows the receipt.

### Where the build differs from Figma, and why

* Figma's sample totals do not add up (for example Enterprise shows ₦108,000 for 0 seats and the summary says
  "Pro · 3 seats" beside 50 seats), so every amount is calculated from the seats above.
* The configure-step "minus" icon is exported from Figma as a second plus sign; a real minus is used instead.
* Monthly prices (₦44,500 Standard, ₦75,000 Pro) and five of the six FAQ answers are not in the design and were written
  from the page copy. The "3 months free" pill only shows on Annual.
* Every order-summary line shows its amount (Figma shows it only on the primary organisation).
* Typos fixed: "sucessful" → "successful", "paymant" → "payment".
* Footer column headings are white on white in Figma; they keep their space and remain readable to screen readers.
* Dark-theme values for the website tokens are derived (not drawn in Figma).
* Social links point at the platforms' home pages until Wragby's profile URLs are confirmed; Privacy Policy and Terms
  are plain text because those pages do not exist yet.
