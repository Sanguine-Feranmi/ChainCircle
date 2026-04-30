import { useState } from "react";
import { X, Wallet, Shield, Globe, Zap, Smartphone, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { useWallet } from "../../context/WalletContext";

const walletProviders = [
  { id: "metamask", name: "MetaMask", icon: Shield, desc: "Browser extension wallet" },
  { id: "walletconnect", name: "WalletConnect", icon: Globe, desc: "Connect via QR code" },
  { id: "coinbase", name: "Coinbase Wallet", icon: Zap, desc: "Coinbase's self-custody wallet" },
  { id: "trust", name: "Trust Wallet", icon: Smartphone, desc: "Mobile-first wallet" },
];

export function WalletManagementModal({ onClose }) {
  const { connecting, error, setError, connectMetaMask, connectMock, wallets } = useWallet();
  const [step, setStep] = useState(1);
  const [walletType, setWalletType] = useState("primary");
  const [selectedProvider, setSelectedProvider] = useState(null);

  const handleProviderSelect = (providerId) => {
    setSelectedProvider(providerId);
    setStep(2);
  };

  const handleWalletTypeSelect = (type) => {
    setWalletType(type);
    setStep(3);
  };

  const handleConnect = async () => {
    setError(null);
    const prevCount = wallets.length;

    if (selectedProvider === "metamask") {
      await connectMetaMask(walletType);
      // connectMetaMask is async — check error via ref after await
      setTimeout(() => onClose(), 800);
    } else {
      const names = {
        walletconnect: "WalletConnect",
        coinbase: "Coinbase Wallet",
        trust: "Trust Wallet",
      };
      connectMock(names[selectedProvider], walletType);
      // connectMock resolves after 1200ms internally
      setTimeout(() => onClose(), 1400);
    }
  };

  const hasPrimaryWallet = wallets.some(w => w.type === "primary");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-[#13131a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-white font-semibold">Add Wallet</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="mx-4 mt-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl px-4 py-3 flex items-center gap-2">
            <AlertTriangle size={14} />
            {error}
          </div>
        )}

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h4 className="text-white font-medium mb-2">Choose Wallet Provider</h4>
                <p className="text-white/50 text-sm">Select your preferred wallet provider</p>
              </div>
              
              <div className="space-y-3">
                {walletProviders.map(({ id, name, icon: Icon, desc }) => (
                  <button
                    key={id}
                    onClick={() => handleProviderSelect(id)}
                    className="w-full flex items-center gap-4 px-4 py-4 bg-white/5 border border-white/10 rounded-xl hover:border-violet-500/40 hover:bg-white/[0.08] transition-all"
                  >
                    <div className="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-violet-400" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-white text-sm font-medium">{name}</p>
                      <p className="text-white/40 text-xs">{desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h4 className="text-white font-medium mb-2">Select Wallet Type</h4>
                <p className="text-white/50 text-sm">Choose how you want to use this wallet</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleWalletTypeSelect("primary")}
                  disabled={hasPrimaryWallet}
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl hover:border-violet-500/40 hover:bg-white/[0.08] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-violet-500/10 rounded-lg flex items-center justify-center">
                      <Wallet size={16} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Primary Wallet</p>
                      <p className="text-white/40 text-xs">
                        {hasPrimaryWallet ? "You already have a primary wallet" : "Main wallet for transactions and payouts"}
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleWalletTypeSelect("secondary")}
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl hover:border-violet-500/40 hover:bg-white/[0.08] transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Wallet size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Secondary Wallet</p>
                      <p className="text-white/40 text-xs">Additional wallet for backup or specific purposes</p>
                    </div>
                  </div>
                </button>
              </div>

              <button
                onClick={() => setStep(1)}
                className="w-full mt-4 bg-white/5 border border-white/10 text-white/70 hover:text-white py-3 rounded-xl transition-all"
              >
                Back
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-violet-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet size={24} className="text-violet-400" />
                </div>
                <h4 className="text-white font-medium mb-2">Connect Your Wallet</h4>
                <p className="text-white/50 text-sm">
                  Connecting {walletProviders.find(p => p.id === selectedProvider)?.name} as {walletType} wallet
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Provider</span>
                  <span className="text-white">{walletProviders.find(p => p.id === selectedProvider)?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Type</span>
                  <span className="text-white capitalize">{walletType}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-white/5 border border-white/10 text-white/70 hover:text-white py-3 rounded-xl transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleConnect}
                  disabled={connecting}
                  className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white py-3 rounded-xl transition-all font-medium flex items-center justify-center gap-2"
                >
                  {connecting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet size={16} />
                      Connect
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function DisconnectWalletsModal({ onClose }) {
  const { wallets, removeWallet } = useWallet();
  const [disconnecting, setDisconnecting] = useState(null);

  const handleDisconnect = async (walletId) => {
    setDisconnecting(walletId);
    // Simulate async operation
    setTimeout(() => {
      removeWallet(walletId);
      setDisconnecting(null);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-[#13131a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-white font-semibold">Disconnect Wallets</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {wallets.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet size={24} className="text-white/30" />
              </div>
              <p className="text-white/50 text-sm">No wallets connected</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-white/50 text-sm mb-4">Select wallets to disconnect:</p>
              
              {wallets.map((wallet) => (
                <div key={wallet.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-violet-500/10 rounded-lg flex items-center justify-center">
                      <Wallet size={14} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{wallet.provider}</p>
                      <p className="text-white/40 text-xs">
                        {wallet.chain} • {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
                        {wallet.type && (
                          <span className={`ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${
                            wallet.type === "primary"
                              ? "bg-violet-500/15 text-violet-300 border-violet-500/30"
                              : "bg-blue-500/15 text-blue-300 border-blue-500/30"
                          }`}>
                            {wallet.type === "primary" ? "Primary" : "Secondary"}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDisconnect(wallet.id)}
                    disabled={disconnecting === wallet.id}
                    className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs px-3 py-2 rounded-lg transition-all flex items-center gap-1"
                  >
                    {disconnecting === wallet.id ? (
                      <>
                        <Loader2 size={12} className="animate-spin" />
                        Disconnecting...
                      </>
                    ) : (
                      "Disconnect"
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function DeleteAccountModal({ onClose, onConfirm }) {
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting]       = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const isConfirmValid = confirmText === "delete my account";

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError(null);
    try {
      await new Promise(r => setTimeout(r, 1200));
      onConfirm();
    } catch (err) {
      setDeleteError(err?.message ?? "Something went wrong. Please try again.");
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-[#13131a] border border-red-500/20 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-500/20">
          <h3 className="text-red-400 font-semibold">Delete Account</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle size={20} className="text-red-400" />
              <h4 className="text-red-400 font-medium">Warning</h4>
            </div>
            <p className="text-red-300 text-sm">
              This action cannot be undone. All your data, including wallets, circles, and transaction history will be permanently deleted.
            </p>
          </div>

          <div>
            <label className="text-white/50 text-sm mb-2 block">
              Type "delete my account" to confirm:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="delete my account"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors"
            />
          </div>

          {deleteError && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl px-4 py-3">
              <AlertTriangle size={13} />
              {deleteError}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 bg-white/5 border border-white/10 text-white/70 hover:text-white py-3 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={!isConfirmValid || deleting}
              className="flex-1 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white py-3 rounded-xl transition-all font-medium flex items-center justify-center gap-2"
            >
              {deleting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Account"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}