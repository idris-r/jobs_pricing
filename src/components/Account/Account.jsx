import React, { useState } from 'react';
import './Account.css';
import { useAuth } from '../../context/AuthContext';
import { SectionHeader, Button } from '../common/CommonComponents';
import { CreditCardIcon } from '@heroicons/react/24/outline';

const Account = () => {
  const { user, login, register, logout } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = isLogin 
      ? login(email, password)
      : register(email, password);

    if (!success) {
      setError(isLogin 
        ? 'Invalid email or password' 
        : 'Email already exists'
      );
    } else {
      setEmail('');
      setPassword('');
    }
  };

  if (user) {
    return (
      <div className="account-section">
        <SectionHeader>Account</SectionHeader>
        <div className="auth-container">
          <div className="user-info">
            <p>Logged in as: {user.email}</p>
            <div className="token-balance">
              <CreditCardIcon className="token-icon" />
              <span className="token-amount">{user.tokenBalance} tokens available</span>
            </div>
            <Button onClick={logout}>Logout</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-section">
      <SectionHeader>{isLogin ? 'Login' : 'Register'}</SectionHeader>
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <Button type="submit">
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </form>
        <div className="auth-switch">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <button onClick={() => setIsLogin(false)}>Register</button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => setIsLogin(true)}>Login</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
