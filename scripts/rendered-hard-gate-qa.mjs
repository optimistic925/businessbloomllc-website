import { chromium } from "playwright";
import axe from "axe-core";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:4173";
const routes = [
  "/",
  "/solutions",
  "/marketplace",
  "/marketplace/business-bloom-professional-systems",
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

const freeResources = [
  ["30-Minute Business Reset", "Business-Bloom-30-Minute-Business-Reset-Fillable.pdf", "pdf"],
  ["Business Systems Checklist", "Business-Bloom-Business-Systems-Checklist-Fillable.pdf", "pdf"],
  ["Business Health Check", "Business-Bloom-Business-Health-Check.xlsx", "xlsx"],
  ["Customer Service Scorecard", "Business-Bloom-Customer-Service-Scorecard.xlsx", "xlsx"],
  ["Sales Conversion Calculator", "Business-Bloom-Sales-Conversion-Calculator.xlsx", "xlsx"],
  ["Interview Scorecard", "Business-Bloom-Interview-Scorecard.xlsx", "xlsx"],
  ["Marketing ROI Calculator", "Business-Bloom-Marketing-ROI-Calculator.xlsx", "xlsx"],
  ["SOP Quick-Start Template", "Business-Bloom-SOP-Quick-Start-Template.xlsx", "xlsx"],
  ["AI Automation Opportunity Finder", "Business-Bloom-AI-Automation-Opportunity-Finder.xlsx", "xlsx"],
  ["Offer Clarity Worksheet", "Business-Bloom-Offer-Clarity-Worksheet-Fillable.pdf", "pdf"],
  ["Brand Message Quick Check", "Business-Bloom-Brand-Message-Quick-Check-Fillable.pdf", "pdf"],
  ["Website Conversion Checklist", "Business-Bloom-Website-Conversion-Checklist-Fillable.pdf", "pdf"],
  ["Social Content Consistency Planner", "Business-Bloom-Social-Content-Consistency-Planner.xlsx", "xlsx"],
];

const browser = await chromium.launch({ headless: true });
const failures = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, acceptDownloads: true });
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

    if (route === "/marketplace/business-bloom-professional-systems") {
      const requiredCopy = [
        "6 Complete Business Systems",
        "Customer Service System™",
        "HR System™",
        "Marketing System™",
        "Operations System™",
        "AI Automation Bundles™",
        "Sales System™",
        "Plus Your Implementation Toolkit",
        "$1,932",
        "$1,397",
        "$535",
        "27.7%",
      ];
      for (const phrase of requiredCopy) {
        if (!layout.bodyText.includes(phrase)) failures.push(`${viewport.name} Professional Systems: missing ${phrase}`);
      }
    }

    if (route === "/resources" || route === "/marketplace" || route === "/") {
      const internalStatusTerms = [
        "finalized and delivery-ready",
        "verified resources",
        "Current finalized resources",
        "current approved",
        "delivery-ready",
        "incomplete resources are not published",
      ];
      for (const term of internalStatusTerms) {
        if (layout.bodyText.toLowerCase().includes(term.toLowerCase())) failures.push(`${viewport.name} ${route}: customer-facing internal status term '${term}'`);
      }
    }

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

for (const viewport of viewports.filter((item) => item.name === "mobile" || item.name === "desktop")) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, acceptDownloads: true });
  const page = await context.newPage();
  const response = await page.goto(`${base}/resources`, { waitUntil: "networkidle" });
  if (!response || response.status() >= 400) {
    failures.push(`${viewport.name} /resources download QA: navigation failed`);
    await context.close();
    continue;
  }

  const html = await page.content();
  for (const forbidden of ["drive.google.com", "docs.google.com", "r2.dev", "Internal-Do-Not-Distribute"]) {
    if (html.includes(forbidden)) failures.push(`${viewport.name} /resources: exposed forbidden customer path ${forbidden}`);
  }

  for (const [resourceName, expectedFilename, kind] of freeResources) {
    const card = page.locator("article").filter({ hasText: resourceName });
    const button = card.getByRole("button", { name: /Download Free/i });
    if (await button.count() !== 1) {
      failures.push(`${viewport.name} ${resourceName}: expected one Download Free button`);
      continue;
    }

    const beforeUrl = page.url();
    try {
      const [download] = await Promise.all([
        page.waitForEvent("download", { timeout: 10000 }),
        button.click(),
      ]);
      const afterUrl = page.url();
      if (afterUrl !== beforeUrl) failures.push(`${viewport.name} ${resourceName}: download navigated page to ${afterUrl}`);
      if (afterUrl.startsWith("data:")) failures.push(`${viewport.name} ${resourceName}: data URL navigation detected`);
      if (!download.url().startsWith("blob:")) failures.push(`${viewport.name} ${resourceName}: expected object URL download, got ${download.url().slice(0, 32)}`);
      if (download.suggestedFilename() !== expectedFilename) failures.push(`${viewport.name} ${resourceName}: filename ${download.suggestedFilename()} != ${expectedFilename}`);

      const path = await download.path();
      if (!path) {
        failures.push(`${viewport.name} ${resourceName}: downloaded file path unavailable`);
        continue;
      }
      const bytes = await readFile(path);
      if (bytes.length < 500) failures.push(`${viewport.name} ${resourceName}: downloaded file unexpectedly small (${bytes.length} bytes)`);

      if (kind === "pdf") {
        if (bytes.subarray(0, 5).toString("ascii") !== "%PDF-") failures.push(`${viewport.name} ${resourceName}: invalid PDF signature`);
        if (!bytes.subarray(Math.max(0, bytes.length - 1024)).toString("latin1").includes("%%EOF")) failures.push(`${viewport.name} ${resourceName}: PDF EOF marker missing`);
      } else {
        if (bytes.subarray(0, 2).toString("ascii") !== "PK") failures.push(`${viewport.name} ${resourceName}: invalid XLSX ZIP signature`);
        const zipTest = spawnSync("unzip", ["-t", path], { encoding: "utf8" });
        if (zipTest.status !== 0) failures.push(`${viewport.name} ${resourceName}: XLSX ZIP integrity test failed`);
        const workbook = spawnSync("unzip", ["-p", path, "xl/workbook.xml"], { encoding: "utf8" });
        if (workbook.status !== 0 || !workbook.stdout.includes("<workbook")) failures.push(`${viewport.name} ${resourceName}: XLSX workbook content missing`);
      }
    } catch (error) {
      failures.push(`${viewport.name} ${resourceName}: download interaction failed (${error.message})`);
    }
  }

  await context.close();
}

await browser.close();

if (failures.length) {
  console.error("Rendered hard-gate QA failed:\n" + failures.map(x => `- ${x}`).join("\n"));
  process.exit(1);
}

console.log(`Rendered hard-gate QA passed for ${routes.length} routes across ${viewports.length} viewports and all ${freeResources.length} Free Resource downloads on mobile + desktop.`);
