import React, { useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DaycareRegister = () => {
  const [form, setForm] = useState({ name: '', address: '', contact: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/daycare/register', form);
      setSuccess('Daycare registered successfully!');
      setForm({ name: '', address: '', contact: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to register daycare');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-12">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Register Your Daycare Center</h2>
          {success && <div className="text-green-600 mb-4">{success}</div>}
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <input name="name" placeholder="Daycare Name" value={form.name} onChange={handleChange} required className="w-full mb-4 px-3 py-2 border rounded" />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required className="w-full mb-4 px-3 py-2 border rounded" />
          <input name="contact" placeholder="Contact Info" value={form.contact} onChange={handleChange} className="w-full mb-6 px-3 py-2 border rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Register Daycare</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default DaycareRegister;
