import { PUBLIC_FREE_RESOURCES } from "./marketplacePublicCatalog";
import { FREE_RESOURCE_DELIVERY_CONFIG } from "./freeResourceDeliveryConfig";

export const ADDITIONAL_FINALIZED_FREE_RESOURCES = [
  { slug: "customer-service-scorecard", name: "Customer Service Scorecard", category: "Customer Service", format: "Spreadsheet" },
  { slug: "sales-conversion-calculator", name: "Sales Conversion Calculator", category: "Sales", format: "Spreadsheet" },
  { slug: "interview-scorecard", name: "Interview Scorecard", category: "HR", format: "Spreadsheet" },
  { slug: "marketing-roi-calculator", name: "Marketing ROI Calculator", category: "Marketing", format: "Spreadsheet" },
  { slug: "sop-quick-start-template", name: "SOP Quick-Start Template", category: "Operations", format: "Spreadsheet" },
  { slug: "ai-automation-opportunity-finder", name: "AI Automation Opportunity Finder", category: "AI & Automation", format: "Spreadsheet" },
  { slug: "offer-clarity-worksheet", name: "Offer Clarity Worksheet", category: "Business Foundations", format: "Fillable PDF" },
  { slug: "brand-message-quick-check", name: "Brand Message Quick Check", category: "Branding", format: "Fillable PDF" },
  { slug: "website-conversion-checklist", name: "Website Conversion Checklist", category: "Website", format: "Fillable PDF" },
  { slug: "social-content-consistency-planner", name: "Social Content Consistency Planner", category: "Marketing", format: "Spreadsheet Planner" },
] as const;

Object.assign(FREE_RESOURCE_DELIVERY_CONFIG, {
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
    deliveryUrl: "/downloads/free-resources/Business-Bloom-Social-Content-Consistency-Planner.csv",
    deliveryStatus: "READY",
  },
});

/** Finalized, QA-reviewed public Free Resources. */
export const ALL_PUBLIC_FREE_RESOURCES = [
  ...PUBLIC_FREE_RESOURCES,
  ...ADDITIONAL_FINALIZED_FREE_RESOURCES,
] as const;
