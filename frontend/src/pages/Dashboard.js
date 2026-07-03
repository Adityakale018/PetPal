import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const roleCards = {
  adopter: [
    { icon: '🐕', title: 'Browse Pets', desc: 'Find your next furry companion', to: '/pets', color: '#6C63FF', bg: 'rgba(108,99,255,0.1)' },
    { icon: '📋', title: 'My Adoptions', desc: 'Track your adoption requests', to: '/adoptions', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
    { icon: '🏡', title: 'My Daycare Bookings', desc: 'Manage your daycare slots', to: '/daycare/bookings', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
    { icon: '💬', title: 'Leave Feedback', desc: 'Share your experience', to: '/feedback', color: '#FF6B6B', bg: 'rgba(255,107,107,0.1)' },
    { icon: '💳', title: 'Make a Donation', desc: 'Support pet care initiatives', to: '/payment', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  ],
  donor: [
    { icon: '➕', title: 'Add Pet for Adoption', desc: 'List a pet for adoption', to: '/pets/add', color: '#6C63FF', bg: 'rgba(108,99,255,0.1)' },
    { icon: '💬', title: 'View Feedback', desc: 'See community reviews', to: '/feedback', color: '#FF6B6B', bg: 'rgba(255,107,107,0.1)' },
    { icon: '💳', title: 'Donate', desc: 'Support our mission', to: '/payment', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  ],
  daycare_owner: [
    { icon: '🏡', title: 'Register Daycare Center', desc: 'List your daycare facility', to: '/daycare/register', color: '#6C63FF', bg: 'rgba(108,99,255,0.1)' },
    { icon: '💬', title: 'View Feedback', desc: 'Read customer reviews', to: '/feedback', color: '#FF6B6B', bg: 'rgba(255,107,107,0.1)' },
  ],
};

const roleLabel = {
  adopter: { icon: '🏠', label: 'Adopter', color: '#6C63FF' },
  donor: { icon: '🎁', label: 'Donor', color: '#10b981' },
  daycare_owner: { icon: '🏡', label: 'Daycare Owner', color: '#f59e0b' },
};

const Dashboard = () => {
  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  })();

  if (!user?.role) {
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
              Please log in to view your personal dashboard.
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

  const cards = roleCards[user.role] || [];
  const rl = roleLabel[user.role] || { icon: '👤', label: user.role, color: '#6C63FF' };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f0f1a' }}>
      <Navbar />

      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a3e 0%, #0f0f1a 100%)',
        borderBottom: '1px solid rgba(108,99,255,0.15)',
        padding: '48px 24px 40px',
      }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #6C63FF, #4F46E5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.8rem', flexShrink: 0,
            }}>
              {user.name?.charAt(0).toUpperCase() || '👤'}
            </div>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '3px 12px', borderRadius: '999px',
                background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.25)',
                fontSize: '0.78rem', fontWeight: 600, color: '#a78bfa', marginBottom: '8px',
              }}>
                {rl.icon} {rl.label}
              </div>
              <h1 style={{ fontWeight: 800, fontSize: '1.8rem', color: '#e2e8f0', margin: 0 }}>
                Welcome back, {user.name?.split(' ')[0]}! 👋
              </h1>
              <p style={{ color: '#64748b', marginTop: '4px', fontSize: '0.9rem' }}>
                Here's everything you can do on PetPal
              </p>
            </div>
          </div>
        </div>
      </section>

      <main style={{ flex: 1, padding: '40px 24px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className="card-hover"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px', padding: '28px 24px',
                  textDecoration: 'none',
                  display: 'flex', alignItems: 'flex-start', gap: '16px',
                }}
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: card.bg, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '1.6rem', flexShrink: 0,
                }}>
                  {card.icon}
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: '6px', fontSize: '1rem' }}>
                    {card.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                    {card.desc}
                  </p>
                  <span style={{ display: 'inline-block', marginTop: '12px', color: card.color, fontSize: '0.82rem', fontWeight: 600 }}>
                    Go there →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
