import { useState } from "react";
import API from "../services/api";
import Layout from "../../components/Layout";

const Wallet = () => {
  const [amount, setAmount] = useState("");

  const fundWallet = async () => {
    await API.post("/wallet/fund.php", {
      user_id: 1,
      amount: Number(amount)
    });

    alert("Wallet Funded!");
    setAmount("");
  };

  return (
    <Layout>
      <h2>Wallet</h2>

      <div style={card}>
        <input
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={fundWallet} style={btn}>
          Fund Wallet
        </button>
      </div>
    </Layout>
  );
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "20px"
};

const btn = {
  marginTop: "10px",
  padding: "10px",
  background: "#0f172a",
  color: "#fff",
  border: "none",
  cursor: "pointer"
};

export default Wallet;