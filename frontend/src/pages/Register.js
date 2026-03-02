import React, { useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'adopter' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const regRes = await api.post('/users/register', form);
      // Auto-login after registration
      const loginRes = await api.post('/users/login', { email: form.email, password: form.password });
      localStorage.setItem('token', loginRes.data.token);
      const userRes = await api.get('/users/me', { headers: { Authorization: 'Bearer ' + loginRes.data.token } });
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
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-12">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          {success && <div className="text-green-600 mb-4">{success}</div>}
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="w-full mb-4 px-3 py-2 border rounded" />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full mb-4 px-3 py-2 border rounded" />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full mb-4 px-3 py-2 border rounded" />
          <select name="role" value={form.role} onChange={handleChange} className="w-full mb-6 px-3 py-2 border rounded">
            <option value="adopter">Adopter</option>
            <option value="donor">Donor</option>
            <option value="daycare_owner">Daycare Owner</option>
          </select>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Register</button>
          <div className="mt-4 text-center text-sm">
            Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
