# Netlify Forms runbook (marketing site)

Contact and newsletter forms on www.kaynos.net use [Netlify Forms](https://docs.netlify.com/forms/setup/) (HTML POST to `/`), not the Linear HTTP functions used by docs.kaynos.net.

## Form names

| Form | Component | Netlify form `name` |
| --- | --- | --- |
| Contact | `src/pages/Contact.jsx` | `contact` |
| Newsletter | `src/components/Newsletter.jsx` | `newsletter` |

## Where submissions go

1. **Netlify dashboard:** Site → Forms → filter by form name. Requires Netlify login for the kaynos-site project.
2. **Email notifications:** Configured in Netlify → Site configuration → Forms → Form notifications. Verify recipients in the dashboard (do not commit addresses to git).

## Testing

| Environment | Steps |
| --- | --- |
| Deploy preview | Submit each form on the preview URL; confirm a new row appears under Forms in Netlify within ~1 minute. |
| Production | Smoke test after deploy if form markup or `data-netlify` attributes changed. |

## Failure modes

| Symptom | Likely cause | Action |
| --- | --- | --- |
| 404 on POST | Form not detected at build (missing `data-netlify` or hidden form) | Rebuild; check `dist/**/*.html` for `netlify` form attributes |
| Submission missing in dashboard | Wrong site / preview vs prod | Confirm deploy URL matches the Netlify site you are viewing |
| No email | Notification not configured or filtered as spam | Check Netlify notification settings and recipient spam folder |

## Escalation

- Product/support routing: support@kaynos.net (see `src/config/urls.js`).
- Netlify platform outage: https://www.netlifystatus.com

## Related

- Docs feedback forms → kaynos-site Linear functions: `docs/runbook-linear-functions.md`
- Recovery priority: `kaynos-recovery/` (app before marketing site)
