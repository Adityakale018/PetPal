import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdoptionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get('/adoptions/status');
        setRequests(res.data);
      } catch (err) {
        setError('Failed to load adoption requests');
      }
      setLoading(false);
    };
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">My Adoption Requests</h2>
        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : requests.length === 0 ? (
          <div>No adoption requests found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requests.map((req) => (
              <div key={req.id} className="bg-white dark:bg-gray-800 rounded shadow p-4">
                <div className="font-bold mb-2">Pet ID: {req.pet_id}</div>
                <div>Status: <span className="font-semibold">{req.status}</span></div>
                <div>Requested At: {new Date(req.created_at).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdoptionRequests;
