const BASE = 'https://sendnawbackend.onrender.com/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const getWalletBalances = async () => {
  const res = await fetch(`${BASE}/wallet/get_balance.php`, {
    method: 'GET',
    headers: getHeaders()
  });
  return res.json();
};

export const storeFCMToken = async (token) => {
  const res = await fetch('https://sendnawbackend.onrender.com/api/notifications/store_token.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    body: JSON.stringify({ fcm_token: token })
  });
  const data = await res.json();
  return data.success;
};


export const getTransactionHistory = async (limit = 20) => {
  const res = await fetch(`${BASE}/transactions/history.php?limit=${limit}`, {
    method: 'GET',
    headers: getHeaders()
  });
  return res.json();
};

// Add other functions (sendByTag, etc.) similarly
export const sendByTag = async (tag, amount, currency) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE}/transfers/send_by_tag.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ tag, amount, currency })
  });
  return res.json();


};

