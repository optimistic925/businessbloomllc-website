import { ArrowRight, FileSpreadsheet, FileText, Gift, LockKeyhole } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { APPROVED_FREE_RESOURCES } from "../../../shared/marketplaceProducts";
import { getFreeResourceDeliveryConfig } from "../../../shared/freeResourceDeliveryConfig";

function formatIcon(format: string) {
  return format.toLowerCase().includes("spreadsheet") ? FileSpreadsheet : FileText;
}

export default function Resources() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />
      <main>
        <section className="pt-32 pb-18 border-b border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F8C866] text-sm font-semibold"><Gift className="h-4 w-4" /> BUSINESS BLOOM FREE RESOURCES</span>
            <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight" style={{ fontFamily: "var(--font-display)" }}>Useful business tools before you buy a system.</h1>
            <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">Use a finalized Business Bloom diagnostic, checklist, or planning resource to clarify the problem and identify a practical next step. Only verified current resources are shown here.</p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div><p className="text-[#14B8A6] text-sm font-bold uppercase tracking-wider">Current finalized resources</p><h2 className="mt-2 text-3xl font-black">{APPROVED_FREE_RESOURCES.length} verified resources</h2></div>
              <p className="text-sm text-white/40">The broader approved library remains in production; incomplete resources are not published.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {APPROVED_FREE_RESOURCES.map((resource) => {
                const delivery = getFreeResourceDeliveryConfig(resource.slug);
                const Icon = formatIcon(resource.format);
                const ready = delivery?.deliveryStatus === "READY" && Boolean(delivery.deliveryUrl);
                return (
                  <article key={resource.slug} className="p-6 rounded-2xl bg-[#0D1120] border border-white/10 flex flex-col">
                    <div className="flex items-start justify-between gap-4"><Icon className="h-7 w-7 text-[#14B8A6]" /><span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/55">{resource.format}</span></div>
                    <h3 className="mt-5 text-xl font-bold">{resource.name}</h3>
                    <p className="mt-3 text-sm text-white/55 leading-relaxed flex-1">{delivery?.shortDescription}</p>
                    <div className="mt-5"><span className="text-2xl font-black text-[#14B8A6]">FREE</span></div>
                    {ready ? (
                      <a href={delivery!.deliveryUrl!} className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#7C3AED] font-bold">{delivery?.ctaLabel} <ArrowRight className="h-4 w-4" /></a>
                    ) : (
                      <button disabled className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white/40 font-bold"><LockKeyhole className="h-4 w-4" /> Delivery finalization in progress</button>
                    )}
                    <div className="mt-5 pt-5 border-t border-white/10"><p className="text-xs text-white/35 uppercase tracking-wider">Related next step</p><a href={`/marketplace/${delivery?.relatedPaidProductSlug}`} className="mt-2 inline-flex items-center gap-2 text-sm text-[#14B8A6] font-semibold">{delivery?.relatedPaidProductName} <ArrowRight className="h-4 w-4" /></a></div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-black">Need more than a quick diagnostic?</h2>
            <p className="mt-4 text-white/60">Explore the Marketplace when you are ready for a complete Business Bloom system, or contact Support if you have a question about which current resource or product fits your situation.</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4"><a href="/marketplace" className="px-7 py-4 rounded-xl bg-[#7C3AED] font-bold">Shop Marketplace</a><a href="/support" className="px-7 py-4 rounded-xl border border-white/10 font-bold">Business Bloom Support</a></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
