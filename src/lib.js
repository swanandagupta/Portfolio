// Resolves a public-folder path against Vite's base URL (the site is served from /Portfolio/).
export const asset = (path) => encodeURI(import.meta.env.BASE_URL + path);

export const DOMAIN_LABEL = {
  security: "Security",
  research: "AI & Research",
  software: "Software",
};
