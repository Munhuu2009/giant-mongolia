\---

name: Giant Mongolia design system

alwaysApply: true

\---



Stack: Next.js App Router, TypeScript, Tailwind CSS v4. Do not add packages.



Look: premium, athletic, technical. Sharp corners (never rounded-\*). Black, white and grey, with one red `accent` used only for hover, focus, badges and the hero period. No gradients except image overlays. No emojis.



Always reuse what exists:

\- Buttons: `Button` / `ButtonLink` from `@/components/ui/Button` (variants: primary, secondary, inverse, inverse-outline, accent, link; sizes sm, md, lg). Never hand-style a button.

\- Layout: wrap every section in `Section` (tone: light, muted, dark, black) and `Container`.

\- Headings: use the `type-display`, `type-headline`, `type-title`, `type-label` classes. Never set heading sizes by hand.

\- Section intro: `SectionHeading`. Fade-in: `Reveal`, once per block, not per card.

\- Content lives in `data/\*.ts`, never hardcoded in JSX. Prices use `formatMnt` from `@/lib/format`. Merge classes with `cn` from `@/lib/cn`.



Quality bar:

\- Mobile first. Touch targets at least 44px. Visible focus states. Real <button> and <a>. Alt text on images.

\- Use `next/image` with `sizes`. Product photos stay 11:6.

\- Change only what was asked. Keep exports and props the same. No unused imports, no `any`.

