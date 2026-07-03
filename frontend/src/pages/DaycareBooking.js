import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const activities = ['Grooming', 'Training', 'Playtime', 'Walks', 'Socialization', 'Vet Checkup'];

const DaycareBooking = ({ showToast }) => {
  const [form, setForm] = useState({ pet_id: '', schedule_date: '', activity: '', notes: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await api.post('/daycare/book', form);
      setSuccess('Daycare slot booked successfully! 🎉');
      setForm({ pet_id: '', schedule_date: '', activity: '', notes: '' });
      if (showToast) showToast('Daycare slot booked!', 'success');
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f0f1a' }}>
      <Navbar />
      <section style={{
        background: 'linear-gradient(135deg, #1a1a3e 0%, #0f0f1a 100%)',
        borderBottom: '1px solid rgba(108,99,255,0.15)',
        padding: '40px 24px 32px',
      }}>
        <div className="max-w-2xl mx-auto">
          <div style={{ marginBottom: '12px', fontSize: '0.85rem' }}>
            <Link to="/dashboard" style={{ color: '#a78bfa', textDecoration: 'none' }}>← Dashboard</Link>
          </div>
          <h1 style={{ fontWeight: 800, fontSize: '1.9rem', color: '#e2e8f0', marginBottom: '6px' }}>🏡 Book Daycare</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Schedule a daycare session for your pet</p>
        </div>
      </section>

      <main style={{ flex: 1, padding: '40px 24px' }}>
        <div className="max-w-2xl mx-auto">
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '36px' }}>
            {success && (
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#6ee7b7', fontSize: '0.9rem' }}>
                ✅ {success}
              </div>
            )}
            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#f87171', fontSize: '0.9rem' }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>Pet ID *</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>🐾</span>
                  <input name="pet_id" placeholder="Enter your pet's ID" value={form.pet_id} onChange={handleChange} required className="input-premium" style={{ paddingLeft: '42px' }} />
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>Booking Date *</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>📅</span>
                  <input type="date" name="schedule_date" value={form.schedule_date} onChange={handleChange} required className="input-premium" style={{ paddingLeft: '42px' }} min={new Date().toISOString().split('T')[0]} />
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>Activity (optional)</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {activities.map(a => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setForm({ ...form, activity: form.activity === a ? '' : a })}
                      style={{
                        padding: '7px 16px', borderRadius: '10px', cursor: 'pointer',
                        border: form.activity === a ? '2px solid #6C63FF' : '2px solid rgba(255,255,255,0.07)',
                        background: form.activity === a ? 'rgba(108,99,255,0.15)' : 'rgba(255,255,255,0.03)',
                        color: form.activity === a ? '#a78bfa' : '#94a3b8',
                        fontSize: '0.84rem', fontWeight: 500, transition: 'all 0.2s',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>Additional Notes</label>
                <textarea name="notes" placeholder="Any special care instructions or requirements..." value={form.notes} onChange={handleChange} rows={3} className="input-premium" style={{ resize: 'vertical' }} />
              </div>

              <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', opacity: loading ? 0.7 : 1 }}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                    Booking...
                  </span>
                ) : '🏡 Book Daycare Slot'}
              </button>
            </form>
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Link to="/daycare/bookings" style={{ color: '#a78bfa', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>
              📋 View my bookings →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default DaycareBooking;
