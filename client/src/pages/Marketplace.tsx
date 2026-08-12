import { ArrowRight, Gift, Layers3, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ALL_PUBLIC_FREE_RESOURCES } from "../../../shared/freeResources";
import { getFreeResourceDeliveryConfig } from "../../../shared/freeResourceDeliveryConfig";
import { PUBLIC_MARKETPLACE_PRODUCTS } from "../../../shared/marketplacePublicCatalog";
import {
  getMarketplaceCommercialConfig,
  getProfessionalSystemsBundleEconomics,
} from "../../../shared/marketplaceCommercialConfig";

const featuredSlugs = [
  "business-bloom-professional-systems",
  "business-bloom-website-system",
  "business-bloom-virtual-executive-team",
];

function categoryId(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function productTypeLabel(type: "system" | "bundle") {
  return type === "bundle" ? "Digital bundle" : "Digital system";
}

export default function Marketplace() {
  const categories = Array.from(new Set(PUBLIC_MARKETPLACE_PRODUCTS.map((product) => product.category)));
  const professionalSystems = PUBLIC_MARKETPLACE_PRODUCTS.filter(
    (product) => product.collection === "Business Bloom Professional Systems™",
  );
  const featured = featuredSlugs
    .map((slug) => PUBLIC_MARKETPLACE_PRODUCTS.find((product) => product.slug === slug))
    .filter(Boolean);
  const bundleEconomics = getProfessionalSystemsBundleEconomics();
  const formatCurrency = (cents: number) => `$${(cents / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />
      <main className="pt-28 pb-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-[#BDA4FF] text-sm font-semibold"><ShoppingBag className="h-4 w-4" /> BUSINESS BLOOM MARKETPLACE</span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight" style={{ fontFamily: "var(--font-display)" }}>Practical systems to start, systemize, automate, and grow your business.</h1>
            <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-3xl leading-relaxed">Shop Business Bloom systems by business need. Each product combines practical guidance, reusable tools, and a clear implementation path.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4"><a href="#featured" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#7C3AED] font-bold">Browse featured products <ArrowRight className="h-4 w-4" /></a><a href="/solutions" className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/10 font-bold hover:bg-white/5">Shop by business problem</a></div>
          </div>
          <nav aria-label="Marketplace categories" className="mt-9 flex flex-wrap gap-2">
            {categories.map((category) => <a key={category} href={`#${categoryId(category)}`} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/70 hover:text-white hover:border-[#7C3AED]/40 transition-colors">{category}</a>)}
            <a href="#free-resources" className="px-4 py-2 rounded-full border border-[#14B8A6]/25 bg-[#14B8A6]/8 text-sm text-[#7FE1D5]">Free Resources</a>
          </nav>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14"><div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"><Layers3 className="h-6 w-6 text-[#7C3AED]" /><h2 className="mt-4 text-xl font-bold">Built as systems</h2><p className="mt-2 text-white/55 text-sm leading-relaxed">Guides, editable tools, dashboards, prompts, templates, and implementation resources work together around a business outcome.</p></div>
          <div className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"><ShieldCheck className="h-6 w-6 text-[#14B8A6]" /><h2 className="mt-4 text-xl font-bold">Secure checkout & delivery</h2><p className="mt-2 text-white/55 text-sm leading-relaxed">One-time purchases use Stripe Checkout, and digital delivery is sent through Business Bloom’s protected customer download flow.</p></div>
          <div className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"><Gift className="h-6 w-6 text-[#F59E0B]" /><h2 className="mt-4 text-xl font-bold">Start free when useful</h2><p className="mt-2 text-white/55 text-sm leading-relaxed">Free Resources provide a focused quick win and point naturally to the relevant paid system when deeper implementation is needed.</p></div>
        </div></section>

        <section id="featured" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"><div><p className="text-[#BDA4FF] text-sm font-bold uppercase tracking-wider">Featured products</p><h2 className="mt-2 text-3xl font-black">Start with a high-impact system</h2></div><a href="/solutions" className="text-sm font-semibold text-[#14B8A6] hover:underline">Need help choosing?</a></div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">{featured.map((product) => { const commercial = getMarketplaceCommercialConfig(product!.slug); return <article key={product!.slug} className="rounded-2xl overflow-hidden bg-[#0D1120] border border-white/10 flex flex-col"><div className="aspect-[16/9] bg-gradient-to-br from-[#7C3AED]/35 via-[#141A2D] to-[#14B8A6]/20 p-6 flex items-end"><div><Sparkles className="h-7 w-7 text-[#BDA4FF]" /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Business Bloom</p><p className="mt-1 font-black text-lg">{product!.type === "bundle" ? "Complete Collection" : product!.category}</p></div></div><div className="p-6 flex flex-col flex-1"><h3 className="text-xl font-bold">{product!.name}</h3><p className="mt-3 text-sm text-white/55 leading-relaxed flex-1">{product!.shortDescription}</p><div className="mt-5 flex items-end justify-between gap-3"><span className="text-2xl font-black text-[#14B8A6]">{commercial?.priceDisplay ?? "Pricing unavailable"}</span><span className="text-xs text-white/40">{productTypeLabel(product!.type)}</span></div><a href={`/marketplace/${product!.slug}`} className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 font-semibold">View Product <ArrowRight className="h-4 w-4" /></a></div></article>; })}</div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="flex items-end justify-between gap-4 mb-8"><div><p className="text-[#14B8A6] text-sm font-bold uppercase tracking-wider">Business systems & bundles</p><h2 className="text-3xl font-black mt-2">Browse by category</h2></div></div>
          {categories.map((category) => {
            const products = PUBLIC_MARKETPLACE_PRODUCTS.filter((product) => product.category === category);
            return <div id={categoryId(category)} key={category} className="scroll-mt-24 mb-14"><h3 className="text-2xl font-black mb-5">{category}</h3><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{products.map((product) => {
              const commercial = getMarketplaceCommercialConfig(product.slug);
              return <article key={product.slug} className="rounded-2xl bg-[#0D1120] border border-white/10 overflow-hidden flex flex-col"><div className="aspect-[3/1] bg-gradient-to-r from-[#7C3AED]/25 via-[#12182A] to-[#14B8A6]/15 px-6 py-5 flex items-end"><span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">{product.collection}</span></div><div className="p-6 flex flex-col flex-1"><div className="flex items-start justify-between gap-3"><span className="text-xs font-semibold text-[#BDA4FF] bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-3 py-1 rounded-full">{product.category}</span><span className="text-xs font-semibold px-3 py-1 rounded-full border text-white/60 border-white/10 bg-white/5">One-time</span></div><h4 className="text-xl font-bold mt-5">{product.name}</h4><p className="text-white/55 text-sm leading-relaxed mt-3 flex-1">{product.shortDescription}</p><div className="mt-5 flex items-end justify-between gap-4"><span className="text-2xl font-black text-[#14B8A6]">{commercial?.priceDisplay ?? "Pricing unavailable"}</span><span className="text-xs text-white/40 text-right">{productTypeLabel(product.type)}</span></div><a href={`/marketplace/${product.slug}`} className="mt-6 inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 font-semibold transition-colors">View Product <ArrowRight className="h-4 w-4" /></a></div></article>;
            })}</div></div>;
          })}
        </section>

        <section id="professional-systems" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 rounded-3xl border border-[#7C3AED]/25 bg-[#7C3AED]/8 p-7 sm:p-9">
          <p className="text-[#BDA4FF] text-sm font-bold uppercase tracking-wider">Professional Systems™</p><h2 className="text-3xl font-black mt-2">Build a coordinated operating system for your business</h2><p className="text-white/60 mt-3 max-w-3xl">Choose an individual system for a focused need, or bring customer service, HR, marketing, operations, AI automation, and sales together in the complete Professional Systems™ bundle.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-7">{professionalSystems.map((product) => { const commercial = getMarketplaceCommercialConfig(product.slug); return <a href={`/marketplace/${product.slug}`} key={product.slug} className="p-5 rounded-xl border border-white/10 bg-[#0D1120] hover:border-[#7C3AED]/40 transition-colors"><span className="font-semibold block">{product.name}</span><span className="text-[#14B8A6] font-bold mt-2 block">{commercial?.priceDisplay}</span></a>; })}</div>
          <div className="mt-7 text-sm text-white/60">Six-system retail value: <strong className="text-white">{formatCurrency(bundleEconomics.individualRetailValueCents)}</strong> · Professional Systems™: <strong className="text-[#14B8A6]">{formatCurrency(bundleEconomics.bundlePriceCents)}</strong> · Save <strong className="text-white">{formatCurrency(bundleEconomics.savingsCents)} ({(bundleEconomics.savingsPercent * 100).toFixed(1)}%)</strong>.</div>
          <a href="/marketplace/business-bloom-professional-systems" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#14B8A6]">See everything included <ArrowRight className="h-4 w-4" /></a>
        </section>

        <section id="free-resources" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"><div><p className="text-[#F59E0B] text-sm font-bold uppercase tracking-wider">Free Business Resources</p><h2 className="text-3xl font-black mt-2">Start with a quick win</h2></div><a href="/resources" className="text-sm font-semibold text-[#14B8A6] hover:underline">Browse resource center</a></div>
          <p className="mt-3 text-sm text-white/50 max-w-3xl">Download practical worksheets, calculators, scorecards, spreadsheets, and checklists designed to help you take action without overcomplicating the process.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">{ALL_PUBLIC_FREE_RESOURCES.map((resource) => { const delivery = getFreeResourceDeliveryConfig(resource.slug); return <article key={resource.slug} className="rounded-2xl overflow-hidden bg-[#0D1120] border border-white/10 flex flex-col"><div className="aspect-[3/1] bg-gradient-to-r from-[#F59E0B]/20 via-[#141A2D] to-[#14B8A6]/15 px-6 py-5 flex items-end"><span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">{resource.category}</span></div><div className="p-6 flex flex-col flex-1"><div className="flex items-start justify-between gap-3"><span className="text-xs text-white/45">{resource.format}</span><span className="text-lg font-black text-[#14B8A6]">$0</span></div><h3 className="text-lg font-bold mt-3">{resource.name}</h3><p className="text-sm text-white/50 mt-3 flex-1">{delivery?.shortDescription}</p><a href="/resources" className="mt-5 inline-flex items-center gap-2 text-sm text-[#14B8A6] font-semibold">Get Free Resource <ArrowRight className="h-4 w-4" /></a></div></article>; })}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
