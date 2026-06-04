/**
 * Service pricing configuration.
 *
 * These are LIVE Stripe Price IDs created in the Business Bloom LLC Stripe account.
 * Products were created via the Stripe API on 2026-06-04.
 *
 * Each entry includes:
 *   - priceId: Stripe Price ID
 *   - name: Human-readable product name
 *   - price: Display price string
 *   - recurring: Whether this is a subscription (true) or one-time payment (false)
 *   - category: Product category for routing success URLs
 */

export interface ServicePriceInfo {
  priceId: string;
  name: string;
  price: string;
  priceNumeric: number;
  recurring: boolean;
  interval?: "month" | "year";
  category: string;
  successPath: string;
}

export const SERVICE_PRICES: Record<string, ServicePriceInfo> = {
  // Automation & Business Systems
  AUTOMATION_SYSTEM: {
    priceId: "price_1Tec5lIVlv7TZiKS5KOlD53t",
    name: "Automation System",
    price: "$997",
    priceNumeric: 997,
    recurring: false,
    category: "solutions",
    successPath: "/solutions",
  },
  BUSINESS_LAUNCH: {
    priceId: "price_1Tec5pIVlv7TZiKSO69DLm7g",
    name: "Business Launch System",
    price: "$1,497",
    priceNumeric: 1497,
    recurring: false,
    category: "solutions",
    successPath: "/solutions",
  },
  SCALE_SYSTEM: {
    priceId: "price_1Tec5tIVlv7TZiKSQ4sbw0kA",
    name: "Scale System",
    price: "$3,000",
    priceNumeric: 3000,
    recurring: false,
    category: "solutions",
    successPath: "/solutions",
  },

  // Prompt Packs
  PROMPT_STARTER: {
    priceId: "price_1Tec5xIVlv7TZiKSq1eJjfdQ",
    name: "Sales & Closing Pack",
    price: "$47",
    priceNumeric: 47,
    recurring: false,
    category: "prompt-packs",
    successPath: "/prompt-packs",
  },
  PROMPT_PRO: {
    priceId: "price_1Tec61IVlv7TZiKSBogQn8Ip",
    name: "Marketing & Content Pack",
    price: "$67",
    priceNumeric: 67,
    recurring: false,
    category: "prompt-packs",
    successPath: "/prompt-packs",
  },
  PROMPT_ULTIMATE: {
    priceId: "price_1Tec66IVlv7TZiKSzOmbKFWg",
    name: "Complete Business Bundle",
    price: "$97",
    priceNumeric: 97,
    recurring: false,
    category: "prompt-packs",
    successPath: "/prompt-packs",
  },

  // Hosting Plans
  HOSTING_STARTER: {
    priceId: "price_1Tec6AIVlv7TZiKSkAw2UeBS",
    name: "Hosting Starter",
    price: "$19/mo",
    priceNumeric: 19,
    recurring: true,
    interval: "month",
    category: "hosting",
    successPath: "/hosting",
  },
  HOSTING_BUSINESS: {
    priceId: "price_1Tec6EIVlv7TZiKSEoh2dIUj",
    name: "Hosting Business",
    price: "$49/mo",
    priceNumeric: 49,
    recurring: true,
    interval: "month",
    category: "hosting",
    successPath: "/hosting",
  },
  HOSTING_ENTERPRISE: {
    priceId: "price_1Tec6IIVlv7TZiKS4NVtMwcG",
    name: "Hosting Enterprise",
    price: "$99/mo",
    priceNumeric: 99,
    recurring: true,
    interval: "month",
    category: "hosting",
    successPath: "/hosting",
  },

  // DFY Services
  DFY_WEBSITE: {
    priceId: "price_1Tec6MIVlv7TZiKSmFt0H1Pu",
    name: "DFY Website & Funnel Build",
    price: "$1,497",
    priceNumeric: 1497,
    recurring: false,
    category: "dfy-services",
    successPath: "/dfy-services",
  },
  DFY_AUTOMATION: {
    priceId: "price_1Tec6QIVlv7TZiKSN43HJCEr",
    name: "DFY Automation Setup",
    price: "$2,497",
    priceNumeric: 2497,
    recurring: false,
    category: "dfy-services",
    successPath: "/dfy-services",
  },

  // Shopify
  SHOPIFY_BASIC: {
    priceId: "price_1Tec6UIVlv7TZiKSPYWts1Ra",
    name: "Shopify App Basic",
    price: "$29/mo",
    priceNumeric: 29,
    recurring: true,
    interval: "month",
    category: "shopify-app",
    successPath: "/shopify-app",
  },
  SHOPIFY_PRO: {
    priceId: "price_1Tec6YIVlv7TZiKSIu5hvzCt",
    name: "Shopify App Growth",
    price: "$79/mo",
    priceNumeric: 79,
    recurring: true,
    interval: "month",
    category: "shopify-app",
    successPath: "/shopify-app",
  },
} as const;

/**
 * Get service price info by Stripe price ID.
 */
export function getServiceByPriceId(priceId: string): ServicePriceInfo | null {
  return (
    Object.values(SERVICE_PRICES).find((s) => s.priceId === priceId) ?? null
  );
}

/**
 * Check if a given Stripe price ID is for a recurring subscription.
 */
export function isRecurringPrice(priceId: string): boolean {
  const service = getServiceByPriceId(priceId);
  return service?.recurring ?? false;
}

/**
 * Get the success redirect path for a given price ID.
 */
export function getSuccessPath(priceId: string): string {
  const service = getServiceByPriceId(priceId);
  return service?.successPath ?? "/";
}
