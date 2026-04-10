import { Helmet } from "react-helmet-async";
import {
  SITE_URL,
  SEO_DEFAULT_DESCRIPTION,
  SEO_DEFAULT_TITLE,
  OG_SHARE_URL,
  OG_SHARE_ALT,
  OG_SHARE_WIDTH,
  OG_SHARE_HEIGHT,
} from "../seo/constants";

/**
 * Per-route SEO: title, description, canonical, Open Graph, Twitter.
 * @param {{ title: string; description?: string; path: string; jsonLd?: object }} props
 */
export default function Seo({
  title,
  description = SEO_DEFAULT_DESCRIPTION,
  path,
  jsonLd,
  noIndex = false,
}) {
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${SITE_URL}${normalizedPath || "/"}`;
  const pageTitle = title.includes("|") ? title : `${title} | Kaynos`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex ? <meta name="robots" content="noindex, follow" /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Kaynos" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_SHARE_URL} />
      <meta property="og:image:width" content={String(OG_SHARE_WIDTH)} />
      <meta property="og:image:height" content={String(OG_SHARE_HEIGHT)} />
      <meta property="og:image:alt" content={OG_SHARE_ALT} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_SHARE_URL} />
      <meta name="twitter:image:alt" content={OG_SHARE_ALT} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}

/**
 * @deprecated Use the default Seo export with path="/" instead.
 * Kept temporarily for backward-compat; delegates to the main component.
 */
export function SeoHome({ jsonLd }) {
  return (
    <Seo
      title={SEO_DEFAULT_TITLE}
      description={SEO_DEFAULT_DESCRIPTION}
      path="/"
      jsonLd={jsonLd}
    />
  );
}
