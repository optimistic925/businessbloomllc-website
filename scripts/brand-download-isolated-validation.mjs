import { readFile } from "node:fs/promises";
import { chromium } from "playwright";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:4173";
const expectedFilename = "Business-Bloom-Brand-Message-Quick-Check-Fillable.pdf";

const browser = await chromium.launch({ headless: true });
for (const viewport of [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
]) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, acceptDownloads: true });
  const page = await context.newPage();
  await page.goto(`${base}/resources`, { waitUntil: "networkidle" });
  const card = page.locator("article").filter({ hasText: "Brand Message Quick Check" });
  const button = card.getByRole("button", { name: /Download Free/i });
  if (await button.count() !== 1) throw new Error(`${viewport.name}: expected one download button`);
  const [download] = await Promise.all([page.waitForEvent("download", { timeout: 10000 }), button.click()]);
  if (download.suggestedFilename() !== expectedFilename) throw new Error(`${viewport.name}: unexpected filename ${download.suggestedFilename()}`);
  const downloadUrl = download.url();
  const parsed = new URL(downloadUrl);
  if (parsed.origin !== new URL(base).origin || !parsed.pathname.startsWith("/downloads/free-resources/")) {
    throw new Error(`${viewport.name}: unsafe download URL ${downloadUrl}`);
  }
  const path = await download.path();
  if (!path) throw new Error(`${viewport.name}: downloaded path unavailable`);
  const bytes = await readFile(path);
  if (bytes.subarray(0, 5).toString("ascii") !== "%PDF-") throw new Error(`${viewport.name}: invalid PDF signature`);
  console.log(`${viewport.name}: isolated Brand Message Quick Check download PASS (${bytes.length} bytes)`);
  await context.close();
}
await browser.close();
