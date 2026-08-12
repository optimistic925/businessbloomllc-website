import { createHmac } from "node:crypto";

const DEFAULT_TTL_SECONDS = 60 * 60 * 24 * 30;

function getTtlSeconds() {
  const configured = Number(process.env.MARKETPLACE_DOWNLOAD_TTL_SECONDS || DEFAULT_TTL_SECONDS);
  if (!Number.isFinite(configured) || configured < 3600 || configured > 60 * 60 * 24 * 90) {
    return DEFAULT_TTL_SECONDS;
  }
  return Math.floor(configured);
}

export function marketplaceDownloadSigningReady() {
  return Boolean(process.env.MARKETPLACE_DOWNLOAD_SIGNING_SECRET?.trim());
}

export function signMarketplaceDownloadUrl(
  customerSafeBaseUrl: string | null,
  productSlug: string,
  nowMs = Date.now(),
): string | null {
  const secret = process.env.MARKETPLACE_DOWNLOAD_SIGNING_SECRET?.trim();
  if (!secret || !customerSafeBaseUrl) return null;

  let url: URL;
  try {
    url = new URL(customerSafeBaseUrl);
  } catch {
    return null;
  }

  if (url.protocol !== "https:") return null;

  const expires = Math.floor(nowMs / 1000) + getTtlSeconds();
  const payload = `${productSlug}\n${url.pathname}\n${expires}`;
  const signature = createHmac("sha256", secret).update(payload).digest("hex");

  url.searchParams.set("product", productSlug);
  url.searchParams.set("exp", String(expires));
  url.searchParams.set("sig", signature);
  return url.toString();
}
