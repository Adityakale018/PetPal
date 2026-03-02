import React, { useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DaycareBooking = () => {
  const [form, setForm] = useState({ pet_id: '', schedule_date: '', activity: '', notes: '' });
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
      await api.post('/daycare/book', form);
      setSuccess('Daycare slot booked!');
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-12">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Book Daycare Slot</h2>
          {success && <div className="text-green-600 mb-4">{success}</div>}
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <input name="pet_id" placeholder="Pet ID" value={form.pet_id} onChange={handleChange} required className="w-full mb-4 px-3 py-2 border rounded" />
          <input type="date" name="schedule_date" value={form.schedule_date} onChange={handleChange} required className="w-full mb-4 px-3 py-2 border rounded" />
          <input name="activity" placeholder="Activity (optional)" value={form.activity} onChange={handleChange} className="w-full mb-4 px-3 py-2 border rounded" />
          <textarea name="notes" placeholder="Notes (optional)" value={form.notes} onChange={handleChange} className="w-full mb-6 px-3 py-2 border rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Book</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default DaycareBooking;
