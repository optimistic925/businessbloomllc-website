import { motion } from "framer-motion";
import {
  Wrench,
  Globe,
  Palette,
  Mail,
  Bot,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Clock,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const services = [
  {
    icon: Globe,
    title: "Website & Funnel Build",
    description:
      "Professional website or sales funnel designed to convert visitors into leads and customers.",
    deliverables: [
      "Custom design & copywriting",
      "Mobile-responsive build",
      "SEO optimization",
      "Lead capture forms",
      "Analytics setup",
    ],
    turnaround: "7–14 days",
  },
  {
    icon: Bot,
    title: "Automation Setup",
    description:
      "Full implementation of our automation systems — Speed to Lead, Follow-Up, Reactivation, and more.",
    deliverables: [
      "CRM configuration",
      "Email & SMS sequences",
      "Trigger & workflow setup",
      "Pipeline management",
      "Testing & QA",
    ],
    turnaround: "5–10 days",
  },
  {
    icon: Palette,
    title: "Brand Identity Package",
    description:
      "Complete brand identity including logo, color palette, typography, and brand guidelines.",
    deliverables: [
      "Logo design (3 concepts)",
      "Color palette & typography",
      "Brand guidelines document",
      "Social media templates",
      "Business card design",
    ],
    turnaround: "5–7 days",
  },
  {
    icon: Mail,
    title: "Email Marketing Setup",
    description:
      "Full email marketing system with templates, sequences, and list segmentation.",
    deliverables: [
      "Email platform setup",
      "Welcome sequence (5–7 emails)",
      "Newsletter templates",
      "List segmentation",
      "A/B testing framework",
    ],
    turnaround: "5–7 days",
  },
  {
    icon: BarChart3,
    title: "Reporting Dashboard",
    description:
      "Custom analytics dashboard showing the metrics that matter most to your business.",
    deliverables: [
      "KPI identification",
      "Dashboard design & build",
      "Data source integration",
      "Automated reporting",
      "Team access setup",
    ],
    turnaround: "3–5 days",
  },
  {
    icon: Wrench,
    title: "Custom Integration",
    description:
      "Connect your tools and platforms with custom API integrations and workflow automation.",
    deliverables: [
      "Requirements analysis",
      "API integration build",
      "Data mapping & sync",
      "Error handling",
      "Documentation",
    ],
    turnaround: "5–14 days",
  },
];

export default function DfyServices() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#14B8A6]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#7C3AED]/6 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#14B8A6]/30 bg-[#14B8A6]/10 text-[#14B8A6] text-sm font-medium mb-8">
              <Wrench className="h-4 w-4" />
              DONE FOR YOU SERVICES
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            We Build It.{" "}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] bg-clip-text text-transparent">
              You Grow.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Skip the learning curve. Our team handles the technical setup so you
            can focus on what you do best — running your business and serving
            clients.
          </motion.p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Tell Us What You Need", desc: "Fill out our intake form with your goals and requirements." },
              { step: "2", title: "We Build It", desc: "Our team designs, builds, and tests everything for you." },
              { step: "3", title: "Launch & Grow", desc: "We hand it off with training and support to ensure success." },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-[#0D1120] border border-white/10"
              >
                <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#7C3AED] font-bold">{item.step}</span>
                </div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
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
              Our DFY Services
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Each service is delivered turnkey — ready to use from day one.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-[#0D1120] border border-white/10 hover:border-[#14B8A6]/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center">
                    <service.icon className="h-5 w-5 text-[#14B8A6]" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <Clock className="h-3 w-3" />
                    {service.turnaround}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-white/60"
                    >
                      <CheckCircle className="h-3.5 w-3.5 text-[#14B8A6] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
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
              Ready to Hand It Off?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-8 text-lg">
              Tell us what you need and we'll deliver a complete, working system
              — no tech skills required on your end.
            </p>
            <a
              href="/get-started"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] text-white font-bold hover:opacity-90 transition-opacity text-lg"
            >
              Request a DFY Quote <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
