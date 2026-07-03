import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const statusStyle = (status) => {
  if (status === 'approved') return { bg: 'rgba(16,185,129,0.12)', color: '#6ee7b7', border: 'rgba(16,185,129,0.25)', icon: '✅' };
  if (status === 'pending') return { bg: 'rgba(245,158,11,0.12)', color: '#fcd34d', border: 'rgba(245,158,11,0.25)', icon: '⏳' };
  if (status === 'rejected') return { bg: 'rgba(239,68,68,0.12)', color: '#f87171', border: 'rgba(239,68,68,0.25)', icon: '❌' };
  return { bg: 'rgba(108,99,255,0.12)', color: '#a78bfa', border: 'rgba(108,99,255,0.25)', icon: '📋' };
};

const AdoptionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get('/adoptions/status');
        setRequests(res.data);
      } catch (err) {
        setError('Failed to load adoption requests.');
      }
      setLoading(false);
    };
    fetchRequests();
  }, []);

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
            <Link to="/dashboard" style={{ color: '#a78bfa', textDecoration: 'none' }}>← Dashboard</Link>
          </div>
          <h1 style={{ fontWeight: 800, fontSize: '1.9rem', color: '#e2e8f0', marginBottom: '6px' }}>My Adoption Requests</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Track the status of your pet adoption applications</p>
        </div>
      </section>

      <main style={{ flex: 1, padding: '32px 24px' }}>
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
              <div style={{ width: '48px', height: '48px', border: '4px solid rgba(108,99,255,0.2)', borderTopColor: '#6C63FF', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            </div>
          ) : error ? (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '16px', padding: '32px', textAlign: 'center', color: '#f87171' }}>
              ⚠️ {error}
            </div>
          ) : requests.length === 0 ? (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '64px 32px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</div>
              <h3 style={{ color: '#e2e8f0', marginBottom: '8px' }}>No adoption requests yet</h3>
              <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '0.9rem' }}>Browse our pets and submit your first adoption request!</p>
              <Link to="/pets" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Browse Pets</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {requests.map((req) => {
                const s = statusStyle(req.status);
                return (
                  <div key={req.id} className="card-hover" style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '16px', padding: '20px 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '48px', height: '48px', borderRadius: '12px',
                        background: 'rgba(108,99,255,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                      }}>🐾</div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: '4px' }}>Pet ID: {req.pet_id}</div>
                        <div style={{ color: '#64748b', fontSize: '0.82rem' }}>
                          Requested: {new Date(req.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    <span style={{
                      padding: '6px 16px', borderRadius: '999px',
                      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                      fontSize: '0.82rem', fontWeight: 700, textTransform: 'capitalize',
                    }}>
                      {s.icon} {req.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default AdoptionRequests;
