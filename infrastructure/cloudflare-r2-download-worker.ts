interface Env {
  BUSINESS_BLOOM_PAID_PRODUCTS: {
    get(key: string): Promise<any>;
  };
  DOWNLOAD_SIGNING_SECRET?: string;
}

const BRANDING_PRODUCT = "business-bloom-branding-system";
const BRANDING_ROUTE = "/bundles/business-bloom-branding-system";
const BRANDING_OBJECT_KEYS = [
  "Business-Bloom-Website-System-v1.0-Customer-Download (1)/Business-Bloom-Branding-System-v1.0-Part-1-Core-Editable.zip",
  "Business-Bloom-Website-System-v1.0-Customer-Download (1)/Business-Bloom-Branding-System-v1.0-Part-2-Worksheets.zip",
  "Business-Bloom-Website-System-v1.0-Customer-Download (1)/Business-Bloom-Branding-System-v1.0-Part-3-Examples-Safety-Reference.zip",
  "Business-Bloom-Website-System-v1.0-Customer-Download (1)/Business-Bloom-Branding-System-v1.0-Part-4-PDFs.zip",
] as const;

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

function privateResponse(body: BodyInit | null, status: number, extraHeaders: Record<string, string> = {}) {
  return new Response(body, {
    status,
    headers: {
      "cache-control": "private, no-store",
      "x-content-type-options": "nosniff",
      ...extraHeaders,
    },
  });
}

function encodedObjectPath(objectKey: string) {
  return `/${objectKey.split("/").map((segment) => encodeURIComponent(segment)).join("/")}`;
}

async function signedBrandingManifest(request: Request, url: URL, secret: string, expires: number) {
  if (url.pathname !== BRANDING_ROUTE || url.searchParams.get("product") !== BRANDING_PRODUCT) return null;

  if (url.searchParams.get("probe") === "1") {
    return privateResponse(JSON.stringify({ ok: true, product: BRANDING_PRODUCT, parts: BRANDING_OBJECT_KEYS.length }), 200, {
      "content-type": "application/json; charset=utf-8",
    });
  }

  const links = await Promise.all(
    BRANDING_OBJECT_KEYS.map(async (objectKey) => {
      const path = encodedObjectPath(objectKey);
      const signature = await sign(secret, `${BRANDING_PRODUCT}\n${path}\n${expires}`);
      const target = new URL(path, url.origin);
      target.searchParams.set("product", BRANDING_PRODUCT);
      target.searchParams.set("exp", String(expires));
      target.searchParams.set("sig", signature);
      return { fileName: objectKey.split("/").pop() || "branding-package.zip", href: target.toString() };
    }),
  );

  if (request.method === "HEAD") {
    return privateResponse(null, 200, { "content-type": "text/html; charset=utf-8" });
  }

  const list = links
    .map(({ fileName, href }, index) => `<li><a href="${href}">Part ${index + 1}: ${fileName}</a></li>`)
    .join("");
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Business Bloom Branding System Download</title></head><body><main><h1>Business Bloom Branding System</h1><p>Your purchase contains four customer-download ZIP files. Download all four parts before this link expires.</p><ol>${list}</ol><p>Need help? Visit https://businessbloomllc.com/support</p></main></body></html>`;

  return privateResponse(html, 200, {
    "content-type": "text/html; charset=utf-8",
    "content-security-policy": "default-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
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

    const brandingManifest = await signedBrandingManifest(request, url, env.DOWNLOAD_SIGNING_SECRET, expires);
    if (brandingManifest) return brandingManifest;

    let objectKey: string;
    try {
      objectKey = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    } catch {
      return privateResponse("Not Found", 404);
    }

    if (!objectKey || objectKey.includes("..")) return privateResponse("Not Found", 404);

    const object = await env.BUSINESS_BLOOM_PAID_PRODUCTS.get(objectKey);
    if (!object) return privateResponse("Not Found", 404);

    if (url.searchParams.get("probe") === "1") {
      return privateResponse(JSON.stringify({ ok: true, product, objectKey, contentType: object.httpMetadata?.contentType || null }), 200, {
        "content-type": "application/json; charset=utf-8",
      });
    }

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
