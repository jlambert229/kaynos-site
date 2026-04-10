import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "./App.jsx";


/**
 * React 19 renders Helmet `<title>`, `<meta>`, and `<link>` at the start of the
 * root HTML string. Move them into the document head via vite-prerender-plugin.
 * @param {string} rootHtml
 */
function extractLeadingHeadMarkup(rootHtml) {
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

  while (tryStrip()) { }

  const withoutTitle = fragments.filter((f) => !/^<title\b/i.test(f));
  return { innerHtml: rest, plainTitle, headMarkup: withoutTitle };
}

/**
 * @param {{ url: string }} data
 */
export async function prerender(data) {
  const url = data.url || "/";
  const raw = renderToString(
    <HelmetProvider>
      <MemoryRouter initialEntries={[url]} initialIndex={0}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>,
  );

  const { innerHtml, plainTitle, headMarkup } = extractLeadingHeadMarkup(raw);

  const head = {
    lang: "en",
    title: plainTitle,
    elements: new Set(headMarkup),
  };

  const { parseLinks } = await import("vite-prerender-plugin/parse");
  const links = new Set(parseLinks(innerHtml));

  return { html: innerHtml, links, head };
}
