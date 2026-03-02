import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [form, setForm] = useState({ pet_id: '', rating: '', comment: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const res = await api.get('/feedback/all');
      setFeedback(res.data);
    } catch (err) {
      setError('Failed to load feedback');
    }
    setLoading(false);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/feedback/submit', form);
      setSuccess('Feedback submitted!');
      setForm({ pet_id: '', rating: '', comment: '' });
      fetchFeedback();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit feedback');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Feedback</h2>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-8 max-w-lg mx-auto">
          {success && <div className="text-green-600 mb-4">{success}</div>}
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <input name="pet_id" placeholder="Pet ID (optional)" value={form.pet_id} onChange={handleChange} className="w-full mb-4 px-3 py-2 border rounded" />
          <input name="rating" placeholder="Rating (1-5)" value={form.rating} onChange={handleChange} required className="w-full mb-4 px-3 py-2 border rounded" />
          <textarea name="comment" placeholder="Comment" value={form.comment} onChange={handleChange} required className="w-full mb-6 px-3 py-2 border rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Submit Feedback</button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="text-center text-lg">Loading...</div>
          ) : feedback.length === 0 ? (
            <div>No feedback yet.</div>
          ) : (
            feedback.map(fb => (
              <div key={fb.id} className="bg-white dark:bg-gray-800 rounded shadow p-4">
                <div className="font-bold mb-2">Rating: {fb.rating} / 5</div>
                <div className="mb-1">{fb.comment}</div>
                <div className="text-sm text-gray-500">Pet ID: {fb.pet_id || 'N/A'}</div>
                <div className="text-sm text-gray-400">By User: {fb.user_id}</div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Feedback;
