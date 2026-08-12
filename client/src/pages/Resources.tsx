import { ArrowRight, FileSpreadsheet, FileText, Gift, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ALL_PUBLIC_FREE_RESOURCES } from "../../../shared/freeResources";
import { getFreeResourceDeliveryConfig } from "../../../shared/freeResourceDelivery";

const FREE_RESOURCE_FILENAMES: Record<string, string> = {
  "30-minute-business-reset": "Business-Bloom-30-Minute-Business-Reset-Fillable.pdf",
  "business-systems-checklist": "Business-Bloom-Business-Systems-Checklist-Fillable.pdf",
  "business-health-check": "Business-Bloom-Business-Health-Check.xlsx",
  "customer-service-scorecard": "Business-Bloom-Customer-Service-Scorecard.xlsx",
  "sales-conversion-calculator": "Business-Bloom-Sales-Conversion-Calculator.xlsx",
  "interview-scorecard": "Business-Bloom-Interview-Scorecard.xlsx",
  "marketing-roi-calculator": "Business-Bloom-Marketing-ROI-Calculator.xlsx",
  "sop-quick-start-template": "Business-Bloom-SOP-Quick-Start-Template.xlsx",
  "ai-automation-opportunity-finder": "Business-Bloom-AI-Automation-Opportunity-Finder.xlsx",
  "offer-clarity-worksheet": "Business-Bloom-Offer-Clarity-Worksheet-Fillable.pdf",
  "brand-message-quick-check": "Business-Bloom-Brand-Message-Quick-Check-Fillable.pdf",
  "website-conversion-checklist": "Business-Bloom-Website-Conversion-Checklist-Fillable.pdf",
  "social-content-consistency-planner": "Business-Bloom-Social-Content-Consistency-Planner.xlsx",
};

function formatIcon(format: string) {
  return format.toLowerCase().includes("spreadsheet") ? FileSpreadsheet : FileText;
}

function resolveCustomerSafeUrl(deliveryUrl: string) {
  const resolved = new URL(deliveryUrl, window.location.origin);
  if (!/^https?:$/.test(resolved.protocol) || resolved.origin !== window.location.origin) {
    throw new Error("Free Resource destination is not an approved customer-safe URL");
  }
  return resolved;
}

function downloadFreeResource(slug: string, deliveryUrl: string) {
  try {
    const filename = FREE_RESOURCE_FILENAMES[slug];
    if (!filename) throw new Error("Download filename is not configured");

    const resolved = resolveCustomerSafeUrl(deliveryUrl);
    const anchor = document.createElement("a");
    anchor.href = resolved.href;
    anchor.download = filename;
    anchor.rel = "noopener";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  } catch (error) {
    console.error("Free Resource download failed", error);
    toast.error("We couldn't start that download. Please try again or contact support.");
  }
}

async function downloadBrandMessageQuickCheck(deliveryUrl: string) {
  let objectUrl: string | null = null;
  try {
    const filename = FREE_RESOURCE_FILENAMES["brand-message-quick-check"];
    const resolved = resolveCustomerSafeUrl(deliveryUrl);
    const response = await fetch(resolved.href, { credentials: "same-origin" });
    if (!response.ok) throw new Error(`Free Resource request failed with HTTP ${response.status}`);

    const contentType = (response.headers.get("content-type") || "").split(";")[0].toLowerCase();
    if (contentType !== "application/pdf") throw new Error(`Unexpected Free Resource MIME type: ${contentType || "missing"}`);

    const blob = await response.blob();
    objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = filename;
    anchor.rel = "noopener";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  } catch (error) {
    console.error("Brand Message Quick Check download failed", error);
    toast.error("We couldn't start that download. Please try again or contact support.");
  } finally {
    if (objectUrl) {
      const urlToRevoke = objectUrl;
      window.setTimeout(() => URL.revokeObjectURL(urlToRevoke), 30_000);
    }
  }
}

export default function Resources() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />
      <main>
        <section className="pt-32 pb-18 border-b border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F8C866] text-sm font-semibold"><Gift className="h-4 w-4" /> FREE BUSINESS RESOURCES</span>
            <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight" style={{ fontFamily: "var(--font-display)" }}>Practical tools to help you move your business forward.</h1>
            <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">Download practical worksheets, calculators, scorecards, spreadsheets, and checklists designed to help you organize, evaluate, and improve key areas of your business without overcomplicating the process.</p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-3xl">
              <p className="text-[#14B8A6] text-sm font-bold uppercase tracking-wider">Start with a quick win</p>
              <h2 className="mt-2 text-3xl font-black">Choose the resource that matches your next business priority.</h2>
              <p className="mt-3 text-sm text-white/50">Each resource is free to download and designed to give you a focused next step you can use right away.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {ALL_PUBLIC_FREE_RESOURCES.map((resource) => {
                const delivery = getFreeResourceDeliveryConfig(resource.slug);
                const Icon = formatIcon(resource.format);
                const ready = delivery?.deliveryStatus === "READY" && Boolean(delivery.deliveryUrl);
                const buttonClass = "mt-5 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#7C3AED] font-bold";
                return (
                  <article key={resource.slug} className="p-6 rounded-2xl bg-[#0D1120] border border-white/10 flex flex-col">
                    <div className="flex items-start justify-between gap-4"><Icon className="h-7 w-7 text-[#14B8A6]" /><span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/55">{resource.format}</span></div>
                    <h3 className="mt-5 text-xl font-bold">{resource.name}</h3>
                    <p className="mt-3 text-sm text-white/55 leading-relaxed flex-1">{delivery?.shortDescription}</p>
                    <div className="mt-5"><span className="text-2xl font-black text-[#14B8A6]">FREE</span></div>
                    {ready ? (
                      <button
                        type="button"
                        onClick={() => resource.slug === "brand-message-quick-check"
                          ? void downloadBrandMessageQuickCheck(delivery!.deliveryUrl!)
                          : downloadFreeResource(resource.slug, delivery!.deliveryUrl!)}
                        className={buttonClass}
                      >
                        {delivery?.ctaLabel} <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : <button disabled className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white/40 font-bold"><LockKeyhole className="h-4 w-4" /> Temporarily unavailable</button>}
                    <div className="mt-5 pt-5 border-t border-white/10"><p className="text-xs text-white/35 uppercase tracking-wider">Go deeper</p><a href={`/marketplace/${delivery?.relatedPaidProductSlug}`} className="mt-2 inline-flex items-center gap-2 text-sm text-[#14B8A6] font-semibold">{delivery?.relatedPaidProductName} <ArrowRight className="h-4 w-4" /></a></div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><h2 className="text-3xl sm:text-4xl font-black">Need more than a quick diagnostic?</h2><p className="mt-4 text-white/60">Explore the Marketplace when you are ready for a complete Business Bloom system, or contact Support if you have a question about which resource or product fits your situation.</p><div className="mt-8 flex flex-col sm:flex-row justify-center gap-4"><a href="/marketplace" className="px-7 py-4 rounded-xl bg-[#7C3AED] font-bold">Shop Marketplace</a><a href="/support" className="px-7 py-4 rounded-xl border border-white/10 font-bold">Business Bloom Support</a></div></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
