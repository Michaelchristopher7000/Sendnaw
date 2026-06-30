import { useEffect, useState } from "react";

export default function Withdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    fetchWithdrawals();
  }, [filter]);

  const fetchWithdrawals = async () => {
    try {
      const res = await fetch(
        `https://sendnawbackend.onrender.com/api/admin/get_withdrawals.php?status=${filter}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      const data = await res.json();
      if (data.success) setWithdrawals(data.withdrawals);
      else console.error(data.message);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleAction = async (id, action) => {
    const endpoint =
      action === "approve" ? "approve_withdrawal.php" : "reject_withdrawal.php";
    try {
      const res = await fetch(
        `https://sendnawbackend.onrender.com/api/admin/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ withdrawal_id: id }),
        },
      );
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        fetchWithdrawals(); // refresh list
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error("Action error:", err);
      alert("Network error – check console");
    }
  };

  return (
    <div>
      <h2>Withdrawals</h2>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="failed">Failed</option>
        <option value="all">All</option>
      </select>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Amount</th>
            <th>Bank</th>
            <th>Account</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.map((w) => (
            <tr key={w.id}>
              <td>{w.id}</td>
              <td>
                {w.full_name}
                <br />
                {w.email}
              </td>
              <td>
                {w.amount} {w.currency}
              </td>
              <td>{w.bank_code}</td>
              <td>
                {w.account_number}
                <br />
                {w.account_name}
              </td>
              <td>{w.status}</td>
              <td>
                {w.status === "pending" && (
                  <>
                    <button onClick={() => handleAction(w.id, "approve")}>
                      Approve
                    </button>
                    <button onClick={() => handleAction(w.id, "reject")}>
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
