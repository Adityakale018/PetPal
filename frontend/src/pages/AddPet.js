import React, { useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AddPet = () => {
  const [form, setForm] = useState({ name: '', age: '', breed: '', category_id: '', description: '', image_url: '' });
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
      await api.post('/pets/add', form);
      setSuccess('Pet added successfully!');
      setForm({ name: '', age: '', breed: '', category_id: '', description: '', image_url: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add pet');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-12">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Add a Pet for Adoption/Daycare</h2>
          {success && <div className="text-green-600 mb-4">{success}</div>}
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="w-full mb-4 px-3 py-2 border rounded" />
          <input name="age" placeholder="Age" value={form.age} onChange={handleChange} className="w-full mb-4 px-3 py-2 border rounded" />
          <input name="breed" placeholder="Breed" value={form.breed} onChange={handleChange} className="w-full mb-4 px-3 py-2 border rounded" />
          <input name="category_id" placeholder="Category ID" value={form.category_id} onChange={handleChange} required className="w-full mb-4 px-3 py-2 border rounded" />
          <input name="image_url" placeholder="Image URL (optional)" value={form.image_url} onChange={handleChange} className="w-full mb-4 px-3 py-2 border rounded" />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full mb-6 px-3 py-2 border rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Add Pet</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AddPet;
