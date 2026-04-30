import { createContext, useContext, useState } from "react";

const NotificationsContext = createContext(null);

const initialNotifications = [
  { id: 1, title: "Circle payout received",  body: "A payout from one of your circles has been processed and sent to your wallet.",          time: "2m ago",  read: false, href: "/dashboard" },
  { id: 2, title: "Contribution reminder",   body: "Your next scheduled contribution is due soon. Make sure your wallet is funded.",          time: "1h ago",  read: false, href: "/circle" },
  { id: 3, title: "New member joined",       body: "A new member has joined one of your savings circles.",                                     time: "3h ago",  read: true,  href: "/circle" },
  { id: 4, title: "Transaction confirmed",   body: "A recent transaction on your account has been confirmed on-chain.",                       time: "5h ago",  read: true,  href: "/transaction" },
  { id: 5, title: "Wallet connected",        body: "A new wallet was successfully linked to your account.",                                   time: "1d ago",  read: true,  href: "/wallet" },
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
