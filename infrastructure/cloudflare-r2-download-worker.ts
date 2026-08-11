interface Env {
  BUSINESS_BLOOM_PAID_PRODUCTS: R2Bucket;
  DOWNLOAD_SIGNING_SECRET: string;
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
    }

    const url = new URL(request.url);
    const product = url.searchParams.get("product") || "";
    const expiresRaw = url.searchParams.get("exp") || "";
    const suppliedSignature = url.searchParams.get("sig") || "";
    const expires = Number(expiresRaw);

    if (!product || !Number.isInteger(expires) || !suppliedSignature) {
      return new Response("Unauthorized", { status: 401 });
    }
    if (Math.floor(Date.now() / 1000) > expires) {
      return new Response("Link expired", { status: 410 });
    }

    const expectedSignature = await sign(env.DOWNLOAD_SIGNING_SECRET, `${product}\n${url.pathname}\n${expires}`);
    if (!constantTimeEqual(expectedSignature, suppliedSignature)) {
      return new Response("Forbidden", { status: 403 });
    }

    const objectKey = url.pathname.replace(/^\/+/, "");
    if (!objectKey || objectKey.includes("..")) return new Response("Not Found", { status: 404 });

    const object = await env.BUSINESS_BLOOM_PAID_PRODUCTS.get(objectKey);
    if (!object) return new Response("Not Found", { status: 404 });

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.set("cache-control", "private, no-store");
    headers.set("content-disposition", `attachment; filename="${objectKey.split("/").pop() || "business-bloom-download"}"`);
    headers.set("x-content-type-options", "nosniff");

    return new Response(request.method === "HEAD" ? null : object.body, { headers });
  },
} satisfies ExportedHandler<Env>;
