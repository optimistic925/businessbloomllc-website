import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const root = "dist/public";
const forbidden = [
  "sourceFolderId",
  "customerDownloadSource",
  "engineeringHandoff",
  "productManifestSource",
  "1pZ3yNOQSkkeRMa4jG9Mg9T2IbOXHfLYD",
  "sk_live_",
  "rk_live_",
  "whsec_",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
];

async function files(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const path = join(dir, name);
    const info = await stat(path);
    if (info.isDirectory()) out.push(...await files(path));
    else out.push(path);
  }
  return out;
}

const violations = [];
for (const path of await files(root)) {
  const text = await readFile(path, "utf8").catch(() => "");
  for (const marker of forbidden) {
    if (text.includes(marker)) violations.push(`${path}: ${marker}`);
  }
}

if (violations.length) {
  console.error("Public bundle exposure check failed:\n" + violations.join("\n"));
  process.exit(1);
}

console.log("Public bundle exposure check passed.");
