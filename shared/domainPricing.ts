/**
 * Domain TLD pricing configuration.
 *
 * These are LIVE Stripe Price IDs created in the Business Bloom LLC Stripe account.
 * Products were created via the Stripe API on 2026-06-02.
 *
 * TLD → Price ID mapping:
 *   .com  → price_1TduLIIVlv7TZiKSoYRzm8h9  ($9.99/yr)
 *   .net  → price_1TduLLIVlv7TZiKSJINFdpJ4  ($12.99/yr)
 *   .org  → price_1TduLNIVlv7TZiKSoQud3AyF  ($11.99/yr)
 *   .io   → price_1TduLQIVlv7TZiKSJC3LZyfQ  ($29.99/yr)
 *   .co   → price_1TduLTIVlv7TZiKSKhsRnhBq  ($24.99/yr)
 *   .biz  → price_1TduLVIVlv7TZiKSXW6Bzzpn  ($14.99/yr)
 */

export const DOMAIN_PRICE_IDS = {
  ".com": "price_1TduLIIVlv7TZiKSoYRzm8h9",
  ".net": "price_1TduLLIVlv7TZiKSJINFdpJ4",
  ".org": "price_1TduLNIVlv7TZiKSoQud3AyF",
  ".io":  "price_1TduLQIVlv7TZiKSJC3LZyfQ",
  ".co":  "price_1TduLTIVlv7TZiKSKhsRnhBq",
  ".biz": "price_1TduLVIVlv7TZiKSXW6Bzzpn",
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
  { tld: ".com", price: "$9.99",  priceNumeric: 9.99,  desc: "Most popular choice",     priceId: DOMAIN_PRICE_IDS[".com"] },
  { tld: ".net", price: "$12.99", priceNumeric: 12.99, desc: "Great for tech businesses", priceId: DOMAIN_PRICE_IDS[".net"] },
  { tld: ".org", price: "$11.99", priceNumeric: 11.99, desc: "Nonprofits & organizations", priceId: DOMAIN_PRICE_IDS[".org"] },
  { tld: ".io",  price: "$29.99", priceNumeric: 29.99, desc: "Startups & SaaS",           priceId: DOMAIN_PRICE_IDS[".io"] },
  { tld: ".co",  price: "$24.99", priceNumeric: 24.99, desc: "Modern & short",            priceId: DOMAIN_PRICE_IDS[".co"] },
  { tld: ".biz", price: "$14.99", priceNumeric: 14.99, desc: "Business-focused",          priceId: DOMAIN_PRICE_IDS[".biz"] },
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
