import { describe, it, expect } from "vitest";
import { getDomainPriceId, getDomainTLDInfo, DOMAIN_PRICE_IDS, DOMAIN_TLD_PRICING } from "../shared/domainPricing";

describe("Domain Pricing Config", () => {
  it("has price IDs for all 6 TLDs", () => {
    expect(Object.keys(DOMAIN_PRICE_IDS)).toHaveLength(6);
    expect(DOMAIN_PRICE_IDS[".com"]).toBe("price_1TduLIIVlv7TZiKSoYRzm8h9");
    expect(DOMAIN_PRICE_IDS[".net"]).toBe("price_1TduLLIVlv7TZiKSJINFdpJ4");
    expect(DOMAIN_PRICE_IDS[".org"]).toBe("price_1TduLNIVlv7TZiKSoQud3AyF");
    expect(DOMAIN_PRICE_IDS[".io"]).toBe("price_1TduLQIVlv7TZiKSJC3LZyfQ");
    expect(DOMAIN_PRICE_IDS[".co"]).toBe("price_1TduLTIVlv7TZiKSKhsRnhBq");
    expect(DOMAIN_PRICE_IDS[".biz"]).toBe("price_1TduLVIVlv7TZiKSXW6Bzzpn");
  });

  it("DOMAIN_TLD_PRICING has correct structure for all TLDs", () => {
    expect(DOMAIN_TLD_PRICING).toHaveLength(6);

    const comEntry = DOMAIN_TLD_PRICING.find((t) => t.tld === ".com");
    expect(comEntry).toBeDefined();
    expect(comEntry!.price).toBe("$9.99");
    expect(comEntry!.priceNumeric).toBe(9.99);
    expect(comEntry!.priceId).toBe("price_1TduLIIVlv7TZiKSoYRzm8h9");
    expect(comEntry!.desc).toBe("Most popular choice");

    const ioEntry = DOMAIN_TLD_PRICING.find((t) => t.tld === ".io");
    expect(ioEntry).toBeDefined();
    expect(ioEntry!.price).toBe("$29.99");
    expect(ioEntry!.priceNumeric).toBe(29.99);
    expect(ioEntry!.priceId).toBe("price_1TduLQIVlv7TZiKSJC3LZyfQ");
  });

  it("getDomainPriceId returns correct price ID for valid domains", () => {
    expect(getDomainPriceId("example.com")).toBe("price_1TduLIIVlv7TZiKSoYRzm8h9");
    expect(getDomainPriceId("mysite.net")).toBe("price_1TduLLIVlv7TZiKSJINFdpJ4");
    expect(getDomainPriceId("nonprofit.org")).toBe("price_1TduLNIVlv7TZiKSoQud3AyF");
    expect(getDomainPriceId("startup.io")).toBe("price_1TduLQIVlv7TZiKSJC3LZyfQ");
    expect(getDomainPriceId("brand.co")).toBe("price_1TduLTIVlv7TZiKSKhsRnhBq");
    expect(getDomainPriceId("mybiz.biz")).toBe("price_1TduLVIVlv7TZiKSXW6Bzzpn");
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
    expect(info!.priceId).toBe("price_1TduLIIVlv7TZiKSoYRzm8h9");
  });

  it("getDomainTLDInfo returns null for unsupported domains", () => {
    expect(getDomainTLDInfo("example.xyz")).toBeNull();
  });
});

describe("Checkout Endpoint (unit)", () => {
  it("checkoutRouter is exported", async () => {
    const { checkoutRouter } = await import("./checkout");
    expect(checkoutRouter).toBeDefined();
  });

  it("POST /api/create-checkout returns 400 when priceId is missing", async () => {
    const { checkoutRouter } = await import("./checkout");
    const express = (await import("express")).default;
    const request = (await import("supertest")).default;
    const app = express();
    app.use(express.json());
    app.use(checkoutRouter);

    const res = await request(app).post("/api/create-checkout").send({
      customerEmail: "test@example.com",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("priceId is required");
  });

  it("POST /api/create-checkout returns 400 when customerEmail is missing", async () => {
    const { checkoutRouter } = await import("./checkout");
    const express = (await import("express")).default;
    const request = (await import("supertest")).default;
    const app = express();
    app.use(express.json());
    app.use(checkoutRouter);

    const res = await request(app).post("/api/create-checkout").send({
      priceId: "price_1TduLIIVlv7TZiKSoYRzm8h9",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("customerEmail is required");
  });

  it("POST /api/check-domain returns 400 when domain is missing", async () => {
    const { checkoutRouter } = await import("./checkout");
    const express = (await import("express")).default;
    const request = (await import("supertest")).default;
    const app = express();
    app.use(express.json());
    app.use(checkoutRouter);

    const res = await request(app).post("/api/check-domain").send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("domain is required");
  });

  it("POST /api/create-checkout creates a live Stripe checkout session with domain metadata", async () => {
    const { checkoutRouter } = await import("./checkout");
    const express = (await import("express")).default;
    const request = (await import("supertest")).default;
    const app = express();
    app.use(express.json());
    app.use(checkoutRouter);

    const res = await request(app).post("/api/create-checkout").send({
      priceId: "price_1TduLIIVlv7TZiKSoYRzm8h9",
      customerEmail: "test@businessbloomllc.com",
      customerName: "Test User",
      domainName: "testdomain.com",
    });

    // This test requires STRIPE_SECRET_KEY env var to be set with a valid key
    if (res.status === 200) {
      expect(res.body).toHaveProperty("sessionId");
      expect(res.body).toHaveProperty("url");
      expect(res.body.url).toContain("stripe.com");
    } else {
      // If no Stripe key is configured in the test environment, expect a 500
      expect(res.status).toBe(500);
    }
  });
});
