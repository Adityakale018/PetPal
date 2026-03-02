import React, { useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AddMedicalRecord = ({ petId }) => {
  const [form, setForm] = useState({ record_date: '', description: '', veterinarian_id: '' });
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
      await api.post('/medical/add', { ...form, pet_id: petId });
      setSuccess('Medical record added!');
      setForm({ record_date: '', description: '', veterinarian_id: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add record');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-12">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Add Medical Record</h2>
          {success && <div className="text-green-600 mb-4">{success}</div>}
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <input type="date" name="record_date" value={form.record_date} onChange={handleChange} required className="w-full mb-4 px-3 py-2 border rounded" />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="w-full mb-4 px-3 py-2 border rounded" />
          <input name="veterinarian_id" placeholder="Veterinarian ID" value={form.veterinarian_id} onChange={handleChange} required className="w-full mb-6 px-3 py-2 border rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Add Record</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AddMedicalRecord;
