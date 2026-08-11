interface Env {
  BUSINESS_BLOOM_PAID_PRODUCTS: {
    get(key: string): Promise<any>;
  };
  DOWNLOAD_SIGNING_SECRET?: string;
}

function hex(bytes: ArrayBuffer) {
  return [...new Uint8Array(bytes)].map((value) => value.toString(16).padStart(2, "0")).join("");
}

async function sign(secret: string, payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return hex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload)));
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index += 1) result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return result === 0;
}

function privateResponse(body: string, status: number, extraHeaders: Record<string, string> = {}) {
  return new Response(body, {
    status,
    headers: {
      "cache-control": "private, no-store",
      "x-content-type-options": "nosniff",
      ...extraHeaders,
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Production intentionally fails closed until the signing secret is provisioned
    // through Cloudflare's secret store and the server-side signer uses the same value.
    if (!env.DOWNLOAD_SIGNING_SECRET) {
      return privateResponse("Service Unavailable", 503);
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return privateResponse("Method Not Allowed", 405, { Allow: "GET, HEAD" });
    }

    const url = new URL(request.url);
    const product = url.searchParams.get("product") || "";
    const expiresRaw = url.searchParams.get("exp") || "";
    const suppliedSignature = url.searchParams.get("sig") || "";
    const expires = Number(expiresRaw);

    if (!product || !Number.isInteger(expires) || !suppliedSignature) {
      return privateResponse("Unauthorized", 401);
    }
    if (Math.floor(Date.now() / 1000) > expires) {
      return privateResponse("Link expired", 410);
    }

    const expectedSignature = await sign(env.DOWNLOAD_SIGNING_SECRET, `${product}\n${url.pathname}\n${expires}`);
    if (!constantTimeEqual(expectedSignature, suppliedSignature)) {
      return privateResponse("Forbidden", 403);
    }

    const objectKey = url.pathname.replace(/^\/+/, "");
    if (!objectKey || objectKey.includes("..")) return privateResponse("Not Found", 404);

    const object = await env.BUSINESS_BLOOM_PAID_PRODUCTS.get(objectKey);
    if (!object) return privateResponse("Not Found", 404);

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.set("cache-control", "private, no-store");
    headers.set("content-disposition", `attachment; filename="${objectKey.split("/").pop() || "business-bloom-download"}"`);
    headers.set("x-content-type-options", "nosniff");
    headers.set("content-security-policy", "default-src 'none'; frame-ancestors 'none'");

    return new Response(request.method === "HEAD" ? null : object.body, { headers });
  },
};
