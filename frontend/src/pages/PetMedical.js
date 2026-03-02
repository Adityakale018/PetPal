import React, { useState } from 'react';
import MedicalRecords from './MedicalRecords';
import AddMedicalRecord from './AddMedicalRecord';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PetMedical = () => {
  const { petId } = useParams();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Pet Medical Records</h2>
          <button onClick={() => setShowAdd(!showAdd)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            {showAdd ? 'View Records' : 'Add Medical Record'}
          </button>
        </div>
        {showAdd ? <AddMedicalRecord petId={petId} /> : <MedicalRecords petId={petId} />}
      </main>
      <Footer />
    </div>
  );
};

export default PetMedical;
