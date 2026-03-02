import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await api.get('/pets');
        setPets(res.data);
      } catch (err) {
        setError('Failed to load pets');
      }
      setLoading(false);
    };
    fetchPets();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Available Pets</h2>
        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : pets.length === 0 ? (
          <div>No pets available for adoption.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div key={pet.id} className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col items-center">
                <img src={pet.image_url || '/logo.svg'} alt={pet.name} className="w-32 h-32 object-cover rounded-full mb-4" />
                <div className="font-bold text-lg mb-2">{pet.name}</div>
                <div className="mb-1">Breed: {pet.breed || 'Unknown'}</div>
                <div className="mb-1">Age: {pet.age || 'N/A'}</div>
                <div className="mb-1">Status: {pet.status}</div>
                <a href={`/pets/${pet.id}`} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">View Details</a>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PetList;
