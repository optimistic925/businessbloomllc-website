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

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${BRAND_MESSAGE_FILENAME}"`);
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.sendFile(filePath);
});

export { router as publicFreeResourceAttachmentRouter };
