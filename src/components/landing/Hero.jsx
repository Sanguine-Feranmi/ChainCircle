import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";

function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg">
      <defs>
        <linearGradient id="gPurple" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="gBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="gGreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
        <linearGradient id="gOrange" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        <linearGradient id="gCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1b2e" />
          <stop offset="100%" stopColor="#13131a" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="softglow">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── Background glow blobs ── */}
      <ellipse cx="240" cy="210" rx="180" ry="160" fill="#8b5cf6" opacity="0.06" />
      <ellipse cx="340" cy="140" rx="100" ry="80" fill="#3b82f6" opacity="0.07" />

      {/* ══════════════════════════════════
           CENTRE HUB — Chain Circle pool
      ══════════════════════════════════ */}
      {/* Outer pulse ring */}
      <circle cx="240" cy="200" r="72" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="6 4" opacity="0.35">
        <animateTransform attributeName="transform" type="rotate" from="0 240 200" to="360 240 200" dur="18s" repeatCount="indefinite" />
      </circle>
      {/* Mid ring */}
      <circle cx="240" cy="200" r="54" stroke="#6366f1" strokeWidth="0.8" opacity="0.25" />
      {/* Hub card */}
      <rect x="196" y="156" width="88" height="88" rx="20" fill="url(#gCard)" stroke="#8b5cf6" strokeWidth="1.5" filter="url(#softglow)" />
      {/* Coin stack icon inside hub */}
      <circle cx="240" cy="188" r="14" fill="url(#gPurple)" opacity="0.9" />
      <ellipse cx="240" cy="188" rx="14" ry="5" fill="#a78bfa" opacity="0.5" />
      <circle cx="240" cy="183" r="14" fill="url(#gPurple)" />
      <text x="240" y="187" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="11" fontWeight="700">CC</text>
      {/* Pool label */}
      <rect x="214" y="208" width="52" height="18" rx="9" fill="#8b5cf6" opacity="0.2" />
      <text x="240" y="220" textAnchor="middle" dominantBaseline="middle" fill="#c4b5fd" fontSize="8" fontWeight="600">CIRCLE POOL</text>
      {/* Balance */}
      <text x="240" y="234" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">$41,652</text>

      {/* ══════════════════════════════════
           MEMBER NODES (4 people saving)
      ══════════════════════════════════ */}

      {/* ── Member 1 — top (ETH) ── */}
      <line x1="240" y1="156" x2="240" y2="98" stroke="url(#gPurple)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6">
        <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1.5s" repeatCount="indefinite" />
      </line>
      <rect x="204" y="56" width="72" height="44" rx="12" fill="url(#gCard)" stroke="#8b5cf6" strokeWidth="1" />
      <circle cx="222" cy="78" r="10" fill="url(#gPurple)" />
      <text x="222" y="82" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="7" fontWeight="700">JL</text>
      <text x="238" y="73" fill="white" fontSize="7" fontWeight="600">Jordan</text>
      <text x="238" y="83" fill="#a78bfa" fontSize="6">+0.5 ETH</text>

      {/* ── Member 2 — right (BTC) ── */}
      <line x1="284" y1="182" x2="340" y2="155" stroke="url(#gOrange)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6">
        <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1.8s" repeatCount="indefinite" />
      </line>
      <rect x="338" y="132" width="76" height="44" rx="12" fill="url(#gCard)" stroke="#f59e0b" strokeWidth="1" />
      <circle cx="357" cy="154" r="10" fill="url(#gOrange)" />
      <text x="357" y="158" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="7" fontWeight="700">SR</text>
      <text x="373" y="149" fill="white" fontSize="7" fontWeight="600">Sam</text>
      <text x="373" y="159" fill="#fcd34d" fontSize="6">+0.02 BTC</text>

      {/* ── Member 3 — bottom-right (MATIC) ── */}
      <line x1="272" y1="238" x2="318" y2="278" stroke="url(#gBlue)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6">
        <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="2s" repeatCount="indefinite" />
      </line>
      <rect x="308" y="272" width="80" height="44" rx="12" fill="url(#gCard)" stroke="#3b82f6" strokeWidth="1" />
      <circle cx="328" cy="294" r="10" fill="url(#gBlue)" />
      <text x="328" y="298" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="7" fontWeight="700">TK</text>
      <text x="344" y="289" fill="white" fontSize="7" fontWeight="600">Taylor</text>
      <text x="344" y="299" fill="#93c5fd" fontSize="6">+120 MATIC</text>

      {/* ── Member 4 — left (SOL) ── */}
      <line x1="196" y1="210" x2="138" y2="230" stroke="url(#gGreen)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6">
        <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1.6s" repeatCount="indefinite" />
      </line>
      <rect x="58" y="208" width="80" height="44" rx="12" fill="url(#gCard)" stroke="#10b981" strokeWidth="1" />
      <circle cx="78" cy="230" r="10" fill="url(#gGreen)" />
      <text x="78" y="234" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="7" fontWeight="700">MB</text>
      <text x="94" y="225" fill="white" fontSize="7" fontWeight="600">Morgan</text>
      <text x="94" y="235" fill="#6ee7b7" fontSize="6">+15 SOL</text>

      {/* ══════════════════════════════════
           CHAIN BADGES (bottom row)
      ══════════════════════════════════ */}
      {[
        { x: 80,  label: "ETH",   color: "#8b5cf6", bg: "#2e1f5e" },
        { x: 160, label: "BTC",   color: "#f59e0b", bg: "#3b2500" },
        { x: 240, label: "SOL",   color: "#10b981", bg: "#052e1c" },
        { x: 320, label: "BASE",  color: "#3b82f6", bg: "#0c1f3f" },
        { x: 400, label: "MATIC", color: "#a855f7", bg: "#2a0f4a" },
      ].map(({ x, label, color, bg }) => (
        <g key={label}>
          <rect x={x - 24} y="368" width="48" height="22" rx="11" fill={bg} stroke={color} strokeWidth="0.8" opacity="0.9" />
          <text x={x} y="382" textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="7" fontWeight="700">{label}</text>
        </g>
      ))}
      <text x="240" y="358" textAnchor="middle" fill="white" opacity="0.3" fontSize="7">SUPPORTED CHAINS</text>

      {/* ══════════════════════════════════
           FLOATING STAT PILLS
      ══════════════════════════════════ */}
      {/* Top-left: Members */}
      <rect x="18" y="60" width="90" height="34" rx="10" fill="url(#gCard)" stroke="#ffffff18" strokeWidth="1" />
      <circle cx="34" cy="77" r="7" fill="url(#gGreen)" />
      <text x="34" y="81" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="6" fontWeight="700">4</text>
      <text x="46" y="72" fill="white" fontSize="7" fontWeight="600">Members</text>
      <text x="46" y="82" fill="#6ee7b7" fontSize="6">Active circle</text>

      {/* Top-right: Payout */}
      <rect x="368" y="56" width="96" height="34" rx="10" fill="url(#gCard)" stroke="#ffffff18" strokeWidth="1" />
      <circle cx="384" cy="73" r="7" fill="url(#gOrange)" />
      <text x="384" y="77" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="6" fontWeight="700">$</text>
      <text x="396" y="68" fill="white" fontSize="7" fontWeight="600">Next Payout</text>
      <text x="396" y="78" fill="#fcd34d" fontSize="6">in 3 days</text>

      {/* Bottom-left: Gas saved */}
      <rect x="14" y="300" width="96" height="34" rx="10" fill="url(#gCard)" stroke="#ffffff18" strokeWidth="1" />
      <circle cx="30" cy="317" r="7" fill="url(#gBlue)" />
      <text x="30" y="321" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="5" fontWeight="700">⚡</text>
      <text x="42" y="312" fill="white" fontSize="7" fontWeight="600">Gas Saved</text>
      <text x="42" y="322" fill="#93c5fd" fontSize="6">$214 this month</text>
    </svg>
  );
}

export default function Hero() {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-3xl" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-16">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-1.5 text-violet-300 text-sm mb-6">
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            Next-Gen Blockchain Platform
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Save Together <br /> Across   
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">  
              Any
            </span><br /> 
            Chain
          </h1>
          <p className="text-white/60 text-lg lg:text-xl max-w-xl mb-10 mx-auto lg:mx-0">
            Join savings circles with friends from Ethereum, Solana, Base, and  beyond. No bridging. No friction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/signup" className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-violet-500/25">
              Start Saving <ArrowRight size={18} />
            </Link>
            <button onClick={scrollToFeatures} className="flex items-center justify-center gap-2 text-white/80 hover:text-white border border-white/20 hover:border-white/40 px-8 py-4 rounded-xl font-semibold transition-all">
              How it works <ChevronDown size={18} />
            </button>
          </div>
        </div>

        {/* Hero illustration — right column */}
        <div className="flex-1 flex items-center justify-center">
          <HeroIllustration />
        </div>
      </div>

      {/* 3D-style blockchain graphic — full-section background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
        <div className="relative w-[600px] h-[600px]">
          {/* Central node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-violet-500 to-blue-500 rounded-2xl rotate-45 shadow-2xl shadow-violet-500/50 animate-[spin_20s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur rounded-xl rotate-12" />
          {/* Orbiting nodes */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x = 50 + 38 * Math.cos(rad);
            const y = 50 + 38 * Math.sin(rad);
            return (
              <div key={i} className="absolute w-8 h-8 bg-gradient-to-br from-violet-600/80 to-blue-600/80 rounded-lg border border-white/20 backdrop-blur-sm"
                style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }} />
            );
          })}
          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {[0, 60, 120, 180, 240, 300].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const x = 50 + 38 * Math.cos(rad);
              const y = 50 + 38 * Math.sin(rad);
              return <line key={i} x1="50" y1="50" x2={x} y2={y} stroke="url(#grad)" strokeWidth="0.5" />;
            })}
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          {/* Outer rings */}
          <div className="absolute inset-0 rounded-full border border-violet-500/20 animate-[spin_30s_linear_infinite_reverse]" />
          <div className="absolute inset-4 rounded-full border border-blue-500/10 animate-[spin_20s_linear_infinite]" />
        </div>
      </div>

      {/* Scroll indicator */}
      <button onClick={scrollToFeatures} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors animate-bounce">
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
