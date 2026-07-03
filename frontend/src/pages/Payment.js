import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Payment = ({ purpose = 'donation', ref_id = null }) => {
  const [amount, setAmount] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const quickAmounts = [100, 500, 1000, 2500, 5000];

  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  })();

  const loadRazorpay = () => new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f0f1a' }}>
        <Navbar />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(108,99,255,0.2)',
            borderRadius: '24px', padding: '56px 48px', textAlign: 'center', maxWidth: '400px',
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>🔒</div>
            <h2 style={{ fontWeight: 800, color: '#e2e8f0', marginBottom: '12px', fontSize: '1.5rem' }}>
              Sign In Required
            </h2>
            <p style={{ color: '#64748b', marginBottom: '28px', fontSize: '0.92rem' }}>
              Please log in to make a donation or payment.
            </p>
            <Link to="/login" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
              🔑 Go to Login
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleCreateOrder = async e => {
    e.preventDefault();
    setError('');
    setMsg('');
    setLoading(true);
    try {
      const res = await api.post('/payments/create-order', { amount });
      const loaded = await loadRazorpay();
      if (!loaded) { setError('Payment gateway failed to load. Please try again.'); setLoading(false); return; }
      handlePayment(res.data);
    } catch (err) {
      setError('Failed to create payment order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = (orderData) => {
    if (!window.Razorpay) { setError('Razorpay SDK not loaded'); return; }
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_cSaPgCCDgkPbkb',
      amount: orderData.amount,
      currency: 'INR',
      name: 'PetPal',
      description: 'Donation for Pet Care',
      order_id: orderData.id,
      handler: async function (response) {
        try {
          await api.post('/payments/verify', {
            order_id: orderData.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            purpose,
            ref_id,
          });
          setMsg('Payment successful and verified! Thank you for your support 🎉');
        } catch (err) {
          setError('Payment verification failed. Contact support with your payment ID.');
        }
      },
      prefill: {},
      theme: { color: '#6C63FF' },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
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
          <h1 style={{ fontWeight: 800, fontSize: '1.9rem', color: '#e2e8f0', marginBottom: '6px' }}>💳 Make a Donation</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Support our mission to help pets find loving homes</p>
        </div>
      </section>

      <main style={{ flex: 1, padding: '40px 24px' }}>
        <div className="max-w-2xl mx-auto">
          {/* Impact card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(79,70,229,0.06))',
            border: '1px solid rgba(108,99,255,0.2)',
            borderRadius: '16px', padding: '20px 24px', marginBottom: '24px',
          }}>
            <div style={{ fontWeight: 700, color: '#a78bfa', marginBottom: '12px', fontSize: '0.95rem' }}>
              💜 Your donation makes a difference
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { amount: '₹100', impact: 'Feeds a pet for a week' },
                { amount: '₹500', impact: 'Covers vet checkup' },
                { amount: '₹1000', impact: 'Sponsors adoption process' },
              ].map(item => (
                <div key={item.amount}>
                  <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '1rem' }}>{item.amount}</div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '2px' }}>{item.impact}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '36px' }}>
            {msg && <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#6ee7b7', fontSize: '0.9rem' }}>✅ {msg}</div>}
            {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#f87171', fontSize: '0.9rem' }}>⚠️ {error}</div>}

            <form onSubmit={handleCreateOrder}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '10px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>Quick Select Amount (INR)</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  {quickAmounts.map(a => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAmount(String(a))}
                      style={{
                        padding: '8px 18px', borderRadius: '10px', cursor: 'pointer',
                        border: amount === String(a) ? '2px solid #6C63FF' : '2px solid rgba(255,255,255,0.07)',
                        background: amount === String(a) ? 'rgba(108,99,255,0.15)' : 'rgba(255,255,255,0.03)',
                        color: amount === String(a) ? '#a78bfa' : '#94a3b8',
                        fontSize: '0.88rem', fontWeight: 600, transition: 'all 0.2s',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      ₹{a}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>Custom Amount (INR) *</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: '#64748b', fontWeight: 600 }}>₹</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    required
                    min="1"
                    className="input-premium"
                    style={{ paddingLeft: '36px' }}
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', opacity: loading ? 0.7 : 1 }}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                    Processing...
                  </span>
                ) : '💳 Pay with Razorpay'}
              </button>

              <p style={{ textAlign: 'center', color: '#475569', fontSize: '0.78rem', marginTop: '16px' }}>
                🔒 Secured by Razorpay · 256-bit SSL encryption
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Payment;
