export interface PublicMarketplaceProduct {
  slug: string;
  name: string;
  collection: string;
  shortDescription: string;
  category: string;
  type: "system" | "bundle";
  benefits: string[];
  included: string[];
  fulfillmentType: "download" | "access" | "onboarding" | "hybrid";
}

/**
 * Browser-safe public catalog projection.
 *
 * IMPORTANT: Do not add Drive source IDs, engineering handoff references,
 * private fulfillment URLs, credentials, or internal-only notes to this file.
 * Internal product provenance remains in marketplaceProducts.ts for trusted
 * server/QA use. A regression test verifies public slugs remain aligned.
 */
export const PUBLIC_MARKETPLACE_PRODUCTS: PublicMarketplaceProduct[] = [
  {
    slug: "business-bloom-customer-service-system",
    name: "Business Bloom Customer Service System™",
    collection: "Business Bloom Professional Systems™",
    shortDescription: "A structured customer-service operating system with reusable customer documents and implementation tools.",
    category: "Professional Systems",
    type: "system",
    benefits: ["Create a repeatable customer-service process", "Use reusable customer documents and interactive tools", "Organize service improvement around practical workflows"],
    included: ["Customer documents", "Interactive tools", "Implementation resources", "Customer package"],
    fulfillmentType: "download",
  },
  {
    slug: "business-bloom-hr-system",
    name: "Business Bloom HR System™",
    collection: "Business Bloom Professional Systems™",
    shortDescription: "A structured HR operating system for hiring, onboarding, development, performance, and people-management workflows.",
    category: "Professional Systems",
    type: "system",
    benefits: ["Create repeatable people processes", "Organize hiring and onboarding", "Use structured HR tools with professional-review boundaries"],
    included: ["HR operating materials", "Reusable customer documents", "Interactive tools", "Customer package"],
    fulfillmentType: "download",
  },
  {
    slug: "business-bloom-marketing-system",
    name: "Business Bloom Marketing System™",
    collection: "Business Bloom Professional Systems™",
    shortDescription: "A marketing system with strategy, campaign planning, reusable toolkit materials, and structured AI prompt support.",
    category: "Professional Systems",
    type: "system",
    benefits: ["Organize marketing planning", "Use repeatable campaign materials", "Apply a structured prompt library"],
    included: ["Quick Start Guide", "Marketing Strategy Playbook and Toolkit", "Campaign Toolkit", "Fillable Interactive Toolkit", "Marketing AI Prompt Library"],
    fulfillmentType: "download",
  },
  {
    slug: "business-bloom-operations-system",
    name: "Business Bloom Operations System™",
    collection: "Business Bloom Professional Systems™",
    shortDescription: "An operations system with playbooks, SOP tools, dashboards, references, and AI prompts for repeatable execution.",
    category: "Professional Systems",
    type: "system",
    benefits: ["Document repeatable operations", "Create clearer SOPs", "Use an operations dashboard and quick-reference materials"],
    included: ["Operations Quick Start Guide", "Operations Playbook and Toolkit", "SOP Toolkit", "Fillable Interactive Toolkit", "AI Prompt Library", "Quick Reference", "Operations Dashboard"],
    fulfillmentType: "download",
  },
  {
    slug: "business-bloom-ai-automation-bundles",
    name: "Business Bloom AI Automation Bundles™",
    collection: "Business Bloom Professional Systems™",
    shortDescription: "A structured automation toolkit for finding opportunities, planning human-reviewed automation, and implementing repeatable workflows.",
    category: "Professional Systems",
    type: "system",
    benefits: ["Identify automation opportunities", "Plan human-reviewed automation", "Use repeatable prompts and implementation tools"],
    included: ["AI Automation Quick Start", "AI Automation Playbook", "Design Toolkit", "Fillable Interactive Toolkit", "Prompt Library", "Quick Reference", "Automation Opportunity Dashboard"],
    fulfillmentType: "download",
  },
  {
    slug: "business-bloom-professional-systems",
    name: "Business Bloom Professional Systems™",
    collection: "Business Bloom Professional Systems™",
    shortDescription: "A coordinated collection of Business Bloom operating systems with a shared implementation framework and dashboard.",
    category: "Professional Systems",
    type: "bundle",
    benefits: ["Coordinate multiple operating systems", "Use a shared implementation framework", "Track implementation from one dashboard"],
    included: ["Professional Systems Start Here", "Customer Use Framework", "Professional Systems Dashboard", "Professional Systems customer package"],
    fulfillmentType: "download",
  },
  {
    slug: "business-bloom-website-system",
    name: "Business Bloom Website System",
    collection: "Standalone Current Products",
    shortDescription: "A website-planning and website-operations system with guidance, prompts, workflows, worksheets, examples, and launch QA.",
    category: "Digital Business",
    type: "system",
    benefits: ["Plan website strategy and architecture", "Use repeatable website workflows", "Review content and launch readiness with structured QA"],
    included: ["Customer guides", "Prompt library", "Workflows", "Worksheets and templates", "Examples", "Quality and safety materials", "Quick reference"],
    fulfillmentType: "download",
  },
  {
    slug: "business-bloom-virtual-executive-team",
    name: "Business Bloom Virtual Executive Team",
    collection: "Standalone Current Products",
    shortDescription: "Structured executive decision-support materials for owner-led business planning and cross-functional review.",
    category: "Executive",
    type: "system",
    benefits: ["Clarify major business decisions", "Review cross-functional perspectives", "Convert approved decisions into an action plan"],
    included: ["Start Here Guide", "Customer Guide", "Intake Workbook", "Executive Decision Questionnaire", "Executive agent instructions", "Prompt Library", "Workflows", "Worksheets and templates", "Examples", "Safety files", "Quick Reference"],
    fulfillmentType: "download",
  },
  {
    slug: "business-bloom-branding-system",
    name: "Business Bloom Branding System",
    collection: "Startup Collection",
    shortDescription: "A structured branding system with editable materials, worksheets, examples, references, and coordinated customer resources.",
    category: "Startup",
    type: "system",
    benefits: ["Build a repeatable branding foundation", "Use editable customer materials", "Work from coordinated examples and references"],
    included: ["Core editable package", "Worksheets", "Examples and reference materials", "Customer PDFs", "Customer package"],
    fulfillmentType: "download",
  },
  {
    slug: "business-bloom-foundation-system",
    name: "Business Bloom LLC Foundation System",
    collection: "Startup Collection",
    shortDescription: "A structured business-foundation system for organizing core startup records, planning, and professional-review steps.",
    category: "Startup",
    type: "system",
    benefits: ["Organize business-foundation work", "Use a finalized customer package", "Identify steps that may require qualified professional review"],
    included: ["Customer package", "Business-foundation materials", "Implementation resources", "Professional-review guidance"],
    fulfillmentType: "download",
  },
  {
    slug: "business-bloom-business-launch-blueprint",
    name: "Business Bloom Business Launch Blueprint",
    collection: "Startup Collection",
    shortDescription: "A structured launch-planning system for organizing an offer, launch actions, and the first implementation period.",
    category: "Startup",
    type: "system",
    benefits: ["Organize launch planning", "Work from completed production materials", "Follow a structured implementation sequence"],
    included: ["Customer package", "Launch-planning materials", "Implementation resources", "Quick-reference materials"],
    fulfillmentType: "download",
  },
  {
    slug: "business-bloom-content-marketing-system",
    name: "Business Bloom Content Marketing System",
    collection: "Marketing Collection",
    shortDescription: "A content marketing system with planning, production workflows, prompts, templates, examples, and implementation resources.",
    category: "Marketing",
    type: "system",
    benefits: ["Organize content marketing work", "Use reusable workflows and templates", "Work from a complete customer package"],
    included: ["Customer guides", "Prompt library", "Workflows", "Worksheets and templates", "Examples", "Quality and safety materials", "Quick reference"],
    fulfillmentType: "download",
  },
  {
    slug: "business-bloom-social-media-system",
    name: "Business Bloom Social Media System",
    collection: "Marketing Collection",
    shortDescription: "A structured social-media system for planning, content execution, publishing workflows, and repeatable audience-development activities.",
    category: "Marketing",
    type: "system",
    benefits: ["Use a coordinated social-media system", "Create repeatable planning and publishing workflows", "Work from a finalized customer package"],
    included: ["Customer package", "Planning resources", "Publishing workflows", "Examples and reference materials"],
    fulfillmentType: "download",
  },
];

export const PUBLIC_FREE_RESOURCES = [
  { slug: "30-minute-business-reset", name: "30-Minute Business Reset", category: "Business Foundations", format: "Fillable PDF" },
  { slug: "business-systems-checklist", name: "Business Systems Checklist", category: "Business Foundations", format: "Fillable PDF" },
  { slug: "business-health-check", name: "Business Health Check", category: "Business Foundations", format: "Spreadsheet" },
] as const;

export function getPublicMarketplaceProduct(slug: string) {
  return PUBLIC_MARKETPLACE_PRODUCTS.find((product) => product.slug === slug) ?? null;
}
