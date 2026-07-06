const userName = localStorage.getItem('money_manager_user') || 'User';
import React, { useState, useMemo } from 'react';

export default function History({ transactions, onDelete }) {
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState('');
  const [deleting, setDeleting] = useState(null);

  const filtered = useMemo(() => {
    return transactions.filter(tx => {
      const matchDesc = tx.description?.toLowerCase().includes(search.toLowerCase()) ||
                        tx.note?.toLowerCase().includes(search.toLowerCase()) ||
                        tx.category?.toLowerCase().includes(search.toLowerCase()) ||
                        tx.source?.toLowerCase().includes(search.toLowerCase());
      if (!month) return matchDesc;
      const txMonth = tx.date?.slice(0, 7);
      return matchDesc && txMonth === month;
    });
  }, [transactions, search, month]);

  const months = [...new Set(transactions.map(t => t.date?.slice(0, 7)).filter(Boolean))].sort();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setDeleting(id);
      try {
        await onDelete(id);
        alert('Transaction deleted successfully! 🗑️');
      } catch (error) {
        alert('Failed to delete transaction.');
      } finally {
        setDeleting(null);
      }
    }
  };

  return (
    <div className="card">
      <h2 className="page-title">📋 Transaction History</h2>
      <div className="search-filter">
        <input placeholder="Search description..." value={search} onChange={e => setSearch(e.target.value)} />
        <select value={month} onChange={e => setMonth(e.target.value)}>
          <option value="">All months</option>
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        {month && <button className="btn btn-outline" onClick={() => setMonth('')}>Clear filter</button>}
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category/Source</th>
              <th>Amount</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#6b7a8f' }}>No transactions</td></tr>
            ) : (
              filtered.map(tx => (
                <tr key={tx.id}>
                  <td>{tx.date}</td>
                  <td><span className={`badge ${tx.type === 'income' ? 'badge-income' : 'badge-expense'}`}>{tx.type === 'income' ? 'Income' : 'Expense'}</span></td>
                  <td>{tx.category || tx.source || '—'}</td>
                  <td style={{ fontWeight: 500, color: tx.type === 'income' ? 'var(--income)' : 'var(--expense)' }}>₹{Number(tx.amount).toFixed(2)}</td>
                  <td>{tx.description || tx.note || '—'}</td>
                  <td>
                    <button 
                      className="btn btn-danger" 
                      style={{ padding: '0.2rem 0.8rem', fontSize: '0.8rem' }} 
                      onClick={() => handleDelete(tx.id)}
                      disabled={deleting === tx.id}
                    >
                      {deleting === tx.id ? '...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}