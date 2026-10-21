---
name: Giant Mongolia design system
alwaysApply: true
---

Stack: Next.js App Router, TypeScript, Tailwind CSS v4. Do not add packages.

Look: bold, rounded, athletic. Pill buttons, large rounded panels and cards (`--r-panel`, `--r-card`, `--r-media`, `--r-pill`). Red `accent` for primary actions, badges, focus and the hero period. Gradients only as image overlays. No emojis.

Themes: light and dark are CSS variables in `app/globals.css` (`--bg`, `--bg-alt`, `--surface`, `--soft`, `--ink`, `--ink-2`, `--line`, `--accent`). Never hardcode colors in components; use the variables. The theme is set before first paint by the inline script in `app/layout.tsx` (`data-theme` on `<html>`, saved in `localStorage` as `gm-theme`).

Always reuse what exists:

- Buttons: `Button` / `ButtonLink` from `@/components/ui/Button` (variants: primary, secondary, ghost, glass, glass-strong; sizes sm, md, lg). Solid variants on flat surfaces; `glass` and `glass-strong` only on top of photos. Icon-only buttons use `icon-btn` (and `icon-btn-glass` over photos). Never hand-style a button.
- Layout: `wrap` for width and side padding, `section` for plain sections, `panel` / `panel-dark` for rounded sections, `photo-panel` for sections over a photo. Add `on-photo` to anything sitting on an image so focus rings stay white.
- Headings: `type-display`, `type-headline`, `type-title`, `type-label`, `type-lead`. Never set heading sizes by hand.
- Section intro: `SectionHeading`. Cards: `card`, `product-card`.
- Content lives in `data/*.ts`, never hardcoded in JSX. Prices use `formatMnt`.

Quality bar:

- Mobile first. Touch targets at least 44px. Visible focus states. Real <button> and <a>. Alt text on images.
- Use `next/image` with `sizes`. Product photos stay 11:6.
- `backdrop-filter` only on the header, glass buttons, glass chips and glass cards. Do not add it elsewhere.
- Change only what was asked. Keep exports and props the same. No unused imports, no `any`.
