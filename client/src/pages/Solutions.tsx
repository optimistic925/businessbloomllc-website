import { motion } from "framer-motion";
import {
  Zap,
  Users,
  RotateCcw,
  BarChart3,
  Cog,
  ArrowRight,
  CheckCircle,
  Rocket,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const automationSystems = [
  {
    icon: Zap,
    title: "Speed to Lead",
    description:
      "Respond to new leads within seconds — not hours. Automated text, email, and voicemail drops the moment a lead comes in.",
  },
  {
    icon: Users,
    title: "Follow-Up System",
    description:
      "Multi-channel nurture sequences that keep your business top-of-mind until the prospect is ready to buy.",
  },
  {
    icon: RotateCcw,
    title: "Reactivation Campaigns",
    description:
      "Re-engage cold leads and past clients with targeted campaigns that bring revenue back from your existing database.",
  },
  {
    icon: Cog,
    title: "Processing Automation",
    description:
      "Streamline onboarding, paperwork, scheduling, and internal workflows so nothing falls through the cracks.",
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics",
    description:
      "Real-time dashboards showing lead flow, conversion rates, revenue, and team performance at a glance.",
  },
];

const packages = [
  {
    id: "automation",
    name: "Automation System",
    price: "$997",
    ideal: "Businesses that already have leads but are losing them to slow follow-up.",
    features: [
      "Speed to Lead automation",
      "Follow-Up sequences (email + SMS)",
      "Reactivation campaign templates",
      "Processing workflows",
      "Reporting dashboard setup",
      "30-day email support",
    ],
  },
  {
    id: "business-launch",
    name: "Business Launch System",
    price: "$1,497 – $2,497",
    ideal: "New businesses or those pivoting who need a complete launch-ready system.",
    features: [
      "Everything in Automation System",
      "Website or funnel build",
      "Brand identity & messaging",
      "Client acquisition funnel",
      "Social media templates",
      "30-day launch coaching",
    ],
    featured: true,
  },
  {
    id: "client-acquisition",
    name: "Scale System",
    price: "$3,000 – $5,000+",
    ideal: "Established businesses ready to scale with advanced automation and team systems.",
    features: [
      "Everything in Business Launch",
      "Multi-channel ad campaigns",
      "Team training & SOPs",
      "Custom API integrations",
      "Advanced analytics & attribution",
      "Ongoing optimization & support",
    ],
  },
];

export default function Solutions() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#7C3AED]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-[#14B8A6]/6 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED] text-sm font-medium mb-8">
              <Rocket className="h-4 w-4" />
              SOLUTIONS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Business Automation{" "}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] bg-clip-text text-transparent">
              That Actually Works
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Stop losing leads and leaving money on the table. Our systems handle
            the repetitive work so you can focus on closing deals and growing
            revenue.
          </motion.p>
        </div>
      </section>

      {/* Automation Systems */}
      <section id="automation" className="py-20">
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
              Five Core Automation Systems
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Each system is designed to eliminate a specific bottleneck in your
              business and can work independently or together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationSystems.map((system, index) => (
              <motion.div
                key={system.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-[#0D1120] border border-white/10 hover:border-[#14B8A6]/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center mb-4">
                  <system.icon className="h-6 w-6 text-[#14B8A6]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {system.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {system.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="business-launch" className="py-20 border-t border-white/5">
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
              Choose Your Package
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Whether you're just starting or ready to scale, we have a system
              built for your stage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="client-acquisition">
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
                <p className="text-white/50 text-sm mb-6">{pkg.ideal}</p>
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
                <a
                  href="/get-started"
                  className={`block text-center px-6 py-3 rounded-xl font-bold transition-colors ${
                    pkg.featured
                      ? "bg-[#7C3AED] text-white hover:bg-[#6D2FDD]"
                      : "border border-white/10 text-white hover:bg-white/5"
                  }`}
                >
                  Get Started
                </a>
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
              Not Sure Which System Is Right?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-8 text-lg">
              Book a free strategy call and we'll map out the fastest path to
              growth for your specific business.
            </p>
            <a
              href="/get-started"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] text-white font-bold hover:opacity-90 transition-opacity text-lg"
            >
              Book Your Free Call <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
