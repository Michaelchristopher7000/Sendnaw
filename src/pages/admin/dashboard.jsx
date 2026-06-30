// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../../context/authcontext";
// import { showNotification } from "../../utils/notify";
// import { useTheme } from "../../context/themecontext";

// // Theme definitions (same as layout)
// const lightTheme = {
//   bg: "#F9F7FF",
//   cardBg: "#FFFFFF",
//   text: "#1C1130",
//   textSecondary: "#7C6FA0",
//   border: "#F3F0FF",
//   purple: "#6B21E8",
//   purpleLight: "#EDE9FE",
//   green: "#10B981",
//   greenLight: "#D1FAE5",
//   red: "#EF4444",
//   redLight: "#FEE2E2",
//   orange: "#F97316",
//   cyan: "#06B6D4",
//   amber: "#F59E0B",
//   gray: "#9CA3AF",
//   grayMid: "#6B7280",
//   surface: "#F9F7FF",
// };

// const darkTheme = {
//   bg: "#0F0A1A",
//   cardBg: "#1A1530",
//   text: "#F1F5F9",
//   textSecondary: "#A8A4C0",
//   border: "#2A2440",
//   purple: "#8A5CF7",
//   purpleLight: "#2D2A4A",
//   green: "#34D399",
//   greenLight: "#064E3B",
//   red: "#F87171",
//   redLight: "#7F1D1D",
//   orange: "#FB923C",
//   cyan: "#22D3EE",
//   amber: "#FBBF24",
//   gray: "#6B7280",
//   grayMid: "#9CA3AF",
//   surface: "#1A1530",
// };

// const font = `'DM Sans', 'Segoe UI', sans-serif`;

// const formatDate = (dateStr) =>
//   new Date(dateStr).toLocaleDateString("en-NG", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

// // Confirm Modal (same as before)
// function ConfirmModal({ isOpen, onClose, onConfirm, title, message, loading }) {
//   if (!isOpen) return null;
//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         background: "rgba(0,0,0,0.5)",
//         backdropFilter: "blur(4px)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         zIndex: 1000,
//       }}
//       onClick={onClose}
//     >
//       <div
//         style={{
//           background: "#fff",
//           borderRadius: 24,
//           padding: "24px",
//           maxWidth: 400,
//           width: "90%",
//         }}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700 }}>
//           {title}
//         </h3>
//         <p style={{ margin: "0 0 20px", color: "#6B7280" }}>{message}</p>
//         <div style={{ display: "flex", gap: 12 }}>
//           <button
//             onClick={onClose}
//             style={{
//               flex: 1,
//               padding: "10px",
//               borderRadius: 40,
//               background: "#F3F4F6",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             disabled={loading}
//             style={{
//               flex: 1,
//               padding: "10px",
//               borderRadius: 40,
//               background: "#EF4444",
//               color: "#fff",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             {loading ? "..." : "Confirm"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function AdminDashboard() {
//   const { tab } = useParams(); // tab will be one of: users, kyc, loans, withdrawals, liquidations, tier-upgrades
//   const { theme } = useTheme();
//   const colors = theme === "dark" ? darkTheme : lightTheme;

//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [confirm, setConfirm] = useState({
//     isOpen: false,
//     action: null,
//     id: null,
//     type: "",
//   });

//   // Map URL param to API details
//   const getModuleConfig = () => {
//     const moduleMap = {
//       users: {
//         endpoint: "admin/get_users.php",
//         dataProp: "users",
//         type: "user",
//         label: "Users",
//       },
//       kyc: {
//         endpoint: "admin/get_kyc_pending.php",
//         dataProp: "data",
//         type: "kyc",
//         label: "KYC Requests",
//       },
//       loans: {
//         endpoint: "admin/loan_requests.php",
//         dataProp: "requests",
//         type: "loan",
//         label: "Loan Applications",
//       },
//       withdrawals: {
//         endpoint: "admin/approve_with.php",
//         dataProp: "withdrawals",
//         type: "withdrawal",
//         label: "Withdrawal Requests",
//       },
//       liquidations: {
//         endpoint: "admin/process_liquidation.php?list=true",
//         dataProp: "list",
//         type: "liquidation",
//         label: "Liquidation Requests",
//       },
//       "tier-upgrades": {
//         endpoint: "admin/get_tier_requests.php",
//         dataProp: "data",
//         type: "tierUpgrade",
//         label: "Tier Upgrade Requests",
//       },
//     };
//     return moduleMap[tab] || moduleMap.users;
//   };

//   useEffect(() => {
//     fetchData();
//   }, [tab]);

//   const fetchData = async () => {
//     const module = getModuleConfig();
//     if (!module) return;
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `https://sendnawbackend.onrender.com/api/${module.endpoint}`,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         },
//       );
//       const result = await res.json();
//       if (result.success) {
//         setItems(result[module.dataProp] || []);
//       } else {
//         showNotification(
//           "SendNaw",
//           result.message || "Failed to load",
//           "error",
//         );
//       }
//     } catch {
//       showNotification("SendNaw", "Network error", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (id, type) => {
//     let endpoint = "";
//     let payload = {};
//     switch (type) {
//       case "kyc":
//         endpoint = "admin/approve_kyc.php";
//         payload = { kyc_id: id };
//         break;
//       case "loan":
//         endpoint = "admin/approve_loan.php";
//         payload = { loan_id: id };
//         break;
//       case "withdrawal":
//         endpoint = "admin/approve_with.php";
//         payload = { withdrawal_id: id, action: "approve" };
//         break;
//       case "liquidation":
//         endpoint = "admin/process_liquidation.php";
//         payload = { request_id: id, action: "approve", penalty_percent: 10 };
//         break;
//       case "tierUpgrade":
//         endpoint = "admin/approve_upgr.php";
//         payload = { request_id: id };
//         break;
//       default:
//         return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `https://sendnawbackend.onrender.com/api/${endpoint}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify(payload),
//         },
//       );
//       const data = await res.json();
//       if (data.success) {
//         showNotification("SendNaw", "Approved successfully", "success");
//         fetchData();
//       } else {
//         showNotification("SendNaw", data.message || "Failed", "error");
//       }
//     } catch {
//       showNotification("SendNaw", "Network error", "error");
//     } finally {
//       setLoading(false);
//       setConfirm({ isOpen: false, action: null, id: null, type: "" });
//     }
//   };

//   const handleReject = async (id, type) => {
//     let endpoint = "";
//     let payload = {};
//     switch (type) {
//       case "kyc":
//         endpoint = "admin/reject_kyc.php";
//         payload = { kyc_id: id };
//         break;
//       case "loan":
//         endpoint = "admin/loan_requests.php";
//         payload = { loan_id: id, action: "reject" };
//         break;
//       case "withdrawal":
//         endpoint = "admin/approve_with.php";
//         payload = { withdrawal_id: id, action: "reject" };
//         break;
//       case "liquidation":
//         endpoint = "admin/process_liquidation.php";
//         payload = { request_id: id, action: "deny" };
//         break;
//       case "tierUpgrade":
//         endpoint = "admin/approve_upgr.php";
//         payload = { request_id: id, action: "reject" };
//         break;
//       default:
//         return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `https://sendnawbackend.onrender.com/api/${endpoint}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify(payload),
//         },
//       );
//       const data = await res.json();
//       if (data.success) {
//         showNotification("SendNaw", "Rejected successfully", "success");
//         fetchData();
//       } else {
//         showNotification("SendNaw", data.message || "Failed", "error");
//       }
//     } catch {
//       showNotification("SendNaw", "Network error", "error");
//     } finally {
//       setLoading(false);
//       setConfirm({ isOpen: false, action: null, id: null, type: "" });
//     }
//   };

//   const openConfirm = (action, id, type) => {
//     setConfirm({ isOpen: true, action, id, type });
//   };

//   const module = getModuleConfig();
//   const title = module?.label || "Admin Dashboard";

//   const renderList = () => {
//     if (loading)
//       return (
//         <div style={{ textAlign: "center", padding: "40px" }}>
//           <div className="spinner" />
//         </div>
//       );
//     if (items.length === 0)
//       return (
//         <div
//           style={{
//             textAlign: "center",
//             padding: "40px",
//             background: colors.cardBg,
//             borderRadius: 20,
//           }}
//         >
//           No {title.toLowerCase()}
//         </div>
//       );

//     // Render based on module type (similar to previous switch)
//     switch (tab) {
//       case "users":
//         return items.map((user) => (
//           <div
//             key={user.id}
//             style={{
//               background: colors.cardBg,
//               borderRadius: 20,
//               padding: 16,
//               marginBottom: 12,
//               border: `1px solid ${colors.border}`,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexWrap: "wrap",
//               gap: 12,
//             }}
//           >
//             <div>
//               <p style={{ fontWeight: 700, margin: 0 }}>{user.full_name}</p>
//               <p style={{ fontSize: 12, color: colors.textSecondary }}>
//                 {user.email} | Tier {user.kyc_tier}
//               </p>
//             </div>
//             <button
//               style={{
//                 background: colors.redLight,
//                 color: colors.red,
//                 border: "none",
//                 borderRadius: 40,
//                 padding: "6px 16px",
//                 cursor: "pointer",
//               }}
//               onClick={() => openConfirm("suspend", user.id, "user")}
//             >
//               Suspend
//             </button>
//           </div>
//         ));
//       case "kyc":
//         return items.map((req) => (
//           <div
//             key={req.id}
//             style={{
//               background: colors.cardBg,
//               borderRadius: 20,
//               padding: 16,
//               marginBottom: 12,
//               border: `1px solid ${colors.border}`,
//             }}
//           >
//             <div>
//               <strong>{req.full_name}</strong> - {req.document_type}
//             </div>
//             <div style={{ fontSize: 12, color: colors.textSecondary }}>
//               Submitted: {formatDate(req.created_at)}
//             </div>
//             <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
//               <button
//                 style={{
//                   background: colors.green,
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: 40,
//                   padding: "6px 20px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => openConfirm("approve", req.id, "kyc")}
//               >
//                 Approve
//               </button>
//               <button
//                 style={{
//                   background: colors.redLight,
//                   color: colors.red,
//                   border: "none",
//                   borderRadius: 40,
//                   padding: "6px 20px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => openConfirm("reject", req.id, "kyc")}
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         ));
//       case "loans":
//         return items.map((loan) => (
//           <div
//             key={loan.id}
//             style={{
//               background: colors.cardBg,
//               borderRadius: 20,
//               padding: 16,
//               marginBottom: 12,
//               border: `1px solid ${colors.border}`,
//             }}
//           >
//             <div>
//               <strong>{loan.user_name}</strong> - {loan.product_name}
//             </div>
//             <div>Amount: ₦{loan.amount.toLocaleString()}</div>
//             <div>Duration: {loan.duration_months} months</div>
//             <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
//               <button
//                 style={{
//                   background: colors.green,
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: 40,
//                   padding: "6px 20px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => openConfirm("approve", loan.id, "loan")}
//               >
//                 Approve
//               </button>
//               <button
//                 style={{
//                   background: colors.redLight,
//                   color: colors.red,
//                   border: "none",
//                   borderRadius: 40,
//                   padding: "6px 20px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => openConfirm("reject", loan.id, "loan")}
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         ));
//       case "withdrawals":
//         return items.map((w) => (
//           <div
//             key={w.id}
//             style={{
//               background: colors.cardBg,
//               borderRadius: 20,
//               padding: 16,
//               marginBottom: 12,
//               border: `1px solid ${colors.border}`,
//             }}
//           >
//             <div>
//               <strong>{w.user_name}</strong> - ₦{w.amount.toLocaleString()}
//             </div>
//             <div>
//               Bank: {w.bank_name} - Account: {w.account_number}
//             </div>
//             <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
//               <button
//                 style={{
//                   background: colors.green,
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: 40,
//                   padding: "6px 20px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => openConfirm("approve", w.id, "withdrawal")}
//               >
//                 Approve
//               </button>
//               <button
//                 style={{
//                   background: colors.redLight,
//                   color: colors.red,
//                   border: "none",
//                   borderRadius: 40,
//                   padding: "6px 20px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => openConfirm("reject", w.id, "withdrawal")}
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         ));
//       case "liquidations":
//         return items.map((l) => (
//           <div
//             key={l.id}
//             style={{
//               background: colors.cardBg,
//               borderRadius: 20,
//               padding: 16,
//               marginBottom: 12,
//               border: `1px solid ${colors.border}`,
//             }}
//           >
//             <div>
//               <strong>{l.user_name}</strong> - Saving ID: {l.saving_id}
//             </div>
//             <div>Amount: ₦{l.amount.toLocaleString()}</div>
//             <div>Requested: {formatDate(l.requested_at)}</div>
//             <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
//               <button
//                 style={{
//                   background: colors.green,
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: 40,
//                   padding: "6px 20px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => openConfirm("approve", l.id, "liquidation")}
//               >
//                 Approve
//               </button>
//               <button
//                 style={{
//                   background: colors.redLight,
//                   color: colors.red,
//                   border: "none",
//                   borderRadius: 40,
//                   padding: "6px 20px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => openConfirm("reject", l.id, "liquidation")}
//               >
//                 Deny
//               </button>
//             </div>
//           </div>
//         ));
//       case "tier-upgrades":
//         return items.map((t) => (
//           <div
//             key={t.id}
//             style={{
//               background: colors.cardBg,
//               borderRadius: 20,
//               padding: 16,
//               marginBottom: 12,
//               border: `1px solid ${colors.border}`,
//             }}
//           >
//             <div>
//               <strong>{t.user_name}</strong> - Upgrade to Tier{" "}
//               {t.requested_tier}
//             </div>
//             <div>Current Tier: {t.current_tier}</div>
//             <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
//               <button
//                 style={{
//                   background: colors.green,
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: 40,
//                   padding: "6px 20px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => openConfirm("approve", t.id, "tierUpgrade")}
//               >
//                 Approve
//               </button>
//               <button
//                 style={{
//                   background: colors.redLight,
//                   color: colors.red,
//                   border: "none",
//                   borderRadius: 40,
//                   padding: "6px 20px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => openConfirm("reject", t.id, "tierUpgrade")}
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         ));
//       default:
//         return null;
//     }
//   };

//   return (
//     <div style={{ fontFamily: font, color: colors.text }}>
//       <div style={{ marginBottom: 24 }}>
//         <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>{title}</h1>
//         <p style={{ color: colors.textSecondary, marginTop: 4 }}>
//           Review and manage {title.toLowerCase()}
//         </p>
//       </div>
//       {renderList()}
//       <ConfirmModal
//         isOpen={confirm.isOpen}
//         onClose={() =>
//           setConfirm({ isOpen: false, action: null, id: null, type: "" })
//         }
//         onConfirm={() => {
//           if (confirm.action === "approve")
//             handleApprove(confirm.id, confirm.type);
//           else if (confirm.action === "reject")
//             handleReject(confirm.id, confirm.type);
//           else if (confirm.action === "suspend")
//             handleReject(confirm.id, "user"); // suspend uses reject logic
//         }}
//         title={
//           confirm.action === "approve" ? "Approve Request" : "Reject Request"
//         }
//         message={`Are you sure you want to ${confirm.action} this request?`}
//         loading={loading}
//       />
//       <style>{`
//         .spinner {
//           width: 40px; height: 40px;
//           border: 3px solid ${colors.border};
//           border-top: 3px solid ${colors.purple};
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//           margin: 0 auto;
//         }
//         @keyframes spin { to { transform: rotate(360deg); } }
//       `}</style>
//     </div>
//   );
// }
