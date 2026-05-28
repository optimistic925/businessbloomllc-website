/**
 * Domain TLD pricing configuration.
 *
 * Replace the placeholder price IDs below with real Stripe Price IDs
 * once you create the corresponding products in your Stripe Dashboard.
 *
 * To create these in Stripe:
 * 1. Go to Products → Add Product
 * 2. Create a one-time price for each TLD
 * 3. Copy the price_xxx ID and replace the placeholder below
 */

export const DOMAIN_PRICE_IDS = {
  ".com": "price_1Tc4L3IzpOBdd4N5pNSZo4Lo",
  ".net": "price_1Tc4L4IzpOBdd4N5ItsQ5NLL",
  ".org": "price_1Tc4L5IzpOBdd4N5svX0H0wA",
  ".io": "price_1Tc4L6IzpOBdd4N5ajRtAuK0",
  ".co": "price_1Tc4L7IzpOBdd4N54fjq0Wzy",
  ".biz": "price_1Tc4L9IzpOBdd4N51JEBru4x",
} as const;

export type DomainTLD = keyof typeof DOMAIN_PRICE_IDS;

export interface DomainTLDInfo {
  tld: DomainTLD;
  price: string;
  priceNumeric: number;
  desc: string;
  priceId: string;
}

export const DOMAIN_TLD_PRICING: DomainTLDInfo[] = [
  { tld: ".com", price: "$9.99", priceNumeric: 9.99, desc: "Most popular choice", priceId: DOMAIN_PRICE_IDS[".com"] },
  { tld: ".net", price: "$12.99", priceNumeric: 12.99, desc: "Great for tech businesses", priceId: DOMAIN_PRICE_IDS[".net"] },
  { tld: ".org", price: "$11.99", priceNumeric: 11.99, desc: "Nonprofits & organizations", priceId: DOMAIN_PRICE_IDS[".org"] },
  { tld: ".io", price: "$29.99", priceNumeric: 29.99, desc: "Startups & SaaS", priceId: DOMAIN_PRICE_IDS[".io"] },
  { tld: ".co", price: "$24.99", priceNumeric: 24.99, desc: "Modern & short", priceId: DOMAIN_PRICE_IDS[".co"] },
  { tld: ".biz", price: "$14.99", priceNumeric: 14.99, desc: "Business-focused", priceId: DOMAIN_PRICE_IDS[".biz"] },
];

/**
 * Get the Stripe price ID for a given domain name.
 * Extracts the TLD from the full domain and returns the corresponding price ID.
 */
export function getDomainPriceId(domain: string): string | null {
  const tld = Object.keys(DOMAIN_PRICE_IDS).find((t) => domain.endsWith(t));
  if (!tld) return null;
  return DOMAIN_PRICE_IDS[tld as DomainTLD];
}

/**
 * Get the TLD info for a given domain name.
 */
export function getDomainTLDInfo(domain: string): DomainTLDInfo | null {
  return DOMAIN_TLD_PRICING.find((info) => domain.endsWith(info.tld)) ?? null;
}
