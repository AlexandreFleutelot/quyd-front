// src/pages/Login/Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BiHomeAlt2 } from 'react-icons/bi';
import { CiLock } from 'react-icons/ci';
import { API_ENDPOINTS, apiRequest, setAuthToken } from '../../config/api';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      setAuthToken(data.access_token);

      // Fetch user data
      const userData = await apiRequest(API_ENDPOINTS.USERS + '/me');
      await login(userData);
      navigate('/home');
    } catch (error) {
      setError('Incorrect username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Connectez-vous</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            <CiLock />
          </button>
        </form>
        <Link to="/" className="home-link">
          <BiHomeAlt2 />
        </Link>
      </div>
    </div>
  );
};

export default Login;