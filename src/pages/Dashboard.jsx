import React from 'react';
import { getBalance, getTotalIncome, getTotalExpense } from '../utils/helpers';

export default function Dashboard({ transactions }) {
  const balance = getBalance(transactions);
  const totalIncome = getTotalIncome(transactions);
  const totalExpense = getTotalExpense(transactions);
  const recent = transactions.slice(0, 5);

  return (
    <div className="flex-col" style={{ gap: '2rem' }}>
      <div className="stat-grid">
        <div className="stat-card"><div className="stat-label">Current Balance</div><div className="stat-value blue">₹{balance.toFixed(2)}</div></div>
        <div className="stat-card"><div className="stat-label">Total Received</div><div className="stat-value green">₹{totalIncome.toFixed(2)}</div></div>
        <div className="stat-card"><div className="stat-label">Total Expenses</div><div className="stat-value red">₹{totalExpense.toFixed(2)}</div></div>
        <div className="stat-card"><div className="stat-label">Transactions</div><div className="stat-value blue">{transactions.length}</div></div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '1rem' }}>Recent Transactions</h2>
        {recent.length === 0 ? (
          <p style={{ color: '#6b7a8f' }}>No transactions yet.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Date</th><th>Type</th><th>Category/Source</th><th>Amount</th><th>Description</th></tr></thead>
              <tbody>
                {recent.map(tx => (
                  <tr key={tx.id}>
                    <td>{tx.date}</td>
                    <td><span className={`badge ${tx.type === 'income' ? 'badge-income' : 'badge-expense'}`}>{tx.type === 'income' ? 'Income' : 'Expense'}</span></td>
                    <td>{tx.category || tx.source || '—'}</td>
                    <td style={{ fontWeight: 500, color: tx.type === 'income' ? 'var(--income)' : 'var(--expense)' }}>₹{tx.amount.toFixed(2)}</td>
                    <td>{tx.description || tx.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}