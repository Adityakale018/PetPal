import React, { useEffect, useState } from 'react';
import api from '../services/api';

// NOTE: This is a sub-component used inside PetMedical.js.
// It does NOT render its own Navbar/Footer to avoid duplication.
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
        setError('Failed to load medical records.');
      }
      setLoading(false);
    };
    fetchRecords();
  }, [petId]);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid rgba(108,99,255,0.2)', borderTopColor: '#6C63FF', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (error) return (
    <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '16px', padding: '24px', color: '#f87171', textAlign: 'center' }}>
      ⚠️ {error}
    </div>
  );

  if (records.length === 0) return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '48px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🩺</div>
      <p style={{ color: '#64748b' }}>No medical records found for this pet.</p>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {records.map((rec) => (
        <div key={rec.id} style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '14px', padding: '18px 22px',
          display: 'flex', alignItems: 'flex-start', gap: '14px',
        }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
            🩺
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
              <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '0.95rem' }}>
                {new Date(rec.record_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              {rec.veterinarian_id && (
                <span style={{ padding: '2px 10px', borderRadius: '999px', background: 'rgba(108,99,255,0.1)', color: '#a78bfa', fontSize: '0.75rem', fontWeight: 600 }}>
                  Vet #{rec.veterinarian_id}
                </span>
              )}
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{rec.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MedicalRecords;
