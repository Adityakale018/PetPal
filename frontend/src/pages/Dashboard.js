import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!user.role) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-12">
          <div className="bg-white dark:bg-gray-800 p-8 rounded shadow text-center">
            <h2 className="text-2xl font-bold mb-4">Please log in to view your dashboard.</h2>
            <a href="/login" className="text-blue-600 hover:underline">Go to Login</a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Welcome, {user.name}!</h2>
        {user.role === 'adopter' && (
          <div className="space-y-4">
            <a href="/pets" className="block bg-blue-600 text-white px-6 py-3 rounded shadow">Browse Pets</a>
            <a href="/adoptions" className="block bg-green-600 text-white px-6 py-3 rounded shadow">My Adoption Requests</a>
            <a href="/daycare/bookings" className="block bg-yellow-500 text-white px-6 py-3 rounded shadow">My Daycare Bookings</a>
            <a href="/feedback" className="block bg-purple-600 text-white px-6 py-3 rounded shadow">Feedback</a>
          </div>
        )}
        {user.role === 'donor' && (
          <div className="space-y-4">
            <a href="/pets/add" className="block bg-blue-600 text-white px-6 py-3 rounded shadow">Add Pet for Adoption</a>
            <a href="/feedback" className="block bg-purple-600 text-white px-6 py-3 rounded shadow">View Feedback</a>
          </div>
        )}
        {user.role === 'daycare_owner' && (
          <div className="space-y-4">
            <a href="/daycare/register" className="block bg-blue-600 text-white px-6 py-3 rounded shadow">Register Daycare Center</a>
            <a href="/feedback" className="block bg-purple-600 text-white px-6 py-3 rounded shadow">View Feedback</a>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
