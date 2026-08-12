import { Router } from "express";
import { existsSync } from "node:fs";
import path from "node:path";

const router = Router();

const BRAND_MESSAGE_FILENAME = "Business-Bloom-Brand-Message-Quick-Check-Fillable.pdf";

function resolvePublicFreeResource(filename: string) {
  const candidates = [
    path.resolve(process.cwd(), "dist", "public", "downloads", "free-resources", filename),
    path.resolve(process.cwd(), "client", "public", "downloads", "free-resources", filename),
  ];
  return candidates.find((candidate) => existsSync(candidate));
}

router.get("/api/free-resources/brand-message-quick-check", (_req, res) => {
  const filePath = resolvePublicFreeResource(BRAND_MESSAGE_FILENAME);
  if (!filePath) {
    res.status(404).json({ error: "Free Resource asset unavailable" });
    return;
  }

  res.setHeader("Cache-Control", "public, max-age=3600");
  res.download(filePath, BRAND_MESSAGE_FILENAME, { headers: { "Content-Type": "application/pdf" } }, (error) => {
    if (error && !res.headersSent) {
      res.status(500).json({ error: "Free Resource download unavailable" });
    }
  });
});

export { router as publicFreeResourceAttachmentRouter };
