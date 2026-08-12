import { afterEach, describe, expect, it } from "vitest";
import { marketplaceDownloadSigningReady, signMarketplaceDownloadUrl } from "./marketplaceDownloadSigning";

const ORIGINAL_SECRET = process.env.MARKETPLACE_DOWNLOAD_SIGNING_SECRET;
const ORIGINAL_TTL = process.env.MARKETPLACE_DOWNLOAD_TTL_SECONDS;

afterEach(() => {
  if (ORIGINAL_SECRET === undefined) delete process.env.MARKETPLACE_DOWNLOAD_SIGNING_SECRET;
  else process.env.MARKETPLACE_DOWNLOAD_SIGNING_SECRET = ORIGINAL_SECRET;
  if (ORIGINAL_TTL === undefined) delete process.env.MARKETPLACE_DOWNLOAD_TTL_SECONDS;
  else process.env.MARKETPLACE_DOWNLOAD_TTL_SECONDS = ORIGINAL_TTL;
});

describe("Marketplace signed download URLs", () => {
  it("fails closed without the server signing secret", () => {
    delete process.env.MARKETPLACE_DOWNLOAD_SIGNING_SECRET;
    expect(marketplaceDownloadSigningReady()).toBe(false);
    expect(signMarketplaceDownloadUrl("https://downloads.businessbloomllc.com/products/a.zip", "a", 0)).toBeNull();
  });

  it("signs HTTPS customer URLs without exposing the secret", () => {
    process.env.MARKETPLACE_DOWNLOAD_SIGNING_SECRET = "test-only-secret";
    process.env.MARKETPLACE_DOWNLOAD_TTL_SECONDS = "3600";
    const signed = signMarketplaceDownloadUrl(
      "https://downloads.businessbloomllc.com/products/customer-service.zip",
      "business-bloom-customer-service-system",
      1_000_000,
    );
    expect(signed).not.toBeNull();
    const url = new URL(signed!);
    expect(url.protocol).toBe("https:");
    expect(url.hostname).toBe("downloads.businessbloomllc.com");
    expect(url.searchParams.get("product")).toBe("business-bloom-customer-service-system");
    expect(url.searchParams.get("exp")).toBe("4600");
    expect(url.searchParams.get("sig")).toMatch(/^[a-f0-9]{64}$/);
    expect(signed).not.toContain("test-only-secret");
  });
});
