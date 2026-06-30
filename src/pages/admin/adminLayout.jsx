// import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
// import { useAuth } from "../../context/authcontext";
// import { useTheme } from "../../context/themecontext";
// import { useState, useEffect } from "react";

// // Device detection (same as in main Layout)
// const getDevice = (w) => (w >= 1200 ? "desktop" : w >= 768 ? "tablet" : "mobile");

// // Theme definitions (matching main dashboard)
// const lightTheme = {
//   bg: "#F9F7FF",
//   cardBg: "#FFFFFF",
//   text: "#1C1130",
//   textSub: "#7C6FA0",
//   border: "#F3F0FF",
//   purple: "#6B21E8",
//   purpleLight: "#EDE9FE",
//   green: "#10B981",
//   red: "#EF4444",
//   redLight: "#FEE2E2",
//   orange: "#F97316",
//   cyan: "#06B6D4",
//   grayMid: "#6B7280",
//   surface: "#F9F7FF",
// };

// const darkTheme = {
//   bg: "#0F0A1A",
//   cardBg: "#1A1530",
//   text: "#F1F5F9",
//   textSub: "#A8A4C0",
//   border: "#2A2440",
//   purple: "#8A5CF7",
//   purpleLight: "#2D2A4A",
//   green: "#34D399",
//   red: "#F87171",
//   redLight: "#7F1D1D",
//   orange: "#FB923C",
//   cyan: "#22D3EE",
//   grayMid: "#9CA3AF",
//   surface: "#1A1530",
// };

// export default function AdminLayout() {
//   const { user, loading } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const isLight = theme === "light";
//   const colors = isLight ? lightTheme : darkTheme;
//   const location = useLocation();
//   const [device, setDevice] = useState(() => getDevice(window.innerWidth));

//   useEffect(() => {
//     const handler = () => setDevice(getDevice(window.innerWidth));
//     window.addEventListener("resize", handler);
//     return () => window.removeEventListener("resize", handler);
//   }, []);

//   if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;
//   if (!user || (user.role !== "admin" && user.role !== "ceo")) {
//     return <Navigate to="/dashboard" />;
//   }

//   const avatarSrc = user?.avatar_url || `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(user?.email || "admin")}&background=6B21E8`;

//   // Navigation items (same as tabs before)
//   const navItems = [
//     { path: "/admin/users", label: "Users", icon: "people" },
//     { path: "/admin/kyc", label: "KYC Pending", icon: "shield-check" },
//     { path: "/admin/loans", label: "Loan Requests", icon: "cash-stack" },
//     { path: "/admin/withdrawals", label: "Withdrawals", icon: "bank2" },
//     { path: "/admin/liquidations", label: "Liquidations", icon: "archive" },
//     { path: "/admin/tier-upgrades", label: "Tier Upgrades", icon: "arrow-up-circle" },
//   ];

//   const isActive = (path) => location.pathname === path;

//   // ─── MOBILE LAYOUT (similar to main dashboard's mobile header) ──────────
//   if (device === "mobile") {
//     return (
//       <div style={{ minHeight: "100vh", background: colors.bg, paddingBottom: 64 }}>
//         {/* Mobile header */}
//         <div style={{
//           position: "sticky", top: 0, zIndex: 50, background: colors.cardBg,
//           borderBottom: `1px solid ${colors.border}`, padding: "14px 16px",
//           display: "flex", justifyContent: "space-between", alignItems: "center",
//         }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <div style={{ width: 40, height: 40, borderRadius: 13, background: colors.purpleLight, overflow: "hidden" }}>
//               <img src={avatarSrc} alt="Admin" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//             </div>
//             <div>
//               <p style={{ fontSize: 11, color: colors.textSub, margin: 0, fontWeight: 500 }}>Admin Panel</p>
//               <p style={{ fontSize: 15, fontWeight: 800, margin: 0, color: colors.text }}>SendNaw</p>
//             </div>
//           </div>
//           <button onClick={toggleTheme} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 40, padding: "6px 12px", cursor: "pointer" }}>
//             <i className={`bi ${isLight ? "bi-moon-stars" : "bi-brightness-high-fill"}`} />
//           </button>
//         </div>

//         {/* Mobile bottom navigation */}
//         <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: colors.cardBg, borderTop: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-around", alignItems: "center", padding: "8px 0", zIndex: 100 }}>
//           {navItems.map((item) => (
//             <Link key={item.path} to={item.path} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, textDecoration: "none", padding: "4px 12px", color: isActive(item.path) ? colors.purple : colors.textSub }}>
//               <i className={`bi bi-${item.icon}`} style={{ fontSize: 20 }} />
//               <span style={{ fontSize: 10, fontWeight: isActive(item.path) ? 700 : 500 }}>{item.label}</span>
//             </Link>
//           ))}
//         </div>

//         {/* Main content */}
//         <main style={{ padding: "16px" }}>
//           <Outlet />
//         </main>
//       </div>
//     );
//   }

//   // ─── DESKTOP / TABLET: Sidebar + main content ──────────────────────────
//   const sidebarWidth = 260;
//   return (
//     <div style={{ minHeight: "100vh", background: colors.bg, display: "flex" }}>
//       {/* Sidebar */}
//       <div style={{
//         width: sidebarWidth, background: colors.cardBg, borderRight: `1px solid ${colors.border}`,
//         display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 40,
//       }}>
//         {/* Admin profile area */}
//         <div style={{ padding: "20px", borderBottom: `1px solid ${colors.border}`, textAlign: "center" }}>
//           <img src={avatarSrc} alt="Admin" style={{ width: 56, height: 56, borderRadius: "50%", marginBottom: 12 }} />
//           <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: colors.text }}>Admin</h3>
//           <p style={{ margin: "4px 0 0", fontSize: 12, color: colors.textSub }}>Super Admin</p>
//         </div>

//         {/* Navigation links */}
//         <nav style={{ flex: 1, padding: "16px 12px" }}>
//           {navItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               style={{
//                 display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
//                 borderRadius: 12, marginBottom: 6, textDecoration: "none",
//                 background: isActive(item.path) ? colors.purpleLight : "transparent",
//                 color: isActive(item.path) ? colors.purple : colors.textSub,
//                 fontWeight: isActive(item.path) ? 600 : 500,
//                 transition: "all 0.2s",
//               }}
//               onMouseEnter={(e) => { if (!isActive(item.path)) e.currentTarget.style.background = colors.surface; }}
//               onMouseLeave={(e) => { if (!isActive(item.path)) e.currentTarget.style.background = "transparent"; }}
//             >
//               <i className={`bi bi-${item.icon}`} style={{ fontSize: 18 }} />
//               <span>{item.label}</span>
//             </Link>
//           ))}
//         </nav>

//         {/* Logout & theme toggle at bottom */}
//         <div style={{ padding: "16px", borderTop: `1px solid ${colors.border}` }}>
//           <button
//             onClick={toggleTheme}
//             style={{ width: "100%", marginBottom: 12, padding: "8px", borderRadius: 40, background: colors.surface, border: `1px solid ${colors.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: colors.text }}
//           >
//             <i className={`bi ${isLight ? "bi-moon-stars" : "bi-brightness-high-fill"}`} />
//             {isLight ? "Dark Mode" : "Light Mode"}
//           </button>
//           <button
//             onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}
//             style={{ width: "100%", padding: "8px", borderRadius: 40, background: colors.redLight, border: "none", cursor: "pointer", color: colors.red, fontWeight: 600 }}
//           >
//             <i className="bi bi-box-arrow-right" /> Logout
//           </button>
//         </div>
//       </div>

//       {/* Main content area – with margin left to avoid sidebar */}
//       <div style={{ marginLeft: sidebarWidth, flex: 1, padding: "24px 32px", background: colors.bg }}>
//         <Outlet />
//       </div>
//     </div>
//   );
// }