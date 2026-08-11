export interface PublicFreeResource {
  slug: string;
  name: string;
  category: string;
  format: string;
}

/**
 * Public Free Resource identities that are finalized and verified.
 * Do not add resources based only on graphics, drafts, or inferred category names.
 */
export const PUBLIC_FREE_RESOURCES: PublicFreeResource[] = [
  { slug: "30-minute-business-reset", name: "30-Minute Business Reset", category: "Business Foundations", format: "Fillable PDF" },
  { slug: "business-systems-checklist", name: "Business Systems Checklist", category: "Business Foundations", format: "Fillable PDF" },
  { slug: "business-health-check", name: "Business Health Check", category: "Business Foundations", format: "Spreadsheet" },
  { slug: "customer-service-scorecard", name: "Customer Service Scorecard", category: "Customer Service", format: "Spreadsheet Scorecard" },
  { slug: "sales-conversion-calculator", name: "Sales Conversion Calculator", category: "Sales", format: "Spreadsheet Calculator" },
  { slug: "interview-scorecard", name: "Interview Scorecard", category: "HR", format: "Spreadsheet Scorecard" },
  { slug: "marketing-roi-calculator", name: "Marketing ROI Calculator", category: "Marketing", format: "Spreadsheet Calculator" },
  { slug: "sop-quick-start-template", name: "SOP Quick-Start Template", category: "Operations", format: "Spreadsheet Template" },
  { slug: "ai-automation-opportunity-finder", name: "AI Automation Opportunity Finder", category: "AI & Automation", format: "Spreadsheet" },
];
