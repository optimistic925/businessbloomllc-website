export default function Footer() {
  return (
    <footer className="bg-[#0B0F1A] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <a href="/" className="text-white font-bold text-lg mb-4 block">Business Bloom LLC</a>
            <p className="text-white/50 text-sm leading-relaxed">An AI-powered business-building ecosystem that keeps entrepreneurs in control.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Ecosystem</h4>
            <ul className="space-y-2">
              <li><a href="/marketplace" className="text-white/50 hover:text-[#14B8A6] text-sm">Agent Marketplace</a></li>
              <li><a href="/prompt-packs" className="text-white/50 hover:text-[#14B8A6] text-sm">Prompts</a></li>
              <li><a href="/free-store" className="text-white/50 hover:text-[#14B8A6] text-sm">Free Store</a></li>
              <li><a href="https://app.businessbloomllc.com/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#14B8A6] text-sm">Business Bloom Engine</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="/shopify-app" className="text-white/50 hover:text-[#14B8A6] text-sm">Shopify App</a></li>
              <li><a href="/hosting" className="text-white/50 hover:text-[#14B8A6] text-sm">Hosting</a></li>
              <li><a href="/domains" className="text-white/50 hover:text-[#14B8A6] text-sm">Domains</a></li>
              <li><a href="/dfy-services" className="text-white/50 hover:text-[#14B8A6] text-sm">Done-for-You Services</a></li>
              <li><a href="/resources" className="text-white/50 hover:text-[#14B8A6] text-sm">Resources</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="/get-started" className="text-white/50 hover:text-[#14B8A6] text-sm">Get Started</a></li>
              <li><a href="/get-started?interest=business-bloom-capital" className="text-white/50 hover:text-[#14B8A6] text-sm">Funding & Credit Support</a></li>
              <li><a href="/terms" className="text-white/50 hover:text-[#14B8A6] text-sm">Terms of Service</a></li>
              <li><a href="/privacy" className="text-white/50 hover:text-[#14B8A6] text-sm">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">&copy; 2026 Business Bloom LLC. All rights reserved.</p>
          <div className="flex gap-6"><a href="/terms" className="text-white/40 text-sm">Terms</a><a href="/privacy" className="text-white/40 text-sm">Privacy</a></div>
        </div>
      </div>
    </footer>
  );
}
