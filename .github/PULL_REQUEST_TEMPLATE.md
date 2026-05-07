<!--
  Keep titles short (<70 chars). Use the body for detail.
  Convention: <type>: <summary>  — types: feat, fix, chore, docs, refactor, ux, copy, polish, test, build, ci
-->

## Summary

<!-- 1-3 bullets. What changes, why now. Skip the "what files" recap; the diff shows that. -->

## Test plan

<!-- Bulleted, concrete. Each box maps to something a reviewer can verify. -->
- [ ] `npm run lint` — clean
- [ ] `npm test` — clean
- [ ] `npm run build` — prerender + sitemap + SEO check green
- [ ] Manual verification (browser/device) — describe what you exercised

## Notes for reviewer

<!-- Anything tricky, anything you skipped on purpose, deploy considerations.
     If this PR changes behavior visible to visitors, call it out here. -->

<!-- Merging this PR to `main` triggers a Netlify production deploy for
     www.kaynos.net. Hold the merge until reviews + checks pass. -->
