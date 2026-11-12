export function getSiteUrl(): string {
  const configuredUrl = process.env.APP_URL || process.env.BASE_URL || process.env.VITE_APP_URL;
  if (configuredUrl) return configuredUrl.replace(/\/+$/, "");

  const domain =
    process.env.NODE_ENV === "production"
      ? process.env.REPLIT_DOMAINS?.split(",")[0]?.trim()
      : process.env.REPLIT_DEV_DOMAIN;

  if (!domain) {
    throw new Error("Set APP_URL or configure the Replit domain before creating public links.");
  }

  return `https://${domain}`;
}
