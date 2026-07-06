import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddMoney from './pages/AddMoney';
import AddExpense from './pages/AddExpense';
import History from './pages/History';
import Statistics from './pages/Statistics';
import Welcome from './pages/Welcome';
import { getTransactions, addTransaction, deleteTransaction } from './supabase';
import './App.css';

function App() {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('money_manager_user') || '';
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load transactions from Supabase on mount
  useEffect(() => {
    if (userName) {
      loadTransactions();
    }
  }, [userName]);

  const loadTransactions = async () => {
    setLoading(true);
    const data = await getTransactions();
    setTransactions(data);
    setLoading(false);
  };

  const handleSetUser = (name) => {
    localStorage.setItem('money_manager_user', name);
    setUserName(name);
  };

  const handleAddTransaction = async (tx) => {
    try {
      const newTx = await addTransaction(tx);
      setTransactions(prev => [newTx, ...prev]);
      return newTx;
    } catch (error) {
      alert('Failed to add transaction. Please try again.');
      throw error;
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      alert('Failed to delete transaction. Please try again.');
      throw error;
    }
  };

  // If no user, show welcome screen
  if (!userName) {
    return <Welcome onSetUser={handleSetUser} />;
  }

  // Loading state
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#2a7de1'
      }}>
        Loading your transactions...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-brand">
            💰 Money Manager
            <span className="user-badge">👋 {userName}</span>
          </div>
          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
            <NavLink to="/add-money" className={({ isActive }) => isActive ? 'active' : ''}>Add Money</NavLink>
            <NavLink to="/add-expense" className={({ isActive }) => isActive ? 'active' : ''}>Add Expense</NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''}>History</NavLink>
            <NavLink to="/statistics" className={({ isActive }) => isActive ? 'active' : ''}>Statistics</NavLink>
            <button 
              className="btn btn-outline" 
              onClick={() => {
                if (window.confirm('Are you sure you want to logout?')) {
                  localStorage.removeItem('money_manager_user');
                  setUserName('');
                }
              }}
              style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}
            >
              Logout
            </button>
          </div>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard transactions={transactions} />} />
            <Route path="/add-money" element={<AddMoney onAdd={handleAddTransaction} />} />
            <Route path="/add-expense" element={<AddExpense onAdd={handleAddTransaction} />} />
            <Route path="/history" element={<History transactions={transactions} onDelete={handleDeleteTransaction} />} />
            <Route path="/statistics" element={<Statistics transactions={transactions} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;