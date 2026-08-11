import { describe, expect, it, vi } from "vitest";
import {
  APPROVED_FREE_RESOURCES,
  FREE_RESOURCE_EXPECTED_COUNT,
  LEGACY_STRIPE_ONLY_PRODUCTS_EXCLUDED,
  MARKETPLACE_PRODUCTS,
  MARKETPLACE_PRODUCTS_IN_PRODUCTION,
  getMarketplaceProduct,
  productCheckoutReady,
} from "../shared/marketplaceProducts";

vi.mock("stripe", () => {
  const create = vi.fn().mockResolvedValue({ id: "cs_test_marketplace", url: "https://checkout.stripe.com/test" });
  return { default: vi.fn().mockImplementation(() => ({ checkout: { sessions: { create } }, webhooks: { constructEvent: vi.fn() } })) };
});

async function requestApp(app: import("express").Application, body: unknown) {
  const http = await import("http");
  return new Promise<{ status: number; body: any }>((resolve, reject) => {
    const server = app.listen(0, () => {
      const port = (server.address() as any).port;
      const data = JSON.stringify(body);
      const req = http.request({ hostname: "127.0.0.1", port, path: "/api/create-checkout", method: "POST", headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data) } }, (res) => {
        let buf = "";
        res.on("data", (chunk) => (buf += chunk));
        res.on("end", () => { server.close(); resolve({ status: res.statusCode ?? 0, body: JSON.parse(buf) }); });
      });
      req.on("error", (error) => { server.close(); reject(error); });
      req.write(data); req.end();
    });
  });
}

describe("Marketplace Drive-first product registry", () => {
  it("contains only current approved paid products in the public paid catalog", () => {
    expect(MARKETPLACE_PRODUCTS).toHaveLength(13);
    expect(MARKETPLACE_PRODUCTS.every((product) => product.catalogStatus === "CURRENT_APPROVED_PRODUCT")).toBe(true);
    expect(MARKETPLACE_PRODUCTS.every((product) => product.freeOrPaid === "PAID")).toBe(true);
  });

  it("uses unique public product slugs", () => {
    const slugs = MARKETPLACE_PRODUCTS.map((product) => product.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("does not attach legacy Stripe IDs to current Drive products", () => {
    expect(MARKETPLACE_PRODUCTS.every((product) => product.stripeProductId === null)).toBe(true);
    expect(MARKETPLACE_PRODUCTS.every((product) => product.stripePriceId === null)).toBe(true);
    expect(MARKETPLACE_PRODUCTS.every((product) => product.stripeMatchStatus === "STRIPE_PRODUCT_REQUIRED")).toBe(true);
  });

  it("keeps previously Stripe-first products out of active display", () => {
    const activeNames = new Set(MARKETPLACE_PRODUCTS.map((product) => product.name));
    for (const legacyName of LEGACY_STRIPE_ONLY_PRODUCTS_EXCLUDED) expect(activeNames.has(legacyName)).toBe(false);
  });

  it("keeps the Sales System mapped as production rather than public", () => {
    expect(MARKETPLACE_PRODUCTS_IN_PRODUCTION.some((product) => product.slug === "business-bloom-sales-system")).toBe(true);
    expect(getMarketplaceProduct("business-bloom-sales-system")).toBeNull();
  });

  it("records the incomplete 13-resource library without inventing files", () => {
    expect(FREE_RESOURCE_EXPECTED_COUNT).toBe(13);
    expect(APPROVED_FREE_RESOURCES).toHaveLength(3);
  });

  it("does not report checkout ready while Stripe or public delivery is missing", () => {
    for (const product of MARKETPLACE_PRODUCTS) expect(productCheckoutReady(product)).toBe(false);
  });

  it("resolves the current Virtual Executive Team product by slug", () => {
    const product = getMarketplaceProduct("business-bloom-virtual-executive-team");
    expect(product?.sourceFolderId).toBe("1A-yX_eACGZ-aVtJU7XvAbl8TisZuHXaR");
    expect(product?.stripeProductId).toBeNull();
  });
});

describe("Marketplace checkout safety gate", () => {
  it("rejects unknown marketplace products", async () => {
    const express = (await import("express")).default;
    const { checkoutRouter } = await import("./checkout");
    const app = express(); app.use(express.json()); app.use(checkoutRouter);
    const response = await requestApp(app, { marketplaceProductSlug: "not-a-product" });
    expect(response.status).toBe(404);
  });

  it("blocks current Drive products until Stripe and fulfillment are configured", async () => {
    const express = (await import("express")).default;
    const { checkoutRouter } = await import("./checkout");
    const app = express(); app.use(express.json()); app.use(checkoutRouter);
    const response = await requestApp(app, { marketplaceProductSlug: "business-bloom-virtual-executive-team" });
    expect(response.status).toBe(409);
    expect(response.body.error).toContain("Fulfillment configuration required");
  });
});
