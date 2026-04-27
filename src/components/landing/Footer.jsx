import { ArrowRight } from "lucide-react";

const navLinks = ["ABOUT", "DOCS", "GITHUB", "X (Twitter)"];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0a0a0f] py-12 md:py-16 px-8 md:px-16">

      {/* ── ROW 1 — Newsletter bar ── */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">

        {/* Left: text */}
        <div className="flex-shrink-0 text-sm text-white/80 leading-relaxed">
          <p>Stay in the loop with</p>
          <p>Chaincircle news and updates!</p>
        </div>

        {/* Center: input */}
        <input
          type="email"
          placeholder="Enter your email address"
          className="flex-1 bg-white/5 border border-white/10 rounded-xl
                     px-4 py-3 text-white text-sm placeholder:text-white/30
                     outline-none focus:border-violet-500/50 transition-colors
                     w-full md:w-auto"
        />

        {/* Right: submit button */}
        <button
          className="w-full md:w-12 md:h-12 h-11 flex items-center justify-center
                     bg-violet-600 hover:opacity-90 rounded-lg transition-opacity
                     flex-shrink-0"
        >
          <ArrowRight size={20} className="text-white" />
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mt-8" />

      {/* ── ROW 2 — Quote + nav links ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-10">

        {/* Left: display quote (~75%) */}
        <div className="md:w-3/4">
          <p className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
            <span className="text-white">&ldquo;Built for </span>
            <span className="text-violet-400">Push Chain</span>
          </p>
          <p className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
            Project G.U.D&rdquo;
          </p>
        </div>

        {/* Right: nav links (~25%) */}
        <nav className="flex flex-row flex-wrap md:flex-col md:items-end gap-3 md:gap-2">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-white/50 hover:text-white text-sm font-medium
                         uppercase tracking-wider transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>

    </footer>
  );
}
