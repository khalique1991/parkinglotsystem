// src/features/auth/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@x.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;
      if (USE_MOCK) {
        const mod = await import('./auth.mock.js');
        res = await mod.loginMock({ email, password });
      } else {
        const mod = await import('./auth.api.js');
        res = await mod.login({ email, password });
      }
      const user = res.data.user || res.data;
      const token = res.data.token || 'token';
      login(user, token);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Sign in</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="border p-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          className="border p-2 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Signing...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
