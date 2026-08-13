import { Router } from "express";
import { getFreeResourceLeadDefinition } from "../shared/freeResourceLeadRegistry";

export const freeResourceLeadRouter = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizedText(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function publicOrigin() {
  return (process.env.PUBLIC_SITE_ORIGIN || "https://businessbloomllc.com").replace(/\/+$/, "");
}

function configuredWorkflowUrl() {
  const raw = process.env.FREE_RESOURCE_N8N_WEBHOOK_URL;
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

freeResourceLeadRouter.post("/api/free-resource-leads", async (req, res) => {
  const firstName = normalizedText(req.body?.first_name, 100);
  const email = normalizedText(req.body?.email, 320).toLowerCase();
  const phone = normalizedText(req.body?.phone, 50);
  const resourceSlug = normalizedText(req.body?.resource_slug, 120);
  const marketingEmailConsent = req.body?.marketing_email_consent === true;

  if (!firstName) return res.status(400).json({ ok: false, error: "first_name is required" });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ ok: false, error: "valid email is required" });

  const resource = getFreeResourceLeadDefinition(resourceSlug);
  if (!resource) return res.status(400).json({ ok: false, error: "resource_slug is not approved" });

  const workflowUrl = configuredWorkflowUrl();
  if (!workflowUrl) return res.status(503).json({ ok: false, error: "Free Resource lead service is temporarily unavailable" });

  const submittedAt = new Date().toISOString();
  const downloadUrl = `${publicOrigin()}${resource.downloadPath}`;
  const payload = {
    first_name: firstName,
    email,
    resource_name: resource.name,
    resource_slug: resource.slug,
    resource_category: resource.category,
    source: "business-bloom-free-resources",
    submitted_at: submittedAt,
    marketing_email_consent: marketingEmailConsent,
    download_url: downloadUrl,
    ...(phone ? { phone } : {}),
  };

  try {
    const response = await fetch(workflowUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
    });
    const body = await response.json().catch(() => null) as null | Record<string, unknown>;
    if (!response.ok || body?.lead_recorded !== true) {
      console.error("Free Resource lead workflow failed", { status: response.status, resourceSlug });
      return res.status(502).json({ ok: false, error: "We could not record your request yet. Please try again." });
    }
    return res.status(200).json({
      ok: true,
      lead_recorded: true,
      email_sent: body.email_sent === true,
      marketing_enrolled: marketingEmailConsent && body.marketing_enrolled === true,
      nurture_eligible: marketingEmailConsent && body.nurture_eligible === true,
      resource_name: resource.name,
      resource_slug: resource.slug,
      download_url: downloadUrl,
    });
  } catch (error) {
    console.error("Free Resource lead workflow unavailable", { resourceSlug, message: error instanceof Error ? error.message : "unknown error" });
    return res.status(502).json({ ok: false, error: "We could not record your request yet. Please try again." });
  }
});
