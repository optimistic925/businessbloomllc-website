import { describe, it, expect, vi } from "vitest";
import { getDomainPriceId, getDomainTLDInfo, DOMAIN_PRICE_IDS, DOMAIN_TLD_PRICING } from "../shared/domainPricing";

// ── Mock Stripe SDK to avoid requiring STRIPE_SECRET_KEY in CI ──────────
// The Stripe constructor throws "Neither apiKey nor config.authenticator
// provided" when instantiated with an empty string.  In CI, STRIPE_SECRET_KEY
// is not available, so we replace the "stripe" module with a minimal mock.
// The unit tests below only exercise validation guards (400 / 403 / 503)
// that return before any real Stripe API call is made, so the mock's
// sessions.create is never invoked.
vi.mock("stripe", () => {
  const MockStripe = vi.fn().mockImplementation(() => ({
    checkout: {
      sessions: {
        create: vi.fn().mockResolvedValue({ id: "cs_test_mock", url: "https://example.com" }),
      },
    },
    webhooks: {
      constructEvent: vi.fn().mockReturnValue({ id: "evt_test_mock", type: "checkout.session.completed" }),
    },
  }));
  return { default: MockStripe };
});

// ── Lightweight Express HTTP test helper (no supertest dependency) ──────
// supertest is not installed in this project.  Instead, we mount the router
// on an Express app and use Node's http module to make real requests against
// an ephemeral server.
async function requestApp(
  app: Express.Application,
  method: string,
  path: string,
  body?: unknown,
): Promise<{ status: number; body: any }> {
  const http = await import("http");
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const port = (server.address() as any).port;
      const data = body ? JSON.stringify(body) : null;
      const req = http.request(
        {
          hostname: "127.0.0.1",
          port,
          path,
          method: method.toUpperCase(),
          headers: {
            "Content-Type": "application/json",
            ...(data ? { "Content-Length": Buffer.byteLength(data) } : {}),
          },
        },
        (res) => {
          let buf = "";
          res.on("data", (chunk) => (buf += chunk));
          res.on("end", () => {
            server.close();
            let parsed: any;
            try {
              parsed = JSON.parse(buf);
            } catch {
              parsed = buf;
            }
            resolve({ status: res.statusCode ?? 0, body: parsed });
          });
        },
      );
      req.on("error", (err) => {
        server.close();
        reject(err);
      });
      if (data) req.write(data);
      req.end();
    });
  });
}

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
    const app = express();
    app.use(express.json());
    app.use(checkoutRouter);

    const res = await requestApp(app, "POST", "/api/create-checkout", {
      customerEmail: "test@example.com",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("priceId is required");
  });

  it("POST /api/create-checkout returns 403 for domain price IDs (checkout blocked)", async () => {
    const { checkoutRouter } = await import("./checkout");
    const express = (await import("express")).default;
    const app = express();
    app.use(express.json());
    app.use(checkoutRouter);

    const res = await requestApp(app, "POST", "/api/create-checkout", {
      priceId: "price_1TduLIIVlv7TZiKSoYRzm8h9",
      customerEmail: "test@example.com",
    });
    expect(res.status).toBe(403);
    expect(res.body.error).toContain("Domain registration is temporarily unavailable");
  });

  it("POST /api/check-domain returns 503 (domain check disabled)", async () => {
    const { checkoutRouter } = await import("./checkout");
    const express = (await import("express")).default;
    const app = express();
    app.use(express.json());
    app.use(checkoutRouter);

    const res = await requestApp(app, "POST", "/api/check-domain", {
      domain: "example.com",
    });
    expect(res.status).toBe(503);
    expect(res.body.disabled).toBe(true);
    expect(res.body.available).toBe(false);
  });
});
