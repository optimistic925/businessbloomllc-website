export default function Footer() {
  return (
    <footer className="bg-[#0B0F1A] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div><a href="/" className="text-white font-bold text-lg">Business Bloom LLC</a><p className="mt-4 text-white/50 text-sm leading-relaxed">Practical business systems, editable tools, guided resources, and automation-ready workflows for entrepreneurs and small businesses.</p></div>
          <div><h4 className="text-white font-semibold text-sm mb-4">Explore</h4><ul className="space-y-2"><li><a href="/solutions" className="text-white/50 hover:text-[#14B8A6] text-sm">Solutions</a></li><li><a href="/marketplace" className="text-white/50 hover:text-[#14B8A6] text-sm">Marketplace</a></li><li><a href="/resources" className="text-white/50 hover:text-[#14B8A6] text-sm">Free Resources</a></li></ul></div>
          <div><h4 className="text-white font-semibold text-sm mb-4">Company</h4><ul className="space-y-2"><li><a href="/about" className="text-white/50 hover:text-[#14B8A6] text-sm">About</a></li><li><a href="/support" className="text-white/50 hover:text-[#14B8A6] text-sm">Support</a></li><li><a href="/get-started" className="text-white/50 hover:text-[#14B8A6] text-sm">Get Started</a></li></ul></div>
          <div><h4 className="text-white font-semibold text-sm mb-4">Legal</h4><ul className="space-y-2"><li><a href="/terms" className="text-white/50 hover:text-[#14B8A6] text-sm">Terms of Service</a></li><li><a href="/privacy" className="text-white/50 hover:text-[#14B8A6] text-sm">Privacy Policy</a></li></ul></div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"><p className="text-white/40 text-sm">&copy; 2026 Business Bloom LLC. All rights reserved.</p><div className="flex gap-6"><a href="/terms" className="text-white/40 hover:text-white/60 text-sm">Terms</a><a href="/privacy" className="text-white/40 hover:text-white/60 text-sm">Privacy</a><a href="/support" className="text-white/40 hover:text-white/60 text-sm">Support</a></div></div>
      </div>
    </footer>
  );
}
