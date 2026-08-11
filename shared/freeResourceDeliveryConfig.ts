export type FreeResourceDeliveryStatus = "READY" | "DESTINATION_REQUIRED" | "ENGINEERING_REQUIRED";

export interface FreeResourceDeliveryConfig {
  slug: string;
  shortDescription: string;
  ctaLabel: string;
  relatedPaidProductSlug: string;
  relatedPaidProductName: string;
  deliveryUrl: string | null;
  deliveryStatus: FreeResourceDeliveryStatus;
}

/**
 * Customer-facing delivery/funnel configuration for finalized Free Resources only.
 * File identity and approval status remain authoritative in APPROVED_FREE_RESOURCES.
 * Never substitute private production Drive URLs for deliveryUrl.
 */
export const FREE_RESOURCE_DELIVERY_CONFIG: Record<string, FreeResourceDeliveryConfig> = {
  "30-minute-business-reset": {
    slug: "30-minute-business-reset",
    shortDescription: "A focused fillable reset to identify the most urgent business issue and choose a practical next action.",
    ctaLabel: "Download Free",
    relatedPaidProductSlug: "business-bloom-operations-system",
    relatedPaidProductName: "Business Bloom Operations System™",
    deliveryUrl: null,
    deliveryStatus: "DESTINATION_REQUIRED",
  },
  "business-systems-checklist": {
    slug: "business-systems-checklist",
    shortDescription: "A fillable checklist for identifying missing or weak business systems across core operating areas.",
    ctaLabel: "Download Free",
    relatedPaidProductSlug: "business-bloom-professional-systems",
    relatedPaidProductName: "Business Bloom Professional Systems™",
    deliveryUrl: null,
    deliveryStatus: "DESTINATION_REQUIRED",
  },
  "business-health-check": {
    slug: "business-health-check",
    shortDescription: "A spreadsheet-based business health assessment for reviewing current systems and prioritizing improvement areas.",
    ctaLabel: "Download Free",
    relatedPaidProductSlug: "business-bloom-professional-systems",
    relatedPaidProductName: "Business Bloom Professional Systems™",
    deliveryUrl: null,
    deliveryStatus: "DESTINATION_REQUIRED",
  },
};

export function getFreeResourceDeliveryConfig(slug: string) {
  return FREE_RESOURCE_DELIVERY_CONFIG[slug] ?? null;
}
