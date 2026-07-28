import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";

/**
 * Privacy Policy — Business Bloom LLC
 *
 * This is placeholder business-policy content suitable for legal review.
 * Provisions requiring owner or attorney confirmation are labeled
 * with [REQUIRES OWNER/ATTORNEY REVIEW].
 *
 * No company addresses, specific refund periods, or governing-law
 * provisions have been invented.
 */
export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <NavBar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#7C3AED]/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-[#7C3AED]" />
            </div>
            <h1
              className="text-3xl sm:text-4xl font-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Privacy Policy
            </h1>
          </div>

          <p className="text-white/40 text-sm mb-12">
            Last updated: July 2026 · This document is a placeholder pending legal review.
          </p>

          <div className="prose prose-invert max-w-none space-y-10 text-white/70 leading-relaxed">
            {/* Section 1 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                Business Bloom LLC ("we," "us," or "our") operates
                businessbloomllc.com and app.businessbloomllc.com (collectively,
                the "Services"). This Privacy Policy describes how we collect,
                use, and protect information when you visit our website or use
                our Services.
              </p>
              <p className="mt-3">
                By using our Services, you agree to the practices described in
                this Privacy Policy.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <strong className="text-white">Personal Information:</strong> Name,
                  email address, phone number, and business details provided
                  through forms, checkout, or account registration.
                </li>
                <li>
                  <strong className="text-white">Payment Information:</strong> Payment
                  is processed securely through Stripe. We do not store full
                  credit card numbers on our servers.
                </li>
                <li>
                  <strong className="text-white">Usage Data:</strong> Information
                  about how you interact with our website, including IP address,
                  browser type, and pages visited.
                </li>
                <li>
                  <strong className="text-white">Cookies:</strong> We may use
                  cookies and similar technologies to improve user experience
                  and analyze traffic.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p>We use collected information to:</p>
              <ul className="mt-3 space-y-2">
                <li>Process payments and deliver purchased products or services</li>
                <li> Communicate with you about your account, orders, and updates</li>
                <li>Improve our website, Services, and user experience</li>
                <li>Send marketing communications (you may opt out at any time)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">4. Information Sharing</h2>
              <p>
                We do not sell, rent, or trade your personal information to
                third parties. We may share information with:
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <strong className="text-white">Payment processors</strong> (Stripe)
                  to complete transactions
                </li>
                <li>
                  <strong className="text-white">Service providers</strong> who assist
                  in operating our website or conducting business
                </li>
                <li>
                  <strong className="text-white">Legal authorities</strong> when
                  required by law or to protect our rights
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">5. Data Security</h2>
              <p>
                We implement reasonable technical and organizational measures
                to protect your information. However, no method of transmission
                over the Internet or electronic storage is 100% secure. While
                we strive to protect your data, we cannot guarantee absolute
                security.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="mt-3 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, contact us through the information
                provided on our website.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">7. Children's Privacy</h2>
              <p>
                Our Services are not directed to children under 13. We do not
                knowingly collect personal information from children under 13.
                If you believe a child has provided us with personal
                information, please contact us.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Material
                changes will be posted on this page with an updated revision
                date. Continued use of our Services after changes constitutes
                acceptance of the updated policy.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">9. Contact Us</h2>
              <p>
                For questions about this Privacy Policy, please reach out
                through the contact information available on our website at
                businessbloomllc.com.
              </p>
              <p className="mt-3 text-[#14B8A6] text-sm">
                [REQUIRES OWNER/ATTORNEY REVIEW: Add official contact email,
                mailing address, and any registered agent information once
                confirmed.]
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
