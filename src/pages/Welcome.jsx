import React, { useState } from 'react';
import './Welcome.css';

export default function Welcome({ onSetUser }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Please enter your name');
      return;
    }
    if (trimmedName.length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }
    setError('');
    onSetUser(trimmedName);
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="welcome-icon">💰</div>
        <h1>Money Manager</h1>
        <p className="welcome-subtitle">Track your income and expenses easily</p>
        
        <form onSubmit={handleSubmit} className="welcome-form">
          <div className="form-group">
            <label htmlFor="name">Enter your name to continue</label>
            <input
              id="name"
              type="text"
              placeholder="e.g., John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              className={error ? 'input-error' : ''}
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          <button type="submit" className="btn btn-welcome">
            Start Managing 💪
          </button>
        </form>

        <div className="welcome-footer">
          <p>Your data is stored securely in the cloud ☁️</p>
        </div>
      </div>
    </div>
  );
}