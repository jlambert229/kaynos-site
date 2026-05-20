import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const DOCS_ORIGIN = "https://docs.kaynos.net";
const TEAM_ID = "43202946-d721-46b4-a33f-ed07dd8cfee2";
const LABEL_HELP_CENTER = "9f803902-f8f4-4553-8f49-89e1becff555";
const LABEL_FEATURE = "61e8e02a-b0ca-4f23-9c55-7feb5c7c8dba";

const linearSuccess = {
  ok: true,
  json: async () => ({
    data: {
      issueCreate: {
        success: true,
        issue: { id: "issue-1", identifier: "KAY-999", url: "https://linear.app/kaynos/issue/KAY-999" },
      },
    },
  }),
};

function postEvent(body, { origin = DOCS_ORIGIN, ip = "203.0.113.10" } = {}) {
  return {
    httpMethod: "POST",
    headers: {
      origin,
      "x-nf-client-connection-ip": ip,
    },
    body: JSON.stringify(body),
  };
}

function parseLinearInput(fetchMock) {
  const call = fetchMock.mock.calls.find((c) => String(c[0]).includes("linear.app"));
  expect(call).toBeTruthy();
  const payload = JSON.parse(call[1].body);
  return payload.variables.input;
}

describe("_linear.mjs helpers", () => {
  let linear;

  beforeEach(async () => {
    vi.resetModules();
    linear = await import("../netlify/functions/_linear.mjs");
  });

  describe("clean", () => {
    it("trims, strips angle brackets, and caps length", () => {
      expect(linear.clean("  hello  ", 100)).toBe("hello");
      expect(linear.clean("<script>alert(1)</script>", 100)).toBe("scriptalert(1)/script");
      expect(linear.clean("a".repeat(20), 5)).toBe("aaaaa");
    });

    it("collapses excessive newlines", () => {
      expect(linear.clean("line1\n\n\n\nline2", 500)).toBe("line1\n\nline2");
    });
  });

  describe("isValidEmail", () => {
    it("accepts typical addresses and rejects invalid", () => {
      expect(linear.isValidEmail("user@example.com")).toBe(true);
      expect(linear.isValidEmail("bad")).toBe(false);
      expect(linear.isValidEmail("@nodomain.com")).toBe(false);
    });
  });

  describe("originAllowed", () => {
    it("allows docs and www marketing origins", () => {
      expect(linear.originAllowed({ headers: { origin: DOCS_ORIGIN } })).toBe(true);
      expect(linear.originAllowed({ headers: { origin: "https://www.kaynos.net" } })).toBe(true);
      expect(linear.originAllowed({ headers: { origin: "https://evil.example" } })).toBe(false);
    });
  });

  describe("rateLimited", () => {
    it("blocks after more than five requests per IP in the window", async () => {
      vi.resetModules();
      const { rateLimited } = await import("../netlify/functions/_linear.mjs");
      const ip = "198.51.100.42";
      const event = () => ({ headers: { "x-nf-client-connection-ip": ip } });

      for (let i = 0; i < 5; i += 1) {
        expect(rateLimited(event())).toBe(false);
      }
      expect(rateLimited(event())).toBe(true);
    });
  });
});

describe("contact-support handler", () => {
  const mockFetch = vi.fn();

  beforeEach(async () => {
    vi.resetModules();
    vi.stubGlobal("fetch", mockFetch);
    process.env.LINEAR_API_KEY = "test-linear-key";
    mockFetch.mockReset();
    mockFetch.mockResolvedValue(linearSuccess);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.LINEAR_API_KEY;
  });

  it("valid POST creates a Linear issue with support shape", async () => {
    const { handler } = await import("../netlify/functions/contact-support.mjs");
    const res = await handler(postEvent({
      name: "Ada",
      email: "ada@example.com",
      subject: "Billing question",
      description: "Need help with invoice.",
    }));

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toEqual({ ok: true, identifier: "KAY-999" });

    const input = parseLinearInput(mockFetch);
    expect(input.teamId).toBe(TEAM_ID);
    expect(input.title).toBe("[Support] Billing question");
    expect(input.priority).toBe(3);
    expect(input.labelIds).toEqual([LABEL_HELP_CENTER]);
    expect(input.description).toContain("ada@example.com");
    expect(input.description).toContain("Need help with invoice.");
  });

  it("returns 400 when description is missing", async () => {
    const { handler } = await import("../netlify/functions/contact-support.mjs");
    const res = await handler(postEvent({
      name: "Ada",
      email: "ada@example.com",
      subject: "Empty",
      description: "   ",
    }));

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.body).error).toMatch(/description/i);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("returns 403 for disallowed origin", async () => {
    const { handler } = await import("../netlify/functions/contact-support.mjs");
    const res = await handler(postEvent(
      { name: "Ada", email: "ada@example.com", description: "Help" },
      { origin: "https://attacker.example" },
    ));

    expect(res.statusCode).toBe(403);
    expect(JSON.parse(res.body).error).toMatch(/origin/i);
    expect(mockFetch).not.toHaveBeenCalled();
  });
});

describe("feature-request handler", () => {
  const mockFetch = vi.fn();

  beforeEach(async () => {
    vi.resetModules();
    vi.stubGlobal("fetch", mockFetch);
    process.env.LINEAR_API_KEY = "test-linear-key";
    mockFetch.mockReset();
    mockFetch.mockResolvedValue(linearSuccess);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.LINEAR_API_KEY;
  });

  it.each([
    ["critical", 1],
    ["important", 2],
    ["nice-to-have", 4],
    ["unknown-priority", 4],
  ])("maps priority %s to Linear priority %i", async (priorityKey, expected) => {
    const { handler } = await import("../netlify/functions/feature-request.mjs");
    const res = await handler(postEvent({
      name: "Bob",
      email: "bob@example.com",
      title: "Dark mode",
      description: "Please add dark mode.",
      priority: priorityKey,
    }, { ip: `203.0.113.${expected}` }));

    expect(res.statusCode).toBe(200);
    const input = parseLinearInput(mockFetch);
    expect(input.priority).toBe(expected);
    expect(input.title).toBe("[Customer request] Dark mode");
    expect(input.labelIds).toEqual([LABEL_FEATURE, LABEL_HELP_CENTER]);
  });

  it("returns 400 when description is missing", async () => {
    const { handler } = await import("../netlify/functions/feature-request.mjs");
    const res = await handler(postEvent({
      title: "No body",
      description: "",
    }));

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.body).error).toMatch(/description/i);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("allows missing email and records not provided in markdown", async () => {
    const { handler } = await import("../netlify/functions/feature-request.mjs");
    const res = await handler(postEvent({
      title: "Export CSV",
      description: "Export my data.",
    }, { ip: "203.0.113.99" }));

    expect(res.statusCode).toBe(200);
    const input = parseLinearInput(mockFetch);
    expect(input.description).toContain("not provided");
  });
});
