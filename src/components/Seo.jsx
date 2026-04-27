import { Helmet } from "react-helmet-async";
import {
  SITE_URL,
  SEO_DEFAULT_DESCRIPTION,
  OG_SHARE_URL,
  OG_SHARE_ALT,
  OG_SHARE_WIDTH,
  OG_SHARE_HEIGHT,
} from "../seo/constants";

/** Normalize a route path for canonical URL construction. */
function normalizePath(path) {
  if (path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

/** Title-case a single path segment (e.g. "for" → "For", "data-use" → "Data Use"). */
function segmentLabel(seg) {
  return seg
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

/** Build a BreadcrumbList ItemList for a path with any number of segments.
 *  Intermediate segments (not the final leaf) omit `item` to avoid pointing at
 *  URLs that may not resolve as real routes (e.g., /for exists only as a parent). */
function buildBreadcrumbs(path, pageTitle) {
  const segments = normalizePath(path).split("/").filter(Boolean);
  if (segments.length === 0) return null;
  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
  ];
  let acc = "";
  segments.forEach((seg, i) => {
    acc += `/${seg}`;
    const isLast = i === segments.length - 1;
    const item = isLast
      ? { "@type": "ListItem", position: i + 2, name: pageTitle, item: `${SITE_URL}${acc}` }
      : { "@type": "ListItem", position: i + 2, name: segmentLabel(seg) };
    items.push(item);
  });
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items };
}

/**
 * Per-route SEO: title, description, canonical, Open Graph, Twitter.
 * @param {{ title: string; description?: string; path: string; jsonLd?: object; noIndex?: boolean; ogImage?: string; ogImageAlt?: string }} props
 */
export default function Seo({
  title,
  description = SEO_DEFAULT_DESCRIPTION,
  path,
  jsonLd,
  noIndex = false,
  ogImage,
  ogImageAlt,
}) {
  const canonicalUrl = `${SITE_URL}${normalizePath(path) || "/"}`;
  const pageTitle = title.includes("|") ? title : `${title} | Badgerskope`;
  const imageAlt = ogImageAlt || (ogImage ? title : OG_SHARE_ALT);
  const breadcrumbs = buildBreadcrumbs(path, title);

  return (
    <Helmet prioritizeSeoTags>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex ? <meta name="robots" content="noindex, follow" /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Badgerskope" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage || OG_SHARE_URL} />
      <meta property="og:image:width" content={String(OG_SHARE_WIDTH)} />
      <meta property="og:image:height" content={String(OG_SHARE_HEIGHT)} />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || OG_SHARE_URL} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <meta name="twitter:site" content="@kaynos_net" />
      <meta name="twitter:creator" content="@kaynos_net" />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
      {breadcrumbs ? (
        <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
      ) : null}
    </Helmet>
  );
}
