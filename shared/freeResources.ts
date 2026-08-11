import { PUBLIC_FREE_RESOURCES } from "./marketplacePublicCatalog";

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

/** Finalized, QA-reviewed public Free Resources. */
export const ALL_PUBLIC_FREE_RESOURCES = [
  ...PUBLIC_FREE_RESOURCES,
  ...ADDITIONAL_FINALIZED_FREE_RESOURCES,
] as const;
