import { motion } from "framer-motion";
import {
  Brain,
  MessageSquare,
  FileText,
  Target,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const packs = [
  {
    title: "Sales & Closing Pack",
    description:
      "50+ prompts for objection handling, follow-up messages, cold outreach, and closing scripts.",
    icon: Target,
    prompts: 50,
    price: "$47",
  },
  {
    title: "Marketing & Content Pack",
    description:
      "75+ prompts for social media, email campaigns, ad copy, landing pages, and blog content.",
    icon: MessageSquare,
    prompts: 75,
    price: "$67",
  },
  {
    title: "Operations & SOPs Pack",
    description:
      "40+ prompts for creating SOPs, training materials, onboarding docs, and workflow automation.",
    icon: FileText,
    prompts: 40,
    price: "$37",
  },
  {
    title: "Complete Business Bundle",
    description:
      "All prompt packs combined — 165+ prompts covering every aspect of running and growing a business.",
    icon: Brain,
    prompts: 165,
    price: "$97",
    featured: true,
  },
];

const benefits = [
  "Save 10+ hours per week on content creation",
  "Consistent, professional messaging across all channels",
  "Plug-and-play — just copy, paste, and customize",
  "Works with ChatGPT, Claude, Gemini, and any AI tool",
  "Built by marketers who actually use them daily",
  "Lifetime access with free updates",
];

export default function PromptPacks() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#7C3AED]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#14B8A6]/6 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED] text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              AI PROMPT PACKS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            AI Prompts Built for{" "}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] bg-clip-text text-transparent">
              Business Growth
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Stop staring at blank screens. Our curated prompt collections help
            you generate sales copy, marketing content, and operational documents
            in minutes — not hours.
          </motion.p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-[#0D1120] border border-white/5"
              >
                <CheckCircle className="h-5 w-5 text-[#14B8A6] mt-0.5 shrink-0" />
                <span className="text-white/80 text-sm">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packs Grid */}
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
              Choose Your Pack
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Each pack is designed for a specific business function. Get one or
              grab the bundle for maximum impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packs.map((pack, index) => (
              <motion.div
                key={pack.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-8 rounded-2xl border transition-all ${
                  pack.featured
                    ? "bg-gradient-to-b from-[#7C3AED]/10 to-[#0D1120] border-[#7C3AED]/40 md:col-span-2"
                    : "bg-[#0D1120] border-white/10"
                }`}
              >
                {pack.featured && (
                  <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-[#14B8A6]/20 text-[#14B8A6] border border-[#14B8A6]/30 mb-4">
                    BEST VALUE
                  </span>
                )}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center shrink-0">
                    <pack.icon className="h-6 w-6 text-[#7C3AED]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {pack.title}
                    </h3>
                    <p className="text-white/50 text-sm mb-4 leading-relaxed">
                      {pack.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-black text-[#14B8A6]">
                          {pack.price}
                        </span>
                        <span className="text-white/40 text-sm">
                          {pack.prompts}+ prompts
                        </span>
                      </div>
                      <a
                        href="/get-started"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7C3AED] text-white text-sm font-bold hover:bg-[#6D2FDD] transition-colors"
                      >
                        Get Pack <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl sm:text-4xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Need Custom Prompts?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-8 text-lg">
              We also build custom prompt libraries tailored to your specific
              industry, team, and workflows.
            </p>
            <a
              href="/get-started"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] text-white font-bold hover:opacity-90 transition-opacity text-lg"
            >
              Request Custom Prompts <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
