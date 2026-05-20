/**
 * HTTP-triggered Netlify Function: docs.kaynos.net feature request form.
 *
 * Accepts JSON POST { name, email, title, description, priority } from the
 * Mintlify-hosted docs site and creates a Linear issue tagged
 * [Customer request] with FEATURE + HELP_CENTER labels.
 *
 * Required env var: LINEAR_API_KEY (set in Netlify dashboard, kaynos-site site).
 */

import {
  TEAM_ID,
  LABEL_FEATURE,
  LABEL_HELP_CENTER,
  PRIORITY_MAP,
  clean,
  isValidEmail,
  originAllowed,
  rateLimited,
  preflight,
  jsonResponse,
  createLinearIssue,
} from "./_linear.mjs";

export const handler = async (event) => {
  const pre = preflight(event);
  if (pre) return pre;

  const originHeader = event.headers?.origin || event.headers?.Origin || "";

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed." }, originHeader);
  }
  if (!originAllowed(event)) {
    return jsonResponse(403, { error: "Origin not allowed." }, originHeader);
  }
  if (rateLimited(event)) {
    return jsonResponse(429, { error: "Too many submissions. Try again in a minute." }, originHeader);
  }

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { error: "Malformed JSON body." }, originHeader);
  }

  const title = clean(data.title, 200) || "Untitled feature request";
  const description = clean(data.description, 5000);
  if (description.length === 0) {
    return jsonResponse(400, { error: "Description is required." }, originHeader);
  }
  const name = clean(data.name, 200) || "Anonymous";
  const rawEmail = clean(data.email, 200);
  const email = !rawEmail
    ? "not provided"
    : isValidEmail(rawEmail) ? rawEmail : "invalid email provided";
  const priority = PRIORITY_MAP[data.priority] || 4;

  const markdown = [
    "## Customer feature request",
    "",
    `**From:** ${name} (${email})`,
    `**Priority (self-reported):** ${data.priority || "not specified"}`,
    "",
    "---",
    "",
    description,
    "",
    "---",
    "_Submitted via [docs.kaynos.net](https://docs.kaynos.net/feature-requests) feature request form._",
  ].join("\n");

  const result = await createLinearIssue({
    teamId: TEAM_ID,
    title: `[Customer request] ${title}`,
    description: markdown,
    priority,
    labelIds: [LABEL_FEATURE, LABEL_HELP_CENTER],
  }, "feature-request");

  if (!result.ok) {
    return jsonResponse(result.status, { error: result.message }, originHeader);
  }
  return jsonResponse(200, { ok: true, identifier: result.identifier }, originHeader);
};
