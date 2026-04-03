/** Production site URL (canonical host). See netlify.toml DNS note. */
export const SITE_URL = "https://www.kaynos.net";

export const SEO_DEFAULT_DESCRIPTION =
  "Kaynos is private video training for coaches. Upload session footage, add timestamped notes, and track client progress in one place.";

export const SEO_DEFAULT_TITLE = "Kaynos | Private video training for coaches";

/** Open Graph / Twitter card (1200x630 PNG in public/). */
export const OG_SHARE_PATH = "/og-share.png";
export const OG_SHARE_URL = `${SITE_URL}${OG_SHARE_PATH}`;
export const OG_SHARE_ALT =
  "Kaynos: private video training for coaches";
export const OG_SHARE_WIDTH = 1200;
export const OG_SHARE_HEIGHT = 630;
