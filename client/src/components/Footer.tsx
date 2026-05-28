export default function Footer() {
  return (
    <footer className="bg-[#0B0F1A] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <a href="/" className="flex items-center gap-2 text-white font-bold text-lg mb-4">
              Business Bloom LLC
            </a>
            <p className="text-white/50 text-sm leading-relaxed">
              Helping entrepreneurs start, grow, and automate their business using simple AI-powered systems.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li><a href="/solutions#business-launch" className="text-white/50 hover:text-[#14B8A6] text-sm transition-colors">Business Launch</a></li>
              <li><a href="/solutions#client-acquisition" className="text-white/50 hover:text-[#14B8A6] text-sm transition-colors">Client Acquisition</a></li>
              <li><a href="/solutions#automation" className="text-white/50 hover:text-[#14B8A6] text-sm transition-colors">Automation</a></li>
              <li><a href="/prompt-packs" className="text-white/50 hover:text-[#14B8A6] text-sm transition-colors">Prompt Packs</a></li>
              <li><a href="/shopify-app" className="text-white/50 hover:text-[#14B8A6] text-sm transition-colors">Shopify App</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="/dfy-services" className="text-white/50 hover:text-[#14B8A6] text-sm transition-colors">DFY Services</a></li>
              <li><a href="/hosting" className="text-white/50 hover:text-[#14B8A6] text-sm transition-colors">Web Hosting</a></li>
              <li><a href="/domains" className="text-white/50 hover:text-[#14B8A6] text-sm transition-colors">Domain Registration</a></li>
              <li><a href="/resources" className="text-white/50 hover:text-[#14B8A6] text-sm transition-colors">Resources</a></li>
              <li><a href="/get-started" className="text-white/50 hover:text-[#14B8A6] text-sm transition-colors">Get Started</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-white/50 hover:text-[#14B8A6] text-sm transition-colors">About</a></li>
              <li><a href="/contact" className="text-white/50 hover:text-[#14B8A6] text-sm transition-colors">Contact</a></li>
              <li><a href="/terms" className="text-white/50 hover:text-[#14B8A6] text-sm transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" className="text-white/50 hover:text-[#14B8A6] text-sm transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; 2026 Business Bloom LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/terms" className="text-white/40 hover:text-white/60 text-sm transition-colors">Terms</a>
            <a href="/privacy" className="text-white/40 hover:text-white/60 text-sm transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
