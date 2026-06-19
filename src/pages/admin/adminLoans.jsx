import { useState, useEffect } from "react";

export default function AdminLoans() {
  const [pendingLoans, setPendingLoans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    const res = await fetch(
      "https://sendnawbackend.onrender.com/api/admin/loan_requests.php",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    const data = await res.json();
    if (data.success) setPendingLoans(data.loans);
  };

  const handleAction = async (loanId, action, reason = "") => {
    const res = await fetch(
      "https://sendnawbackend.onrender.com/api/admin/approve_loan.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ loan_id: loanId, action, reason }),
      },
    );
    const data = await res.json();
    alert(data.message);
    if (data.success) fetchPending();
  };

  return (
    <div>
      <h2>Loan Applications</h2>
      {pendingLoans.map((loan) => (
        <div
          key={loan.id}
          style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
        >
          <p>
            <strong>{loan.full_name}</strong> ({loan.email})
          </p>
          <p>
            Product: {loan.product_name} | Amount: ₦{loan.amount} | Duration:{" "}
            {loan.duration_months} months
          </p>
          <p>
            Monthly installment: ₦{loan.monthly_installment} | Total due: ₦
            {loan.total_due}
          </p>
          <button onClick={() => handleAction(loan.id, "approve")}>
            Approve & Disburse
          </button>
          <button
            onClick={() => {
              let reason = prompt("Rejection reason:");
              if (reason) handleAction(loan.id, "reject", reason);
            }}
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}
