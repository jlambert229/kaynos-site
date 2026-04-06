/** Production site URL (canonical host). See netlify.toml DNS note. */
export const SITE_URL = "https://www.kaynos.net";

export const SEO_DEFAULT_DESCRIPTION =
  "Kaynos is video review for coaches. Keep your clients improving between sessions.";

export const SEO_DEFAULT_TITLE = "Kaynos | Keep your clients improving between sessions.";

// TODO: Convert og-share.svg to PNG for best social platform compatibility
// (Twitter/X and some messengers prefer PNG over SVG for OG images).
/** Open Graph / Twitter card (1200x630 in public/). */
export const OG_SHARE_PATH = "/og-share.svg";
export const OG_SHARE_URL = `${SITE_URL}${OG_SHARE_PATH}`;
export const OG_SHARE_ALT =
  "Kaynos: keep your clients improving between sessions";
export const OG_SHARE_WIDTH = 1200;
export const OG_SHARE_HEIGHT = 630;
