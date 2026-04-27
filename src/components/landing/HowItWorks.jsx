import { Users, Link, HandCoins } from "lucide-react";

const cards = [
  {
    icon: Users,
    title: "Create or Join a Circle",
    subtitle: "Set your savings goal with friends",
  },
  {
    icon: Link,
    title: "Contribute from Any Chain",
    subtitle: "Pay with ETH, SOL, USDC – whatever you have",
  },
  {
    icon: HandCoins,
    title: "Get Your Payout + Interest",
    subtitle: "Receive funds when it's your turn, plus earned yield",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 bg-[#0a0a0f] overflow-hidden">
      {/* Decorative purple blob — sits between card 2 and 3 */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-violet-600/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Left-aligned heading */}
        <div className="mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-white">How it</span>
            <br />
            <span className="text-violet-400">Works</span>
            <span className="text-white">.</span>
          </h2>
        </div>

        {/* Cards — bottom-aligned so progressive heights grow upward */}
        <div className="flex flex-col md:flex-row md:items-end gap-6">
          {cards.map(({ icon: Icon, title, subtitle }, i) => {
            const heights    = ["h-[200px]",  "h-[250px]",  "h-[300px]"];
            const titleSizes = ["text-xl",  "text-2xl",    "text-2xl"];
            const subSizes   = ["text-base",    "text-base",    "text-base"];
            const iconSizes  = [18,            22,            26];
            const pxSizes    = ["px-5",        "px-6",        "px-8"];
            return (
              <div key={title} className={`relative flex-1 overflow-visible ${heights[i]}`}>
                {/* Icon circle — -top-8 = exactly half of h-16 above card edge */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10
                                w-16 h-16 rounded-full
                                bg-[#0d0d14] border border-white/10
                                flex items-center justify-center
                                shadow-lg shadow-violet-500/10">
                  <Icon size={iconSizes[i]} className="text-violet-400" />
                </div>

                {/* Card body — flex column, content vertically + horizontally centred */}
                <div className={`h-full bg-white/5 border border-white/10 rounded-2xl
                                 flex flex-col items-center justify-center
                                 text-center ${pxSizes[i]} pb-8 pt-10 gap-3`}>
                  <h3 className={`text-white font-bold leading-snug ${titleSizes[i]}`}>
                    {title}
                  </h3>
                  <p className={`text-violet-400/80 leading-relaxed ${subSizes[i]}`}>
                    {subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
