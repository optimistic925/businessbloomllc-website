import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";

const sections = [
  ["1. Introduction", "Business Bloom LLC operates businessbloomllc.com and app.businessbloomllc.com. This policy describes how information may be collected, used, and protected when you use these services."],
  ["2. Information We Collect", "We may collect contact and business information you submit, transaction information handled by payment providers, and technical usage data such as browser type, IP address, and pages visited."],
  ["3. How We Use Information", "Information may be used to provide requested services, process transactions, communicate about requests or accounts, improve the services, send communications where permitted, and comply with legal obligations."],
  ["4. Service Providers", "Information may be shared with providers that support payments, hosting, communications, analytics, and business operations, or when disclosure is required by law. Payment card details are handled by Stripe rather than stored in full by Business Bloom."],
  ["5. Data Security", "Reasonable technical and organizational safeguards are used, but no Internet transmission or electronic storage method can be guaranteed completely secure."],
  ["6. Your Choices", "You may request access, correction, or deletion of personal information where applicable and may opt out of marketing communications."],
  ["7. Children's Privacy", "The services are not directed to children under 13, and Business Bloom does not knowingly collect personal information from children under 13."],
  ["8. Policy Changes", "This policy may be updated as services and legal requirements change. Updates will be posted on this page with a revised date."],
  ["9. Contact", "Questions or privacy requests may be submitted through the Get Started page while official privacy contact details are being finalized."],
];
export default function Privacy(){return <div className="min-h-screen bg-[#0B0F1A] text-white"><NavBar/><main className="max-w-4xl mx-auto px-4 pt-32 pb-20"><div className="flex gap-3 items-center mb-6"><Shield className="h-8 w-8 text-[#7C3AED]"/><h1 className="text-4xl font-black">Privacy Policy</h1></div><p className="text-white/40 text-sm mb-12">Last updated: July 2026</p><div className="space-y-9">{sections.map(([title,text])=><section key={title}><h2 className="text-xl font-bold mb-3">{title}</h2><p className="text-white/70 leading-relaxed">{text}</p>{title==="9. Contact"&&<a href="/get-started?interest=privacy-request" className="inline-block mt-3 text-[#14B8A6]">Submit a privacy request</a>}</section>)}</div></main><Footer/></div>}
