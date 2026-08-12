export type MarketplaceCommercialModel = "ONE_TIME" | "RECURRING";

export interface MarketplaceCommercialConfig {
  slug: string;
  regularPriceCents: number;
  launchPriceCents: number | null;
  priceDisplay: string;
  launchPriceDisplay: string | null;
  stripeProductId: string;
  stripePriceId: string;
  billingModel: MarketplaceCommercialModel;
  ownerApprovalStatus: "APPROVED";
}

/**
 * Owner-approved commercial configuration for CURRENT Drive-approved Marketplace products.
 *
 * Product identity, assets, package scope, and fulfillment requirements remain authoritative
 * in shared/marketplaceProducts.ts. This file owns approved commercial values only so prices
 * and Stripe IDs are not duplicated across UI and server components.
 *
 * Sales System commercial terms are approved and implemented here, but the product must not
 * enter the active Marketplace catalog until protected delivery and final QA are ready.
 */
export const MARKETPLACE_COMMERCIAL_CONFIG: Record<string, MarketplaceCommercialConfig> = {
  "business-bloom-customer-service-system": {
    slug: "business-bloom-customer-service-system",
    regularPriceCents: 24700,
    launchPriceCents: 19700,
    priceDisplay: "$247",
    launchPriceDisplay: "$197",
    stripeProductId: "prod_V3EE8qbe10NMSD",
    stripePriceId: "price_1U37mLIVlv7TZiKSGdhfBLxW",
    billingModel: "ONE_TIME",
    ownerApprovalStatus: "APPROVED",
  },
  "business-bloom-hr-system": {
    slug: "business-bloom-hr-system",
    regularPriceCents: 29700,
    launchPriceCents: 24700,
    priceDisplay: "$297",
    launchPriceDisplay: "$247",
    stripeProductId: "prod_V3EEPbBKzK0Ea7",
    stripePriceId: "price_1U37mTIVlv7TZiKSXGuCiE44",
    billingModel: "ONE_TIME",
    ownerApprovalStatus: "APPROVED",
  },
  "business-bloom-marketing-system": {
    slug: "business-bloom-marketing-system",
    regularPriceCents: 29700,
    launchPriceCents: 24700,
    priceDisplay: "$297",
    launchPriceDisplay: "$247",
    stripeProductId: "prod_V3EFeziuN27xg2",
    stripePriceId: "price_1U37mXIVlv7TZiKSW72rnswP",
    billingModel: "ONE_TIME",
    ownerApprovalStatus: "APPROVED",
  },
  "business-bloom-operations-system": {
    slug: "business-bloom-operations-system",
    regularPriceCents: 29700,
    launchPriceCents: 24700,
    priceDisplay: "$297",
    launchPriceDisplay: "$247",
    stripeProductId: "prod_V3EFwGsjsYhOec",
    stripePriceId: "price_1U37meIVlv7TZiKSfM8Ied1y",
    billingModel: "ONE_TIME",
    ownerApprovalStatus: "APPROVED",
  },
  "business-bloom-ai-automation-bundles": {
    slug: "business-bloom-ai-automation-bundles",
    regularPriceCents: 49700,
    launchPriceCents: 39700,
    priceDisplay: "$497",
    launchPriceDisplay: "$397",
    stripeProductId: "prod_V3EFQEj2Z5qPZK",
    stripePriceId: "price_1U37mlIVlv7TZiKSbL139W2Z",
    billingModel: "ONE_TIME",
    ownerApprovalStatus: "APPROVED",
  },
  "business-bloom-sales-system": {
    slug: "business-bloom-sales-system",
    regularPriceCents: 29700,
    launchPriceCents: 24700,
    priceDisplay: "$297",
    launchPriceDisplay: "$247",
    stripeProductId: "prod_V3S4ynv7a8w5Jm",
    stripePriceId: "price_1U3LAZIVlv7TZiKSd8R55REH",
    billingModel: "ONE_TIME",
    ownerApprovalStatus: "APPROVED",
  },
  "business-bloom-professional-systems": {
    slug: "business-bloom-professional-systems",
    regularPriceCents: 139700,
    launchPriceCents: null,
    priceDisplay: "$1,397",
    launchPriceDisplay: null,
    stripeProductId: "prod_V3EFnvMkvXsSEe",
    stripePriceId: "price_1U3LAsIVlv7TZiKS50h40Bnc",
    billingModel: "ONE_TIME",
    ownerApprovalStatus: "APPROVED",
  },
  "business-bloom-website-system": {
    slug: "business-bloom-website-system",
    regularPriceCents: 39700,
    launchPriceCents: 29700,
    priceDisplay: "$397",
    launchPriceDisplay: "$297",
    stripeProductId: "prod_V3EFTGwcpDAEGl",
    stripePriceId: "price_1U37n1IVlv7TZiKSp0Sc7bQu",
    billingModel: "ONE_TIME",
    ownerApprovalStatus: "APPROVED",
  },
  "business-bloom-virtual-executive-team": {
    slug: "business-bloom-virtual-executive-team",
    regularPriceCents: 49700,
    launchPriceCents: 39700,
    priceDisplay: "$497",
    launchPriceDisplay: "$397",
    stripeProductId: "prod_V3EFsQ5PAf6NhM",
    stripePriceId: "price_1U37nDIVlv7TZiKSs1h0Nzfv",
    billingModel: "ONE_TIME",
    ownerApprovalStatus: "APPROVED",
  },
  "business-bloom-branding-system": {
    slug: "business-bloom-branding-system",
    regularPriceCents: 24700,
    launchPriceCents: 19700,
    priceDisplay: "$247",
    launchPriceDisplay: "$197",
    stripeProductId: "prod_V3EFlXJruY4WDI",
    stripePriceId: "price_1U37nIIVlv7TZiKSAcVsSaiL",
    billingModel: "ONE_TIME",
    ownerApprovalStatus: "APPROVED",
  },
  "business-bloom-llc-foundation-system": {
    slug: "business-bloom-llc-foundation-system",
    regularPriceCents: 14700,
    launchPriceCents: 12700,
    priceDisplay: "$147",
    launchPriceDisplay: "$127",
    stripeProductId: "prod_V3EFY3mmThBQkm",
    stripePriceId: "price_1U37nNIVlv7TZiKSeeq6DVoy",
    billingModel: "ONE_TIME",
    ownerApprovalStatus: "APPROVED",
  },
  "business-bloom-business-launch-blueprint": {
    slug: "business-bloom-business-launch-blueprint",
    regularPriceCents: 19700,
    launchPriceCents: 14700,
    priceDisplay: "$197",
    launchPriceDisplay: "$147",
    stripeProductId: "prod_V3EGmgqSoJlePy",
    stripePriceId: "price_1U37nUIVlv7TZiKSTrc4pcpn",
    billingModel: "ONE_TIME",
    ownerApprovalStatus: "APPROVED",
  },
  "business-bloom-content-marketing-system": {
    slug: "business-bloom-content-marketing-system",
    regularPriceCents: 24700,
    launchPriceCents: 19700,
    priceDisplay: "$247",
    launchPriceDisplay: "$197",
    stripeProductId: "prod_V3EGr9r2HzjPG4",
    stripePriceId: "price_1U37naIVlv7TZiKSaRhCykhL",
    billingModel: "ONE_TIME",
    ownerApprovalStatus: "APPROVED",
  },
  "business-bloom-social-media-system": {
    slug: "business-bloom-social-media-system",
    regularPriceCents: 19700,
    launchPriceCents: 14700,
    priceDisplay: "$197",
    launchPriceDisplay: "$147",
    stripeProductId: "prod_V3EGmeve6HNLxe",
    stripePriceId: "price_1U37njIVlv7TZiKSqCbuczqI",
    billingModel: "ONE_TIME",
    ownerApprovalStatus: "APPROVED",
  },
};

/** Temporary registry compatibility until the Drive product slug is normalized. */
const COMMERCIAL_SLUG_ALIASES: Record<string, string> = {
  "business-bloom-foundation-system": "business-bloom-llc-foundation-system",
};

export function getMarketplaceCommercialConfig(slug: string) {
  const commercialSlug = COMMERCIAL_SLUG_ALIASES[slug] ?? slug;
  return MARKETPLACE_COMMERCIAL_CONFIG[commercialSlug] ?? null;
}

export const PROFESSIONAL_SYSTEM_COMPONENT_SLUGS = [
  "business-bloom-customer-service-system",
  "business-bloom-hr-system",
  "business-bloom-marketing-system",
  "business-bloom-operations-system",
  "business-bloom-ai-automation-bundles",
  "business-bloom-sales-system",
] as const;

export function getProfessionalSystemsBundleEconomics() {
  const individualRetailValueCents = PROFESSIONAL_SYSTEM_COMPONENT_SLUGS.reduce(
    (sum, slug) => sum + MARKETPLACE_COMMERCIAL_CONFIG[slug].regularPriceCents,
    0,
  );
  const bundlePriceCents = MARKETPLACE_COMMERCIAL_CONFIG["business-bloom-professional-systems"].regularPriceCents;
  const savingsCents = individualRetailValueCents - bundlePriceCents;
  const savingsPercent = individualRetailValueCents > 0 ? savingsCents / individualRetailValueCents : 0;
  return { individualRetailValueCents, bundlePriceCents, savingsCents, savingsPercent };
}
