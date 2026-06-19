import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

const Transactions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await API.get("/transaction/history.php?user_id=1");
    setData(res.data.data);
  };

  return (
    <Layout>
      <h2>Transactions</h2>

      {data.map((t, i) => (
        <div key={i} style={row}>
          <p>
            {t.sender_id} → {t.receiver_id} : ${t.amount}
          </p>
        </div>
      ))}
    </Layout>
  );
};

const row = {
  background: "#fff",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "8px"
};

export default Transactions;