import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MedicalRecords from './MedicalRecords';
import AddMedicalRecord from './AddMedicalRecord';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PetMedical = () => {
  const { petId } = useParams();
  const [activeTab, setActiveTab] = useState('records'); // 'records' | 'add'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f0f1a' }}>
      <Navbar />

      <section style={{
        background: 'linear-gradient(135deg, #1a1a3e 0%, #0f0f1a 100%)',
        borderBottom: '1px solid rgba(108,99,255,0.15)',
        padding: '40px 24px 32px',
      }}>
        <div className="max-w-4xl mx-auto">
          <div style={{ marginBottom: '12px', fontSize: '0.85rem' }}>
            <Link to="/pets" style={{ color: '#a78bfa', textDecoration: 'none' }}>← Back to Pets</Link>
          </div>
          <h1 style={{ fontWeight: 800, fontSize: '1.9rem', color: '#e2e8f0', marginBottom: '6px' }}>
            🩺 Medical Records
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Pet ID: {petId}</p>
        </div>
      </section>

      <main style={{ flex: 1, padding: '32px 24px' }}>
        <div className="max-w-4xl mx-auto">
          {/* Tab Buttons */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '28px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '4px', width: 'fit-content' }}>
            {[
              { key: 'records', label: '📋 View Records' },
              { key: 'add', label: '➕ Add Record' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '9px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                  fontWeight: 600, fontSize: '0.88rem', transition: 'all 0.2s',
                  fontFamily: 'Inter, sans-serif',
                  background: activeTab === tab.key ? 'linear-gradient(135deg, #6C63FF, #4F46E5)' : 'transparent',
                  color: activeTab === tab.key ? 'white' : '#64748b',
                  boxShadow: activeTab === tab.key ? '0 4px 12px rgba(108,99,255,0.35)' : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'records' ? (
            <MedicalRecords petId={petId} />
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px' }}>
              <AddMedicalRecord petId={petId} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PetMedical;
