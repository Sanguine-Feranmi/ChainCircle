import { createContext, useContext, useState } from "react";

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [wallets, setWallets] = useState([]);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Primary wallet is always the first connected one
  const primaryWallet = wallets[0] ?? null;

  const connectMetaMask = async () => {
    setError(null);
    setConnecting(true);
    try {
      if (!window.ethereum) throw new Error("MetaMask is not installed. Please install the MetaMask extension.");
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const address = accounts[0];
      const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
      const chainId = parseInt(chainIdHex, 16);
      const chainNames = { 1: "Ethereum", 137: "Polygon", 56: "BNB Chain", 8453: "Base", 42161: "Arbitrum" };
      const chain = chainNames[chainId] ?? `Chain ${chainId}`;
      // Get balance
      const balHex = await window.ethereum.request({ method: "eth_getBalance", params: [address, "latest"] });
      const balEth = (parseInt(balHex, 16) / 1e18).toFixed(4);
      const wallet = { id: Date.now(), address, chain, balance: `${balEth} ETH`, provider: "MetaMask" };
      setWallets((prev) => {
        // Avoid duplicates
        if (prev.find((w) => w.address.toLowerCase() === address.toLowerCase())) return prev;
        return [wallet, ...prev];
      });
    } catch (err) {
      setError(err.message ?? "Failed to connect MetaMask.");
    } finally {
      setConnecting(false);
    }
  };

  const connectMock = (providerName) => {
    // Placeholder for WalletConnect / Coinbase / Trust — ready to wire real SDK
    setError(null);
    setConnecting(true);
    setTimeout(() => {
      const mockAddr = "0x" + Math.random().toString(16).slice(2, 42).padEnd(40, "0");
      const wallet = { id: Date.now(), address: mockAddr, chain: "Ethereum", balance: "0.0000 ETH", provider: providerName };
      setWallets((prev) => [wallet, ...prev]);
      setConnecting(false);
    }, 1200);
  };

  const removeWallet = (id) => setWallets((prev) => prev.filter((w) => w.id !== id));

  return (
    <WalletContext.Provider value={{ wallets, primaryWallet, connecting, error, setError, connectMetaMask, connectMock, removeWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
