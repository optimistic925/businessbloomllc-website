import { describe, expect, it } from "vitest";
import {
  getMarketplaceCommercialConfig,
  getProfessionalSystemsBundleEconomics,
  PROFESSIONAL_SYSTEM_COMPONENT_SLUGS,
} from "../shared/marketplaceCommercialConfig";

describe("Executive-approved Pricing Council decision", () => {
  it("locks Sales System commercial terms", () => {
    const sales = getMarketplaceCommercialConfig("business-bloom-sales-system");
    expect(sales?.regularPriceCents).toBe(29700);
    expect(sales?.launchPriceCents).toBe(24700);
    expect(sales?.stripeProductId).toBe("prod_V3S4ynv7a8w5Jm");
    expect(sales?.stripePriceId).toBe("price_1U3LAZIVlv7TZiKSd8R55REH");
  });

  it("locks six-system Professional Systems bundle economics", () => {
    expect(PROFESSIONAL_SYSTEM_COMPONENT_SLUGS).toHaveLength(6);
    const economics = getProfessionalSystemsBundleEconomics();
    expect(economics.individualRetailValueCents).toBe(193200);
    expect(economics.bundlePriceCents).toBe(139700);
    expect(economics.savingsCents).toBe(53500);
    expect(economics.savingsPercent).toBeCloseTo(0.2769, 3);
  });
});
