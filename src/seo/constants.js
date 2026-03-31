/** Production site URL (canonical host). See netlify.toml DNS note. */
export const SITE_URL = "https://www.kaynos.net";

export const SEO_DEFAULT_DESCRIPTION =
  "Kaynos is video review and training management for martial arts schools. Upload training footage, add timestamped notes, and track student progress in one place.";

export const SEO_DEFAULT_TITLE = "Kaynos | Video review for martial arts schools";

/** Open Graph / Twitter card (1200x630 PNG in public/). */
export const OG_SHARE_PATH = "/og-share.png";
export const OG_SHARE_URL = `${SITE_URL}${OG_SHARE_PATH}`;
export const OG_SHARE_ALT =
  "Kaynos: video review and training management for martial arts schools";
export const OG_SHARE_WIDTH = 1200;
export const OG_SHARE_HEIGHT = 630;
