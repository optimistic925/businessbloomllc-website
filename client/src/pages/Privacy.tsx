import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <NavBar />
      <main className="pt-32 pb-20">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8"><div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center"><Shield className="h-6 w-6 text-[#7C3AED]" /></div><h1 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "var(--font-display)" }}>Privacy Policy</h1></div>
          <p className="text-white/40 text-sm mb-12">Last updated: August 2026</p>

          <div className="space-y-10 text-white/70 leading-relaxed">
            <section><h2 className="text-xl font-bold text-white mb-4">1. Scope</h2><p>This Privacy Policy describes how Business Bloom LLC handles information associated with the Business Bloom website, Marketplace, Free Resources, support interactions, digital-product delivery, onboarding, and other Business Bloom services that reference this Policy.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">2. Information You Provide</h2><p>Depending on how you use Business Bloom, you may provide information such as your name, email address, phone number, business information, purchase and order details, support-request details, form responses, onboarding information, and communications you choose to send to Business Bloom. Do not submit passwords, secret keys, full payment-card numbers, or sensitive third-party information unless a Business Bloom process specifically requires it and provides an appropriate secure method.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">3. Payment Information</h2><p>Marketplace payments are processed through Stripe. Business Bloom receives transaction information needed to identify purchases, confirm payment status, provide fulfillment, reconcile orders, and support customers, but ordinary Business Bloom support channels are not intended to collect full payment-card numbers. Stripe processes payment information under its own privacy and security practices.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">4. Website and Technical Information</h2><p>Business Bloom and service providers supporting the website may process technical information needed to operate, secure, diagnose, and improve the service, such as IP address, browser or device information, request logs, page interactions, referral information, timestamps, and similar operational data. Analytics or measurement technologies may be used when configured on the site; their operation depends on the production configuration in use at the time.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">5. How Information Is Used</h2><p>Business Bloom may use information to provide and operate services; process and confirm purchases; deliver digital products, access instructions, or onboarding information; provide requested Free Resources; answer support requests; maintain order and license records; detect misuse and protect systems; troubleshoot failures; improve service quality; comply with applicable business or legal obligations; and send transactional communications appropriate to the customer relationship. Promotional marketing communications are separate from required transactional delivery and should honor the communication preferences and unsubscribe mechanisms provided with those messages.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">6. Service Providers and Processing Categories</h2><p>Business Bloom may use third-party service providers for payment processing, website hosting, communications, workflow automation, analytics, storage, customer support, and related technical functions. Providers receive or process only the information reasonably needed for their role, subject to the provider relationship and configuration. Business Bloom does not sell payment-card data and does not require customers to expose passwords, secret keys, or full card data through ordinary support requests.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">7. Digital Product Delivery</h2><p>Purchase and contact information may be used to send transaction confirmation and the delivery, access, or onboarding instructions relevant to the product purchased. Customer-facing delivery paths are intended to exclude internal production folders, engineering materials, private credentials, unrelated customer data, and Internal-Do-Not-Distribute assets. Order and delivery events may be logged as needed to prevent duplicate fulfillment, recover partial failures, and respond to delivery questions.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">8. AI and Sensitive Information</h2><p>Some Business Bloom products include AI-assisted workflows or prompts. Do not submit confidential, regulated, personal, employee, customer, financial, health, or other sensitive information to an AI or third-party tool unless you are authorized to do so and appropriate safeguards are in place. AI output should be reviewed before use. Customers are responsible for the privacy, permission, retention, and professional-review requirements that apply to information they place into their own AI tools or third-party systems.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">9. Security</h2><p>Business Bloom uses technical and organizational safeguards intended to reduce unauthorized access, disclosure, misuse, or loss of information. Safeguards may include access controls, server-side processing of trusted commercial configuration, restricted internal source records, and separation of customer-facing delivery from internal production materials. No online system can be guaranteed to be completely secure, so customers should also protect their accounts, devices, credentials, and copies of purchased files.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">10. Retention, Deletion, and Minimization</h2><p>Business Bloom retains information only for as long as reasonably needed for the purpose for which it was collected and for legitimate operational needs such as fulfillment, transaction and accounting records, license administration, support history, security and fraud prevention, dispute handling, and applicable legal obligations. Information that is no longer reasonably needed should be deleted, de-identified, or maintained only where a continuing recordkeeping or legal need applies. Different systems and categories of information may therefore have different retention periods.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">11. Privacy Requests</h2><p>You may contact Business Bloom Support to ask about personal information associated with your Business Bloom relationship or to request access, correction, deletion, restriction, or another privacy action. Business Bloom may need to verify identity and the relevant account or transaction before acting. A request may be limited where Business Bloom must retain information for a transaction, security, dispute, accounting, legal, or other legitimate requirement. Where applicable law provides additional rights, Business Bloom will address qualifying requests in accordance with those requirements.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">12. Communications</h2><p>Transactional messages may be sent when needed to confirm a purchase, deliver a product or Free Resource, provide access or onboarding instructions, respond to support, or communicate an important service matter. Marketing messages, when used, should provide an appropriate way to opt out of future promotional email. Opting out of promotional email does not prevent necessary transactional or service communications relating to a purchase or active request.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">13. Children</h2><p>Business Bloom products and services are intended for business users and are not designed or directed as services for children. If Business Bloom becomes aware that personal information was submitted inappropriately by or about a child, it may take steps appropriate to the circumstances.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">14. International and Regional Use</h2><p>Business Bloom operates online and customers may access services from different locations. Privacy, employment, marketing, recordkeeping, and other requirements can vary by jurisdiction. This Policy describes Business Bloom’s general practices; additional rights or obligations may apply based on location and the service involved.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">15. Changes</h2><p>This Policy may be updated as Business Bloom products, service providers, and data practices evolve. Material updates will be reflected by an updated revision date and apply prospectively unless a different effective date is stated.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">16. Contact</h2><p>For privacy questions or requests, use Business Bloom Support and describe the request without including passwords, full card numbers, API keys, or other secrets.</p><a href="/support" className="inline-flex mt-4 text-[#14B8A6] font-semibold hover:underline">Business Bloom Support</a></section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
