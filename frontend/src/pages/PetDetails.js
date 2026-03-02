import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adoptMsg, setAdoptMsg] = useState('');

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await api.get(`/pets/${id}`);
        setPet(res.data);
      } catch (err) {
        setError('Failed to load pet details');
      }
      setLoading(false);
    };
    fetchPet();
  }, [id]);

  const handleAdopt = async () => {
    setAdoptMsg('');
    try {
      await api.post('/adoptions/request', { pet_id: id });
      setAdoptMsg('Adoption request sent!');
    } catch (err) {
      setAdoptMsg(err.response?.data?.error || 'Failed to send request');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto py-8">
        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : pet ? (
          <div className="bg-white dark:bg-gray-800 rounded shadow p-8 max-w-xl mx-auto flex flex-col items-center">
            <img src={pet.image_url || '/logo.svg'} alt={pet.name} className="w-40 h-40 object-cover rounded-full mb-4" />
            <div className="font-bold text-2xl mb-2">{pet.name}</div>
            <div className="mb-1">Breed: {pet.breed || 'Unknown'}</div>
            <div className="mb-1">Age: {pet.age || 'N/A'}</div>
            <div className="mb-1">Status: {pet.status}</div>
            <div className="mb-4">{pet.description}</div>
            <button onClick={handleAdopt} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Request Adoption</button>
            {adoptMsg && <div className="mt-4 text-blue-600">{adoptMsg}</div>}
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default PetDetails;
