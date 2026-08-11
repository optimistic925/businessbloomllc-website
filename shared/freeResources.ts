import { PUBLIC_FREE_RESOURCES } from "./marketplacePublicCatalog";

export const ADDITIONAL_FINALIZED_FREE_RESOURCES = [
  { slug: "customer-service-scorecard", name: "Customer Service Scorecard", category: "Customer Service", format: "Spreadsheet" },
  { slug: "sales-conversion-calculator", name: "Sales Conversion Calculator", category: "Sales", format: "Spreadsheet" },
  { slug: "interview-scorecard", name: "Interview Scorecard", category: "HR", format: "Spreadsheet" },
  { slug: "marketing-roi-calculator", name: "Marketing ROI Calculator", category: "Marketing", format: "Spreadsheet" },
  { slug: "sop-quick-start-template", name: "SOP Quick-Start Template", category: "Operations", format: "Spreadsheet" },
  { slug: "ai-automation-opportunity-finder", name: "AI Automation Opportunity Finder", category: "AI & Automation", format: "Spreadsheet" },
] as const;

/**
 * Only finalized, QA-reviewed resources belong here. The remaining four approved
 * resource slots stay unpublished until their authoritative identities and final
 * customer files exist; do not invent replacements to reach the target of 13.
 */
export const ALL_PUBLIC_FREE_RESOURCES = [
  ...PUBLIC_FREE_RESOURCES,
  ...ADDITIONAL_FINALIZED_FREE_RESOURCES,
] as const;
