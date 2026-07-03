import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const statusColor = (status) => {
  if (status === 'available') return { bg: '#d1fae5', color: '#065f46' };
  if (status === 'adopted') return { bg: '#dbeafe', color: '#1e40af' };
  return { bg: '#fef3c7', color: '#92400e' };
};

const PetDetails = ({ showToast }) => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adoptLoading, setAdoptLoading] = useState(false);
  const [adoptMsg, setAdoptMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await api.get(`/pets/${id}`);
        setPet(res.data);
      } catch (err) {
        setError('Failed to load pet details. Please try again.');
      }
      setLoading(false);
    };
    fetchPet();
  }, [id]);

  const handleAdopt = async () => {
    setAdoptMsg({ text: '', type: '' });
    setAdoptLoading(true);
    try {
      await api.post('/adoptions/request', { pet_id: id });
      setAdoptMsg({ text: '🎉 Adoption request sent! We\'ll contact you soon.', type: 'success' });
      if (showToast) showToast('Adoption request sent!', 'success');
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to send request. Please log in first.';
      setAdoptMsg({ text: msg, type: 'error' });
    } finally {
      setAdoptLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f0f1a' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '32px 24px' }}>
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div style={{ marginBottom: '24px', fontSize: '0.85rem', color: '#64748b' }}>
            <Link to="/pets" style={{ color: '#a78bfa', textDecoration: 'none' }}>← Back to Pets</Link>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
              <div style={{
                width: '56px', height: '56px', border: '4px solid rgba(108,99,255,0.2)',
                borderTopColor: '#6C63FF', borderRadius: '50%', animation: 'spin 0.8s linear infinite',
              }} />
            </div>
          ) : error ? (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '16px', padding: '32px', textAlign: 'center', color: '#f87171' }}>
              ⚠️ {error}
            </div>
          ) : pet ? (
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px', overflow: 'hidden',
            }}>
              <div className="md:flex">
                {/* Pet Image */}
                <div style={{
                  minHeight: '300px', flex: '0 0 340px',
                  background: 'linear-gradient(135deg, #1a1a3e, #0f0f2e)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '8rem', position: 'relative',
                }}>
                  {pet.image_url ? (
                    <img src={pet.image_url} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span>🐕</span>
                  )}
                </div>

                {/* Pet Info */}
                <div style={{ flex: 1, padding: '40px 36px' }}>
                  {/* Status */}
                  {(() => { const s = statusColor(pet.status); return (
                    <span style={{
                      display: 'inline-block', padding: '4px 14px', borderRadius: '999px',
                      background: s.bg, color: s.color,
                      fontSize: '0.8rem', fontWeight: 700, marginBottom: '16px',
                      textTransform: 'capitalize',
                    }}>
                      {pet.status}
                    </span>
                  );})()}

                  <h1 style={{ fontWeight: 800, fontSize: '2rem', color: '#e2e8f0', marginBottom: '20px' }}>
                    {pet.name}
                  </h1>

                  {/* Info chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                    {pet.breed && (
                      <div style={{ padding: '8px 16px', borderRadius: '10px', background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.2)', fontSize: '0.88rem', color: '#a78bfa', fontWeight: 500 }}>
                        🦴 {pet.breed}
                      </div>
                    )}
                    {pet.age && (
                      <div style={{ padding: '8px 16px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', fontSize: '0.88rem', color: '#6ee7b7', fontWeight: 500 }}>
                        📅 {pet.age} years old
                      </div>
                    )}
                  </div>

                  {pet.description && (
                    <div style={{ marginBottom: '28px' }}>
                      <h3 style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>About</h3>
                      <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.95rem' }}>{pet.description}</p>
                    </div>
                  )}

                  {/* Adopt Button */}
                  {pet.status === 'available' && (
                    <button
                      onClick={handleAdopt}
                      disabled={adoptLoading}
                      className="btn-success"
                      style={{ width: '100%', maxWidth: '280px', opacity: adoptLoading ? 0.7 : 1 }}
                    >
                      {adoptLoading ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                          Sending...
                        </span>
                      ) : '🏠 Request Adoption'}
                    </button>
                  )}

                  {adoptMsg.text && (
                    <div style={{
                      marginTop: '16px', padding: '12px 16px', borderRadius: '10px',
                      background: adoptMsg.type === 'success' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                      border: `1px solid ${adoptMsg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                      color: adoptMsg.type === 'success' ? '#6ee7b7' : '#f87171',
                      fontSize: '0.9rem',
                    }}>
                      {adoptMsg.text}
                    </div>
                  )}

                  {/* Medical Records Link */}
                  <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <Link to={`/medical/${pet.id}`} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      color: '#a78bfa', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600,
                    }}>
                      🩺 View Medical Records →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default PetDetails;
