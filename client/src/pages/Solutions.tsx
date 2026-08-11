import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Gift,
  Globe2,
  Megaphone,
  Rocket,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const solutionAreas = [
  {
    icon: BriefcaseBusiness,
    title: "Systemize Core Operations",
    description: "Build repeatable customer service, HR, marketing, and operations processes with Business Bloom Professional Systems™.",
    outcomes: ["Clarify repeatable workflows", "Use editable operating tools", "Create a more consistent implementation rhythm"],
    href: "/marketplace#professional-systems",
  },
  {
    icon: Bot,
    title: "Identify & Plan Automation",
    description: "Find useful automation opportunities and plan them with human review instead of automating everything by default.",
    outcomes: ["Identify repetitive work", "Define appropriate human checkpoints", "Use prompts, planning tools, and dashboards"],
    href: "/marketplace/business-bloom-ai-automation-bundles",
  },
  {
    icon: Rocket,
    title: "Start a Business with Structure",
    description: "Use branding, business-foundation, launch, and website systems to organize the practical work behind a new business.",
    outcomes: ["Clarify brand and positioning", "Organize business-foundation work", "Plan launch and website execution"],
    href: "/marketplace#startup",
  },
  {
    icon: Megaphone,
    title: "Build Repeatable Marketing",
    description: "Create a more structured approach to marketing, content, and social-media execution with current Business Bloom systems.",
    outcomes: ["Plan campaigns and content", "Use reusable workflows and templates", "Connect activities to measurable business goals"],
    href: "/marketplace#marketing",
  },
  {
    icon: Globe2,
    title: "Improve Digital Business Execution",
    description: "Plan and operate your website with structured guidance, workflows, worksheets, prompts, examples, and launch QA.",
    outcomes: ["Clarify website strategy", "Organize content and architecture", "Review launch readiness systematically"],
    href: "/marketplace/business-bloom-website-system",
  },
  {
    icon: Building2,
    title: "Make Better Owner-Led Decisions",
    description: "Use the Business Bloom Virtual Executive Team to structure major business decisions across multiple functional perspectives.",
    outcomes: ["Frame the decision clearly", "Review cross-functional tradeoffs", "Turn the decision into an action plan"],
    href: "/marketplace/business-bloom-virtual-executive-team",
  },
];

export default function Solutions() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />
      <main>
        <section className="pt-32 pb-20 border-b border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#BDA4FF] text-sm font-semibold">BUSINESS BLOOM SOLUTIONS</span>
            <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Start with the business problem. Then choose the right system.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Business Bloom organizes practical business tools around outcomes: stronger operations, clearer marketing, structured startup work, useful automation, better digital execution, and more disciplined decision-making.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
              <a href="/marketplace" className="px-8 py-4 rounded-xl bg-[#7C3AED] font-bold inline-flex items-center justify-center gap-2">Shop Marketplace <ArrowRight className="h-5 w-5" /></a>
              <a href="/resources" className="px-8 py-4 rounded-xl border border-white/10 font-bold hover:bg-white/5">Start with Free Resources</a>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {solutionAreas.map((solution) => (
                <article key={solution.title} className="p-7 rounded-2xl bg-[#0D1120] border border-white/10 flex flex-col">
                  <solution.icon className="h-7 w-7 text-[#14B8A6]" />
                  <h2 className="mt-5 text-xl font-bold">{solution.title}</h2>
                  <p className="mt-3 text-sm text-white/55 leading-relaxed">{solution.description}</p>
                  <ul className="mt-5 space-y-3 flex-1">
                    {solution.outcomes.map((outcome) => (
                      <li key={outcome} className="flex gap-3 text-sm text-white/70"><CheckCircle2 className="h-4 w-4 text-[#7C3AED] shrink-0 mt-0.5" />{outcome}</li>
                    ))}
                  </ul>
                  <a href={solution.href} className="mt-7 inline-flex items-center gap-2 font-semibold text-[#14B8A6]">Explore this solution <ArrowRight className="h-4 w-4" /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 border-y border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <p className="text-[#F59E0B] text-sm font-bold uppercase tracking-wider">Not ready to buy?</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-black">Use a Free Resource to identify the next problem worth solving.</h2>
              <p className="mt-4 text-white/60 leading-relaxed">Business Bloom Free Resources are designed as useful diagnostic and planning entry points. They help clarify the immediate issue before you choose a paid system.</p>
            </div>
            <div className="p-7 rounded-2xl bg-[#0D1120] border border-white/10 text-center">
              <Gift className="h-9 w-9 text-[#F59E0B] mx-auto" />
              <p className="mt-4 font-semibold">Free Business Resources</p>
              <p className="mt-2 text-sm text-white/50">Diagnostics, checklists, and planning tools. Only finalized resources are published.</p>
              <a href="/resources" className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 font-bold">Browse Free Resources <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-black">Need help choosing?</h2>
            <p className="mt-4 text-white/60">Use Business Bloom Support for product questions, purchase questions, or help understanding which current system matches your situation.</p>
            <a href="/support" className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] font-bold">Business Bloom Support <ArrowRight className="h-5 w-5" /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
