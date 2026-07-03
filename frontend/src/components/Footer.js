import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{
    background: 'rgba(15,15,26,0.98)',
    borderTop: '1px solid rgba(108,99,255,0.15)',
    color: '#94a3b8',
    fontFamily: 'Inter, sans-serif',
    paddingTop: '48px',
    paddingBottom: '24px',
    marginTop: 'auto',
  }}>
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span style={{ fontSize: '1.6rem' }}>🐾</span>
            <span style={{
              fontWeight: 800, fontSize: '1.2rem',
              background: 'linear-gradient(135deg, #a78bfa, #6C63FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>PetPal</span>
          </div>
          <p style={{ fontSize: '0.88rem', lineHeight: '1.7', color: '#64748b' }}>
            Connecting loving homes with pets that need care. Adoption, daycare, and medical management — all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: '16px', fontSize: '0.95rem' }}>Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { to: '/pets', label: '🐕 Browse Pets' },
              { to: '/daycare', label: '🏡 Book Daycare' },
              { to: '/feedback', label: '💬 Leave Feedback' },
              { to: '/payment', label: '💳 Make a Donation' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} style={{
                color: '#64748b', textDecoration: 'none', fontSize: '0.88rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#a78bfa'}
              onMouseLeave={e => e.target.style.color = '#64748b'}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Account */}
        <div>
          <h4 style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: '16px', fontSize: '0.95rem' }}>Account</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { to: '/login', label: '🔑 Login' },
              { to: '/register', label: '📝 Register' },
              { to: '/dashboard', label: '📊 Dashboard' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} style={{
                color: '#64748b', textDecoration: 'none', fontSize: '0.88rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#a78bfa'}
              onMouseLeave={e => e.target.style.color = '#64748b'}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(108,99,255,0.12)',
        paddingTop: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.82rem',
        color: '#475569',
      }}>
        Pet Adoption & Care Platform © {new Date().getFullYear()} · Built with ❤️ for animals
      </div>
    </div>
  </footer>
);

export default Footer;
