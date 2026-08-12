import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Gift,
  Globe2,
  HeartHandshake,
  Megaphone,
  Rocket,
  ShoppingCart,
  Sparkles,
  Users,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const solutionAreas = [
  {
    id: "start-your-business",
    icon: Rocket,
    title: "Start Your Business",
    problem: "You need a practical foundation for launching without scattering key decisions across disconnected notes and tasks.",
    description: "Use current Business Bloom foundation, branding, launch, and website systems to organize the work behind a credible business start.",
    outcomes: ["Organize startup priorities", "Clarify brand and launch work", "Identify professional-review steps"],
    href: "/marketplace#startup",
  },
  {
    id: "build-your-brand",
    icon: Sparkles,
    title: "Build Your Brand",
    problem: "Your business needs a more consistent identity and a reusable structure for brand decisions and customer-facing materials.",
    description: "Use the Business Bloom Branding System to coordinate brand foundations, editable materials, worksheets, examples, and references.",
    outcomes: ["Clarify brand direction", "Use editable customer materials", "Create more consistent brand execution"],
    href: "/marketplace/business-bloom-branding-system",
  },
  {
    id: "market-and-grow",
    icon: Megaphone,
    title: "Market Your Business",
    problem: "Marketing becomes difficult to sustain when campaigns, content, and measurement are handled as separate one-off activities.",
    description: "Use current Marketing, Content Marketing, and Social Media systems to create a repeatable marketing rhythm.",
    outcomes: ["Plan campaigns and content", "Use reusable workflows and templates", "Connect activity to measurable goals"],
    href: "/marketplace#marketing",
  },
  {
    id: "sell-more",
    icon: ShoppingCart,
    title: "Sell More",
    problem: "You need clearer sales visibility and a repeatable way to understand where prospects are converting or dropping out.",
    description: "Start with the free Sales Conversion Calculator while the Business Bloom Sales System remains in final production.",
    outcomes: ["Measure conversion points", "Identify sales-process friction", "Prepare for a structured sales system"],
    href: "/resources",
  },
  {
    id: "systemize-operations",
    icon: BriefcaseBusiness,
    title: "Systemize Operations",
    problem: "Core work depends too heavily on memory, inconsistent habits, or scattered files instead of documented processes.",
    description: "Use Business Bloom Professional Systems™ to build repeatable customer service, HR, marketing, and operations workflows.",
    outcomes: ["Clarify repeatable workflows", "Use editable operating tools", "Create a more consistent implementation rhythm"],
    href: "/marketplace#professional-systems",
  },
  {
    id: "manage-people",
    icon: Users,
    title: "Manage People",
    problem: "Hiring, onboarding, development, and performance work becomes inconsistent without structured people processes.",
    description: "Use the Business Bloom HR System for repeatable HR workflows with appropriate professional-review boundaries.",
    outcomes: ["Organize hiring and onboarding", "Use structured HR tools", "Keep sensitive decisions within proper review boundaries"],
    href: "/marketplace/business-bloom-hr-system",
  },
  {
    id: "customer-experience",
    icon: HeartHandshake,
    title: "Improve Customer Experience",
    problem: "Customers receive inconsistent service when standards, documents, follow-up, and improvement steps are not organized into one system.",
    description: "Use the Business Bloom Customer Service System to create repeatable service workflows and reusable customer-facing tools.",
    outcomes: ["Create service consistency", "Use reusable customer documents", "Track service-improvement actions"],
    href: "/marketplace/business-bloom-customer-service-system",
  },
  {
    id: "automate-work",
    icon: Bot,
    title: "Automate Work",
    problem: "Repetitive work consumes time, but automating the wrong steps can create risk or poor customer experiences.",
    description: "Use Business Bloom AI Automation Bundles to identify useful automation opportunities and plan appropriate human checkpoints.",
    outcomes: ["Identify repetitive work", "Define human review points", "Use prompts, planning tools, and dashboards"],
    href: "/marketplace/business-bloom-ai-automation-bundles",
  },
  {
    id: "digital-presence",
    icon: Globe2,
    title: "Build Your Digital Presence",
    problem: "Website strategy, content, workflows, and launch QA can become fragmented without one coordinated implementation structure.",
    description: "Use the Business Bloom Website System to organize website planning, workflows, worksheets, prompts, examples, and launch QA.",
    outcomes: ["Clarify website strategy", "Organize content and architecture", "Review launch readiness systematically"],
    href: "/marketplace/business-bloom-website-system",
  },
  {
    id: "grow-and-scale",
    icon: Building2,
    title: "Grow and Scale",
    problem: "Growth decisions become harder when operational, financial, marketing, technology, and risk tradeoffs are considered separately.",
    description: "Use coordinated Professional Systems and the Virtual Executive Team to structure cross-functional growth decisions and implementation.",
    outcomes: ["Frame major decisions clearly", "Review cross-functional tradeoffs", "Convert decisions into an action plan"],
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
              Business Bloom organizes current products around practical outcomes so you can self-select based on what needs improvement now—not an obsolete package name.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
              <a href="/marketplace" className="px-8 py-4 rounded-xl bg-[#7C3AED] font-bold inline-flex items-center justify-center gap-2">Shop Marketplace <ArrowRight className="h-5 w-5" /></a>
              <a href="/resources" className="px-8 py-4 rounded-xl border border-white/10 font-bold hover:bg-white/5">Start with Free Resources</a>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              {solutionAreas.map((solution) => (
                <article id={solution.id} key={solution.title} className="scroll-mt-24 p-7 rounded-2xl bg-[#0D1120] border border-white/10 flex flex-col">
                  <solution.icon className="h-7 w-7 text-[#14B8A6]" />
                  <h2 className="mt-5 text-2xl font-bold">{solution.title}</h2>
                  <p className="mt-3 text-xs uppercase tracking-wider text-[#BDA4FF] font-semibold">The business problem</p>
                  <p className="mt-2 text-sm text-white/55 leading-relaxed">{solution.problem}</p>
                  <p className="mt-5 text-sm text-white/70 leading-relaxed">{solution.description}</p>
                  <ul className="mt-5 space-y-3 flex-1">
                    {solution.outcomes.map((outcome) => (
                      <li key={outcome} className="flex gap-3 text-sm text-white/70"><CheckCircle2 className="h-4 w-4 text-[#7C3AED] shrink-0 mt-0.5" />{outcome}</li>
                    ))}
                  </ul>
                  <a href={solution.href} className="mt-7 inline-flex items-center gap-2 font-semibold text-[#14B8A6]">See the relevant Business Bloom path <ArrowRight className="h-4 w-4" /></a>
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
              <p className="mt-4 text-white/60 leading-relaxed">Business Bloom Free Resources are focused diagnostic and planning entry points designed to produce a quick win and clarify the next step.</p>
            </div>
            <div className="p-7 rounded-2xl bg-[#0D1120] border border-white/10 text-center">
              <Gift className="h-9 w-9 text-[#F59E0B] mx-auto" />
              <p className="mt-4 font-semibold">Free Business Resources</p>
              <p className="mt-2 text-sm text-white/50">Diagnostics, checklists, calculators, scorecards, and planning tools. Only finalized resources are published.</p>
              <a href="/resources" className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 font-bold">Browse Free Resources <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-black">Need help choosing?</h2>
            <p className="mt-4 text-white/60">Use Business Bloom Support for product, purchase, delivery, access, onboarding, or Free Resource questions.</p>
            <a href="/support" className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] font-bold">Business Bloom Support <ArrowRight className="h-5 w-5" /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
