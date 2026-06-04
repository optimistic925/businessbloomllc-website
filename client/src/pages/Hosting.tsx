import { motion } from "framer-motion";
import {
  Server,
  Shield,
  Zap,
  Globe,
  Lock,
  Headphones,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Starter",
    price: "$19",
    period: "/mo",
    description: "Perfect for small business websites and landing pages.",
    features: [
      "1 website",
      "10 GB SSD storage",
      "Free SSL certificate",
      "Daily backups",
      "99.9% uptime guarantee",
      "Email support",
    ],
  },
  {
    name: "Business",
    price: "$49",
    period: "/mo",
    description: "For growing businesses with multiple sites and higher traffic.",
    features: [
      "Up to 5 websites",
      "50 GB SSD storage",
      "Free SSL certificates",
      "Daily backups + staging",
      "99.9% uptime guarantee",
      "Priority support",
      "CDN included",
      "Malware scanning",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/mo",
    description: "High-performance hosting for mission-critical applications.",
    features: [
      "Unlimited websites",
      "200 GB NVMe storage",
      "Free SSL certificates",
      "Real-time backups",
      "99.99% uptime SLA",
      "24/7 phone + chat support",
      "Global CDN",
      "DDoS protection",
      "Dedicated resources",
    ],
  },
];

const features = [
  {
    icon: Zap,
    title: "Blazing Fast",
    description: "NVMe SSD storage and global CDN for sub-second load times.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Free SSL, DDoS protection, and daily malware scanning.",
  },
  {
    icon: Lock,
    title: "Daily Backups",
    description: "Automatic daily backups with one-click restore capability.",
  },
  {
    icon: Globe,
    title: "Global CDN",
    description: "Content delivered from edge servers closest to your visitors.",
  },
  {
    icon: Server,
    title: "99.9% Uptime",
    description: "Redundant infrastructure ensures your site is always online.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Real humans who understand hosting — available when you need them.",
  },
];

export default function Hosting() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-[#14B8A6]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#7C3AED]/6 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#14B8A6]/30 bg-[#14B8A6]/10 text-[#14B8A6] text-sm font-medium mb-8">
              <Server className="h-4 w-4" />
              WEB HOSTING
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Fast, Secure{" "}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] bg-clip-text text-transparent">
              Web Hosting
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Reliable hosting built for business. Lightning-fast speeds, rock-solid
            security, and support from people who actually care.
          </motion.p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-5 rounded-xl bg-[#0D1120] border border-white/5"
              >
                <feature.icon className="h-6 w-6 text-[#14B8A6] mb-3" />
                <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                <p className="text-white/50 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
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
              Hosting Plans
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              All plans include free SSL, daily backups, and our uptime guarantee.
              No hidden fees.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-8 rounded-2xl border transition-all ${
                  plan.featured
                    ? "bg-gradient-to-b from-[#14B8A6]/10 to-[#0D1120] border-[#14B8A6]/40"
                    : "bg-[#0D1120] border-white/10"
                }`}
              >
                {plan.featured && (
                  <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-[#14B8A6]/20 text-[#14B8A6] border border-[#14B8A6]/30 mb-4">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-3">
                  <span className="text-4xl font-black text-white">
                    {plan.price}
                  </span>
                  <span className="text-white/40">{plan.period}</span>
                </div>
                <p className="text-white/50 text-sm mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
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
                    plan.featured
                      ? "bg-[#14B8A6] text-white hover:bg-[#0FA897]"
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

      {/* Domain Upsell */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-2xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Need a Domain Too?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-6">
              Register your perfect domain name and bundle it with hosting for a
              seamless setup.
            </p>
            <a
              href="/domains"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#14B8A6]/30 text-[#14B8A6] font-bold hover:bg-[#14B8A6]/10 transition-colors"
            >
              Search Domains <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
