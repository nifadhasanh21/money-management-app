import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddMoney from './pages/AddMoney';
import AddExpense from './pages/AddExpense';
import History from './pages/History';
import Statistics from './pages/Statistics';
import { getTransactions, saveTransactions } from './utils/storage';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState(() => getTransactions());

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const addTransaction = (tx) => {
    setTransactions(prev => [tx, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-brand">💰 Money Manager</div>
          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
            <NavLink to="/add-money" className={({ isActive }) => isActive ? 'active' : ''}>Add Money</NavLink>
            <NavLink to="/add-expense" className={({ isActive }) => isActive ? 'active' : ''}>Add Expense</NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''}>History</NavLink>
            <NavLink to="/statistics" className={({ isActive }) => isActive ? 'active' : ''}>Statistics</NavLink>
          </div>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard transactions={transactions} />} />
            <Route path="/add-money" element={<AddMoney onAdd={addTransaction} />} />
            <Route path="/add-expense" element={<AddExpense onAdd={addTransaction} />} />
            <Route path="/history" element={<History transactions={transactions} onDelete={deleteTransaction} />} />
            <Route path="/statistics" element={<Statistics transactions={transactions} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;