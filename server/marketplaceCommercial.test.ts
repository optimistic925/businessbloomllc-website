import { describe, expect, it } from "vitest";
import { MARKETPLACE_PRODUCTS } from "../shared/marketplaceProducts";
import { getMarketplaceCommercialConfig } from "../shared/marketplaceCommercialConfig";

describe("Marketplace commercial configuration coverage", () => {
  it("resolves approved commercial configuration for every public paid product", () => {
    for (const product of MARKETPLACE_PRODUCTS) {
      const commercial = getMarketplaceCommercialConfig(product.slug);
      expect(commercial, `Missing commercial config for ${product.slug}`).not.toBeNull();
      expect(commercial?.ownerApprovalStatus).toBe("APPROVED");
      expect(commercial?.stripeProductId).toMatch(/^prod_/);
      expect(commercial?.stripePriceId).toMatch(/^price_/);
      expect(commercial?.regularPriceCents).toBeGreaterThan(0);
    }
  });

  it("reconciles the current LLC Foundation registry slug without duplicating commercial values", () => {
    const commercial = getMarketplaceCommercialConfig("business-bloom-foundation-system");
    expect(commercial?.slug).toBe("business-bloom-llc-foundation-system");
    expect(commercial?.priceDisplay).toBe("$147");
  });
});
