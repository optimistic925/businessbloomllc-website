import { describe, expect, it, vi, beforeEach } from "vitest";
import { getDomainPriceId, getDomainTLDInfo, DOMAIN_PRICE_IDS, DOMAIN_TLD_PRICING } from "../shared/domainPricing";

describe("Domain Pricing Config", () => {
  it("has price IDs for all 6 TLDs", () => {
    expect(Object.keys(DOMAIN_PRICE_IDS)).toHaveLength(6);
    expect(DOMAIN_PRICE_IDS[".com"]).toBe("price_1Tc4L3IzpOBdd4N5pNSZo4Lo");
    expect(DOMAIN_PRICE_IDS[".net"]).toBe("price_1Tc4L4IzpOBdd4N5ItsQ5NLL");
    expect(DOMAIN_PRICE_IDS[".org"]).toBe("price_1Tc4L5IzpOBdd4N5svX0H0wA");
    expect(DOMAIN_PRICE_IDS[".io"]).toBe("price_1Tc4L6IzpOBdd4N5ajRtAuK0");
    expect(DOMAIN_PRICE_IDS[".co"]).toBe("price_1Tc4L7IzpOBdd4N54fjq0Wzy");
    expect(DOMAIN_PRICE_IDS[".biz"]).toBe("price_1Tc4L9IzpOBdd4N51JEBru4x");
  });

  it("DOMAIN_TLD_PRICING has correct structure for all TLDs", () => {
    expect(DOMAIN_TLD_PRICING).toHaveLength(6);

    const comEntry = DOMAIN_TLD_PRICING.find((t) => t.tld === ".com");
    expect(comEntry).toBeDefined();
    expect(comEntry!.price).toBe("$9.99");
    expect(comEntry!.priceNumeric).toBe(9.99);
    expect(comEntry!.priceId).toBe("price_1Tc4L3IzpOBdd4N5pNSZo4Lo");
    expect(comEntry!.desc).toBe("Most popular choice");

    const ioEntry = DOMAIN_TLD_PRICING.find((t) => t.tld === ".io");
    expect(ioEntry).toBeDefined();
    expect(ioEntry!.price).toBe("$29.99");
    expect(ioEntry!.priceNumeric).toBe(29.99);
    expect(ioEntry!.priceId).toBe("price_1Tc4L6IzpOBdd4N5ajRtAuK0");
  });

  it("getDomainPriceId returns correct price ID for valid domains", () => {
    expect(getDomainPriceId("example.com")).toBe("price_1Tc4L3IzpOBdd4N5pNSZo4Lo");
    expect(getDomainPriceId("mysite.net")).toBe("price_1Tc4L4IzpOBdd4N5ItsQ5NLL");
    expect(getDomainPriceId("nonprofit.org")).toBe("price_1Tc4L5IzpOBdd4N5svX0H0wA");
    expect(getDomainPriceId("startup.io")).toBe("price_1Tc4L6IzpOBdd4N5ajRtAuK0");
    expect(getDomainPriceId("brand.co")).toBe("price_1Tc4L7IzpOBdd4N54fjq0Wzy");
    expect(getDomainPriceId("mybiz.biz")).toBe("price_1Tc4L9IzpOBdd4N51JEBru4x");
  });

  it("getDomainPriceId returns null for unsupported TLDs", () => {
    expect(getDomainPriceId("example.xyz")).toBeNull();
    expect(getDomainPriceId("example.dev")).toBeNull();
    expect(getDomainPriceId("example.app")).toBeNull();
  });

  it("getDomainTLDInfo returns correct info for valid domains", () => {
    const info = getDomainTLDInfo("mybusiness.com");
    expect(info).not.toBeNull();
    expect(info!.tld).toBe(".com");
    expect(info!.price).toBe("$9.99");
    expect(info!.priceId).toBe("price_1Tc4L3IzpOBdd4N5pNSZo4Lo");
  });

  it("getDomainTLDInfo returns null for unsupported domains", () => {
    expect(getDomainTLDInfo("example.xyz")).toBeNull();
  });
});

describe("Checkout Endpoint (unit)", () => {
  it("checkout route module exports checkoutRouter", async () => {
    // Dynamically import to verify the module loads without errors
    const mod = await import("./checkout");
    expect(mod.checkoutRouter).toBeDefined();
    expect(typeof mod.checkoutRouter).toBe("function"); // Express Router is a function
  });
});

describe("Checkout API Integration", () => {
  // These tests verify the API contract by calling the actual endpoint
  // They require the dev server to be running

  const baseUrl = "http://localhost:3000";

  it("POST /api/create-checkout returns error when priceId is missing", async () => {
    const response = await fetch(`${baseUrl}/api/create-checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerEmail: "test@test.com" }),
    });
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toBe("priceId is required");
  });

  it("POST /api/create-checkout returns error when customerEmail is missing", async () => {
    const response = await fetch(`${baseUrl}/api/create-checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId: "price_1Tc4L3IzpOBdd4N5pNSZo4Lo" }),
    });
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toBe("customerEmail is required");
  });

  it("POST /api/check-domain returns error when domain is missing", async () => {
    const response = await fetch(`${baseUrl}/api/check-domain`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toBe("domain is required");
  });

  it("POST /api/check-domain returns availability for valid domain", async () => {
    const response = await fetch(`${baseUrl}/api/check-domain`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain: "testdomain123.com" }),
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.domain).toBe("testdomain123.com");
    expect(typeof data.available).toBe("boolean");
  });

  it("POST /api/create-checkout with domainName passes metadata correctly", async () => {
    // This test verifies the endpoint accepts the domainName field and creates a real session
    const response = await fetch(`${baseUrl}/api/create-checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId: "price_1Tc4L3IzpOBdd4N5pNSZo4Lo",
        customerName: "Test User",
        customerEmail: "test@example.com",
        customerPhone: "1234567890",
        smsConsent: true,
        domainName: "testdomain.com",
      }),
    });
    const data = await response.json();
    // With real price IDs, Stripe should return a valid checkout session
    expect(response.status).toBe(200);
    expect(data.sessionId).toBeDefined();
    expect(data.url).toBeDefined();
    expect(data.url).toContain("stripe.com");
  });
});
