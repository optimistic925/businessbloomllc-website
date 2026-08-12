import { ArrowLeft, ArrowRight, CheckCircle2, HelpCircle, LockKeyhole, Sparkles } from "lucide-react";
import { useRoute } from "wouter";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { initiateMarketplaceCheckout } from "@/lib/checkout";
import { PUBLIC_MARKETPLACE_PRODUCTS, getPublicMarketplaceProduct } from "../../../shared/marketplacePublicCatalog";
import { getMarketplaceCommercialConfig, getProfessionalSystemsBundleEconomics } from "../../../shared/marketplaceCommercialConfig";

const PROFESSIONAL_SYSTEMS_INCLUDED = [
  { name: "Customer Service System™", description: "Build consistent service standards, customer-response processes, escalation procedures, follow-up expectations, and customer-experience workflows." },
  { name: "HR System™", description: "Organize hiring, onboarding, employee management, performance processes, documentation, and core HR operations." },
  { name: "Marketing System™", description: "Create a repeatable framework for audience targeting, messaging, campaigns, promotions, content direction, and marketing execution." },
  { name: "Operations System™", description: "Document workflows, organize SOPs, improve processes, assign responsibilities, and create repeatable day-to-day operating procedures." },
  { name: "AI Automation Bundles™", description: "Use practical AI workflows, prompts, and automation frameworks to reduce repetitive work, improve consistency, and support business execution." },
  { name: "Sales System™", description: "Structure prospecting, qualification, sales conversations, objection handling, follow-up, closing, tracking, retention, and referrals." },
] as const;

const PROFESSIONAL_SYSTEMS_TOOLKIT = [
  { name: "Professional Systems Start Here Guide", description: "Shows you where to begin and how to approach implementation across the bundle." },
  { name: "Customer Use Framework", description: "Helps you turn the materials into an operating system rather than a collection of unused files." },
  { name: "Professional Systems Dashboard", description: "Provides one place to track implementation progress across the included systems." },
  { name: "Professional Systems Customer Package", description: "Organizes the customer-facing system resources and implementation materials into the complete bundle." },
] as const;

const VIRTUAL_EXECUTIVES = [
  {
    title: "CEO — Chief Executive Officer",
    focus: "Big-picture strategy and direction",
    helps: ["overall business direction", "priorities", "growth decisions", "competing opportunities", "tradeoffs", "major owner decisions", "alignment across departments"],
    value: "Use the CEO perspective when you need to step out of the weeds and ask, “What is the smartest move for the business as a whole?”",
  },
  {
    title: "CFO — Chief Financial Officer",
    focus: "Financial impact and resource decisions",
    helps: ["costs", "cash-flow considerations", "pricing", "financial tradeoffs", "resource allocation", "affordability", "financial risk", "return assumptions"],
    value: "Use the CFO perspective to pressure-test whether a decision makes financial sense before committing money or resources.",
  },
  {
    title: "COO — Chief Operating Officer",
    focus: "Operations, capacity, and implementation feasibility",
    helps: ["capacity", "staffing", "workflow", "systems", "delivery", "handoffs", "dependencies", "implementation risk"],
    value: "Use the COO perspective to ask whether the business can realistically implement and sustain the decision with its people, processes, systems, and available capacity.",
  },
  {
    title: "CMO — Chief Marketing Officer",
    focus: "Customer, positioning, and market perspective",
    helps: ["target audience", "messaging", "positioning", "promotion", "customer demand", "marketing channels", "campaign considerations", "brand and customer perception"],
    value: "Use the CMO perspective to ask whether the market will understand, want, and respond to what you are planning.",
  },
] as const;

const VET_TOOLKIT = [
  { name: "Your Virtual Executive Team", description: "Dedicated CEO, CFO, COO, and CMO role instructions help AI respond from distinct business-leadership perspectives instead of giving one generic answer." },
  { name: "Executive Decision Questionnaire", description: "A structured intake that helps you define the decision, context, constraints, and goals before asking the team to weigh in." },
  { name: "Executive Team Prompt Library", description: "Guided prompts for business intake, coordinated executive review, synthesis, planning, and recurring decision review." },
  { name: "Start Here Guide", description: "Shows you how to set up and begin using the Virtual Executive Team™." },
  { name: "Customer Guide", description: "Explains how to work with the executive perspectives effectively and responsibly." },
  { name: "Intake Workbook", description: "Helps organize the business information your virtual executives need before analyzing a decision." },
  { name: "Decision-Support Workflows", description: "Provides repeatable strategic-decision, leadership-review, monthly-review, and planning processes that move from question to perspectives, owner decision, and action." },
  { name: "Worksheets & Templates", description: "Helps capture recommendations, tradeoffs, decisions, priorities, KPIs, handoffs, and follow-up actions." },
  { name: "Examples", description: "Shows how the system can be applied to realistic business situations so you can see the review process in context." },
  { name: "Quick Reference", description: "Provides a fast way to remember which executive perspective to use and how to structure a review." },
] as const;

const VET_USE_CASES = [
  {
    title: "Should I hire someone now?",
    perspectives: [
      ["CEO", "Does this hire support the company’s current priorities?"],
      ["CFO", "Can the business reasonably support the cost and cash-flow commitment?"],
      ["COO", "Is there a clear role, workload, process, and management capacity for this person?"],
      ["CMO", "Will the role materially support customer acquisition, positioning, or market execution?"],
    ],
  },
  {
    title: "Should I launch this new product?",
    perspectives: [
      ["CEO", "Does this opportunity fit the overall strategy and current priorities?"],
      ["CFO", "What are the cost, pricing, affordability, and financial risks?"],
      ["COO", "Can the business deliver this consistently with its current processes and capacity?"],
      ["CMO", "Who is the customer, how will we position the offer, and what evidence supports demand?"],
    ],
  },
  {
    title: "Should I invest in new software or automation?",
    perspectives: [
      ["CEO", "Does this solve an important business problem and support the broader direction?"],
      ["CFO", "Does the expected value justify the cost and resource commitment?"],
      ["COO", "Will it fit the workflow, reduce friction, and be practical to implement and maintain?"],
      ["CMO", "Will it improve the customer or marketing experience where that matters?"],
    ],
  },
] as const;

const POSITIONING_BY_SLUG: Record<string, string> = {
  "business-bloom-customer-service-system": "A practical system for building consistent service standards, customer-response processes, escalation handling, and follow-up.",
  "business-bloom-hr-system": "A practical system for organizing hiring, onboarding, employee documentation, performance processes, and manager consistency.",
  "business-bloom-marketing-system": "A repeatable framework for audience clarity, messaging, campaigns, promotions, and marketing execution.",
  "business-bloom-operations-system": "A practical operating system for turning recurring work into documented workflows, SOPs, ownership, and accountable execution.",
  "business-bloom-ai-automation-bundles": "A practical AI and automation system for moving from experimentation to human-reviewed workflows you can actually use in the business.",
  "business-bloom-professional-systems": "Six complete business systems plus one coordinated implementation toolkit for building a more organized business operating framework.",
  "business-bloom-website-system": "A structured way to plan, write, review, launch, and improve your website instead of guessing page by page.",
  "business-bloom-virtual-executive-team": "Executive-level business decision support for entrepreneurs who do not have a full C-suite sitting around the conference table.",
  "business-bloom-branding-system": "A practical system for building a clearer brand foundation, positioning, identity, and consistency.",
  "business-bloom-foundation-system": "An educational business-setup system for organizing formation planning, filing preparation, foundational information, and next steps.",
  "business-bloom-business-launch-blueprint": "An idea-to-launch framework for organizing priorities, business setup, offer planning, marketing preparation, and execution.",
  "business-bloom-content-marketing-system": "A repeatable content system for strategy, planning, creation, repurposing, publishing, and performance review.",
  "business-bloom-social-media-system": "A practical social-media process for planning, publishing, coordinating campaigns, developing an audience, and improving from performance data.",
};

const AUDIENCE_BY_SLUG: Record<string, string> = {
  "business-bloom-customer-service-system": "For owners and teams whose customer experience changes depending on who answers, how busy the day is, or whether someone remembers to follow up.",
  "business-bloom-hr-system": "For small-business owners and managers who are hiring or managing people but do not want every interview, onboarding step, documentation task, or performance conversation to start from scratch.",
  "business-bloom-marketing-system": "For business owners who are doing marketing but still feel unclear about who they are talking to, what message to lead with, which campaign comes next, or how to make execution repeatable.",
  "business-bloom-operations-system": "For owners whose important processes still live in their head, whose team relies on verbal instructions, or whose recurring work becomes inconsistent when the right person is unavailable.",
  "business-bloom-ai-automation-bundles": "For business owners who want to use AI and automation for real work but need a structured way to choose opportunities, design workflows, and keep human review in the process.",
  "business-bloom-professional-systems": "For owners building several parts of the business at once who want Customer Service, HR, Marketing, Operations, AI Automation, and Sales to work from coordinated systems rather than disconnected fixes.",
  "business-bloom-website-system": "For entrepreneurs and small businesses that know their website matters but are tired of making page, content, and launch decisions one at a time without a clear system.",
  "business-bloom-virtual-executive-team": "For founders and owner-led businesses making meaningful decisions without a full executive team available to challenge assumptions from strategy, finance, operations, and marketing perspectives.",
  "business-bloom-branding-system": "For business owners who want a more consistent identity and message and are tired of making brand decisions by choosing fonts, colors, and words without a shared foundation.",
  "business-bloom-foundation-system": "For entrepreneurs organizing the early business-setup process who want a clearer educational path before completing filings or seeking jurisdiction-specific legal or tax guidance.",
  "business-bloom-business-launch-blueprint": "For entrepreneurs with a business or offer idea who feel pulled in too many directions and need a practical sequence for deciding what to do first, second, and next.",
  "business-bloom-content-marketing-system": "For business owners who know content can support growth but are tired of wondering what to create, producing inconsistently, and starting over with every new piece.",
  "business-bloom-social-media-system": "For business owners who know they need to show up consistently on social media but are tired of guessing what to post, creating at the last minute, and treating every week like a fresh start.",
};

const PROBLEM_BY_SLUG: Record<string, string> = {
  "business-bloom-customer-service-system": "When service expectations, escalation steps, and follow-up are not documented, customers can receive inconsistent answers and important issues are easier to miss.",
  "business-bloom-hr-system": "Ad hoc people processes waste manager time, create inconsistent employee experiences, and make important hiring, onboarding, and performance information harder to track.",
  "business-bloom-marketing-system": "Disconnected marketing creates wasted effort: campaigns compete for attention, messaging shifts, priorities get lost, and the team keeps asking what to do next.",
  "business-bloom-operations-system": "When workflows, responsibilities, and SOPs are not documented, routine work depends on memory, handoffs become fragile, and the owner becomes the default answer for everything.",
  "business-bloom-ai-automation-bundles": "AI experiments do not become business systems by themselves. Without clear use cases, workflow design, review points, and priorities, automation can add complexity instead of removing it.",
  "business-bloom-professional-systems": "Fixing one function at a time with disconnected documents can leave the business with six different ways of working. The bundle creates a shared implementation approach across core functions.",
  "business-bloom-website-system": "Website work becomes slow and fragmented when strategy, pages, messaging, content, workflow, QA, and ongoing updates are handled as unrelated tasks.",
  "business-bloom-virtual-executive-team": "Major owner decisions are harder when every strategic, financial, operational, and marketing concern is competing in your head at the same time—and there is no structured way to compare the tradeoffs.",
  "business-bloom-branding-system": "Inconsistent positioning, messaging, and visual choices can make the business harder to recognize and force you to repeatedly revisit decisions that should already be documented.",
  "business-bloom-foundation-system": "Business setup can feel scattered when formation questions, filing preparation, foundational information, documentation, and professional-review needs are handled without one organized path.",
  "business-bloom-business-launch-blueprint": "Trying to build the offer, set up the business, prepare marketing, and launch everything at once creates unnecessary rework and makes it harder to see the next priority.",
  "business-bloom-content-marketing-system": "Without a repeatable content process, useful ideas get lost, creation becomes reactive, repurposing is inconsistent, and publishing can turn into a recurring source of burnout.",
  "business-bloom-social-media-system": "Random posting makes it difficult to coordinate campaigns, maintain a consistent presence, learn from performance, or know whether social activity supports a broader business goal.",
};

const RELATED_BY_SLUG: Record<string, string[]> = {
  "business-bloom-customer-service-system": ["business-bloom-professional-systems", "business-bloom-operations-system", "business-bloom-hr-system"],
  "business-bloom-hr-system": ["business-bloom-professional-systems", "business-bloom-operations-system", "business-bloom-customer-service-system"],
  "business-bloom-marketing-system": ["business-bloom-content-marketing-system", "business-bloom-social-media-system", "business-bloom-professional-systems"],
  "business-bloom-operations-system": ["business-bloom-professional-systems", "business-bloom-ai-automation-bundles", "business-bloom-customer-service-system"],
  "business-bloom-ai-automation-bundles": ["business-bloom-operations-system", "business-bloom-professional-systems", "business-bloom-virtual-executive-team"],
  "business-bloom-professional-systems": ["business-bloom-virtual-executive-team", "business-bloom-website-system", "business-bloom-branding-system"],
  "business-bloom-website-system": ["business-bloom-branding-system", "business-bloom-content-marketing-system", "business-bloom-marketing-system"],
  "business-bloom-virtual-executive-team": ["business-bloom-professional-systems", "business-bloom-operations-system", "business-bloom-ai-automation-bundles"],
  "business-bloom-branding-system": ["business-bloom-website-system", "business-bloom-content-marketing-system", "business-bloom-business-launch-blueprint"],
  "business-bloom-foundation-system": ["business-bloom-business-launch-blueprint", "business-bloom-branding-system", "business-bloom-website-system"],
  "business-bloom-business-launch-blueprint": ["business-bloom-foundation-system", "business-bloom-branding-system", "business-bloom-marketing-system"],
  "business-bloom-content-marketing-system": ["business-bloom-social-media-system", "business-bloom-marketing-system", "business-bloom-website-system"],
  "business-bloom-social-media-system": ["business-bloom-content-marketing-system", "business-bloom-marketing-system", "business-bloom-branding-system"],
};

function deliveryCopy(type: "download" | "access" | "onboarding" | "hybrid") {
  switch (type) {
    case "access": return "After a successful purchase, Business Bloom sends secure access instructions to the customer email used at checkout.";
    case "onboarding": return "After a successful purchase, Business Bloom sends onboarding instructions and the next-step destination to the customer email used at checkout.";
    case "hybrid": return "After a successful purchase, Business Bloom sends the required combination of download, access, and onboarding instructions to the customer email used at checkout.";
    default: return "After a successful purchase, Business Bloom sends protected customer download instructions to the customer email used at checkout.";
  }
}

function formatCurrency(cents: number) {
  return `$${(cents / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export default function MarketplaceProduct() {
  const [, params] = useRoute("/marketplace/:slug");
  const product = getPublicMarketplaceProduct(params?.slug || "");

  if (!product) {
    return <div className="min-h-screen bg-[#0B0F1A] text-white"><NavBar /><main className="pt-32 max-w-3xl mx-auto px-4"><h1 className="text-3xl font-black">Product not found</h1><a href="/marketplace" className="inline-flex mt-6 text-[#14B8A6] underline underline-offset-4">Return to Marketplace</a></main></div>;
  }

  const commercial = getMarketplaceCommercialConfig(product.slug);
  const checkoutReady = Boolean(commercial);
  const isProfessionalSystemsBundle = product.slug === "business-bloom-professional-systems";
  const isVirtualExecutiveTeam = product.slug === "business-bloom-virtual-executive-team";
  const bundleEconomics = isProfessionalSystemsBundle ? getProfessionalSystemsBundleEconomics() : null;
  const relatedSlugs = RELATED_BY_SLUG[product.slug] ?? [];
  const relatedProducts = relatedSlugs
    .map((slug) => PUBLIC_MARKETPLACE_PRODUCTS.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is (typeof PUBLIC_MARKETPLACE_PRODUCTS)[number] => Boolean(candidate));

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />
      <main className="pt-28 pb-20">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/marketplace" className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white underline underline-offset-4"><ArrowLeft className="h-4 w-4" /> Marketplace</a>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 mt-8">
            <div>
              <div className="aspect-[16/6] rounded-3xl bg-gradient-to-br from-[#7C3AED]/35 via-[#141A2D] to-[#14B8A6]/20 border border-white/10 p-7 sm:p-10 flex items-end">
                <div><Sparkles className="h-8 w-8 text-[#BDA4FF]" /><p className="mt-4 text-xs font-semibold tracking-[0.2em] uppercase text-white/50">Business Bloom</p><p className="mt-2 text-2xl sm:text-3xl font-black">{product.name}</p></div>
              </div>

              <div className="flex flex-wrap gap-2 mt-8"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#7C3AED]/10 border border-[#7C3AED]/25 text-[#BDA4FF]">{product.category}</span><span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/60">One-time purchase</span><span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/60">Digital product</span></div>
              <h1 className="mt-6 text-4xl sm:text-5xl font-black leading-tight" style={{ fontFamily: "var(--font-display)" }}>{product.name}</h1>
              <p className="mt-3 text-sm font-semibold text-[#BDA4FF]">{POSITIONING_BY_SLUG[product.slug] ?? product.collection}</p>
              <p className="mt-5 text-lg text-white/65 leading-relaxed max-w-3xl">{product.shortDescription}</p>

              {isVirtualExecutiveTeam && (
                <div className="mt-8 rounded-2xl border border-[#14B8A6]/25 bg-[#14B8A6]/5 p-6">
                  <h2 className="text-2xl font-black">Your business decisions deserve more than one point of view.</h2>
                  <p className="mt-3 text-white/65 leading-relaxed">The Business Bloom Virtual Executive Team™ gives you structured AI-assisted executive perspectives to help you think through strategy, money, marketing, operations, risk, and execution before making major business decisions. You remain the owner and final decision-maker.</p>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-8 mt-10"><div><h2 className="text-xl font-bold">Who it is for</h2><p className="mt-4 text-white/65 text-sm leading-relaxed">{AUDIENCE_BY_SLUG[product.slug]}</p></div><div><h2 className="text-xl font-bold">The problem it solves</h2><p className="mt-4 text-white/65 text-sm leading-relaxed">{PROBLEM_BY_SLUG[product.slug]}</p></div></div>

              <div className={`grid gap-8 mt-10 ${isProfessionalSystemsBundle || isVirtualExecutiveTeam ? "sm:grid-cols-1" : "sm:grid-cols-2"}`}>
                <div><h2 className="text-xl font-bold">With this system, you’ll be able to:</h2><ul className="space-y-3 mt-4">{product.benefits.slice(0, 6).map((item) => <li key={item} className="flex gap-3 text-white/70 text-sm"><CheckCircle2 className="h-5 w-5 text-[#14B8A6] shrink-0" />{item}</li>)}</ul></div>
                {!isProfessionalSystemsBundle && !isVirtualExecutiveTeam && <div><h2 className="text-xl font-bold">What You Receive</h2><ul className="space-y-4 mt-4">{product.included.map((item) => <li key={item} className="flex gap-3 text-white/70 text-sm leading-relaxed"><CheckCircle2 className="h-5 w-5 text-[#7C3AED] shrink-0" />{item}</li>)}</ul></div>}
              </div>

              {isProfessionalSystemsBundle && bundleEconomics && (
                <section className="mt-12 rounded-3xl border border-[#7C3AED]/25 bg-[#0D1120] p-6 sm:p-8">
                  <p className="text-[#BDA4FF] text-sm font-bold uppercase tracking-wider">What’s Included</p>
                  <h2 className="mt-2 text-3xl font-black">6 Complete Business Systems</h2>
                  <p className="mt-4 text-white/65 leading-relaxed max-w-3xl">Instead of purchasing six business systems separately, Professional Systems™ brings them together into one coordinated framework so you can build, manage, market, sell, serve, and systemize your business from one place.</p>
                  <div className="grid md:grid-cols-2 gap-4 mt-7">{PROFESSIONAL_SYSTEMS_INCLUDED.map((system) => <article key={system.name} className="p-5 rounded-2xl border border-white/10 bg-[#0B0F1A]"><h3 className="font-bold text-lg">{system.name}</h3><p className="mt-2 text-sm text-white/55 leading-relaxed">{system.description}</p></article>)}</div>
                  <div className="mt-9"><h3 className="text-2xl font-black">Plus Your Implementation Toolkit</h3><div className="grid md:grid-cols-2 gap-4 mt-5">{PROFESSIONAL_SYSTEMS_TOOLKIT.map((item) => <article key={item.name} className="p-5 rounded-2xl border border-white/10 bg-white/[0.03]"><h4 className="font-bold">{item.name}</h4><p className="mt-2 text-sm text-white/55 leading-relaxed">{item.description}</p></article>)}</div></div>
                  <div className="mt-8 grid sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03]"><p className="text-xs uppercase tracking-wider text-white/40">Six-system retail value</p><p className="mt-2 text-2xl font-black">{formatCurrency(bundleEconomics.individualRetailValueCents)}</p></div>
                    <div className="p-5 rounded-2xl border border-[#14B8A6]/25 bg-[#14B8A6]/5"><p className="text-xs uppercase tracking-wider text-white/40">Professional Systems™</p><p className="mt-2 text-2xl font-black text-[#14B8A6]">{formatCurrency(bundleEconomics.bundlePriceCents)}</p></div>
                    <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03]"><p className="text-xs uppercase tracking-wider text-white/40">You save</p><p className="mt-2 text-2xl font-black">{formatCurrency(bundleEconomics.savingsCents)} <span className="text-base text-white/55">({(bundleEconomics.savingsPercent * 100).toFixed(1)}%)</span></p></div>
                  </div>
                </section>
              )}

              {isVirtualExecutiveTeam && (
                <>
                  <section className="mt-12 rounded-3xl border border-[#7C3AED]/25 bg-[#0D1120] p-6 sm:p-8">
                    <p className="text-[#BDA4FF] text-sm font-bold uppercase tracking-wider">Meet Your Virtual Executive Team</p>
                    <h2 className="mt-2 text-3xl font-black">Four distinct executive perspectives. One owner decision.</h2>
                    <p className="mt-4 text-white/65 leading-relaxed max-w-3xl">Each role is a structured AI-assisted perspective—not a human employee, officer, attorney, accountant, or consultant. Use them to separate the questions a CEO, CFO, COO, and CMO would bring to the same decision.</p>
                    <div className="grid md:grid-cols-2 gap-5 mt-7">
                      {VIRTUAL_EXECUTIVES.map((executive) => (
                        <article key={executive.title} className="p-6 rounded-2xl border border-white/10 bg-[#0B0F1A]">
                          <h3 className="font-black text-xl">{executive.title}</h3>
                          <p className="mt-2 text-[#14B8A6] text-sm font-bold">{executive.focus}</p>
                          <p className="mt-4 text-xs uppercase tracking-wider text-white/40">Helps you think through:</p>
                          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">{executive.helps.map((area) => <li key={area} className="text-sm text-white/60">• {area}</li>)}</ul>
                          <p className="mt-5 pt-5 border-t border-white/10 text-sm text-white/70 leading-relaxed"><strong className="text-white">Customer value:</strong> {executive.value}</p>
                        </article>
                      ))}
                    </div>
                  </section>

                  <section className="mt-10">
                    <h2 className="text-3xl font-black">What You Receive</h2>
                    <p className="mt-3 text-white/60 max-w-3xl">The executive perspectives are the core of the system. The guides, prompts, workflows, worksheets, and examples make those perspectives practical and repeatable.</p>
                    <div className="grid md:grid-cols-2 gap-4 mt-6">{VET_TOOLKIT.map((item) => <article key={item.name} className="p-5 rounded-2xl border border-white/10 bg-[#0D1120]"><h3 className="font-bold">{item.name}</h3><p className="mt-2 text-sm text-white/55 leading-relaxed">{item.description}</p></article>)}</div>
                  </section>

                  <section className="mt-10 rounded-3xl border border-white/10 bg-[#0D1120] p-6 sm:p-8">
                    <h2 className="text-3xl font-black">What This Looks Like in Real Life</h2>
                    <p className="mt-3 text-sm text-white/55">These are illustrative decision-support scenarios, not promises of business outcomes.</p>
                    <div className="grid lg:grid-cols-3 gap-5 mt-6">{VET_USE_CASES.map((scenario) => <article key={scenario.title} className="p-5 rounded-2xl border border-white/10 bg-[#0B0F1A]"><h3 className="font-black text-lg">{scenario.title}</h3><dl className="mt-4 space-y-4">{scenario.perspectives.map(([role, question]) => <div key={role}><dt className="font-bold text-[#BDA4FF] text-sm">{role}</dt><dd className="mt-1 text-sm text-white/55 leading-relaxed">{question}</dd></div>)}</dl></article>)}</div>
                  </section>

                  <section className="mt-10 p-7 rounded-3xl border border-[#14B8A6]/20 bg-[#14B8A6]/5">
                    <h2 className="text-3xl font-black">Why It Matters</h2>
                    <p className="mt-4 text-white/70 leading-relaxed">Most small-business owners make major decisions wearing every hat at once. One minute you’re thinking like the CEO. The next you’re worrying about cash flow, marketing, operations, customers, and execution.</p>
                    <p className="mt-4 text-white/70 leading-relaxed">Virtual Executive Team™ gives you a structured way to separate those perspectives, examine the tradeoffs, and make the final decision with more context.</p>
                    <p className="mt-5 font-bold">You remain the owner. You make the final call. The system helps you ask better questions before you make it.</p>
                  </section>

                  <section className="mt-8 p-6 rounded-2xl border border-white/10 bg-[#0D1120]">
                    <h2 className="text-xl font-bold">Purchase clarity</h2>
                    <dl className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                      <div><dt className="text-white/40">Purchase type</dt><dd className="mt-1 text-white/75">One-time digital purchase</dd></div>
                      <div><dt className="text-white/40">Product type</dt><dd className="mt-1 text-white/75">AI-assisted executive decision-support system</dd></div>
                      <div><dt className="text-white/40">Delivery</dt><dd className="mt-1 text-white/75">Digital package delivered after successful checkout</dd></div>
                      <div><dt className="text-white/40">Human executives included</dt><dd className="mt-1 text-white/75">No</dd></div>
                      <div><dt className="text-white/40">Final decision-maker</dt><dd className="mt-1 text-white/75">You, the customer/business owner</dd></div>
                      <div><dt className="text-white/40">Support</dt><dd className="mt-1"><a href="mailto:support@businessbloomllc.com" className="text-[#14B8A6] underline underline-offset-4">support@businessbloomllc.com</a></dd></div>
                    </dl>
                  </section>
                </>
              )}

              <div className="mt-10 p-6 rounded-2xl border border-white/10 bg-[#0D1120]"><h2 className="text-xl font-bold">How it works</h2><ol className="mt-4 grid sm:grid-cols-3 gap-5 text-sm text-white/60"><li><strong className="text-white block mb-1">1. Choose the system</strong>Review the outcome, included tools, price, and fit for your business.</li><li><strong className="text-white block mb-1">2. Complete checkout</strong>Secure one-time payment is handled through Stripe.</li><li><strong className="text-white block mb-1">3. Receive instructions</strong>{deliveryCopy(product.fulfillmentType)}</li></ol></div>

              <div className="grid sm:grid-cols-2 gap-6 mt-8"><div className="p-6 rounded-2xl border border-white/10 bg-[#0D1120]"><h2 className="text-xl font-bold">Format & delivery</h2><p className="mt-3 text-sm leading-relaxed text-white/55">Digital Business Bloom product. No physical shipment is required. {deliveryCopy(product.fulfillmentType)}</p></div><div className="p-6 rounded-2xl border border-white/10 bg-[#0D1120]"><h2 className="text-xl font-bold">License & use</h2><p className="mt-3 text-sm leading-relaxed text-white/55">Purchase provides customer use rights under the applicable Business Bloom license and Terms. Redistribution, resale, or public sharing is not included unless the product license expressly says otherwise.</p></div></div>

              <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-[#0D1120]"><h2 className="text-xl font-bold">FAQ</h2><div className="mt-4 grid sm:grid-cols-2 gap-6 text-sm"><div><h3 className="font-semibold">Is this a subscription?</h3><p className="text-white/55 mt-1">No. This is a one-time purchase.</p></div><div><h3 className="font-semibold">Do I need special software?</h3><p className="text-white/55 mt-1">Use requirements vary by the included editable tools. Product instructions identify the appropriate formats and next steps.</p></div><div><h3 className="font-semibold">How will I receive it?</h3><p className="text-white/55 mt-1">Delivery instructions are sent to the customer email after successful payment.</p></div><div><h3 className="font-semibold">Where do I get help?</h3><p className="text-white/55 mt-1">Email <a href="mailto:support@businessbloomllc.com" className="text-[#14B8A6] underline underline-offset-4">support@businessbloomllc.com</a> for purchase, delivery, access, onboarding, or product questions.</p></div></div></div>

              <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-[#0D1120]"><h2 className="text-xl font-bold">Important use boundary</h2><p className="mt-3 text-sm leading-relaxed text-white/55">Business Bloom products provide business planning, decision-support, and implementation resources. They do not replace human executives or licensed legal, tax, accounting, HR, medical, or other regulated professional advice where professional review is required.</p></div>
            </div>

            <aside className="lg:sticky lg:top-24 h-fit p-7 rounded-2xl bg-[#0D1120] border border-white/10">
              <p className="text-sm text-white/45">One-time price</p><p className="text-3xl font-black text-[#14B8A6] mt-1">{commercial?.priceDisplay ?? "Unavailable"}</p>
              {isProfessionalSystemsBundle && bundleEconomics && <p className="mt-2 text-sm text-white/50">Six-system retail value {formatCurrency(bundleEconomics.individualRetailValueCents)} · Save {formatCurrency(bundleEconomics.savingsCents)} ({(bundleEconomics.savingsPercent * 100).toFixed(1)}%)</p>}
              <p className="mt-4 text-sm text-white/55 leading-relaxed">{product.shortDescription}</p>
              {checkoutReady ? <div className="mt-6"><button onClick={() => initiateMarketplaceCheckout(product.slug)} className="w-full px-5 py-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold inline-flex items-center justify-center gap-2"><LockKeyhole className="h-4 w-4" /> Continue to secure checkout</button><p className="mt-3 text-xs text-white/45 leading-relaxed">By continuing, you are purchasing a one-time digital product and agree to the <a href="/terms" className="text-[#14B8A6] underline underline-offset-4">Terms of Service</a> and acknowledge the <a href="/privacy" className="text-[#14B8A6] underline underline-offset-4">Privacy Policy</a>. Digital-product purchases are treated as final after delivery or access is made available, subject to applicable law and Business Bloom’s documented fulfillment-error remedies.</p></div> : <div className="mt-6"><button disabled className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white/40 font-bold cursor-not-allowed inline-flex items-center justify-center gap-2"><LockKeyhole className="h-4 w-4" /> Checkout unavailable</button><p className="mt-3 text-xs text-white/45">This product is temporarily unavailable for checkout.</p></div>}
              <dl className="mt-6 space-y-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-white/45">Purchase type</dt><dd className="text-white/75 text-right">One-time payment</dd></div><div className="flex justify-between gap-4"><dt className="text-white/45">Payment</dt><dd className="text-white/75 text-right">Secure checkout powered by Stripe</dd></div><div className="flex justify-between gap-4"><dt className="text-white/45">Delivery</dt><dd className="text-white/75 text-right">Digital delivery after successful checkout</dd></div><div className="flex justify-between gap-4"><dt className="text-white/45">Support</dt><dd className="text-white/75 text-right">support@businessbloomllc.com</dd></div></dl>
              <a href="/support" className="mt-6 inline-flex w-full items-center justify-center gap-2 text-sm text-[#14B8A6] font-semibold underline underline-offset-4"><HelpCircle className="h-4 w-4" /> Questions before purchase?</a>
            </aside>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 border-t border-white/5 pt-16">
          <div className="flex items-end justify-between gap-4"><div><p className="text-[#BDA4FF] text-sm font-bold uppercase tracking-wider">Related products</p><h2 className="mt-2 text-3xl font-black">A logical next step for this need</h2></div><a href="/marketplace" className="hidden sm:inline-flex text-sm font-semibold text-[#14B8A6] underline underline-offset-4">View Marketplace</a></div>
          <div className="grid md:grid-cols-3 gap-5 mt-7">{relatedProducts.map((related) => { const relatedCommercial = getMarketplaceCommercialConfig(related.slug); return <a href={`/marketplace/${related.slug}`} key={related.slug} className="p-6 rounded-2xl bg-[#0D1120] border border-white/10 hover:border-[#7C3AED]/40 transition-colors"><span className="text-xs text-white/40">{related.category}</span><h3 className="mt-2 text-lg font-bold">{related.name}</h3><p className="mt-3 text-sm text-white/50 line-clamp-3">{related.shortDescription}</p><div className="mt-5 flex items-center justify-between"><span className="font-black text-[#14B8A6]">{relatedCommercial?.priceDisplay}</span><ArrowRight className="h-4 w-4 text-white/50" /></div></a>; })}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
