import { describe, it, expect, vi, beforeEach } from "vitest";

const createSession = vi.fn().mockResolvedValue({ id: "cs_test_security", url: "https://checkout.stripe.com/test" });

vi.mock("stripe", () => {
  const MockStripe = vi.fn().mockImplementation(() => ({
    checkout: { sessions: { create: createSession, retrieve: vi.fn() } },
    webhooks: { constructEvent: vi.fn() },
  }));
  return { default: MockStripe };
});

async function requestApp(method: string, path: string, body?: unknown) {
  const express = (await import("express")).default;
  const http = await import("http");
  const { checkoutRouter } = await import("./checkout");
  const app = express();
  app.use(express.json());
  app.use(checkoutRouter);

  return new Promise<{ status: number; body: any }>((resolve, reject) => {
    const server = app.listen(0, () => {
      const port = (server.address() as any).port;
      const data = body ? JSON.stringify(body) : "";
      const req = http.request({
        hostname: "127.0.0.1",
        port,
        path,
        method,
        headers: {
          "Content-Type": "application/json",
          ...(data ? { "Content-Length": Buffer.byteLength(data) } : {}),
        },
      }, res => {
        let buf = "";
        res.on("data", chunk => (buf += chunk));
        res.on("end", () => {
          server.close();
          resolve({ status: res.statusCode ?? 0, body: buf ? JSON.parse(buf) : null });
        });
      });
      req.on("error", err => { server.close(); reject(err); });
      if (data) req.write(data);
      req.end();
    });
  });
}

describe("checkout security boundaries", () => {
  beforeEach(() => createSession.mockClear());

  it("rejects arbitrary legacy Stripe Price IDs", async () => {
    const res = await requestApp("POST", "/api/create-checkout", {
      priceId: "price_attacker_controlled",
      productName: "Spoofed Product",
      successPath: "https://evil.example/redirect",
    });

    expect(res.status).toBe(403);
    expect(res.body.error).toBe("Checkout product is not approved");
    expect(createSession).not.toHaveBeenCalled();
  });

  it("derives legacy product metadata and redirect from the server allowlist", async () => {
    const res = await requestApp("POST", "/api/create-checkout", {
      priceId: "price_1Tec5lIVlv7TZiKS5KOlD53t",
      productName: "Spoofed Product",
      successPath: "/attacker-path",
    });

    expect(res.status).toBe(200);
    expect(createSession).toHaveBeenCalledOnce();
    const params = createSession.mock.calls[0][0];
    expect(params.metadata.product_name).toBe("Automation System");
    expect(params.success_url).toBe("https://businessbloomllc.com/solutions?success=true");
    expect(params.cancel_url).toBe("https://businessbloomllc.com/solutions?canceled=true");
  });
});
