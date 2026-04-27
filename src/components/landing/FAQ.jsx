import { useState } from "react";
import { Search, Plus, Minus } from "lucide-react";

const faqData = {
  General: [
    {
      q: "What is ChainCircle?",
      a: "ChainCircle is a decentralized savings platform that enables people to create or join group savings circles (also known as ROSCAs - Rotating Savings and Credit Associations). Members pool money together regularly, and each member receives the full pot on a rotating basis. Built on Push Chain blockchain, ChainCircle automates contributions, ensures transparency, and eliminates the need for traditional intermediaries.",
    },
    {
      q: "How does ChainCircle work?",
      a: "You create or join a Circle, agree on a contribution amount and frequency, then each member contributes on schedule. Smart contracts hold the pooled funds and automatically disburse the full pot to the next member in rotation. The cycle continues until every member has received their payout.",
    },
    {
      q: "What are the costs and fees to use ChainCircle?",
      a: "ChainCircle charges a small protocol fee of 0.5% on each payout. You also pay standard network gas fees for on-chain transactions. There are no subscription fees, no sign-up costs, and no hidden charges.",
    },
    {
      q: "How can I setup my account on ChainCircle?",
      a: "Click 'Get Started', connect your Web3 wallet (MetaMask, Phantom, or any WalletConnect-compatible wallet), complete a brief profile setup, and you're ready to create or join a Circle — no KYC required to get started.",
    },
    {
      q: "Is ChainCircle right for a team of friends?",
      a: "Absolutely. ChainCircle is purpose-built for trusted groups — friends, family, colleagues, or communities. The social accountability layer means members who know each other tend to have near-perfect contribution rates, making it ideal for informal savings groups.",
    },
  ],
  Build: [
    {
      q: "Does ChainCircle have a public API?",
      a: "Yes. ChainCircle exposes a REST API and a set of smart contract ABIs that developers can use to build on top of the protocol. API keys are available from your developer dashboard.",
    },
    {
      q: "Which blockchains does ChainCircle support for builders?",
      a: "The core protocol runs on Push Chain. We also support EVM-compatible chains including Ethereum, Polygon, and Base, with Solana support in active development.",
    },
    {
      q: "Can I deploy a custom Circle contract?",
      a: "Yes. Advanced users and developers can fork our open-source Circle contract, customise contribution rules, payout order logic, and penalty conditions, then deploy to any supported network.",
    },
    {
      q: "Is there a developer sandbox or testnet environment?",
      a: "Yes. A full testnet environment is available on Sepolia and Mumbai. Faucet tokens are provided automatically when you connect a wallet in developer mode.",
    },
    {
      q: "Where can I find the ChainCircle SDK documentation?",
      a: "Full SDK docs, code examples, and integration guides are available at docs.chaincircle.io. A Postman collection for the REST API is also available in the developer portal.",
    },
  ],
  Promote: [
    {
      q: "Does ChainCircle have a referral programme?",
      a: "Yes. Share your unique referral link and earn 0.1% of the protocol fee from every payout made in Circles your referrals create or join, for the lifetime of those Circles.",
    },
    {
      q: "Can I embed a Circle invite on my website?",
      a: "Yes. Generate a shareable invite widget from your Circle dashboard and embed it on any website or social profile with a single line of HTML.",
    },
    {
      q: "Are there affiliate or partnership tiers?",
      a: "ChainCircle offers three partnership tiers — Community, Growth, and Enterprise — each with increasing revenue share, co-marketing support, and dedicated account management. Apply via the Partners page.",
    },
    {
      q: "How do I promote a Circle to attract new members?",
      a: "Use the built-in Circle discovery page to list your Circle publicly, set a clear savings goal, and share the invite link across social channels. Verified Circles with complete profiles attract members faster.",
    },
  ],
  Manage: [
    {
      q: "What happens if a member misses a contribution?",
      a: "The smart contract enforces a grace period (configurable by the Circle creator). After the grace period, the member is flagged, their payout position may be moved to the end of the rotation, and a penalty fee is deducted from their future payout.",
    },
    {
      q: "Can I remove a member from a Circle?",
      a: "Circle admins can propose a member removal. A majority vote from active members is required to execute the removal. The removed member receives a pro-rata refund of their contributions minus any applicable penalties.",
    },
    {
      q: "Can the contribution amount or schedule be changed mid-circle?",
      a: "Core parameters are locked by the smart contract once a Circle starts to protect all members. Minor schedule adjustments (e.g. a one-time delay) require unanimous member approval via an on-chain vote.",
    },
    {
      q: "How do I track my Circle's health and contribution history?",
      a: "The Circle dashboard shows real-time contribution status, payout history, member reputation scores, and an on-chain audit trail. You can export a full CSV report at any time.",
    },
    {
      q: "Can I pause or dissolve a Circle early?",
      a: "Early dissolution requires a supermajority vote (>66% of members). If approved, the smart contract refunds each member their remaining contributions proportionally within one settlement cycle.",
    },
  ],
  Integrations: [
    {
      q: "Which wallets are supported?",
      a: "ChainCircle supports MetaMask, Coinbase Wallet, Phantom, Rainbow, and any WalletConnect v2-compatible wallet. Hardware wallets (Ledger, Trezor) are supported via MetaMask.",
    },
    {
      q: "Can I contribute using a centralised exchange account?",
      a: "Not directly. You need a self-custodial wallet to interact with ChainCircle smart contracts. You can withdraw funds from a CEX to your wallet and then contribute.",
    },
    {
      q: "Does ChainCircle integrate with accounting tools?",
      a: "Yes. ChainCircle connects with Koinly and CoinTracker for tax reporting. A QuickBooks integration for Circle treasuries is on the roadmap for Q3.",
    },
    {
      q: "Is there a mobile app?",
      a: "A progressive web app (PWA) is available now — install it from your mobile browser. Native iOS and Android apps are in beta and available via TestFlight and the Play Store early access programme.",
    },
  ],
  Legal: [
    {
      q: "Is ChainCircle regulated?",
      a: "ChainCircle is a non-custodial protocol — it does not hold user funds. Smart contracts hold and disburse funds autonomously. Users are responsible for complying with the financial regulations in their own jurisdiction.",
    },
    {
      q: "Is my funds safe on ChainCircle?",
      a: "Circle funds are held entirely in audited smart contracts, not by ChainCircle Inc. Contracts have been audited by Certik and Halborn. However, as with all DeFi protocols, smart contract risk exists and you should only contribute amounts you can afford to lose.",
    },
    {
      q: "What data does ChainCircle collect?",
      a: "ChainCircle collects only your wallet address and optional profile information you choose to provide. No KYC documents are stored. On-chain activity is public by nature of the blockchain. See our Privacy Policy for full details.",
    },
    {
      q: "Are ROSCAs legal in my country?",
      a: "Informal savings circles are legal in most jurisdictions. However, regulations vary. ChainCircle does not provide legal advice — consult a local legal professional if you are unsure about the rules in your country.",
    },
    {
      q: "What are the terms of service?",
      a: "By using ChainCircle you agree to our Terms of Service, which prohibit use for money laundering, sanctions evasion, or any illegal activity. Full terms are available at chaincircle.io/terms.",
    },
  ],
};

const categories = Object.keys(faqData);

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  // Reset open item when category changes
  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setOpenIndex(null);
  };

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  // Filter questions by search within active category
  const questions = faqData[activeCategory].filter(
    ({ q, a }) =>
      search === "" ||
      q.toLowerCase().includes(search.toLowerCase()) ||
      a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="faq" className="relative py-24 bg-[#0a0a0f] overflow-hidden">

      {/* Decorative background ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[600px] h-[600px] rounded-full border border-white/5" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-white/[0.03]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Top bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>

          {/* Search */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 w-full sm:w-64">
            <Search size={14} className="text-white/40 flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setOpenIndex(null); }}
              placeholder="Search"
              className="bg-transparent text-white/70 text-sm outline-none w-full placeholder:text-white/30"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-8" />

        {/* ── Two-column layout ── */}
        <div className="flex flex-col md:flex-row gap-10">

          {/* LEFT — category tabs */}
          <nav className="flex flex-row md:flex-col gap-1 md:gap-0 overflow-x-auto md:overflow-visible
                          md:w-1/4 flex-shrink-0 pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`whitespace-nowrap md:whitespace-normal text-left px-2 py-2 md:py-2.5 text-sm
                            transition-colors rounded-lg md:rounded-none
                            ${activeCategory === cat
                              ? "text-violet-400 font-semibold"
                              : "text-white/50 font-normal hover:text-white"
                            }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* RIGHT — accordion */}
          <div className="flex-1 min-w-0">

            {/* Category heading */}
            <h3 className="text-white font-semibold text-lg mb-3">
              {activeCategory} Questions
            </h3>
            <div className="border-t border-white/10 mb-1" />

            {/* Accordion items */}
            {questions.length === 0 ? (
              <p className="text-white/30 text-sm py-8 text-center">No results found.</p>
            ) : (
              questions.map(({ q, a }, i) => (
                <div key={i}>
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between gap-4 py-4 text-left group"
                  >
                    <span className={`text-sm md:text-base transition-colors ${
                      openIndex === i ? "text-white font-medium" : "text-white/80 group-hover:text-white"
                    }`}>
                      {q}
                    </span>

                    {/* Circle toggle icon */}
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white/5 border border-white/10
                                     flex items-center justify-center transition-colors
                                     group-hover:border-violet-500/40">
                      {openIndex === i
                        ? <Minus size={13} className="text-violet-400" />
                        : <Plus  size={13} className="text-white/50 group-hover:text-violet-400" />
                      }
                    </span>
                  </button>

                  {/* Answer */}
                  {openIndex === i && (
                    <p className="text-white/40 text-sm leading-relaxed pb-4 pr-10">{a}</p>
                  )}

                  <div className="border-t border-white/10" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
