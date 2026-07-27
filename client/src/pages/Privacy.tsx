import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

/**
 * Privacy Policy page.
 *
 * This is a placeholder business-policy draft suitable for legal review.
 * Provisions requiring owner or attorney confirmation are labeled with
 * REVIEW NOTES. No company addresses, specific retention periods, or
 * governing-law provisions were invented — those are left for the
 * owner/attorney to complete.
 */
export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />

      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#14B8A6]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#7C3AED]/6 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED] text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              LEGAL
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Privacy Policy
            </h1>
            <p className="text-white/40 text-sm">
              Last updated: July 27, 2026
            </p>
          </motion.div>

          {/* REVIEW NOTE banner */}
          <div className="mb-10 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <p className="text-amber-400/80 text-sm leading-relaxed">
              <strong>REVIEW NOTE:</strong> This is a placeholder privacy policy
              draft prepared for legal review by Business Bloom LLC ownership
              and/or a qualified attorney. Specific details — including company
              contact information, data retention periods, and governing
              jurisdiction — must be confirmed before this policy is published
              to the public.
            </p>
          </div>

          <div className="space-y-10 text-white/70 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
              <p>
                Business Bloom LLC ("we," "us," or "our") respects your privacy
                and is committed to protecting your personal information. This
                Privacy Policy explains how we collect, use, and safeguard
                information when you visit businessbloomllc.com (the "Website")
                or use our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
              <p className="mb-2">We may collect the following types of information:</p>
              <ul className="list-disc list-inside space-y-1 text-white/60">
                <li>
                  <strong className="text-white/70">Contact information:</strong>{" "}
                  name, email address, and phone number when you submit forms or
                  complete a purchase.
                </li>
                <li>
                  <strong className="text-white/70">Payment information:</strong>{" "}
                  We use Stripe for payment processing. We do not store your full
                  card details on our servers; Stripe handles that securely.
                </li>
                <li>
                  <strong className="text-white/70">Usage data:</strong> Pages
                  visited, referring URLs, and similar analytics data.
                </li>
                <li>
                  <strong className="text-white/70">Cookies:</strong> Session and
                  authentication cookies necessary for site functionality.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
              <p>We use collected information to:</p>
              <ul className="list-disc list-inside space-y-1 text-white/60 mt-2">
                <li>Process transactions and deliveries</li>
                <li>Respond to support and sales inquiries</li>
                <li>Send service-related communications</li>
                <li>Improve our website and product offerings</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">4. Cookies</h2>
              <p>
                We use cookies and similar technologies for authentication and
                site functionality. You can disable cookies in your browser
                settings, but some features may not work properly.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">5. Third-Party Services</h2>
              <p>
                We use third-party services to operate our website and process
                payments, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-white/60 mt-2">
                <li>Stripe — payment processing (governed by Stripe's own privacy policy)</li>
              </ul>
              <p className="mt-2">
                These third parties have their own privacy policies governing
                the use of your data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">6. Data Security</h2>
              <p>
                We take reasonable measures to protect your personal information.
                However, no system is completely secure, and we cannot guarantee
                absolute security of your data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">7. Your Rights</h2>
              <p>
                You may request access to, correction of, or deletion of your
                personal information. To make such a request, please contact us
                using the information below.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">8. Data Retention</h2>
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-amber-400/80 text-sm">
                  <strong>REVIEW NOTE:</strong> The specific data retention
                  period must be confirmed by Business Bloom LLC ownership or
                  legal counsel before publication.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">9. Contact Us</h2>
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-amber-400/80 text-sm">
                  <strong>REVIEW NOTE:</strong> Company contact information
                  (email address, mailing address, phone) must be confirmed by
                  Business Bloom LLC ownership before publication.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">10. Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will
                be posted on this page with an updated revision date.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
