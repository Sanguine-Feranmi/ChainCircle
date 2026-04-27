import { Wallet, BarChart2, BadgeCheck, Users, Hexagon } from "lucide-react";

// left-column cards: icon left, text left
// right-column cards: icon right, text right
const cards = [
  {
    icon: Wallet,
    title: "Universal Access",
    subtitle: "Any wallet, any chain, one circle",
    iconRight: false,
  },
  {
    icon: BarChart2,
    title: "Earn While You Save",
    subtitle: "Funds generate 4% APR while waiting",
    iconRight: true,
  },
  {
    icon: BadgeCheck,
    title: "Build Reputation",
    subtitle: "Complete circles, unlock better terms",
    iconRight: false,
  },
  {
    icon: Users,
    title: "Universal Accountability",
    subtitle: "Friends keep each other on track",
    iconRight: true,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-24 bg-[#0a0a0f] overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Bottom-left glow blob */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3" />
      {/* Bottom-right glow blob */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-600/25 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Top-left heading */}
        <div className="mb-14">
          <h2 className="text-4xl font-bold leading-tight">
            <span className="text-white">Feature</span>
            <br />
            <span className="text-violet-400">Highlights</span>
            <span className="text-white">.</span>
          </h2>
        </div>

        {/* 2×2 grid with centred glow logo */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Centre glow logo — overlaps all four cards at their meeting point */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden 
                          w-14 h-14 rounded-full
                          bg-[#0d0d14] border border-violet-500/40
                          md:flex items-center justify-center
                          shadow-[0_0_24px_6px_rgba(139,92,246,0.45)]">
            <Hexagon size={22} className="text-violet-400" fill="currentColor" />
          </div>

          {cards.map(({ icon: Icon, title, subtitle, iconRight }) => (
            <div
              key={title}
              className={`flex items-center gap-4 px-6 py-8
                          bg-white/5 border border-white/10 rounded-2xl
                          hover:border-violet-500/30 hover:bg-white/[0.07]
                          transition-all duration-300
                          
                          ${iconRight ? "md:flex-row-reverse md:text-right" : "flex-row text-left"}`}
            >
              {/* Icon circle */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-violet-500/10 border border-violet-500/20
                              flex items-center justify-center">
                <Icon size={20} className="text-violet-400" />
              </div>

              {/* Text */}
              <div>
                <p className="text-white font-bold text-base leading-snug mb-1">{title}</p>
                <p className="text-violet-400/70 text-sm leading-relaxed">{subtitle}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
