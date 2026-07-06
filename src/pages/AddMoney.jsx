import React, { useState } from 'react';

export default function AddMoney({ onAdd }) {
  const [form, setForm] = useState({ amount: '', date: '', source: 'Father', note: '' });
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
        type: 'income',
        amount,
        date: form.date,
        source: form.source,
        note: form.note || '',
        description: form.note || '',
        category: form.source,
      });
      setForm({ amount: '', date: '', source: 'Father', note: '' });
      alert('Money added successfully! ✅');
    } catch (error) {
      alert('Failed to add money. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '600px' }}>
      <h2 className="page-title">💰 Add Money</h2>
      <form onSubmit={handleSubmit} className="flex-col">
        <div className="form-group">
          <label>Amount (₹)</label>
          <input name="amount" type="number" step="0.01" min="0.01" value={form.amount} onChange={handleChange} placeholder="e.g. 5000" required />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Source</label>
          <select name="source" value={form.source} onChange={handleChange}>
            <option>Father</option>
            <option>Mother</option>
            <option>Scholarship</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Note (optional)</label>
          <input name="note" value={form.note} onChange={handleChange} placeholder="Any note..." />
        </div>
        <button type="submit" className="btn" style={{ alignSelf: 'flex-start' }} disabled={loading}>
          {loading ? 'Adding...' : 'Add Money'}
        </button>
      </form>
    </div>
  );
}