import { chromium } from "playwright";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:4173";
const origin = "https://businessbloomllc.com";
const marketplaceSlugs = [
  "business-bloom-customer-service-system",
  "business-bloom-hr-system",
  "business-bloom-marketing-system",
  "business-bloom-operations-system",
  "business-bloom-ai-automation-bundles",
  "business-bloom-professional-systems",
  "business-bloom-website-system",
  "business-bloom-virtual-executive-team",
  "business-bloom-branding-system",
  "business-bloom-foundation-system",
  "business-bloom-business-launch-blueprint",
  "business-bloom-content-marketing-system",
  "business-bloom-social-media-system",
];
const indexableRoutes = [
  "/",
  "/solutions",
  "/about",
  "/resources",
  "/get-started",
  "/marketplace",
  ...marketplaceSlugs.map((slug) => `/marketplace/${slug}`),
  "/prompt-packs",
  "/dfy-services",
  "/hosting",
  "/domains",
  "/shopify-app",
  "/free-shopify-store",
  "/support",
  "/privacy",
  "/terms",
];
const noindexRoutes = ["/marketplace/success", "/marketplace/cancel", "/404", "/definitely-not-a-real-route"];
const expectedSitemapRoutes = new Set(indexableRoutes);
const failures = [];
const seenTitles = new Map();

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

for (const route of [...indexableRoutes, ...noindexRoutes]) {
  const page = await context.newPage();
  const response = await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
  if (!response || response.status() >= 500) failures.push(`${route}: navigation status ${response?.status() ?? "none"}`);

  const metadata = await page.evaluate(() => ({
    title: document.title,
    descriptions: [...document.querySelectorAll('meta[name="description"]')].map((el) => el.getAttribute("content")),
    canonicals: [...document.querySelectorAll('link[rel="canonical"]')].map((el) => el.getAttribute("href")),
    robots: [...document.querySelectorAll('meta[name="robots"]')].map((el) => el.getAttribute("content")),
    ogTitle: [...document.querySelectorAll('meta[property="og:title"]')].map((el) => el.getAttribute("content")),
    ogDescription: [...document.querySelectorAll('meta[property="og:description"]')].map((el) => el.getAttribute("content")),
    ogUrl: [...document.querySelectorAll('meta[property="og:url"]')].map((el) => el.getAttribute("content")),
    twitterCard: [...document.querySelectorAll('meta[name="twitter:card"]')].map((el) => el.getAttribute("content")),
    twitterTitle: [...document.querySelectorAll('meta[name="twitter:title"]')].map((el) => el.getAttribute("content")),
    twitterDescription: [...document.querySelectorAll('meta[name="twitter:description"]')].map((el) => el.getAttribute("content")),
  }));

  if (!metadata.title.trim()) failures.push(`${route}: empty title`);
  if (metadata.descriptions.length !== 1 || !metadata.descriptions[0]?.trim()) failures.push(`${route}: expected one non-empty meta description`);
  if (metadata.canonicals.length !== 1) failures.push(`${route}: expected one canonical, found ${metadata.canonicals.length}`);
  const expectedCanonical = `${origin}${route === "/" ? "/" : route}`;
  if (metadata.canonicals[0] !== expectedCanonical) failures.push(`${route}: canonical ${metadata.canonicals[0]} != ${expectedCanonical}`);
  if (metadata.robots.length !== 1) failures.push(`${route}: expected one robots meta, found ${metadata.robots.length}`);
  const expectedRobots = indexableRoutes.includes(route) ? "index,follow" : "noindex,follow";
  if (metadata.robots[0] !== expectedRobots) failures.push(`${route}: robots ${metadata.robots[0]} != ${expectedRobots}`);
  for (const [name, values] of Object.entries({
    "og:title": metadata.ogTitle,
    "og:description": metadata.ogDescription,
    "og:url": metadata.ogUrl,
    "twitter:card": metadata.twitterCard,
    "twitter:title": metadata.twitterTitle,
    "twitter:description": metadata.twitterDescription,
  })) {
    if (values.length !== 1 || !values[0]?.trim()) failures.push(`${route}: expected one non-empty ${name}`);
  }
  if (metadata.ogTitle[0] !== metadata.title) failures.push(`${route}: Open Graph title does not match document title`);
  if (metadata.twitterTitle[0] !== metadata.title) failures.push(`${route}: Twitter title does not match document title`);
  if (metadata.ogDescription[0] !== metadata.descriptions[0]) failures.push(`${route}: Open Graph description does not match meta description`);
  if (metadata.twitterDescription[0] !== metadata.descriptions[0]) failures.push(`${route}: Twitter description does not match meta description`);
  if (metadata.ogUrl[0] !== expectedCanonical) failures.push(`${route}: og:url ${metadata.ogUrl[0]} != ${expectedCanonical}`);

  if (indexableRoutes.includes(route)) {
    const prior = seenTitles.get(metadata.title);
    if (prior) failures.push(`${route}: duplicate indexable title also used by ${prior}`);
    else seenTitles.set(metadata.title, route);
  }
  await page.close();
}

const home = await context.newPage();
await home.goto(`${base}/`, { waitUntil: "networkidle" });
const ldJson = await home.evaluate(() => [...document.querySelectorAll('script[type="application/ld+json"]')].map((el) => el.textContent || ""));
if (ldJson.length !== 1) failures.push(`homepage: expected one JSON-LD block, found ${ldJson.length}`);
else {
  try {
    const parsed = JSON.parse(ldJson[0]);
    const graph = parsed?.["@graph"];
    const org = Array.isArray(graph) ? graph.find((item) => item?.["@type"] === "Organization") : null;
    const site = Array.isArray(graph) ? graph.find((item) => item?.["@type"] === "WebSite") : null;
    if (!org) failures.push("homepage: Organization structured data missing");
    if (!site) failures.push("homepage: WebSite structured data missing");
    if (org) {
      const allowedOrgKeys = new Set(["@type", "@id", "name", "url", "description"]);
      for (const key of Object.keys(org)) if (!allowedOrgKeys.has(key)) failures.push(`homepage Organization: unsupported field ${key}`);
      if (org.name !== "Business Bloom") failures.push(`homepage Organization: unexpected name ${org.name}`);
      if (org.url !== `${origin}/`) failures.push(`homepage Organization: unexpected url ${org.url}`);
    }
    if (site) {
      const allowedSiteKeys = new Set(["@type", "@id", "url", "name", "publisher"]);
      for (const key of Object.keys(site)) if (!allowedSiteKeys.has(key)) failures.push(`homepage WebSite: unsupported field ${key}`);
      if (site.name !== "Business Bloom") failures.push(`homepage WebSite: unexpected name ${site.name}`);
      if (site.url !== `${origin}/`) failures.push(`homepage WebSite: unexpected url ${site.url}`);
    }
  } catch (error) {
    failures.push(`homepage: JSON-LD parse failed (${error.message})`);
  }
}
await home.close();

const robotsResponse = await context.request.get(`${base}/robots.txt`);
if (!robotsResponse.ok()) failures.push(`robots.txt: HTTP ${robotsResponse.status()}`);
else {
  const robots = await robotsResponse.text();
  for (const required of ["User-agent: *", "Allow: /", "Disallow: /marketplace/success", "Disallow: /marketplace/cancel", `Sitemap: ${origin}/sitemap.xml`]) {
    if (!robots.includes(required)) failures.push(`robots.txt: missing '${required}'`);
  }
}

const sitemapResponse = await context.request.get(`${base}/sitemap.xml`);
if (!sitemapResponse.ok()) failures.push(`sitemap.xml: HTTP ${sitemapResponse.status()}`);
else {
  const sitemap = await sitemapResponse.text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const routes = new Set(urls.map((url) => new URL(url).pathname));
  for (const route of expectedSitemapRoutes) if (!routes.has(route)) failures.push(`sitemap.xml: missing ${route}`);
  for (const route of noindexRoutes) if (routes.has(route)) failures.push(`sitemap.xml: noindex route included ${route}`);
  if (routes.size !== expectedSitemapRoutes.size) failures.push(`sitemap.xml: expected ${expectedSitemapRoutes.size} indexable routes, found ${routes.size}`);
}

await context.close();
await browser.close();

if (failures.length) {
  console.error("SEO/AEO validation failed:\n" + failures.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}
console.log(`SEO/AEO validation passed for ${indexableRoutes.length} indexable routes and ${noindexRoutes.length} noindex routes.`);
