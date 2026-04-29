import { PRICING_COPY } from "../config/pricing";

/** Production site URL (canonical host). See netlify.toml DNS note. */
export const SITE_URL = "https://www.kaynos.net";

export const SEO_DEFAULT_DESCRIPTION = PRICING_COPY.seoDescription;

/** Open Graph / Twitter card (1200x630 in public/). */
export const OG_SHARE_PATH = "/og-share.png";
export const OG_SHARE_URL = `${SITE_URL}${OG_SHARE_PATH}`;
export const OG_SHARE_ALT =
  "Kaynos: video review for BJJ coaches";
export const OG_SHARE_WIDTH = 1200;
export const OG_SHARE_HEIGHT = 630;
