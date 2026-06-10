/**
 * Shared helpers for docs.kaynos.net feedback forms.
 *
 * Functions in this directory accept HTTP POST from the Mintlify-hosted docs
 * site and create Linear issues. The legacy behaviour (Netlify Forms event ->
 * submission-created.js) is preserved by reusing the same Linear team, labels,
 * priorities, and markdown layout.
 */

export const LINEAR_API = "https://api.linear.app/graphql";
export const TEAM_ID = "43202946-d721-46b4-a33f-ed07dd8cfee2";
export const LABEL_FEATURE = "61e8e02a-b0ca-4f23-9c55-7feb5c7c8dba";
export const LABEL_HELP_CENTER = "9f803902-f8f4-4553-8f49-89e1becff555";

export const ALLOWED_ORIGINS = new Set([
  "https://docs.kaynos.net",
  "https://www.kaynos.net",
]);

export const PRIORITY_MAP = {
  "nice-to-have": 4,
  "important": 2,
  "critical": 1,
};

export function corsHeaders(origin) {
  const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://docs.kaynos.net";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

export function preflight(event) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders(event.headers?.origin || event.headers?.Origin || ""),
      body: "",
    };
  }
  return null;
}

export function jsonResponse(statusCode, body, originHeader) {
  return {
    statusCode,
    headers: {
      ...corsHeaders(originHeader),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

export function sanitizeMarkdown(str) {
  return String(str).replace(/[<>]/g, "").replace(/\n{3,}/g, "\n\n");
}

export function clean(str, max) {
  const s = sanitizeMarkdown(String(str || "").trim());
  return s.length > max ? s.slice(0, max) : s;
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Verify the request came from an allowed origin. Returns true if the Origin
 * header matches one of the allowed values (Mintlify-hosted docs, or the
 * marketing site for testing).
 */
export function originAllowed(event) {
  const origin = event.headers?.origin || event.headers?.Origin || "";
  return ALLOWED_ORIGINS.has(origin);
}

/**
 * Crude in-memory per-IP rate limiter. Per-instance (Netlify Functions are
 * stateless across cold starts), so it does not stop a determined attacker.
 * Intended only to slow accidental rapid double-submits from the form.
 *
 * Limitations and escalation path: docs/runbook-linear-functions.md
 */
const rateBucket = new Map();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;

export function rateLimited(event) {
  const ip = event.headers?.["x-nf-client-connection-ip"]
    || event.headers?.["client-ip"]
    || event.headers?.["x-forwarded-for"]?.split(",")[0]?.trim()
    || "unknown";
  const now = Date.now();
  // Evict idle IPs so the map can't grow unbounded over a warm instance's
  // lifetime — old keys were previously only filtered when the same IP hit
  // again.
  for (const [key, times] of rateBucket) {
    if (times.every((t) => now - t >= RATE_WINDOW_MS)) rateBucket.delete(key);
  }
  const arr = (rateBucket.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  arr.push(now);
  rateBucket.set(ip, arr);
  return arr.length > RATE_MAX;
}

async function fetchWithRetry(url, options, retries = 1) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeout);
      if (res.status >= 500 && attempt < retries) {
        await new Promise((r) => setTimeout(r, 1000));
        continue;
      }
      return res;
    } catch (err) {
      clearTimeout(timeout);
      if (attempt < retries && err.name !== "AbortError") {
        await new Promise((r) => setTimeout(r, 1000));
        continue;
      }
      throw err;
    }
  }
}

/**
 * Create a Linear issue. Returns { ok: true, identifier, url } or
 * { ok: false, status, message } so the caller can map to an HTTP response.
 */
export async function createLinearIssue(input, logPrefix) {
  const apiKey = process.env.LINEAR_API_KEY;
  if (!apiKey) {
    console.error(`${logPrefix}: LINEAR_API_KEY not set`);
    return { ok: false, status: 500, message: "Server not configured." };
  }

  const mutation = `
    mutation CreateIssue($input: IssueCreateInput!) {
      issueCreate(input: $input) {
        success
        issue { id identifier url }
      }
    }
  `;

  try {
    const res = await fetchWithRetry(LINEAR_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify({ query: mutation, variables: { input } }),
    });
    const json = await res.json();
    if (json.data?.issueCreate?.success) {
      const issue = json.data.issueCreate.issue;
      console.log(JSON.stringify({
        event: "issue_created",
        source: logPrefix,
        identifier: issue.identifier,
        url: issue.url,
        timestamp: new Date().toISOString(),
      }));
      return { ok: true, identifier: issue.identifier, url: issue.url };
    }
    console.error(JSON.stringify({
      event: "linear_error",
      source: logPrefix,
      errors: json.errors || json,
      timestamp: new Date().toISOString(),
    }));
    return { ok: false, status: 502, message: "Failed to create Linear issue." };
  } catch (err) {
    if (err.name === "AbortError") {
      console.error(JSON.stringify({ event: "linear_timeout", source: logPrefix }));
      return { ok: false, status: 504, message: "Linear API timeout." };
    }
    console.error(JSON.stringify({
      event: "linear_request_failed",
      source: logPrefix,
      error: err.message,
    }));
    return { ok: false, status: 502, message: "Linear API request failed." };
  }
}
