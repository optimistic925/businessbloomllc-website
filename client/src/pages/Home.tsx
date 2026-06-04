import { motion } from "framer-motion";
import {
  Zap,
  Rocket,
  TrendingUp,
  Bot,
  Globe,
  ShoppingBag,
  FileText,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { initiateCheckout } from "@/lib/checkout";
import { SERVICE_PRICES } from "../../../shared/servicePricing";

const services = [
  {
    icon: Zap,
    title: "Automation Systems",
    description:
      "Speed to Lead, Follow-Up, Reactivation, Processing & Reporting — all on autopilot.",
    href: "/solutions",
  },
  {
    icon: Bot,
    title: "Prompt Packs",
    description:
      "AI prompt collections built for sales, marketing, and operations teams.",
    href: "/prompt-packs",
  },
  {
    icon: Rocket,
    title: "DFY Services",
    description:
      "Done-For-You setups so you can launch faster without the learning curve.",
    href: "/dfy-services",
  },
  {
    icon: Globe,
    title: "Hosting & Domains",
    description:
      "Reliable web hosting and domain registration with free SSL and privacy.",
    href: "/hosting",
  },
  {
    icon: ShoppingBag,
    title: "Shopify Solutions",
    description:
      "Custom Shopify app integration and free store setup to start selling today.",
    href: "/shopify-app",
  },
  {
    icon: FileText,
    title: "Resources",
    description:
      "Guides, templates, and training to help you grow smarter and faster.",
    href: "/resources",
  },
];

const packages = [
  {
    name: "Automation System",
    price: "$997",
    priceKey: "AUTOMATION_SYSTEM" as const,
    description: "Core automation workflows for lead management and follow-up.",
    features: [
      "Speed to Lead automation",
      "Follow-Up sequences",
      "Reactivation campaigns",
      "Processing workflows",
      "Reporting dashboards",
    ],
  },
  {
    name: "Business Launch System",
    price: "$1,497",
    priceKey: "BUSINESS_LAUNCH" as const,
    description: "Everything you need to launch and start acquiring clients.",
    features: [
      "Full Automation System included",
      "Website & funnel setup",
      "Brand identity package",
      "Client acquisition system",
      "30-day launch support",
    ],
    featured: true,
  },
  {
    name: "Scale System",
    price: "$3,000",
    priceKey: "SCALE_SYSTEM" as const,
    description: "Advanced systems for businesses ready to scale aggressively.",
    features: [
      "Everything in Business Launch",
      "Multi-channel campaigns",
      "Team training & SOPs",
      "Custom integrations",
      "Ongoing optimization",
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7C3AED]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#14B8A6]/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED] text-sm font-medium mb-8">
              <Zap className="h-4 w-4" />
              BUSINESS AUTOMATION SYSTEMS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Start, Grow &amp; Automate Your Business with{" "}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] bg-clip-text text-transparent">
              Simple AI-Powered Systems
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Business Bloom LLC helps entrepreneurs and teams build scalable
            systems for lead generation, client follow-up, and revenue growth —
            so you can work less and earn more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/get-started"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#7C3AED] text-white font-bold hover:bg-[#6D2FDD] transition-colors text-lg"
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="/solutions"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors text-lg"
            >
              View Solutions
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
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
              Everything You Need to{" "}
              <span className="text-[#14B8A6]">Grow</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              From automation and AI tools to hosting and done-for-you services —
              we provide the full stack for modern business growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.a
                key={service.title}
                href={service.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-[#0D1120] border border-white/10 hover:border-[#7C3AED]/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center mb-4 group-hover:bg-[#7C3AED]/20 transition-colors">
                  <service.icon className="h-6 w-6 text-[#7C3AED]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
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
              Core Packages
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Choose the system that matches where you are in your business
              journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-8 rounded-2xl border transition-all ${
                  pkg.featured
                    ? "bg-gradient-to-b from-[#7C3AED]/10 to-[#0D1120] border-[#7C3AED]/40"
                    : "bg-[#0D1120] border-white/10"
                }`}
              >
                {pkg.featured && (
                  <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/30 mb-4">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-xl font-bold text-white mb-2">
                  {pkg.name}
                </h3>
                <p className="text-3xl font-black text-[#14B8A6] mb-3">
                  {pkg.price}
                </p>
                <p className="text-white/50 text-sm mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-white/70"
                    >
                      <CheckCircle className="h-4 w-4 text-[#14B8A6] mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() =>
                    initiateCheckout(
                      SERVICE_PRICES[pkg.priceKey].priceId,
                      pkg.name
                    )
                  }
                  className={`w-full block text-center px-6 py-3 rounded-xl font-bold transition-colors cursor-pointer ${
                    pkg.featured
                      ? "bg-[#7C3AED] text-white hover:bg-[#6D2FDD]"
                      : "border border-white/10 text-white hover:bg-white/5"
                  }`}
                >
                  Buy Now — {pkg.price}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TrendingUp className="h-12 w-12 text-[#14B8A6] mx-auto mb-6" />
            <h2
              className="text-3xl sm:text-4xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to Bloom?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-8 text-lg">
              Join hundreds of entrepreneurs who are growing their businesses
              with automation, AI, and scalable systems.
            </p>
            <a
              href="/get-started"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] text-white font-bold hover:opacity-90 transition-opacity text-lg"
            >
              Start Your Journey <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
