const userName = localStorage.getItem('money_manager_user') || 'User';
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getBalance, getTotalIncome, getTotalExpense } from '../utils/helpers';

const COLORS = ['#2a7de1', '#22a67e', '#e25c5c', '#f4b740', '#9b6bcd', '#e8845a', '#4f9fba', '#b0b8c6'];

export default function Statistics({ transactions }) {
  const balance = getBalance(transactions);
  const totalIncome = getTotalIncome(transactions);
  const totalExpense = getTotalExpense(transactions);

  const expenseByCategory = useMemo(() => {
    const map = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      const cat = t.category || 'Other';
      map[cat] = (map[cat] || 0) + t.amount;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const monthlyExpense = useMemo(() => {
    const map = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      const month = t.date?.slice(0, 7);
      if (month) map[month] = (map[month] || 0) + t.amount;
    });
    return Object.entries(map).sort((a,b) => a[0].localeCompare(b[0])).map(([month, amount]) => ({ month, amount }));
  }, [transactions]);

  return (
    <div className="flex-col" style={{ gap: '2rem' }}>
      <div className="stat-grid">
        <div className="stat-card"><div className="stat-label">Total Income</div><div className="stat-value green">₹{totalIncome.toFixed(2)}</div></div>
        <div className="stat-card"><div className="stat-label">Total Expense</div><div className="stat-value red">₹{totalExpense.toFixed(2)}</div></div>
        <div className="stat-card"><div className="stat-label">Remaining Balance</div><div className="stat-value blue">₹{balance.toFixed(2)}</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Expenses by Category</h3>
          {expenseByCategory.length === 0 ? <p style={{ color: '#6b7a8f' }}>No expense data.</p> : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart><Pie data={expenseByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>{expenseByCategory.map((_, i) => <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip /></PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Monthly Expenses</h3>
          {monthlyExpense.length === 0 ? <p style={{ color: '#6b7a8f' }}>No expense data.</p> : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyExpense}><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="amount" fill="#2a7de1" radius={[6,6,0,0]} /></BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}