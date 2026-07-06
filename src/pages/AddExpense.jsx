import React, { useState } from 'react';

const CATEGORIES = ['Food', 'Transport', 'Study', 'Shopping', 'Entertainment', 'Mobile Recharge', 'Medicine', 'Other'];

export default function AddExpense({ onAdd }) {
  const [form, setForm] = useState({ amount: '', date: '', category: 'Food', description: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (!amount || amount <= 0) return alert('Enter a valid amount');
    if (!form.date) return alert('Select date');
    
    setLoading(true);
    try {
      await onAdd({
        type: 'expense',
        amount,
        date: form.date,
        category: form.category,
        description: form.description || '',
        source: form.category,
        note: form.description || '',
      });
      setForm({ amount: '', date: '', category: 'Food', description: '' });
      alert('Expense added successfully! ✅');
    } catch (error) {
      alert('Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '600px' }}>
      <h2 className="page-title">💸 Add Expense</h2>
      <form onSubmit={handleSubmit} className="flex-col">
        <div className="form-group">
          <label>Amount (₹)</label>
          <input name="amount" type="number" step="0.01" min="0.01" value={form.amount} onChange={handleChange} placeholder="e.g. 250" required />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <input name="description" value={form.description} onChange={handleChange} placeholder="e.g. Lunch" />
        </div>
        <button type="submit" className="btn" style={{ alignSelf: 'flex-start' }} disabled={loading}>
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
}