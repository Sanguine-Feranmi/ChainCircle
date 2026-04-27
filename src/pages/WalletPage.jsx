import { useState } from "react";
import { Wallet, Plus, Copy, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";
import { mockWallets } from "../data/mockData";

const chainColors = {
  Ethereum: "from-blue-600 to-indigo-600",
  Bitcoin:  "from-orange-500 to-yellow-500",
  Polygon:  "from-violet-600 to-purple-600",
};

const assetRows = [
  { name: "Ethereum",  symbol: "ETH",   balance: "4.821",    usd: "$18,432", change: "+5.2%",  up: true  },
  { name: "Bitcoin",   symbol: "BTC",   balance: "0.342",    usd: "$22,104", change: "+2.8%",  up: true  },
  { name: "Polygon",   symbol: "MATIC", balance: "1,240",    usd: "$1,116",  change: "-1.4%",  up: false },
  { name: "USD Coin",  symbol: "USDC",  balance: "500",      usd: "$500",    change: "0.0%",   up: true  },
];

export default function WalletPage() {
  const [copied, setCopied] = useState(null);

  const copy = (addr, id) => {
    navigator.clipboard.writeText(addr);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Wallet</h2>
          <p className="text-white/40 text-sm mt-1">All your connected wallets and asset balances.</p>
        </div>
        <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2.5 rounded-xl transition-all">
          <Plus size={15} /> Add Wallet
        </button>
      </div>

      {/* Total balance banner */}
      <div className="bg-gradient-to-r from-violet-600/20 to-blue-600/20 border border-violet-500/20 rounded-2xl p-6">
        <p className="text-white/50 text-sm mb-1">Total Portfolio Value</p>
        <p className="text-4xl font-bold text-white">$41,652</p>
        <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
          <TrendingUp size={14} /> +$4,820 (13.1%) this month
        </div>
      </div>

      {/* Wallet cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockWallets.map((w) => (
          <div key={w.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-violet-500/30 transition-all">
            <div className={`w-10 h-10 bg-gradient-to-br ${chainColors[w.chain] ?? "from-violet-600 to-blue-600"} rounded-xl flex items-center justify-center mb-4`}>
              <Wallet size={18} className="text-white" />
            </div>
            <div className="text-white font-semibold mb-1">{w.chain}</div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-white/40 text-xs font-mono">{w.address.slice(0, 8)}…{w.address.slice(-6)}</span>
              <button onClick={() => copy(w.address, w.id)} className="text-white/30 hover:text-violet-400 transition-colors">
                <Copy size={11} />
              </button>
              {copied === w.id && <span className="text-green-400 text-xs">Copied!</span>}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-bold">{w.usd}</div>
                <div className="text-white/40 text-xs">{w.balance}</div>
              </div>
              <button className="text-white/30 hover:text-violet-400 transition-colors">
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Asset table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-white font-semibold">Assets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Asset", "Balance", "Value (USD)", "24h Change"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-white/40 text-xs font-medium uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {assetRows.map((a) => (
                <tr key={a.symbol} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 bg-gradient-to-br ${chainColors[a.name] ?? "from-violet-600 to-blue-600"} rounded-lg flex items-center justify-center text-white text-xs font-bold`}>
                        {a.symbol.slice(0, 1)}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{a.name}</div>
                        <div className="text-white/40 text-xs">{a.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/70 text-sm">{a.balance} {a.symbol}</td>
                  <td className="px-6 py-4 text-white font-semibold text-sm">{a.usd}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 text-sm font-medium ${a.up ? "text-green-400" : "text-red-400"}`}>
                      {a.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                      {a.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
