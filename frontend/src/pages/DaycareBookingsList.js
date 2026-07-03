import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const statusStyle = (status) => {
  if (status === 'confirmed') return { bg: 'rgba(16,185,129,0.12)', color: '#6ee7b7', border: 'rgba(16,185,129,0.25)', icon: '✅' };
  if (status === 'pending') return { bg: 'rgba(245,158,11,0.12)', color: '#fcd34d', border: 'rgba(245,158,11,0.25)', icon: '⏳' };
  if (status === 'cancelled') return { bg: 'rgba(239,68,68,0.12)', color: '#f87171', border: 'rgba(239,68,68,0.25)', icon: '❌' };
  return { bg: 'rgba(108,99,255,0.12)', color: '#a78bfa', border: 'rgba(108,99,255,0.25)', icon: '📋' };
};

const DaycareBookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/daycare/my-bookings');
        setBookings(res.data);
      } catch (err) {
        setError('Failed to load bookings.');
      }
      setLoading(false);
    };
    fetchBookings();
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
          <h1 style={{ fontWeight: 800, fontSize: '1.9rem', color: '#e2e8f0', marginBottom: '6px' }}>My Daycare Bookings</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>All your scheduled pet daycare sessions</p>
        </div>
      </section>

      <main style={{ flex: 1, padding: '32px 24px' }}>
        <div className="max-w-4xl mx-auto">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <Link to="/daycare" className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.88rem', padding: '9px 20px' }}>
              + New Booking
            </Link>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
              <div style={{ width: '48px', height: '48px', border: '4px solid rgba(108,99,255,0.2)', borderTopColor: '#6C63FF', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            </div>
          ) : error ? (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '16px', padding: '32px', textAlign: 'center', color: '#f87171' }}>
              ⚠️ {error}
            </div>
          ) : bookings.length === 0 ? (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '64px 32px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏡</div>
              <h3 style={{ color: '#e2e8f0', marginBottom: '8px' }}>No bookings yet</h3>
              <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '0.9rem' }}>Book your first daycare slot for your pet!</p>
              <Link to="/daycare" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Book Daycare</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {bookings.map((bk) => {
                const s = statusStyle(bk.status);
                return (
                  <div key={bk.id} className="card-hover" style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '16px', padding: '20px 24px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(108,99,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🐾</div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: '4px' }}>Pet ID: {bk.pet_id}</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.82rem', color: '#64748b' }}>
                            {bk.schedule_date && <span>📅 {new Date(bk.schedule_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>}
                            {bk.activity && <span>🎯 {bk.activity}</span>}
                          </div>
                          {bk.notes && <div style={{ marginTop: '6px', fontSize: '0.82rem', color: '#94a3b8' }}>📝 {bk.notes}</div>}
                        </div>
                      </div>
                      <span style={{ padding: '6px 16px', borderRadius: '999px', background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontSize: '0.8rem', fontWeight: 700, textTransform: 'capitalize', flexShrink: 0 }}>
                        {s.icon} {bk.status || 'pending'}
                      </span>
                    </div>
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

export default DaycareBookingsList;
