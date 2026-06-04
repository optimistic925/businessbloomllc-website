import { motion } from "framer-motion";
import {
  BookOpen,
  Video,
  FileText,
  Download,
  ArrowRight,
  ExternalLink,
  Lightbulb,
  Users,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const categories = [
  {
    icon: BookOpen,
    title: "Guides & Playbooks",
    description: "Step-by-step guides for launching, marketing, and scaling your business.",
    items: [
      "The Speed to Lead Playbook",
      "Client Acquisition Blueprint",
      "Automation Setup Guide",
      "Email Marketing Masterclass",
      "Social Media Content Calendar",
    ],
  },
  {
    icon: Video,
    title: "Training Videos",
    description: "Watch over-the-shoulder tutorials on building systems that work.",
    items: [
      "CRM Setup Walkthrough",
      "Building Your First Funnel",
      "Automation Workflow Design",
      "Shopify Store Launch Guide",
      "Analytics & Reporting Setup",
    ],
  },
  {
    icon: FileText,
    title: "Templates & Scripts",
    description: "Ready-to-use templates for emails, scripts, SOPs, and more.",
    items: [
      "Cold Outreach Email Templates",
      "Follow-Up SMS Scripts",
      "Sales Call Framework",
      "Onboarding Checklist Template",
      "Weekly Reporting Template",
    ],
  },
  {
    icon: Download,
    title: "Tools & Downloads",
    description: "Free tools, calculators, and downloads to boost your productivity.",
    items: [
      "ROI Calculator",
      "Lead Scoring Worksheet",
      "Business Launch Checklist",
      "Pricing Strategy Template",
      "Competitor Analysis Framework",
    ],
  },
];

const featured = [
  {
    title: "The Complete Business Automation Guide",
    description:
      "A 30-page guide covering everything from lead capture to client retention — with real examples and templates you can implement today.",
    type: "Guide",
    cta: "Download Free",
  },
  {
    title: "5-Day Email Challenge: Fill Your Pipeline",
    description:
      "A free 5-day email series that walks you through building a lead generation system from scratch. One action step per day.",
    type: "Email Series",
    cta: "Join Free",
  },
  {
    title: "Business Bloom Engine Demo",
    description:
      "See our full automation platform in action — watch how leads are captured, nurtured, and converted without manual work.",
    type: "Video Demo",
    cta: "Watch Now",
  },
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#7C3AED]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#14B8A6]/6 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED] text-sm font-medium mb-8">
              <Lightbulb className="h-4 w-4" />
              RESOURCES
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Learn, Build &{" "}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] bg-clip-text text-transparent">
              Grow Faster
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Free guides, templates, training videos, and tools to help you build
            and scale your business — no fluff, just actionable content.
          </motion.p>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2
              className="text-2xl font-black mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Featured
            </h2>
            <p className="text-white/50 text-sm">Our most popular free resources</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#7C3AED]/5 to-[#0D1120] border border-[#7C3AED]/20 hover:border-[#7C3AED]/40 transition-all"
              >
                <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-[#7C3AED]/10 text-[#7C3AED] mb-4">
                  {item.type}
                </span>
                <h3 className="text-lg font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">
                  {item.description}
                </p>
                <a
                  href="/get-started"
                  className="inline-flex items-center gap-2 text-[#14B8A6] text-sm font-bold hover:underline"
                >
                  {item.cta} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl sm:text-4xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Resource Library
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Browse by category to find exactly what you need.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-[#14B8A6]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {category.title}
                    </h3>
                    <p className="text-white/40 text-xs">{category.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 pl-1">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-white/60 hover:text-white/80 transition-colors cursor-pointer"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Users className="h-12 w-12 text-[#14B8A6] mx-auto mb-6" />
            <h2
              className="text-3xl sm:text-4xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Want Personalized Help?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-8 text-lg">
              Our team can create a custom growth plan for your specific business.
              Book a free strategy session to get started.
            </p>
            <a
              href="/get-started"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] text-white font-bold hover:opacity-90 transition-opacity text-lg"
            >
              Book a Strategy Call <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
