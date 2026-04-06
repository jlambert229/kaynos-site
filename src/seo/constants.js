/** Production site URL (canonical host). See netlify.toml DNS note. */
export const SITE_URL = "https://www.kaynos.net";

export const SEO_DEFAULT_DESCRIPTION =
  "Kaynos is video review for coaches. Your clients get better feedback tools, and every active client lowers your monthly cost.";

export const SEO_DEFAULT_TITLE = "Kaynos | Video review for coaches. Clients lower your cost.";

// TODO: Convert og-share.svg to PNG for best social platform compatibility
// (Twitter/X and some messengers prefer PNG over SVG for OG images).
/** Open Graph / Twitter card (1200x630 in public/). */
export const OG_SHARE_PATH = "/og-share.svg";
export const OG_SHARE_URL = `${SITE_URL}${OG_SHARE_PATH}`;
export const OG_SHARE_ALT =
  "Kaynos: private video training for coaches";
export const OG_SHARE_WIDTH = 1200;
export const OG_SHARE_HEIGHT = 630;
