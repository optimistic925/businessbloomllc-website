import { describe, expect, it, vi } from "vitest";
import { MARKETPLACE_PRODUCTS, getMarketplaceProduct, productCheckoutReady } from "../shared/marketplaceProducts";

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

describe("Marketplace product registry", () => {
  it("uses unique slugs and Stripe price IDs", () => {
    const slugs = MARKETPLACE_PRODUCTS.map((p) => p.slug);
    const prices = MARKETPLACE_PRODUCTS.map((p) => p.stripePriceId).filter(Boolean);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(prices).size).toBe(prices.length);
  });

  it("does not report checkout ready when a required destination is missing", () => {
    for (const product of MARKETPLACE_PRODUCTS) expect(productCheckoutReady(product)).toBe(false);
  });

  it("resolves a verified marketplace product by slug", () => {
    expect(getMarketplaceProduct("prompt-pack-starter")?.stripePriceId).toBe("price_1Tec5xIVlv7TZiKSq1eJjfdQ");
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

  it("blocks checkout until required fulfillment configuration exists", async () => {
    const express = (await import("express")).default;
    const { checkoutRouter } = await import("./checkout");
    const app = express(); app.use(express.json()); app.use(checkoutRouter);
    const response = await requestApp(app, { marketplaceProductSlug: "prompt-pack-starter" });
    expect(response.status).toBe(409);
    expect(response.body.error).toContain("Fulfillment configuration required");
  });
});
