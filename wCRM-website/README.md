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
| `/pricing` | `crm-pricing-page` (231:636): Monthly / Annual switch, plan cards, "Compare every included feature" table |
| `/contact` | `crm-contact-sales` (231:1058) → sent state (367:10351) |
| `/checkout/configure` | `crm-configure-plan` (231:956, several organisations 367:10622) + `wcrm-add-orgs-modal` (372:2334) |
| `/checkout/account` | `wcrm-create-account` (372:2542) + `successful popup` (372:3583) |
| `/checkout/verify` | `otp-verification` (372:3189) |
| `/checkout/company` | `wcrm-company-details` (372:2618) |
| `/checkout/review` | `wcrm-review` (372:2692) + `edit-modal` (372:3262) |
| `/checkout/payment` | `wcrm-payment`: methods (372:2780), card (372:2925), transfer (372:3444) + `Success-Card` (372:3555) |

Header "Features" lists the site's four features (Contact Management, Deal Management, Activities & Reporting,
Budget & Targets) in the layout of Figma's `feature-list-card` (364:8564), with design-system icons and a "Learn more"
cue; each scrolls to its card on the homepage. A "Back to top" button appears lower right once a page is scrolled.
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
