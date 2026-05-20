# Deploy preview checklist

Use on PRs that touch analytics, headers, CSP, redirects, or forms.

## Security headers / CSP (KAY-1496)

After Netlify publishes the deploy preview:

```bash
export DEPLOY_PREVIEW_URL="https://deploy-preview-<N>--kaynos-site.netlify.app"
npm run verify:remote-headers
curl -sIL "$DEPLOY_PREVIEW_URL/" | grep -iE '^content-security-policy:|^x-frame-options:|^strict-transport-security:'
```

Build-time fallback (no live URL): `npm run build` runs `verify-dist-headers.mjs` in postbuild.

## Plausible analytics (KAY-1503)

On deploy preview or production (browser devtools → Network):

1. Load the homepage.
2. Click a CTA with class `plausible-event-name=Signup` (or other tagged control).
3. Confirm `POST https://plausible.io/api/event` with expected event name.

E2E does not assert live Plausible POSTs on localhost (`tests/e2e/round-4-instrumentation.spec.js` covers CSS class wiring only).

## Netlify Forms

See `docs/runbook-netlify-forms.md` — submit contact + newsletter on preview if form markup changed.

## Docs form endpoints (cross-repo)

If kaynos-docs forms POST to kaynos-site functions, test on **production docs** (preview origins may fail CORS). See `docs/runbook-linear-functions.md`.
