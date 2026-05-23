# wl-kay-1591-marketing-site-polish

Linear: [KAY-1591](https://linear.app/kaynos/issue/KAY-1591/marketing-site-polish-ia-perf-seo-forms-tests)
Branch: `kay-1591-marketing-site-polish`
Repo: `kaynos-site` (worktree at `/tmp/wt-best-site`)
Started: 2026-05-22

## Goal

Audit + polish pass on the marketing site (www.kaynos.net). Confirm IA, SEO, perf, forms, headers, and Plausible event tagging are all in good shape. Add targeted tests where coverage is thin. No production deploy — PR only.

## Baseline (before any edits)

- `npm run build` — green; 14 prerendered pages; CSP + sitemap verification scripts all green
- `npm test` — 126 passed, 1 skipped (17 files)
- React 19, Vite 8 (rolldown), prerender via `vite-prerender-plugin`
- Branch is fresh from `origin/main`

## Audit findings

### IA + content

- **Pages**: `/`, `/for/coaches`, `/for/students`, `/about`, `/getting-started`, `/changelog`, `/contact`, `/security`, `/status`, `/privacy`, `/data-use`, `/terms`, `/processors`, `/accessibility`. NotFound is the SPA fallback. `/docs/*` 301s server-side to `/getting-started` (and SPA-side via `<Navigate>`).
- **Single source of truth for routes**: `scripts/publicRoutes.mjs` already drives sitemap, prerender artifacts, and e2e nav matchers (KAY-1493). 
- **Pricing**: single flat $29/mo Coach Plan, students free. All copy + JSON-LD reads from `src/config/pricing.js`. Honest soft-limit note + 14-day trial language.
- **Testimonials**: replaced with an honest "still early days" section that points to the demo + changelog. No fake quotes.
- **Hero CTA**: "Start 14-Day Trial" → `app.kaynos.net/signup` with `plausible-event-name=Signup`.
- **Navbar / mobile menu**: focus trap, ESC handler, body-scroll lock, `aria-current`, skip-to-content link — all present.

### SEO

- `src/components/Seo.jsx` already handles canonical, OG, Twitter, JSON-LD, breadcrumbs, and warns in dev if title/description exceed SERP budget.
- `src/seo/*` provides per-page JSON-LD (Home, Pricing, FAQ, Contact, BreadcrumbList).
- `verify-prerender-seo.mjs` runs in postbuild and confirms 14 unique titles/descriptions.
- `og-share.png` (1200×630) under `public/`.

### Build + perf

- Code-split: vendor chunks separate from page chunks; bundle size healthy (index 178 kB JS / 56 kB gzip, CSS 47 kB / 9 kB gzip).
- `strip-build-only-chunks.mjs` removes `parse-*.js` + `server.browser-*.js` from dist (390 kB freed).
- `compute-csp.mjs` hashes inline JSON-LD scripts on every build; CSP lives only in `dist/_headers` (not netlify.toml) so the hashes don't get clobbered.
- `verify-dist-headers.mjs` + `verify-sitemap-dist.mjs` are postbuild gates.

### Headers (netlify.toml)

- `X-Frame-Options=DENY`, `X-Content-Type-Options=nosniff`, `Referrer-Policy=strict-origin-when-cross-origin`, `Strict-Transport-Security=max-age=31536000; includeSubDomains; preload`, `Cross-Origin-Opener-Policy=same-origin`, `Cross-Origin-Resource-Policy=same-origin`, comprehensive `Permissions-Policy` denying all Privacy Sandbox + classic origin-trial capabilities.
- CSP intentionally NOT in netlify.toml (lives in `dist/_headers` so the postbuild hashes are authoritative).

### Forms

- **Newsletter** (`src/sections/Newsletter.jsx`): Netlify Forms (`data-netlify="true"`), honeypot, 15s abort timeout, plausible `Newsletter Signup` + `Newsletter Signup Error` events, consent checkbox required.
- **Contact** (`src/pages/Contact.jsx`): Netlify Forms, honeypot, validation (email regex + length), plausible `Contact Submit` + `Contact Submit Error`, 15s abort.
- **Linear functions** (`netlify/functions/contact-support.mjs`, `feature-request.mjs`): for docs.kaynos.net origin; CORS gated, rate-limited, origin-allowed. Tested in `tests/linearFunctions.test.js`.

### Plausible analytics

- Script: `https://plausible.io/js/script.tagged-events.js` with `data-domain="kaynos.net"`, defer load, preconnect hint.
- Tagged links via `plausible-event-name=Signup`, `plausible-event-name=Demo+Coach`, `plausible-event-name=Demo+Student` on every CTA.
- Form events fired manually via `window.plausible?.(...)`.

### Tests

- 17 test files, 126 passing. Covers prerender HTML head, sitemap, CSP, JSON-LD shape, public routes manifest, Footer, KaynosLogo, components/sections smoke, scroll reveal, error boundary, Linear function handlers.

## Planned edits

The site is in very good shape. Targeted improvements:

1. **CtaButton smoke test**: assert href + plausible-event-name class.
2. **DemoLink smoke test**: assert variant routing (coach vs student) + plausible-event-name class + new-tab attributes.
3. **Newsletter / Contact instrumentation tests** — verify the `plausible` global gets the right event on success + failure (already partially covered in `round-4-instrumentation.spec.js`; add a unit-level guard).
4. **Hero CTA test**: assert both CTAs render with correct targets in unit space (already e2e-covered; cheap unit-level mirror for fast feedback).

No content/copy changes — the voice and structure are intentional and aligned with the "solo coach beta" memory.

## Plan

- Add 3-4 small unit tests
- Re-run `npm test` and `npm run build`
- Run `npm run test:e2e:chromium`
- Commit, push, open PR (no auto-merge)
