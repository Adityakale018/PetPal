import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const roles = [
  { value: 'adopter', label: '🏠 Adopter', desc: 'Looking to adopt a pet' },
  { value: 'donor', label: '🎁 Donor', desc: 'Donating pets for adoption' },
  { value: 'daycare_owner', label: '🏡 Daycare Owner', desc: 'Running a pet daycare center' },
];

const Register = ({ showToast }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'adopter' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/users/register', form);
      // Auto-login after registration
      const loginRes = await api.post('/users/login', { email: form.email, password: form.password });
      localStorage.setItem('token', loginRes.data.token);
      const userRes = await api.get('/users/me', {
        headers: { Authorization: 'Bearer ' + loginRes.data.token },
      });
      localStorage.setItem('user', JSON.stringify(userRes.data));
      if (showToast) showToast('Account created! Welcome to PetPal 🎉', 'success');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f0f1a' }}>
      <Navbar />
      <main style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px 16px',
        background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a3e 50%, #0f1a2e 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{
          width: '100%', maxWidth: '480px', position: 'relative',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '24px', border: '1px solid rgba(108,99,255,0.2)',
          padding: '40px 36px', boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontSize: '2.8rem', marginBottom: '12px' }}>🐾</div>
            <h2 style={{ fontWeight: 800, fontSize: '1.7rem', color: '#e2e8f0', margin: 0 }}>
              Create Account
            </h2>
            <p style={{ color: '#64748b', marginTop: '6px', fontSize: '0.9rem' }}>
              Join PetPal and make a difference
            </p>
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: '10px', padding: '12px 16px', marginBottom: '20px',
              color: '#f87171', fontSize: '0.88rem',
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>👤</span>
                <input type="text" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required className="input-premium" style={{ paddingLeft: '42px' }} />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>✉️</span>
                <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required className="input-premium" style={{ paddingLeft: '42px' }} />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>🔒</span>
                <input type={showPass ? 'text' : 'password'} name="password" placeholder="Create a strong password" value={form.password} onChange={handleChange} required className="input-premium" style={{ paddingLeft: '42px', paddingRight: '42px' }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '10px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>I am a...</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {roles.map(r => (
                  <label key={r.value} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px 16px', borderRadius: '12px', cursor: 'pointer',
                    border: form.role === r.value ? '2px solid #6C63FF' : '2px solid rgba(255,255,255,0.07)',
                    background: form.role === r.value ? 'rgba(108,99,255,0.12)' : 'rgba(255,255,255,0.03)',
                    transition: 'all 0.2s',
                  }}>
                    <input type="radio" name="role" value={r.value} checked={form.role === r.value} onChange={handleChange} style={{ display: 'none' }} />
                    <span style={{ fontSize: '1.2rem' }}>{r.label.split(' ')[0]}</span>
                    <div>
                      <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.9rem' }}>{r.label.split(' ').slice(1).join(' ')}</div>
                      <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{r.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', opacity: loading ? 0.7 : 1 }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                  Creating account...
                </span>
              ) : '🚀 Create Account'}
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.88rem', color: '#64748b' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#a78bfa', fontWeight: 600, textDecoration: 'none' }}>Sign in →</Link>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Register;
