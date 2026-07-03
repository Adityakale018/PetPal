import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const features = [
  {
    icon: '🐕',
    title: 'Pet Adoption',
    desc: 'Browse hundreds of loving pets waiting for a forever home. Adopt and change a life today.',
    color: '#6C63FF',
    bg: 'rgba(108,99,255,0.08)',
    link: '/pets',
    cta: 'Browse Pets',
  },
  {
    icon: '🏡',
    title: 'Daycare Booking',
    desc: 'Find trusted daycare centers for your pet. Book slots, manage schedules, and track activities.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    link: '/daycare',
    cta: 'Book Daycare',
  },
  {
    icon: '🩺',
    title: 'Medical Records',
    desc: 'Keep all your pet\'s health records in one place. Track vaccinations, vet visits and treatments.',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    link: '/dashboard',
    cta: 'View Records',
  },
  {
    icon: '💬',
    title: 'Community Feedback',
    desc: 'Share your experience. Help others find the best pets and services with honest reviews.',
    color: '#FF6B6B',
    bg: 'rgba(255,107,107,0.08)',
    link: '/feedback',
    cta: 'Give Feedback',
  },
];

const stats = [
  { value: '500+', label: 'Pets Adopted', icon: '🐾' },
  { value: '120+', label: 'Daycare Centers', icon: '🏡' },
  { value: '2000+', label: 'Happy Families', icon: '❤️' },
  { value: '50+', label: 'Vet Partners', icon: '🩺' },
];

const Home = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f0f1a' }}>
    <Navbar />

    {/* Hero Section */}
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      padding: '96px 24px 80px',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a3e 50%, #0f1a2e 100%)',
    }}>
      {/* Background orbs */}
      <div style={{
        position: 'absolute', top: '-100px', left: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', right: '-80px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,107,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 16px', borderRadius: '999px',
          background: 'rgba(108,99,255,0.15)',
          border: '1px solid rgba(108,99,255,0.3)',
          marginBottom: '24px',
          fontSize: '0.85rem', fontWeight: 600, color: '#a78bfa',
        }}>
          🐾 &nbsp; Your Pet's Home Away From Home
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
          fontWeight: 900,
          lineHeight: 1.15,
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #6C63FF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-1px',
        }}>
          Find, Adopt & Care<br />for Your Furry Friends
        </h1>

        <p style={{
          fontSize: '1.15rem', color: '#94a3b8',
          maxWidth: '560px', margin: '0 auto 40px',
          lineHeight: 1.7, fontWeight: 400,
        }}>
          PetPal connects loving families with pets that need a home. Discover adoption services, trusted daycare, and comprehensive medical care — all in one beautiful platform.
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/pets" style={{
            padding: '14px 32px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #6C63FF, #4F46E5)',
            color: 'white', fontWeight: 700, fontSize: '1rem',
            textDecoration: 'none',
            boxShadow: '0 8px 28px rgba(108,99,255,0.45)',
            transition: 'all 0.2s',
          }}>
            🐕 &nbsp;Browse Pets
          </Link>
          <Link to="/register" style={{
            padding: '14px 32px', borderRadius: '12px',
            border: '2px solid rgba(108,99,255,0.4)',
            color: '#a78bfa', fontWeight: 700, fontSize: '1rem',
            textDecoration: 'none', transition: 'all 0.2s',
          }}>
            Get Started Free →
          </Link>
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section style={{
      background: 'rgba(108,99,255,0.06)',
      borderTop: '1px solid rgba(108,99,255,0.12)',
      borderBottom: '1px solid rgba(108,99,255,0.12)',
      padding: '32px 24px',
    }}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>{s.icon}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a78bfa' }}>{s.value}</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Features Section */}
    <section style={{ padding: '80px 24px', background: '#0f0f1a' }}>
      <div className="max-w-6xl mx-auto">
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800,
            color: '#e2e8f0', marginBottom: '12px',
          }}>
            Everything Your Pet Needs
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem' }}>
            One platform for all pet care services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="card-hover"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                padding: '28px 24px',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              }}
            >
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: f.bg, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '1.6rem', marginBottom: '16px',
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: '10px', fontSize: '1.05rem' }}>
                {f.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                {f.desc}
              </p>
              <Link to={f.link} style={{
                padding: '8px 18px', borderRadius: '8px',
                background: f.bg, color: f.color,
                fontWeight: 600, fontSize: '0.85rem',
                textDecoration: 'none', transition: 'all 0.2s',
                border: `1px solid ${f.color}33`,
              }}>
                {f.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section style={{
      padding: '72px 24px',
      background: 'linear-gradient(135deg, rgba(108,99,255,0.15) 0%, rgba(79,70,229,0.1) 100%)',
      borderTop: '1px solid rgba(108,99,255,0.15)',
      textAlign: 'center',
    }}>
      <div className="max-w-xl mx-auto">
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🐾</div>
        <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#e2e8f0', marginBottom: '12px' }}>
          Ready to Find Your Perfect Pet?
        </h2>
        <p style={{ color: '#94a3b8', marginBottom: '28px', fontSize: '0.95rem' }}>
          Join thousands of pet lovers who have found their perfect companions through PetPal.
        </p>
        <Link to="/register" style={{
          padding: '14px 36px', borderRadius: '12px',
          background: 'linear-gradient(135deg, #6C63FF, #4F46E5)',
          color: 'white', fontWeight: 700, fontSize: '1rem',
          textDecoration: 'none', display: 'inline-block',
          boxShadow: '0 8px 28px rgba(108,99,255,0.45)',
        }}>
          Join PetPal for Free 🐕
        </Link>
      </div>
    </section>

    <Footer />
  </div>
);

export default Home;
