import { useEffect, useState } from "react";

export default function KycReview() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const res = await fetch(
        "https://sendnawbackend.onrender.com/api/admin/get_kyc_pending.php",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      const data = await res.json();
      if (data.success) setPendingUsers(data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (userId, action) => {
    const endpoint =
      action === "approve" ? "approve_kyc.php" : "reject_kyc.php";
    try {
      const res = await fetch(
        `https://sendnawbackend.onrender.com/api/admin/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ user_id: userId }),
        },
      );
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        fetchPending();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Network error");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>KYC Verification Requests</h2>
      {pendingUsers.length === 0 && <p>No pending KYC submissions.</p>}
      {pendingUsers.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>{user.full_name}</h3>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Submitted: {new Date(user.kyc_submitted_at).toLocaleString()}</p>
          <div>
            <strong>Documents:</strong>
            <ul>
              {user.documents.map((doc, idx) => (
                <li key={idx}>
                  {doc.document_type} –{" "}
                  <a
                    href={`https://sendnawbackend.onrender.com/${doc.file_path}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => handleAction(user.id, "approve")}
            style={{ marginRight: "10px" }}
          >
            Approve
          </button>
          <button onClick={() => handleAction(user.id, "reject")}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}
