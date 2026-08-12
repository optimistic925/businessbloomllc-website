import {
  getFreeResourceDeliveryConfig as getExistingFreeResourceDeliveryConfig,
  type FreeResourceDeliveryConfig,
} from "./freeResourceDeliveryConfig";

const CUSTOMER_SAFE_REPAIRED_URLS: Record<string, string> = {
  "30-minute-business-reset": "/api/free-resources/30-minute-business-reset",
  "business-systems-checklist": "/api/free-resources/business-systems-checklist",
  "business-health-check": "/api/free-resources/business-health-check",
  "marketing-roi-calculator": "/api/free-resources/marketing-roi-calculator",
};

const FINAL_FREE_RESOURCE_EXTENSIONS: Record<string, FreeResourceDeliveryConfig> = {
  "offer-clarity-worksheet": {
    slug: "offer-clarity-worksheet",
    shortDescription: "Clarify who your offer is for, the problem it solves, the outcome it supports, and the next action in one focused worksheet.",
    ctaLabel: "Download Free",
    relatedPaidProductSlug: "business-bloom-business-launch-blueprint",
    relatedPaidProductName: "Business Bloom Business Launch Blueprint",
    deliveryUrl: "/downloads/free-resources/Business-Bloom-Offer-Clarity-Worksheet-Fillable.pdf",
    deliveryStatus: "READY",
  },
  "brand-message-quick-check": {
    slug: "brand-message-quick-check",
    shortDescription: "Turn a fuzzy brand message into a clearer statement of who you help, what you help them achieve, and why customers should pay attention.",
    ctaLabel: "Download Free",
    relatedPaidProductSlug: "business-bloom-branding-system",
    relatedPaidProductName: "Business Bloom Branding System",
    deliveryUrl: "/downloads/free-resources/Business-Bloom-Brand-Message-Quick-Check-Fillable.pdf",
    deliveryStatus: "READY",
  },
  "website-conversion-checklist": {
    slug: "website-conversion-checklist",
    shortDescription: "Review one important website page for clarity, focus, trust, and call-to-action strength, then choose the highest-impact fix.",
    ctaLabel: "Download Free",
    relatedPaidProductSlug: "business-bloom-website-system",
    relatedPaidProductName: "Business Bloom Website System",
    deliveryUrl: "/downloads/free-resources/Business-Bloom-Website-Conversion-Checklist-Fillable.pdf",
    deliveryStatus: "READY",
  },
  "social-content-consistency-planner": {
    slug: "social-content-consistency-planner",
    shortDescription: "Plan one practical week of social content around real audience problems, useful formats, clear hooks, CTAs, and readiness status.",
    ctaLabel: "Download Free",
    relatedPaidProductSlug: "business-bloom-social-media-system",
    relatedPaidProductName: "Business Bloom Social Media System",
    deliveryUrl: "/downloads/free-resources/Business-Bloom-Social-Content-Consistency-Planner.xlsx",
    deliveryStatus: "READY",
  },
};

export function getFreeResourceDeliveryConfig(slug: string) {
  const finalized = FINAL_FREE_RESOURCE_EXTENSIONS[slug];
  if (finalized) return finalized;

  const existing = getExistingFreeResourceDeliveryConfig(slug);
  const repairedUrl = CUSTOMER_SAFE_REPAIRED_URLS[slug];
  if (existing && repairedUrl) {
    return { ...existing, deliveryUrl: repairedUrl, deliveryStatus: "READY" as const };
  }
  return existing;
}
