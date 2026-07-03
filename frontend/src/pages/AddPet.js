import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const categories = [
  { id: 1, label: '🐕 Dog' },
  { id: 2, label: '🐱 Cat' },
  { id: 3, label: '🐰 Rabbit' },
  { id: 4, label: '🦜 Bird' },
  { id: 5, label: '🐠 Fish' },
  { id: 6, label: '🐹 Small Animal' },
];

const FormField = ({ label, children }) => (
  <div style={{ marginBottom: '18px' }}>
    <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>
      {label}
    </label>
    {children}
  </div>
);

const AddPet = ({ showToast }) => {
  const [form, setForm] = useState({ name: '', age: '', breed: '', category_id: '', description: '', image_url: '' });
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
      await api.post('/pets/add', form);
      setSuccess('Pet added successfully! 🎉');
      setForm({ name: '', age: '', breed: '', category_id: '', description: '', image_url: '' });
      if (showToast) showToast('Pet added successfully!', 'success');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add pet. Please check your permissions.');
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
          <h1 style={{ fontWeight: 800, fontSize: '1.9rem', color: '#e2e8f0', marginBottom: '6px' }}>Add a Pet</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>List a pet for adoption or daycare</p>
        </div>
      </section>

      <main style={{ flex: 1, padding: '40px 24px' }}>
        <div className="max-w-2xl mx-auto">
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '24px', padding: '36px',
          }}>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                <FormField label="Pet Name *">
                  <input name="name" placeholder="e.g. Buddy" value={form.name} onChange={handleChange} required className="input-premium" />
                </FormField>
                <FormField label="Age (years)">
                  <input name="age" placeholder="e.g. 2" type="number" min="0" value={form.age} onChange={handleChange} className="input-premium" />
                </FormField>
              </div>

              <FormField label="Breed">
                <input name="breed" placeholder="e.g. Golden Retriever" value={form.breed} onChange={handleChange} className="input-premium" />
              </FormField>

              <FormField label="Category *">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {categories.map(cat => (
                    <label key={cat.id} style={{
                      padding: '8px 16px', borderRadius: '10px', cursor: 'pointer',
                      border: form.category_id === String(cat.id) ? '2px solid #6C63FF' : '2px solid rgba(255,255,255,0.07)',
                      background: form.category_id === String(cat.id) ? 'rgba(108,99,255,0.15)' : 'rgba(255,255,255,0.03)',
                      color: form.category_id === String(cat.id) ? '#a78bfa' : '#94a3b8',
                      fontSize: '0.85rem', fontWeight: 500, transition: 'all 0.2s',
                    }}>
                      <input type="radio" name="category_id" value={cat.id} checked={form.category_id === String(cat.id)} onChange={handleChange} style={{ display: 'none' }} />
                      {cat.label}
                    </label>
                  ))}
                </div>
              </FormField>

              <FormField label="Image URL (optional)">
                <input name="image_url" placeholder="https://..." value={form.image_url} onChange={handleChange} className="input-premium" />
              </FormField>

              <FormField label="Description">
                <textarea
                  name="description"
                  placeholder="Tell potential adopters about this pet's personality, habits, and needs..."
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="input-premium"
                  style={{ resize: 'vertical', minHeight: '100px' }}
                />
              </FormField>

              <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', marginTop: '8px', opacity: loading ? 0.7 : 1 }}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                    Adding pet...
                  </span>
                ) : '➕ Add Pet for Adoption'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default AddPet;
