import { chromium } from "playwright";
import axe from "axe-core";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:4173";
const routes = [
  "/",
  "/solutions",
  "/marketplace",
  "/resources",
  "/about",
  "/support",
  "/terms",
  "/privacy",
];
const viewports = [
  { name: "mobile-small", width: 360, height: 800 },
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

const browser = await chromium.launch({ headless: true });
const failures = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
  for (const route of routes) {
    const page = await context.newPage();
    const response = await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    if (!response || response.status() >= 400) {
      failures.push(`${viewport.name} ${route}: navigation status ${response?.status() ?? "none"}`);
      await page.close();
      continue;
    }

    const layout = await page.evaluate(() => ({
      bodyText: document.body.innerText.trim(),
      docWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
      h1Count: document.querySelectorAll("h1").length,
    }));
    if (!layout.bodyText) failures.push(`${viewport.name} ${route}: empty rendered body`);
    if (layout.docWidth > layout.viewportWidth + 2) failures.push(`${viewport.name} ${route}: horizontal overflow ${layout.docWidth}>${layout.viewportWidth}`);
    if (layout.h1Count !== 1) failures.push(`${viewport.name} ${route}: expected exactly one h1, found ${layout.h1Count}`);

    if (viewport.name === "mobile" || viewport.name === "desktop") {
      await page.addScriptTag({ content: axe.source });
      const axeResult = await page.evaluate(async () => await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
      }));
      for (const violation of axeResult.violations) {
        failures.push(`${viewport.name} ${route}: axe ${violation.id} (${violation.impact || "impact-unknown"}) ${violation.nodes.length} node(s)`);
      }

      await page.keyboard.press("Tab");
      const firstFocus = await page.evaluate(() => ({ tag: document.activeElement?.tagName, body: document.activeElement === document.body }));
      if (!firstFocus.tag || firstFocus.body) failures.push(`${viewport.name} ${route}: keyboard Tab did not move focus to an interactive element`);
    }

    const safe = route === "/" ? "home" : route.replaceAll("/", "-").replace(/^-/, "");
    await page.screenshot({ path: `qa-artifacts/${viewport.name}-${safe}.png`, fullPage: true });
    await page.close();
  }
  await context.close();
}

await browser.close();

if (failures.length) {
  console.error("Rendered hard-gate QA failed:\n" + failures.map(x => `- ${x}`).join("\n"));
  process.exit(1);
}

console.log(`Rendered hard-gate QA passed for ${routes.length} routes across ${viewports.length} viewports.`);
