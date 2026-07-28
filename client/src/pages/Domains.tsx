import { motion } from "framer-motion";
import {
  Globe,
  Shield,
  Lock,
  Settings,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { DOMAIN_TLD_PRICING } from "../../../shared/domainPricing";

/**
 * Domains page — Phase 1 Foundation Repair
 *
 * Domain search and purchasing are temporarily disabled.
 * The fake availability check (Math.random()) has been removed.
 * No domain checkout can be initiated until a real registrar
 * API is connected.
 *
 * The page design is preserved: hero, pricing grid, features,
 * and hosting CTA remain visible. The search bar and checkout
 * modal have been removed.
 */
export default function Domains() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#14B8A6]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#7C3AED]/6 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED] text-sm font-medium mb-8">
              <Globe className="h-4 w-4" />
              DOMAIN REGISTRATION
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Find Your Perfect{" "}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] bg-clip-text text-transparent">
              Domain Name
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Register your custom domain with free WHOIS privacy, DNS management, and SSL certificate included.
          </motion.p>

          {/* Temporary notice — domain search is disabled */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="p-6 rounded-2xl bg-[#0D1120] border border-[#14B8A6]/20 text-left">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#14B8A6]/10 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-[#14B8A6]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    Domain Registration Is Being Updated
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    We are currently upgrading our domain registration system to integrate
                    a verified domain registrar partner. During this update, domain search
                    and purchasing are temporarily unavailable.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    In the meantime, if you need a domain for your business, we recommend
                    visiting{" "}
                    <a
                      href="https://app.businessbloomllc.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#14B8A6] hover:underline inline-flex items-center gap-1"
                    >
                      the Business Bloom Engine <ExternalLink className="h-3 w-3" />
                    </a>{" "}
                    for assistance, or check back soon.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-sm text-white/40 mt-4"
          >
            Need hosting too?{" "}
            <a href="/hosting" className="text-[#14B8A6] hover:underline">
              View hosting plans &rarr;
            </a>
          </motion.p>
        </div>
      </section>

      {/* Domain Pricing Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Domain Pricing
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Choose from popular top-level domains. All domains include free privacy protection and DNS management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOMAIN_TLD_PRICING.map((tldInfo, index) => (
              <motion.div
                key={tldInfo.tld}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-[#0D1120] border border-white/10 hover:border-[#14B8A6]/30 transition-all group"
              >
                <p className="text-2xl font-black text-white mb-2">{tldInfo.tld}</p>
                <p className="text-[#14B8A6] font-bold text-xl mb-1">
                  {tldInfo.price}
                  <span className="text-white/40 text-sm font-normal">/yr</span>
                </p>
                <p className="text-white/50 text-sm">{tldInfo.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-white/40 mt-8"
          >
            Pricing shown for reference. Domain registration is temporarily unavailable.
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0D1120]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Every Domain Includes
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Premium features included with every domain registration at no extra cost.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "WHOIS Privacy",
                desc: "Free privacy protection keeps your personal info hidden from public WHOIS lookups",
              },
              {
                icon: Lock,
                title: "Free SSL Certificate",
                desc: "Every domain includes a free SSL certificate for secure HTTPS connections",
              },
              {
                icon: Settings,
                title: "Easy DNS Management",
                desc: "Full DNS control panel to manage A records, CNAMEs, MX records, and more",
              },
              {
                icon: ExternalLink,
                title: "Domain Forwarding",
                desc: "Redirect your domain to any URL with masking and SEO-friendly options",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-[#0B0F1A] border border-white/5"
              >
                <feature.icon className="h-8 w-8 text-[#14B8A6] mb-4" />
                <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle CTA */}
      <section className="py-20">
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
              Save More with Hosting
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8">
              Bundle your domain with our hosting plans and get your domain free for the first year.
              Professional hosting starts at just $4.99/mo with yearly billing.
            </p>
            <a
              href="/hosting"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#7C3AED] text-white font-bold hover:bg-[#6D2FDD] transition-colors"
            >
              View Hosting Plans <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
