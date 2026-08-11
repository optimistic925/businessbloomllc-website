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
    deliveryUrl: "/downloads/free-resources/Business-Bloom-Business-Health-Check.xlsx",
    deliveryStatus: "READY",
  },
  "customer-service-scorecard": {
    slug: "customer-service-scorecard",
    shortDescription: "A weighted service scorecard for reviewing response, resolution, follow-up, consistency, and customer-experience fundamentals.",
    ctaLabel: "Download Free",
    relatedPaidProductSlug: "business-bloom-customer-service-system",
    relatedPaidProductName: "Business Bloom Customer Service System™",
    deliveryUrl: "/downloads/free-resources/Business-Bloom-Customer-Service-Scorecard.xlsx",
    deliveryStatus: "READY",
  },
  "sales-conversion-calculator": {
    slug: "sales-conversion-calculator",
    shortDescription: "A simple sales-funnel calculator for reviewing lead, qualification, proposal, win, and revenue conversion metrics.",
    ctaLabel: "Download Free",
    relatedPaidProductSlug: "business-bloom-professional-systems",
    relatedPaidProductName: "Business Bloom Professional Systems™",
    deliveryUrl: "/downloads/free-resources/Business-Bloom-Sales-Conversion-Calculator.xlsx",
    deliveryStatus: "READY",
  },
  "interview-scorecard": {
    slug: "interview-scorecard",
    shortDescription: "A structured weighted interview scorecard for comparing job-related criteria consistently and documenting review notes.",
    ctaLabel: "Download Free",
    relatedPaidProductSlug: "business-bloom-hr-system",
    relatedPaidProductName: "Business Bloom HR System™",
    deliveryUrl: "/downloads/free-resources/Business-Bloom-Interview-Scorecard.xlsx",
    deliveryStatus: "READY",
  },
  "marketing-roi-calculator": {
    slug: "marketing-roi-calculator",
    shortDescription: "A planning calculator for cost per lead, acquisition cost, conversion, ROAS, gross-profit contribution, and marketing ROI.",
    ctaLabel: "Download Free",
    relatedPaidProductSlug: "business-bloom-marketing-system",
    relatedPaidProductName: "Business Bloom Marketing System™",
    deliveryUrl: "/downloads/free-resources/Business-Bloom-Marketing-ROI-Calculator.xlsx",
    deliveryStatus: "READY",
  },
  "sop-quick-start-template": {
    slug: "sop-quick-start-template",
    shortDescription: "A quick-start SOP worksheet for defining purpose, owner, inputs, steps, quality checks, exceptions, and review timing.",
    ctaLabel: "Download Free",
    relatedPaidProductSlug: "business-bloom-operations-system",
    relatedPaidProductName: "Business Bloom Operations System™",
    deliveryUrl: "/downloads/free-resources/Business-Bloom-SOP-Quick-Start-Template.xlsx",
    deliveryStatus: "READY",
  },
  "ai-automation-opportunity-finder": {
    slug: "ai-automation-opportunity-finder",
    shortDescription: "A worksheet for estimating repetitive-work volume, reviewing automation suitability and risk, and prioritizing human-reviewed opportunities.",
    ctaLabel: "Download Free",
    relatedPaidProductSlug: "business-bloom-ai-automation-bundles",
    relatedPaidProductName: "Business Bloom AI Automation Bundles™",
    deliveryUrl: "/downloads/free-resources/Business-Bloom-AI-Automation-Opportunity-Finder.xlsx",
    deliveryStatus: "READY",
  },
};

export function getFreeResourceDeliveryConfig(slug: string) {
  return FREE_RESOURCE_DELIVERY_CONFIG[slug] ?? null;
}
