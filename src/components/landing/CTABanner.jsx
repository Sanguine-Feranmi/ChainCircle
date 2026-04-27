import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-24 bg-[#0d0d14] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 via-transparent to-blue-900/20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          Ready to join the future<br />of finance?
        </h2>
        <p className="text-white/50 text-lg mb-8">Join 128,000+ users already managing their crypto with Chain Circle.</p>
        <Link to="/signup" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-xl hover:shadow-violet-500/30">
          Sign Up Free <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}
