import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "./App.jsx";

/* react-dom/server is the heaviest build-time-only dependency here (~50 KB
   raw minified). Static-importing it puts it in the shared chunk that the
   browser downloads on every page load. Dynamic-importing inside
   prerender() keeps it in its own chunk that strip-build-only-chunks then
   removes once the build finishes. */


/**
 * Helmet's JSON-LD scripts can't be hoisted by extractLeadingHeadMarkup
 * because they don't render at the start of the React tree — components
 * above the Helmet site (e.g. BackToTop in AppRoutes) put their own
 * markup first, so the scripts end up mid-body.
 *
 * This function scans the entire HTML, lifts every
 * `<script type="application/ld+json">…</script>` out of the body, and
 * returns the scripts (to add to head) plus the stripped HTML. We
 * intentionally match only `application/ld+json` — relocating arbitrary
 * inline scripts would have surprising side effects.
 *
 * @param {string} html
 * @returns {{ stripped: string, scripts: string[] }}
 */
export function extractJsonLdScripts(html) {
  const re = /<script\b[^>]*\btype\s*=\s*["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi;
  const scripts = html.match(re) || [];
  const stripped = scripts.length ? html.replace(re, "") : html;
  return { stripped, scripts };
}

/**
 * React 19 renders Helmet `<title>`, `<meta>`, and `<link>` at the start of
 * the root HTML string. Move them into the document head via
 * vite-prerender-plugin.
 * @param {string} rootHtml
 */
export function extractLeadingHeadMarkup(rootHtml) {
  let rest = rootHtml.trimStart();
  const fragments = [];
  let plainTitle = "";

  const tryStrip = () => {
    const titleMatch = /^<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(rest);
    if (titleMatch && titleMatch.index === 0) {
      plainTitle = titleMatch[1].trim();
      fragments.push(titleMatch[0]);
      rest = rest.slice(titleMatch[0].length).trimStart();
      return true;
    }
    const metaMatch = /^<meta\b[^>]*>/i.exec(rest);
    if (metaMatch && metaMatch.index === 0) {
      fragments.push(metaMatch[0]);
      rest = rest.slice(metaMatch[0].length).trimStart();
      return true;
    }
    const linkMatch = /^<link\b[^>]*>/i.exec(rest);
    if (linkMatch && linkMatch.index === 0) {
      fragments.push(linkMatch[0]);
      rest = rest.slice(linkMatch[0].length).trimStart();
      return true;
    }
    return false;
  };

  while (tryStrip()) { /* strip until no more head tags match */ }

  const withoutTitle = fragments.filter((f) => !/^<title\b/i.test(f));
  return { innerHtml: rest, plainTitle, headMarkup: withoutTitle };
}

/**
 * @param {{ url: string }} data
 */
export async function prerender(data) {
  const url = data.url || "/";
  const { renderToString } = await import("react-dom/server");
  const raw = renderToString(
    <HelmetProvider>
      <MemoryRouter initialEntries={[url]} initialIndex={0}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>,
  );

  const { innerHtml, plainTitle, headMarkup } = extractLeadingHeadMarkup(raw);
  // Lift JSON-LD scripts out of the body so they land in <head> — canonical
  // placement for crawlers, and matches the intent of Helmet's
  // `prioritizeSeoTags` flag (which prioritizes meta/link/title but does not
  // reorder scripts).
  const { stripped, scripts } = extractJsonLdScripts(innerHtml);

  const head = {
    lang: "en",
    title: plainTitle,
    elements: new Set([...headMarkup, ...scripts]),
  };

  const { parseLinks } = await import("vite-prerender-plugin/parse");
  const links = new Set(parseLinks(stripped));

  return { html: stripped, links, head };
}
