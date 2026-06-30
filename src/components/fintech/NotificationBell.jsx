// src/components/fintech/NotificationBell.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const T = {
  primary: "#6366f1",
  text: "#e2e8f0",
  muted: "#64748b",
  card: "#0f1624",
  border: "rgba(99,102,241,0.13)",
  red: "#f43f5e",
};

const rgba = (hex, a) => {
  if (!hex || hex.startsWith("rgba")) return hex;
  const n = parseInt(hex.replace("#", ""), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

export default function NotificationBell({ token }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const wsRef = useRef(null);

  // Fetch initial notifications
  useEffect(() => {
    if (!token) return;
    fetch("https://sendnawbackend.onrender.com/api/notifications.php", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNotifications(data.notifications);
          setUnreadCount(data.notifications.filter((n) => !n.read).length);
        }
      })
      .catch(console.error);
  }, [token]);

  // WebSocket connection for real‑time notifications
  useEffect(() => {
    // Connect to WebSocket (replace with your actual WebSocket URL)
    const ws = new WebSocket(`ws://localhost:8081?token=${token}`);
    ws.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prev) => [newNotification, ...prev]);
      if (!newNotification.read) {
        setUnreadCount((prev) => prev + 1);
      }
    };
    ws.onerror = (error) => console.error("WebSocket error", error);
    wsRef.current = ws;
    return () => ws.close();
  }, [token]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = async (id) => {
    try {
      await fetch(
        `https://sendnawbackend.onrender.com/api/notifications.php/${id}/read`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(
        `https://sendnawbackend.onrender.com/api/notifications.php/read-all`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "credit":
        return "💰";
      case "debit":
        return "💸";
      case "alert":
        return "⚠️";
      default:
        return "🔔";
    }
  };

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          width: 42,
          height: 42,
          borderRadius: 13,
          background: rgba(T.primary, 0.1),
          border: `1px solid ${rgba(T.primary, 0.22)}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <i className="bi bi-bell" style={{ color: T.primary, fontSize: 18 }} />
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: -5,
              right: -5,
              background: T.red,
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              borderRadius: "50%",
              width: 18,
              height: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `2px solid ${T.card}`,
            }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </div>

      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: 50,
            right: 0,
            width: 320,
            maxHeight: 400,
            background: T.card,
            border: `1px solid ${T.border}`,
            borderRadius: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              borderBottom: `1px solid ${T.border}`,
            }}
          >
            <span style={{ fontWeight: 700, color: T.text }}>
              Notifications
            </span>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  background: "none",
                  border: "none",
                  color: T.primary,
                  fontSize: 11,
                  cursor: "pointer",
                }}
              >
                Mark all as read
              </button>
            )}
          </div>
          <div style={{ maxHeight: 350, overflowY: "auto" }}>
            {notifications.length === 0 ? (
              <div
                style={{ padding: "20px", textAlign: "center", color: T.muted }}
              >
                No notifications yet
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  style={{
                    padding: "12px 16px",
                    borderBottom: `1px solid ${T.border}`,
                    background: n.read ? "transparent" : rgba(T.primary, 0.08),
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                >
                  <div style={{ display: "flex", gap: 10 }}>
                    <div style={{ fontSize: 18 }}>{getIcon(n.type)}</div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{ fontSize: 13, fontWeight: 600, color: T.text }}
                      >
                        {n.title}
                      </div>
                      <div
                        style={{ fontSize: 11, color: T.muted, marginTop: 2 }}
                      >
                        {n.message}
                      </div>
                      <div
                        style={{ fontSize: 10, color: T.muted, marginTop: 4 }}
                      >
                        {new Date(n.created_at).toLocaleString()}
                      </div>
                    </div>
                    {!n.read && (
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          background: T.primary,
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          <div
            style={{
              padding: "10px",
              borderTop: `1px solid ${T.border}`,
              textAlign: "center",
            }}
          >
            <Link
              to="/dashboard/notifications"
              style={{ color: T.primary, fontSize: 12, textDecoration: "none" }}
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
