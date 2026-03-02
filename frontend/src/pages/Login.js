import React, { useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      // Fetch user info to get role
      const userRes = await api.get('/users/me', { headers: { Authorization: 'Bearer ' + res.data.token } });
      localStorage.setItem('user', JSON.stringify(userRes.data));
      // Redirect based on role
      if (userRes.data.role === 'adopter') {
        window.location.href = '/dashboard';
      } else if (userRes.data.role === 'donor') {
        window.location.href = '/dashboard';
      } else if (userRes.data.role === 'daycare_owner') {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-12">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full mb-4 px-3 py-2 border rounded" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full mb-6 px-3 py-2 border rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Login</button>
          <div className="mt-4 text-center text-sm">
            Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
