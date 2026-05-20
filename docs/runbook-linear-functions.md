# Linear feedback functions runbook

HTTP Netlify Functions on **kaynos-site** accept JSON POSTs from docs.kaynos.net (and www for testing) and create Linear issues.

| Function | Path | Purpose |
| --- | --- | --- |
| `contact-support` | `/.netlify/functions/contact-support` | Help center contact form |
| `feature-request` | `/.netlify/functions/feature-request` | Feature requests |

Shared logic: `netlify/functions/_linear.mjs`.

## Secrets

| Variable | Where | Notes |
| --- | --- | --- |
| `LINEAR_API_KEY` | Netlify → Site → Environment variables (kaynos-site) | Required in production. Copy to local `.env` for `netlify dev` (see `.env.example`). |

Rotate via Linear → Settings → API → Personal API keys. After rotation: update Netlify env, redeploy functions, smoke test both endpoints.

## CORS

`ALLOWED_ORIGINS` in `_linear.mjs`:

- `https://docs.kaynos.net`
- `https://www.kaynos.net`

Deploy previews on `deploy-preview-*--kaynos-docs.netlify.app` are **not** in the allowlist. Test docs forms against production docs or add a preview origin temporarily if needed.

## Rate limiting (limitations)

The in-memory limiter in `_linear.mjs` allows **5 requests per minute per IP per warm function instance**.

| What it does | What it does not do |
| --- | --- |
| Slows accidental double-clicks / double-submits | Stop distributed or determined abuse |
| Applies within one warm Lambda/container | Share state across cold starts or instances |

**Decision (2026-05):** Edge-level rate limiting (Netlify, Cloudflare) or a shared store (e.g. Upstash) is **not** required at current traffic. Revisit if abuse appears in function logs or Linear spam.

Other controls already in place: origin allowlist, honeypot fields on docs forms, input length limits, Linear API key server-side only.

## Local testing

```bash
cp .env.example .env   # set LINEAR_API_KEY
netlify dev
curl -X POST http://localhost:8888/.netlify/functions/contact-support \
  -H "Content-Type: application/json" \
  -H "Origin: https://docs.kaynos.net" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

Unit tests (mocked Linear): `npm test -- tests/linearFunctions.test.js`

## Monitoring

- Netlify → Functions → logs for `issue_created`, `linear_error`, `rate_limited` JSON lines.
- Linear team **KAY** for new issues with labels Help Center / Feature Request.
