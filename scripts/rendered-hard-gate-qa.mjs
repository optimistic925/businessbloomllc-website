import { chromium } from "playwright";
import axe from "axe-core";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:4173";
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
const routes = [
  "/",
  "/solutions",
  "/marketplace",
  ...marketplaceSlugs.map((slug) => `/marketplace/${slug}`),
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

const PDF_MIME = "application/pdf";
const XLSX_MIME = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const freeResources = [
  ["30-Minute Business Reset", "Business-Bloom-30-Minute-Business-Reset-Fillable.pdf", "pdf", "30-MINUTE BUSINESS RESET"],
  ["Business Systems Checklist", "Business-Bloom-Business-Systems-Checklist-Fillable.pdf", "pdf", "BUSINESS SYSTEMS CHECKLIST"],
  ["Business Health Check", "Business-Bloom-Business-Health-Check.xlsx", "xlsx", "BUSINESS HEALTH CHECK"],
  ["Customer Service Scorecard", "Business-Bloom-Customer-Service-Scorecard.xlsx", "xlsx", "CUSTOMER SERVICE"],
  ["Sales Conversion Calculator", "Business-Bloom-Sales-Conversion-Calculator.xlsx", "xlsx", "SALES"],
  ["Interview Scorecard", "Business-Bloom-Interview-Scorecard.xlsx", "xlsx", "INTERVIEW"],
  ["Marketing ROI Calculator", "Business-Bloom-Marketing-ROI-Calculator.xlsx", "xlsx", "MARKETING ROI"],
  ["SOP Quick-Start Template", "Business-Bloom-SOP-Quick-Start-Template.xlsx", "xlsx", "SOP"],
  ["AI Automation Opportunity Finder", "Business-Bloom-AI-Automation-Opportunity-Finder.xlsx", "xlsx", "AUTOMATION"],
  ["Offer Clarity Worksheet", "Business-Bloom-Offer-Clarity-Worksheet-Fillable.pdf", "pdf", "OFFER"],
  ["Brand Message Quick Check", "Business-Bloom-Brand-Message-Quick-Check-Fillable.pdf", "pdf", "BRAND"],
  ["Website Conversion Checklist", "Business-Bloom-Website-Conversion-Checklist-Fillable.pdf", "pdf", "WEBSITE"],
  ["Social Content Consistency Planner", "Business-Bloom-Social-Content-Consistency-Planner.xlsx", "xlsx", "SOCIAL"],
];

const internalStatusTerms = [
  "finalized and delivery-ready",
  "verified resources",
  "current finalized resources",
  "current approved",
  "approved library",
  "delivery-ready",
  "in production",
  "incomplete resources are not published",
  "stripe mapping verified",
  "fulfillment qa",
  "production-ready",
  "approved delivery",
];

const browser = await chromium.launch({ headless: true });
const failures = [];
const downloadMatrix = [];

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

    if (route.startsWith("/marketplace/") && marketplaceSlugs.includes(route.split("/").pop())) {
      for (const phrase of ["Who it is for", "The problem it solves", "With this system, you’ll be able to:", "One-time price", "Digital delivery after successful checkout", "Secure checkout powered by Stripe"]) {
        if (!layout.bodyText.includes(phrase)) failures.push(`${viewport.name} ${route}: missing conversion/purchase copy '${phrase}'`);
      }
    }

    if (route === "/marketplace/business-bloom-professional-systems") {
      for (const phrase of ["6 Complete Business Systems", "Customer Service System™", "HR System™", "Marketing System™", "Operations System™", "AI Automation Bundles™", "Sales System™", "Plus Your Implementation Toolkit", "$1,932", "$1,397", "$535", "27.7%"]) {
        if (!layout.bodyText.includes(phrase)) failures.push(`${viewport.name} Professional Systems: missing ${phrase}`);
      }
    }

    if (route === "/marketplace/business-bloom-virtual-executive-team") {
      for (const phrase of [
        "Executive-level business decision support",
        "Your business decisions deserve more than one point of view.",
        "Meet Your Virtual Executive Team",
        "CEO — Chief Executive Officer",
        "CFO — Chief Financial Officer",
        "COO — Chief Operating Officer",
        "CMO — Chief Marketing Officer",
        "What You Receive",
        "Executive Decision Questionnaire",
        "Executive Team Prompt Library",
        "What This Looks Like in Real Life",
        "Why It Matters",
        "Human executives included",
        "Final decision-maker",
        "support@businessbloomllc.com",
      ]) {
        if (!layout.bodyText.includes(phrase)) failures.push(`${viewport.name} Virtual Executive Team: missing ${phrase}`);
      }
    }

    if (route === "/resources" || route === "/marketplace" || route === "/" || route.startsWith("/marketplace/")) {
      for (const term of internalStatusTerms) {
        if (layout.bodyText.toLowerCase().includes(term)) failures.push(`${viewport.name} ${route}: customer-facing internal status term '${term}'`);
      }
    }

    if (viewport.name === "mobile" || viewport.name === "desktop") {
      await page.addScriptTag({ content: axe.source });
      const axeResult = await page.evaluate(async () => await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
      }));
      for (const violation of axeResult.violations) failures.push(`${viewport.name} ${route}: axe ${violation.id} (${violation.impact || "impact-unknown"}) ${violation.nodes.length} node(s)`);

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
  const inspectionContext = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, acceptDownloads: true });
  const inspectionPage = await inspectionContext.newPage();
  const inspectionResponse = await inspectionPage.goto(`${base}/resources`, { waitUntil: "networkidle" });
  if (!inspectionResponse || inspectionResponse.status() >= 400) {
    failures.push(`${viewport.name} /resources download QA: navigation failed`);
    await inspectionContext.close();
    continue;
  }

  const html = await inspectionPage.content();
  for (const forbidden of ["drive.google.com", "docs.google.com", "r2.dev", "Internal-Do-Not-Distribute", "MARKETPLACE_DOWNLOAD_SIGNING_SECRET", "DOWNLOAD_SIGNING_SECRET"]) {
    if (html.includes(forbidden)) failures.push(`${viewport.name} /resources: exposed forbidden customer path or credential marker ${forbidden}`);
  }
  await inspectionContext.close();

  // Use a fresh browser context for each download. Chromium can throttle or suppress
  // repeated automatic downloads in a long-lived page, which can create false failures
  // unrelated to the resource, destination, MIME type, security, or file integrity.
  for (const [resourceName, expectedFilename, kind, contentMarker] of freeResources) {
    const matrixRow = { resource: resourceName, format: kind.toUpperCase(), action: "Download Free", destinationType: "unknown", filename: "", mimeType: "", viewport: viewport.name, security: "PASS", result: "FAIL" };
    const rowFailures = [];
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, acceptDownloads: true });
    const page = await context.newPage();

    try {
      const response = await page.goto(`${base}/resources`, { waitUntil: "networkidle" });
      if (!response || response.status() >= 400) {
        rowFailures.push(`resources navigation failed with status ${response?.status() ?? "none"}`);
      } else {
        const card = page.locator("article").filter({ hasText: resourceName });
        const button = card.getByRole("button", { name: /Download Free/i });
        if (await button.count() !== 1) {
          rowFailures.push("expected one Download Free button");
        } else {
          const beforeUrl = page.url();
          const [download] = await Promise.all([page.waitForEvent("download", { timeout: 10000 }), button.click()]);
          const afterUrl = page.url();
          const downloadUrl = download.url();
          matrixRow.filename = download.suggestedFilename();

          if (afterUrl !== beforeUrl) rowFailures.push(`download navigated page to ${afterUrl}`);
          if (afterUrl.startsWith("data:")) rowFailures.push("top-level data URL navigation detected");
          if (!afterUrl.startsWith("http://") && !afterUrl.startsWith("https://")) rowFailures.push(`customer left usable website state: ${afterUrl}`);

          if (downloadUrl.startsWith("blob:")) {
            matrixRow.destinationType = "Blob/object URL";
          } else if (/^https?:/.test(downloadUrl)) {
            matrixRow.destinationType = "customer-safe HTTPS";
            const parsed = new URL(downloadUrl);
            const expectedOrigin = new URL(base).origin;
            if (parsed.origin !== expectedOrigin) rowFailures.push(`cross-origin download destination ${parsed.origin}`);
            if (!(parsed.pathname.startsWith("/downloads/free-resources/") || parsed.pathname.startsWith("/api/free-resources/"))) rowFailures.push(`unapproved download path ${parsed.pathname}`);
            if (["drive.google.com", "docs.google.com"].includes(parsed.hostname) || parsed.hostname.endsWith("r2.dev")) rowFailures.push(`forbidden download host ${parsed.hostname}`);
            const direct = await context.request.get(downloadUrl);
            if (!direct.ok()) rowFailures.push(`download response HTTP ${direct.status()}`);
            const contentType = (direct.headers()["content-type"] || "").split(";")[0].toLowerCase();
            matrixRow.mimeType = contentType;
            const expectedMime = kind === "pdf" ? PDF_MIME : XLSX_MIME;
            if (contentType !== expectedMime) rowFailures.push(`MIME ${contentType || "missing"} != ${expectedMime}`);
            const disposition = direct.headers()["content-disposition"] || "";
            if (parsed.pathname.startsWith("/api/free-resources/") && !disposition.includes(expectedFilename)) rowFailures.push(`Content-Disposition missing filename ${expectedFilename}`);
          } else {
            matrixRow.destinationType = downloadUrl.split(":")[0] || "unknown";
            rowFailures.push(`unapproved destination type ${matrixRow.destinationType}`);
          }
          if (downloadUrl.startsWith("data:")) rowFailures.push("data URL download destination detected");
          if (/drive\.google\.com|docs\.google\.com|r2\.dev|Internal-Do-Not-Distribute/i.test(downloadUrl)) rowFailures.push("private/internal destination exposed");
          if (/secret|credential|token=/i.test(downloadUrl)) rowFailures.push("credential-like material exposed in destination");
          if (download.suggestedFilename() !== expectedFilename) rowFailures.push(`filename ${download.suggestedFilename()} != ${expectedFilename}`);

          const path = await download.path();
          if (!path) {
            rowFailures.push("downloaded file path unavailable");
          } else {
            const bytes = await readFile(path);
            if (bytes.length < 500) rowFailures.push(`downloaded file unexpectedly small (${bytes.length} bytes)`);
            if (kind === "pdf") {
              if (bytes.subarray(0, 5).toString("ascii") !== "%PDF-") rowFailures.push("invalid PDF signature");
              if (!bytes.subarray(Math.max(0, bytes.length - 2048)).toString("latin1").includes("%%EOF")) rowFailures.push("PDF EOF marker missing");
              const text = spawnSync("pdftotext", [path, "-"], { encoding: "utf8" });
              if (text.status !== 0) rowFailures.push("PDF failed to open/extract with pdftotext");
              if (!text.stdout.toUpperCase().includes(contentMarker)) rowFailures.push(`PDF intended content marker '${contentMarker}' missing`);
            } else {
              if (bytes.subarray(0, 2).toString("ascii") !== "PK") rowFailures.push("invalid XLSX ZIP signature");
              const zipTest = spawnSync("unzip", ["-t", path], { encoding: "utf8" });
              if (zipTest.status !== 0) rowFailures.push("XLSX ZIP integrity test failed");
              const workbook = spawnSync("unzip", ["-p", path, "xl/workbook.xml"], { encoding: "utf8" });
              if (workbook.status !== 0 || !workbook.stdout.includes("<workbook")) rowFailures.push("XLSX workbook content missing");
              const workbookText = spawnSync("unzip", ["-p", path, "xl/*.xml"], { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 });
              if (!workbookText.stdout.toUpperCase().includes(contentMarker)) rowFailures.push(`XLSX intended content marker '${contentMarker}' missing`);
            }
          }
        }
      }
    } catch (error) {
      rowFailures.push(`download interaction failed (${error.message})`);
    } finally {
      await context.close();
    }

    if (rowFailures.length === 0) matrixRow.result = "PASS";
    else {
      matrixRow.security = rowFailures.some((item) => /private|credential|forbidden|cross-origin|unapproved/i.test(item)) ? "FAIL" : "PASS";
      for (const problem of rowFailures) failures.push(`${viewport.name} ${resourceName}: ${problem}`);
    }
    downloadMatrix.push(matrixRow);
  }
}

await browser.close();
console.log("FREE RESOURCE RENDERED QA MATRIX");
console.table(downloadMatrix);

if (failures.length) {
  console.error("Rendered hard-gate QA failed:\n" + failures.map((x) => `- ${x}`).join("\n"));
  process.exit(1);
}

console.log(`Rendered hard-gate QA passed for ${routes.length} routes across ${viewports.length} viewports and all ${freeResources.length} Free Resource downloads on mobile + desktop.`);