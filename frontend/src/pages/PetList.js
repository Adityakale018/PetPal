import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const speciesEmoji = (name = '', breed = '') => {
  const combined = (name + breed).toLowerCase();
  if (combined.includes('cat') || combined.includes('kitten')) return '🐱';
  if (combined.includes('bird') || combined.includes('parrot')) return '🦜';
  if (combined.includes('rabbit') || combined.includes('bunny')) return '🐰';
  if (combined.includes('fish')) return '🐠';
  return '🐕';
};

const statusColor = (status) => {
  if (status === 'available') return { bg: '#d1fae5', color: '#065f46' };
  if (status === 'adopted') return { bg: '#dbeafe', color: '#1e40af' };
  return { bg: '#fef3c7', color: '#92400e' };
};

const PetList = ({ showToast }) => {
  const [pets, setPets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await api.get('/pets');
        setPets(res.data);
        setFiltered(res.data);
      } catch (err) {
        setError('Failed to load pets. Please check your connection.');
      }
      setLoading(false);
    };
    fetchPets();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(pets.filter(p =>
      p.name?.toLowerCase().includes(q) ||
      p.breed?.toLowerCase().includes(q) ||
      p.status?.toLowerCase().includes(q)
    ));
  }, [search, pets]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f0f1a' }}>
      <Navbar />

      {/* Page Header */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a3e 0%, #0f0f1a 100%)',
        borderBottom: '1px solid rgba(108,99,255,0.15)',
        padding: '48px 24px 40px',
      }}>
        <div className="max-w-6xl mx-auto">
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '4px 14px', borderRadius: '999px',
            background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.25)',
            fontSize: '0.82rem', fontWeight: 600, color: '#a78bfa', marginBottom: '16px',
          }}>
            🐾 Available Pets
          </div>
          <h1 style={{ fontWeight: 800, fontSize: '2.2rem', color: '#e2e8f0', marginBottom: '8px' }}>
            Find Your Perfect Companion
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem' }}>
            Browse our lovely pets waiting for a forever home
          </p>
        </div>
      </section>

      <main style={{ flex: 1, padding: '32px 24px' }}>
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div style={{ marginBottom: '32px', position: 'relative', maxWidth: '480px' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem' }}>🔍</span>
            <input
              type="text"
              placeholder="Search by name, breed, or status..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-premium"
              style={{ paddingLeft: '44px' }}
            />
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '56px', height: '56px', border: '4px solid rgba(108,99,255,0.2)',
                  borderTopColor: '#6C63FF', borderRadius: '50%',
                  margin: '0 auto 16px',
                  animation: 'spin 0.8s linear infinite',
                }} />
                <p style={{ color: '#64748b' }}>Loading pets...</p>
              </div>
            </div>
          ) : error ? (
            <div style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: '16px', padding: '32px', textAlign: 'center', color: '#f87171',
            }}>
              ⚠️ {error}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px', padding: '64px 32px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🐾</div>
              <h3 style={{ color: '#e2e8f0', marginBottom: '8px' }}>No pets found</h3>
              <p style={{ color: '#64748b' }}>
                {search ? 'Try a different search term.' : 'No pets are currently available for adoption.'}
              </p>
            </div>
          ) : (
            <>
              <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '20px' }}>
                Showing {filtered.length} pet{filtered.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((pet) => {
                  const s = statusColor(pet.status);
                  return (
                    <div
                      key={pet.id}
                      className="card-hover"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '20px', overflow: 'hidden',
                      }}
                    >
                      {/* Pet Image */}
                      <div style={{
                        height: '180px', background: 'linear-gradient(135deg, #1a1a3e, #0f0f2e)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '5rem', position: 'relative',
                      }}>
                        {pet.image_url ? (
                          <img src={pet.image_url} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span>{speciesEmoji(pet.name, pet.breed)}</span>
                        )}
                        {/* Status badge */}
                        <span style={{
                          position: 'absolute', top: '12px', right: '12px',
                          padding: '4px 12px', borderRadius: '999px',
                          fontSize: '0.75rem', fontWeight: 700,
                          background: s.bg, color: s.color,
                          textTransform: 'capitalize',
                        }}>
                          {pet.status}
                        </span>
                      </div>

                      {/* Pet Info */}
                      <div style={{ padding: '20px' }}>
                        <h3 style={{ fontWeight: 700, fontSize: '1.15rem', color: '#e2e8f0', marginBottom: '8px' }}>
                          {pet.name}
                        </h3>
                        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                          {pet.breed && (
                            <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>🦴 {pet.breed}</span>
                          )}
                          {pet.age && (
                            <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>📅 {pet.age} yrs</span>
                          )}
                        </div>
                        <Link
                          to={`/pets/${pet.id}`}
                          style={{
                            display: 'block', textAlign: 'center',
                            padding: '10px 20px', borderRadius: '10px',
                            background: 'linear-gradient(135deg, #6C63FF, #4F46E5)',
                            color: 'white', fontWeight: 600, fontSize: '0.9rem',
                            textDecoration: 'none', transition: 'all 0.2s',
                          }}
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default PetList;
