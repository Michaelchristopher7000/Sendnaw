export default function TransactionList({ transactions }) {
  return (
    <ul>
      {transactions.map(tx => (
        <li key={tx.id}>
          {tx.type === 'send' ? '➡️' : '⬅️'} {tx.amount} {tx.currency} – {tx.description} <br/>
          <small>{new Date(tx.created_at).toLocaleString()}</small>
        </li>
      ))}
    </ul>
  );
}