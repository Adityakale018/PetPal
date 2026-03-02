import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-pink-100 dark:from-gray-900 dark:to-gray-800">
    <Navbar />
    <main className="flex-1 flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold mb-4">Welcome to Pet Adoption & Care</h1>
      <p className="mb-8 text-lg text-gray-700 dark:text-gray-200">Find, adopt, or care for your furry friends!</p>
      <img src="/logo.svg" alt="Pet Platform Logo" className="w-32 h-32 mb-6 animate-bounce" />
      <a href="/pets" className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition">Browse Pets</a>
    </main>
    <Footer />
  </div>
);

export default Home;
