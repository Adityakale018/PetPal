import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MedicalRecords = ({ petId }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!petId) return;
    const fetchRecords = async () => {
      try {
        const res = await api.get(`/medical/${petId}`);
        setRecords(res.data);
      } catch (err) {
        setError('Failed to load medical records');
      }
      setLoading(false);
    };
    fetchRecords();
  }, [petId]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Medical Records</h2>
        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : records.length === 0 ? (
          <div>No medical records found for this pet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {records.map((rec) => (
              <div key={rec.id} className="bg-white dark:bg-gray-800 rounded shadow p-4">
                <div className="font-bold mb-2">Date: {rec.record_date}</div>
                <div>Description: {rec.description}</div>
                <div>Vet ID: {rec.veterinarian_id}</div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MedicalRecords;
