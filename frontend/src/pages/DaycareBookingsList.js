import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DaycareBookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/daycare/my-bookings');
        setBookings(res.data);
      } catch (err) {
        setError('Failed to load bookings');
      }
      setLoading(false);
    };
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">My Daycare Bookings</h2>
        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : bookings.length === 0 ? (
          <div>No daycare bookings found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((bk) => (
              <div key={bk.id} className="bg-white dark:bg-gray-800 rounded shadow p-4">
                <div className="font-bold mb-2">Pet ID: {bk.pet_id}</div>
                <div>Date: {bk.schedule_date}</div>
                <div>Activity: {bk.activity}</div>
                <div>Status: <span className="font-semibold">{bk.status}</span></div>
                <div>Notes: {bk.notes}</div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DaycareBookingsList;
