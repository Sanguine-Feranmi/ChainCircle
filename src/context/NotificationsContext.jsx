import { createContext, useContext, useState } from "react";

const NotificationsContext = createContext(null);

const initialNotifications = [
  { id: 1, title: "Circle payout received", body: "You received $1,200 from your Friday Savers circle payout.", time: "2m ago", read: false, href: "/dashboard" },
  { id: 2, title: "Contribution reminder", body: "Your next contribution of 0.5 ETH to Circle #4 is due in 24 hours.", time: "1h ago", read: false, href: "/circle" },
  { id: 3, title: "New member joined", body: "Jordan Lee has joined your Weekend Warriors savings circle.", time: "3h ago", read: true, href: "/circle" },
  { id: 4, title: "Transaction confirmed", body: "Your swap of 500 MATIC → 0.1 ETH was confirmed on Polygon.", time: "5h ago", read: true, href: "/transaction" },
  { id: 5, title: "Wallet connected", body: "Your Ethereum wallet 0x3f5C...f0bE was successfully linked.", time: "1d ago", read: true, href: "/wallet" },
];

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationsContext.Provider value={{ notifications, markRead, markAllRead, unreadCount }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationsContext);
