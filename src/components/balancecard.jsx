export default function BalanceCard({ balances, displayCurrency, onCurrencyChange }) {
  const rates = { NGN: 1, USD: 1500, GBP: 1900, EUR: 1600 };
  const total = balances.reduce((sum, b) => {
    const inNgn = parseFloat(b.balance) * rates[b.currency_code];
    return sum + (inNgn / rates[displayCurrency]);
  }, 0);

  return (
    <div className="balance-card">
      <div className="total-balance">
        {displayCurrency} {total.toFixed(2)}
      </div>
      <select value={displayCurrency} onChange={onCurrencyChange}>
        <option>NGN</option><option>USD</option><option>GBP</option><option>EUR</option>
      </select>
      <div className="currency-breakdown">
        {balances.map(b => (
          <div key={b.currency_code}>{b.currency_code}: {parseFloat(b.balance).toFixed(2)}</div>
        ))}
      </div>
    </div>
  );
}