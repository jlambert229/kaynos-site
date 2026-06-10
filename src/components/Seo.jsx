import { Helmet } from "react-helmet-async";
import {
  SITE_URL,
  SEO_DEFAULT_DESCRIPTION,
  OG_SHARE_URL,
  OG_SHARE_ALT,
  OG_SHARE_WIDTH,
  OG_SHARE_HEIGHT,
  TWITTER_HANDLE,
} from "../seo/constants";

/** Normalize a route path for canonical URL construction. */
export function normalizePath(path) {
  if (path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

/** Build a BreadcrumbList for a path: Home → page. Intermediate path
 *  segments (e.g. /for in /for/coaches) aren't real routes, and Google
 *  requires `item` on every ListItem except the last — so non-routable
 *  parents are omitted from the trail rather than listed without a URL. */
export function buildBreadcrumbs(path, pageTitle) {
  const normalized = normalizePath(path);
  if (!normalized) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: pageTitle, item: `${SITE_URL}${normalized}` },
    ],
  };
}

/* SERP truncation happens around these lengths on Google desktop. They're
   soft budgets — exceeding doesn't break anything, but the tail gets cut. */
const SEO_TITLE_BUDGET = 60;
const SEO_DESCRIPTION_BUDGET = 160;

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
  const pageTitle = title.includes("|") ? title : `${title} | Kaynos`;
  // Normalize relative overrides to absolute URLs — crawlers require them.
  const imageUrl = ogImage
    ? (ogImage.startsWith("/") ? `${SITE_URL}${ogImage}` : ogImage)
    : OG_SHARE_URL;
  const imageAlt = ogImageAlt || (ogImage ? title : OG_SHARE_ALT);
  // Noindexed pages (404) skip canonical + breadcrumbs: a canonical pointing
  // at a URL that returns 404 sends Google mixed signals.
  const breadcrumbs = noIndex ? null : buildBreadcrumbs(path, title);

  if (import.meta.env?.DEV) {
    if (pageTitle.length > SEO_TITLE_BUDGET) {
      console.warn(`[Seo] title exceeds ${SEO_TITLE_BUDGET} chars (${pageTitle.length}) for ${path}: "${pageTitle}"`);
    }
    if (description.length > SEO_DESCRIPTION_BUDGET) {
      console.warn(`[Seo] description exceeds ${SEO_DESCRIPTION_BUDGET} chars (${description.length}) for ${path}`);
    }
  }

  return (
    <Helmet prioritizeSeoTags>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {noIndex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <link rel="canonical" href={canonicalUrl} />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Kaynos" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      {/* Dimensions are only known for the default share image. */}
      {!ogImage && <meta property="og:image:width" content={String(OG_SHARE_WIDTH)} />}
      {!ogImage && <meta property="og:image:height" content={String(OG_SHARE_HEIGHT)} />}
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
      {breadcrumbs ? (
        <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
      ) : null}
    </Helmet>
  );
}