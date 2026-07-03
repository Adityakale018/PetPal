import React, { useState } from 'react';
import api from '../services/api';

// NOTE: This is a sub-component used inside PetMedical.js.
// It does NOT render its own Navbar/Footer to avoid duplication.
const AddMedicalRecord = ({ petId }) => {
  const [form, setForm] = useState({ record_date: '', description: '', veterinarian_id: '' });
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
      await api.post('/medical/add', { ...form, pet_id: petId });
      setSuccess('Medical record added successfully!');
      setForm({ record_date: '', description: '', veterinarian_id: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add medical record.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '560px' }}>
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
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>Record Date *</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>📅</span>
            <input type="date" name="record_date" value={form.record_date} onChange={handleChange} required className="input-premium" style={{ paddingLeft: '42px' }} />
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>Description *</label>
          <textarea name="description" placeholder="Describe the medical visit, treatment, or diagnosis..." value={form.description} onChange={handleChange} required rows={4} className="input-premium" style={{ resize: 'vertical' }} />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>Veterinarian ID *</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>👨‍⚕️</span>
            <input name="veterinarian_id" placeholder="Vet's ID number" value={form.veterinarian_id} onChange={handleChange} required className="input-premium" style={{ paddingLeft: '42px' }} />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-success" style={{ width: '100%', opacity: loading ? 0.7 : 1 }}>
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span style={{ width: '15px', height: '15px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
              Adding...
            </span>
          ) : '🩺 Add Medical Record'}
        </button>
      </form>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default AddMedicalRecord;
