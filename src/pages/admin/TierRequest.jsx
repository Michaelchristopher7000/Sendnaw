import { useEffect, useState } from "react";

export default function TierRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await fetch(
      "http://sendnawtechnologies.infinityfree.io/api/admin/get_tier_requests.php",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    const data = await res.json();
    if (data.success) setRequests(data.requests);
  };

  const handleAction = async (requestId, action) => {
    const res = await fetch(
      "http://sendnawtechnologies.infinityfree.io/api/admin/approve_upgrade.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ request_id: requestId, action }),
      },
    );
    if (res.ok) fetchRequests();
  };

  return (
    <div>
      <h2>Tier Upgrade Requests</h2>
      {requests.length === 0 && <p>No pending requests.</p>}
      {requests.map((req) => (
        <div
          key={req.id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <p>
            <strong>{req.full_name}</strong> (Current Tier {req.current_tier})
            wants <strong>Tier {req.requested_tier}</strong>
          </p>
          <p>
            Email: {req.email} | Phone: {req.phone}
          </p>
          <button onClick={() => handleAction(req.id, "approve")}>
            Approve
          </button>
          <button onClick={() => handleAction(req.id, "reject")}>Reject</button>
        </div>
      ))}
    </div>
  );
}
