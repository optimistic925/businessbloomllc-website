import { ArrowRight, Gift, Layers3, ShieldCheck, ShoppingBag } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { PUBLIC_FREE_RESOURCES, PUBLIC_MARKETPLACE_PRODUCTS } from "../../../shared/marketplacePublicCatalog";
import {
  getMarketplaceCommercialConfig,
  getProfessionalSystemsBundleEconomics,
} from "../../../shared/marketplaceCommercialConfig";

const FREE_RESOURCE_TARGET = 13;

function categoryId(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function Marketplace() {
  const categories = Array.from(new Set(PUBLIC_MARKETPLACE_PRODUCTS.map((product) => product.category)));
  const professionalSystems = PUBLIC_MARKETPLACE_PRODUCTS.filter(
    (product) => product.collection === "Business Bloom Professional Systems™",
  );
  const bundleEconomics = getProfessionalSystemsBundleEconomics();
  const formatCurrency = (cents: number) => `$${(cents / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <NavBar />
      <main className="pt-28 pb-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-[#BDA4FF] text-sm font-semibold"><ShoppingBag className="h-4 w-4" /> BUSINESS BLOOM MARKETPLACE</span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight" style={{ fontFamily: "var(--font-display)" }}>Practical systems to start, systemize, automate, and grow your business.</h1>
            <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-3xl leading-relaxed">Explore current Business Bloom systems, toolkits, and resources built for entrepreneurs and growing businesses. Product pricing is approved; checkout remains protected until customer delivery is fully configured and tested.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => <a key={category} href={`#${categoryId(category)}`} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/70 hover:text-white hover:border-[#7C3AED]/40 transition-colors">{category}</a>)}
            <a href="#free-resources" className="px-4 py-2 rounded-full border border-[#14B8A6]/25 bg-[#14B8A6]/8 text-sm text-[#7FE1D5]">Free Resources</a>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14"><div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"><Layers3 className="h-6 w-6 text-[#7C3AED]" /><h2 className="mt-4 text-xl font-bold">Built as systems</h2><p className="mt-2 text-white/55 text-sm">Guides, editable tools, dashboards, prompts, templates, and implementation resources work together around a business outcome.</p></div>
          <div className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"><ShieldCheck className="h-6 w-6 text-[#14B8A6]" /><h2 className="mt-4 text-xl font-bold">Protected checkout</h2><p className="mt-2 text-white/55 text-sm">Current Stripe pricing is mapped, but purchases stay disabled until the correct customer delivery path is verified.</p></div>
          <div className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"><Gift className="h-6 w-6 text-[#F59E0B]" /><h2 className="mt-4 text-xl font-bold">Useful free entry points</h2><p className="mt-2 text-white/55 text-sm">Free Resources help customers diagnose a problem and connect naturally to the relevant Business Bloom system.</p></div>
        </div></section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex items-end justify-between gap-4 mb-8"><div><p className="text-[#14B8A6] text-sm font-bold uppercase tracking-wider">Current approved catalog</p><h2 className="text-3xl font-black mt-2">{PUBLIC_MARKETPLACE_PRODUCTS.length} paid products</h2></div><div className="text-sm text-white/45 hidden sm:block">{categories.length} active categories</div></div>
          {categories.map((category) => {
            const products = PUBLIC_MARKETPLACE_PRODUCTS.filter((product) => product.category === category);
            return <div id={categoryId(category)} key={category} className="scroll-mt-24 mb-14"><h3 className="text-2xl font-black mb-5">{category}</h3><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{products.map((product) => {
              const commercial = getMarketplaceCommercialConfig(product.slug);
              return <article key={product.slug} className="rounded-2xl bg-[#0D1120] border border-white/10 p-6 flex flex-col"><div className="flex items-start justify-between gap-3"><span className="text-xs font-semibold text-[#BDA4FF] bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-3 py-1 rounded-full">{product.category}</span><span className="text-xs font-semibold px-3 py-1 rounded-full border text-white/60 border-white/10 bg-white/5">One-time</span></div><h4 className="text-xl font-bold mt-5">{product.name}</h4><p className="text-xs text-white/35 mt-1">{product.collection}</p><p className="text-white/55 text-sm leading-relaxed mt-3 flex-1">{product.shortDescription}</p><div className="mt-5 flex items-end justify-between gap-4"><span className="text-2xl font-black text-[#14B8A6]">{commercial?.priceDisplay ?? "Pricing unavailable"}</span><span className="text-xs text-white/40 text-right">Digital system</span></div><a href={`/marketplace/${product.slug}`} className="mt-6 inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 font-semibold transition-colors">View Product <ArrowRight className="h-4 w-4" /></a></article>;
            })}</div></div>;
          })}
        </section>

        <section id="professional-systems" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 rounded-3xl border border-[#7C3AED]/25 bg-[#7C3AED]/8 p-7 sm:p-9">
          <p className="text-[#BDA4FF] text-sm font-bold uppercase tracking-wider">Professional Systems™</p><h2 className="text-3xl font-black mt-2">Buy individually or get the collection</h2><p className="text-white/60 mt-3 max-w-3xl">Choose the system that solves the immediate problem, or use the complete collection for a coordinated operating-system approach across multiple business functions.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-7">{professionalSystems.map((product) => { const commercial = getMarketplaceCommercialConfig(product.slug); return <a href={`/marketplace/${product.slug}`} key={product.slug} className="p-5 rounded-xl border border-white/10 bg-[#0D1120] hover:border-[#7C3AED]/40 transition-colors"><span className="font-semibold block">{product.name}</span><span className="text-[#14B8A6] font-bold mt-2 block">{commercial?.priceDisplay}</span></a>; })}</div>
          <div className="mt-7 text-sm text-white/55">Current individual retail value: <strong className="text-white">{formatCurrency(bundleEconomics.individualRetailValueCents)}</strong> · Complete bundle: <strong className="text-[#14B8A6]">{formatCurrency(bundleEconomics.bundlePriceCents)}</strong> · Savings: <strong className="text-white">{Math.round(bundleEconomics.savingsPercent * 100)}%</strong>. Sales System will be incorporated after final production and Pricing Council recalculation.</div>
        </section>

        <section id="free-resources" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"><div><p className="text-[#F59E0B] text-sm font-bold uppercase tracking-wider">Free Resources</p><h2 className="text-3xl font-black mt-2">{PUBLIC_FREE_RESOURCES.length} of {FREE_RESOURCE_TARGET} finalized files verified</h2></div><a href="/resources" className="text-sm font-semibold text-[#14B8A6] hover:underline">Browse resource center</a></div>
          <p className="mt-3 text-sm text-white/45 max-w-3xl">The approved collection target remains 13. Only finalized source files confirmed in the approved inventory are displayed; incomplete resources are not published as placeholders.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">{PUBLIC_FREE_RESOURCES.map((resource) => <article key={resource.slug} className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"><span className="text-xs text-white/45">{resource.format}</span><h3 className="text-lg font-bold mt-2">{resource.name}</h3><p className="text-sm text-white/50 mt-2">{resource.category}</p><p className="mt-5 text-lg font-black text-[#14B8A6]">FREE</p><p className="mt-2 text-xs text-white/40">Public delivery configuration is still being finalized.</p></article>)}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
