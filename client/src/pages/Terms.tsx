import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <NavBar />
      <main className="pt-32 pb-20">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8"><div className="w-12 h-12 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center"><FileText className="h-6 w-6 text-[#14B8A6]" /></div><h1 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "var(--font-display)" }}>Terms of Service</h1></div>
          <p className="text-white/40 text-sm mb-12">Last updated: August 2026</p>

          <div className="space-y-10 text-white/70 leading-relaxed">
            <section><h2 className="text-xl font-bold text-white mb-4">1. Scope and Acceptance</h2><p>These Terms apply to use of the Business Bloom LLC website, Marketplace, digital products, Free Resources, support channels, and other Business Bloom services that reference these Terms. By using a Business Bloom service or completing a purchase, you agree to these Terms and any product-specific terms presented for that service or transaction.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">2. Business Bloom Products</h2><p>Business Bloom provides digital business systems, educational and planning resources, editable tools, templates, prompts, workflows, dashboards, and related implementation materials. Specific product contents, formats, and delivery methods are described on the applicable product page or customer materials.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">3. Purchases and Payment</h2><p>Paid Marketplace transactions are processed through Stripe. You are responsible for reviewing the product description, price, billing type, and transaction-specific terms shown before completing checkout. Current Marketplace products are offered as one-time purchases unless a product page and checkout clearly state otherwise.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">4. Digital Delivery and Access</h2><p>Digital products may be delivered by download, access instructions, onboarding instructions, or a combination of these methods. You are responsible for providing a usable email address at checkout, maintaining access to that address, saving purchased files after delivery, and following customer-facing access instructions. Delivery links and access credentials are for the purchasing customer or authorized business users and may not be publicly redistributed. If expected delivery or access does not arrive or a supplied link does not work, contact Business Bloom Support so the delivery issue can be investigated and corrected.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">5. License and Permitted Use</h2><p>Unless a product-specific license states otherwise, Business Bloom digital products are licensed to the purchaser for the purchaser’s own authorized business use. Purchase does not transfer ownership of Business Bloom intellectual property. You may make reasonable working copies for authorized internal use, but you may not resell, publicly redistribute, publish, sublicense, remove ownership notices from, or represent Business Bloom materials as your own product without written authorization. Product-specific license terms control if they expressly differ from this section.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">6. Free Resources</h2><p>Free Resources may be provided at no charge for educational, diagnostic, or planning purposes. Their availability, format, and delivery method may change. Free Resources remain subject to applicable intellectual-property and use restrictions and may not be repackaged or sold as another party’s product.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">7. Professional Advice, HR, and Legal-Information Boundaries</h2><p>Business Bloom products are business-planning and educational resources. They do not replace qualified legal, tax, accounting, financial, investment, medical, HR, employment-law, regulatory, or other professional advice. HR materials are general operational tools and are not a substitute for employment-law review, required notices, or jurisdiction-specific policies. LLC, entity-formation, licensing, contract, and other legal-information materials are educational and do not create an attorney-client relationship or determine what filing, tax, legal, or regulatory action is appropriate for a specific business. Customers remain responsible for final decisions, implementation, legal obligations, and obtaining qualified professional guidance when their facts, industry, jurisdiction, transaction, workforce, or circumstances require it.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">8. AI-Assisted Materials</h2><p>Some Business Bloom products include AI-assisted workflows, prompts, or decision-support materials. AI-generated output can contain errors, omissions, fabricated facts, or unsupported statements. Review output before use, verify material claims and source information, protect confidential or sensitive information, and keep appropriate human judgment and professional review in the process. Business Bloom materials do not authorize customers to submit information to third-party AI services when they lack permission to do so.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">9. No Guaranteed Business Results or Earnings</h2><p>Business Bloom does not guarantee specific revenue, earnings, sales, funding, customer-acquisition, conversion, productivity, automation, ranking, marketing, or other business outcomes. Examples, calculations, planning scenarios, benchmarks, and projections are illustrative unless expressly identified otherwise. Results depend on the customer’s circumstances, decisions, implementation, market conditions, costs, third-party platforms, and other factors outside Business Bloom’s control.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">10. Refunds, Cancellations, and Delivery Problems</h2><p>Unless a product page or checkout states a different policy, one-time digital-product purchases are treated as final once the purchased file, access instructions, or onboarding materials have been delivered or made available, except where a refund or other remedy is required by applicable law. Business Bloom will investigate duplicate charges, incorrect product delivery, inaccessible or corrupted delivery files, and other documented fulfillment errors and may replace access, correct delivery, or provide another appropriate resolution. One-time purchases do not require cancellation. If Business Bloom later offers a recurring subscription, its price, renewal interval, cancellation method, and any trial or promotional terms must be disclosed before purchase; cancellation stops future renewals but does not retroactively convert prior paid periods into refundable periods unless the applicable offer states otherwise or law requires it.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">11. Chargebacks and Payment Disputes</h2><p>If you believe a Business Bloom charge is incorrect, contact Support with the product name, purchase email, and order or Checkout Session reference when available so the transaction can be reviewed. Do not send full card numbers, passwords, or secret credentials. Nothing in these Terms limits rights that cannot lawfully be waived.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">12. Acceptable Use</h2><p>You may not use Business Bloom services to violate law, infringe intellectual-property rights, gain unauthorized access to systems or data, interfere with service operation, distribute malicious content, bypass access controls, or misuse customer, employee, contractor, prospect, or third-party data.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">13. Third-Party Services</h2><p>Business Bloom may rely on third-party providers for payment processing, hosting, communications, workflow automation, file formats, analytics, storage, or other service functions. A third-party service may be unavailable, changed, or governed by its own terms and privacy practices. Business Bloom does not control third-party platforms and cannot guarantee their uninterrupted availability.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">14. Customer Responsibility for Implementation</h2><p>You are responsible for deciding whether a Business Bloom resource is suitable for your business; protecting credentials and confidential information; maintaining appropriate backups; obtaining permissions and consents required for your data and communications; reviewing customer-facing claims before publication; and testing workflows, calculations, automations, or configurations before relying on them in production.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">15. Intellectual Property</h2><p>Business Bloom names, product names, written materials, graphics, software, workflows, templates, and other original content remain the property of Business Bloom LLC or applicable licensors except where expressly stated otherwise. Third-party names and materials remain the property of their respective owners.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">16. Service and Terms Changes</h2><p>Business Bloom may update products, resources, website features, delivery methods, or these Terms as the business evolves. Material updates to these Terms will be reflected by an updated revision date. Changes apply prospectively unless a different effective date is stated.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">17. Contact</h2><p>For purchase, refund, delivery, access, licensing, privacy, or Terms questions, use the Business Bloom Support page. Include enough information to identify the relevant transaction or product, but do not send passwords, full card numbers, API keys, or other secrets through support requests.</p><a href="/support" className="inline-flex mt-4 text-[#14B8A6] font-semibold hover:underline">Business Bloom Support</a></section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
