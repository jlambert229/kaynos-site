/**
 * HTTP-triggered Netlify Function: docs.kaynos.net contact support form.
 *
 * Accepts JSON POST { name, email, subject, description } from the
 * Mintlify-hosted docs site and creates a Linear issue tagged
 * [Support] with HELP_CENTER label, priority Medium.
 *
 * Required env var: LINEAR_API_KEY (set in Netlify dashboard, kaynos-site site).
 */

import {
  TEAM_ID,
  LABEL_HELP_CENTER,
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

  const subject = clean(data.subject, 200) || "Untitled support request";
  const description = clean(data.description, 5000);
  if (description.length === 0) {
    return jsonResponse(400, { error: "Description is required." }, originHeader);
  }
  const rawEmail = clean(data.email, 200);
  if (!rawEmail || !isValidEmail(rawEmail)) {
    return jsonResponse(400, { error: "A valid email address is required." }, originHeader);
  }
  const name = clean(data.name, 200) || "Anonymous";

  const markdown = [
    "## Customer support request",
    "",
    `**From:** ${name} (${rawEmail})`,
    "",
    "---",
    "",
    description,
    "",
    "---",
    "_Submitted via [docs.kaynos.net](https://docs.kaynos.net/contact) support form. Reply to the email above._",
  ].join("\n");

  const result = await createLinearIssue({
    teamId: TEAM_ID,
    title: `[Support] ${subject}`,
    description: markdown,
    priority: 3,
    labelIds: [LABEL_HELP_CENTER],
  }, "contact-support");

  if (!result.ok) {
    return jsonResponse(result.status, { error: result.message }, originHeader);
  }
  return jsonResponse(200, { ok: true, identifier: result.identifier }, originHeader);
};
