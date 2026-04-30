import { useState } from "react";
import { X, Send, Download, RefreshCw, CreditCard, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useWallet } from "../../context/WalletContext";

function fmt(n) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Send Modal
export function SendModal({ onClose }) {
  const { wallets, addTransaction } = useWallet();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fromWallet: wallets[0]?.id || "",
    toAddress: "",
    amount: "",
    note: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!formData.amount || !formData.toAddress || !formData.fromWallet) {
      setError("Please fill all required fields");
      return;
    }
    
    setLoading(true);
    setError("");
    
    // Simulate transaction
    setTimeout(() => {
      const wallet = wallets.find(w => w.id === Number(formData.fromWallet));
      addTransaction({
        hash: "0x" + Math.random().toString(16).slice(2, 18),
        type: "Send",
        amount: `-$${parseFloat(formData.amount).toFixed(2)}`,
        amountUsd: parseFloat(formData.amount),
        chain: wallet?.chain || "Ethereum",
        status: "Pending",
        to: formData.toAddress
      });
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#13131a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Send size={18} className="text-violet-400" />
            Send Crypto
          </h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              {error && <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
              
              <div>
                <label className="text-white/50 text-xs mb-2 block">From Wallet</label>
                <select
                  value={formData.fromWallet}
                  onChange={(e) => setFormData({...formData, fromWallet: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-violet-500/50"
                >
                  {wallets.map(w => (
                    <option key={w.id} value={w.id} className="bg-[#13131a]">
                      {w.provider} - {w.chain} ({w.address.slice(0, 8)}...)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-white/50 text-xs mb-2 block">To Address</label>
                <input
                  type="text"
                  value={formData.toAddress}
                  onChange={(e) => setFormData({...formData, toAddress: e.target.value})}
                  placeholder="0x..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-violet-500/50"
                />
              </div>

              <div>
                <label className="text-white/50 text-xs mb-2 block">Amount (USD)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  placeholder="0.00"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-violet-500/50"
                />
              </div>

              <div>
                <label className="text-white/50 text-xs mb-2 block">Note (Optional)</label>
                <input
                  type="text"
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                  placeholder="Payment for..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-violet-500/50"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.amount || !formData.toAddress || !formData.fromWallet}
                className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white py-3 rounded-xl transition-all font-medium"
              >
                Review Transaction
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/50 text-sm">Amount</span>
                  <span className="text-white font-medium">{fmt(parseFloat(formData.amount))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50 text-sm">To</span>
                  <span className="text-white/70 text-sm font-mono">{formData.toAddress.slice(0, 10)}...{formData.toAddress.slice(-8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50 text-sm">Network Fee</span>
                  <span className="text-white/70 text-sm">~$2.50</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-white font-bold">{fmt(parseFloat(formData.amount) + 2.5)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white/5 border border-white/10 text-white/70 hover:text-white py-3 rounded-xl transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleSend}
                  disabled={loading}
                  className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white py-3 rounded-xl transition-all font-medium flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {loading ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={32} className="text-green-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Transaction Submitted</h4>
                <p className="text-white/50 text-sm">Your transaction has been submitted to the network</p>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl transition-all font-medium"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Receive Modal
export function ReceiveModal({ onClose }) {
  const { wallets } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState(wallets[0]?.id || "");
  const [copied, setCopied] = useState(false);

  const wallet = wallets.find(w => w.id === Number(selectedWallet));

  const copyAddress = () => {
    if (wallet) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#13131a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Download size={18} className="text-blue-400" />
            Receive Crypto
          </h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-white/50 text-xs mb-2 block">Select Wallet</label>
            <select
              value={selectedWallet}
              onChange={(e) => setSelectedWallet(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-violet-500/50"
            >
              {wallets.map(w => (
                <option key={w.id} value={w.id} className="bg-[#13131a]">
                  {w.provider} - {w.chain}
                </option>
              ))}
            </select>
          </div>

          {wallet && (
            <>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="text-xs text-black font-mono break-all p-2">QR Code</div>
                </div>
                <p className="text-white/50 text-xs mb-2">Wallet Address</p>
                <p className="text-white font-mono text-sm break-all mb-3">{wallet.address}</p>
                <button
                  onClick={copyAddress}
                  className="w-full bg-violet-600 hover:bg-violet-500 text-white py-2 rounded-lg transition-all text-sm font-medium"
                >
                  {copied ? "Copied!" : "Copy Address"}
                </button>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                <p className="text-yellow-400 text-xs">
                  <strong>Important:</strong> Only send {wallet.chain} compatible tokens to this address.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Swap Modal
export function SwapModal({ onClose }) {
  const { wallets, addTransaction } = useWallet();
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const tokens = ["ETH", "USDC", "USDT", "BTC", "MATIC"];
  // Indicative rates relative to USD — no live feed, clearly labelled as estimate
  const RATES_USD = { ETH: 3200, BTC: 62000, MATIC: 0.9, USDC: 1, USDT: 1 };
  const fromUsd = RATES_USD[fromToken] ?? 1;
  const toUsd   = RATES_USD[toToken]   ?? 1;
  const rate    = fromUsd / toUsd;

  const handleSwap = async () => {
    if (!amount) return;
    
    setLoading(true);
    setTimeout(() => {
      addTransaction({
        hash: "0x" + Math.random().toString(16).slice(2, 18),
        type: "Swap",
        amount: `${amount} ${fromToken} → ${(parseFloat(amount) * rate).toFixed(2)} ${toToken}`,
        amountUsd: parseFloat(amount) * rate,
        chain: "Ethereum",
        status: "Confirmed"
      });
      setLoading(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#13131a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <RefreshCw size={18} className="text-indigo-400" />
            Swap Tokens
          </h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <label className="text-white/50 text-xs mb-2 block">From</label>
            <div className="flex gap-3">
              <select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none"
              >
                {tokens.map(token => (
                  <option key={token} value={token} className="bg-[#13131a]">{token}</option>
                ))}
              </select>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="flex-1 bg-transparent text-white text-lg outline-none"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => {
                const temp = fromToken;
                setFromToken(toToken);
                setToToken(temp);
              }}
              className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ArrowRight size={16} className="text-white/50" />
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <label className="text-white/50 text-xs mb-2 block">To</label>
            <div className="flex gap-3">
              <select
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none"
              >
                {tokens.map(token => (
                  <option key={token} value={token} className="bg-[#13131a]">{token}</option>
                ))}
              </select>
              <div className="flex-1 text-white text-lg">
                {amount ? (parseFloat(amount) * rate).toFixed(6) : "0.0"}
              </div>
            </div>
          </div>

          {amount && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <p className="text-white/50 text-xs">Estimated Rate</p>
              <p className="text-white text-sm">1 {fromToken} ≈ {rate.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toToken}</p>
              <p className="text-white/30 text-xs mt-0.5">Indicative only</p>
            </div>
          )}

          <button
            onClick={handleSwap}
            disabled={!amount || loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-3 rounded-xl transition-all font-medium flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            {loading ? "Swapping..." : "Swap"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Buy Modal
export function BuyModal({ onClose }) {
  const { addTransaction } = useWallet();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    if (!amount) return;
    
    setLoading(true);
    setTimeout(() => {
      addTransaction({
        hash: "0x" + Math.random().toString(16).slice(2, 18),
        type: "Buy",
        amount: `+$${parseFloat(amount).toFixed(2)}`,
        amountUsd: parseFloat(amount),
        chain: "Ethereum",
        status: "Confirmed"
      });
      setLoading(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#13131a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <CreditCard size={18} className="text-purple-400" />
            Buy Crypto
          </h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-white/50 text-xs mb-2 block">Amount (USD)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100.00"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-lg outline-none focus:border-violet-500/50"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs mb-2 block">Payment Method</label>
            <div className="space-y-2">
              {[
                { id: "card", label: "Credit/Debit Card", fee: "2.9%" },
                { id: "bank", label: "Bank Transfer", fee: "0.5%" },
                { id: "apple", label: "Apple Pay", fee: "2.9%" }
              ].map(method => (
                <label key={method.id} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-violet-600"
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm">{method.label}</p>
                    <p className="text-white/50 text-xs">Fee: {method.fee}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {amount && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Amount</span>
                <span className="text-white">{fmt(parseFloat(amount))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Fee</span>
                <span className="text-white">{fmt(parseFloat(amount) * 0.029)}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between">
                <span className="text-white font-medium">Total</span>
                <span className="text-white font-bold">{fmt(parseFloat(amount) * 1.029)}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleBuy}
            disabled={!amount || loading}
            className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white py-3 rounded-xl transition-all font-medium flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <CreditCard size={16} />}
            {loading ? "Processing..." : "Buy Crypto"}
          </button>
        </div>
      </div>
    </div>
  );
}