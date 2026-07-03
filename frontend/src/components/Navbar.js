import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  })();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/pets', label: 'Pets' },
    { to: '/daycare', label: 'Daycare' },
    { to: '/feedback', label: 'Feedback' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        background: 'rgba(15,15,26,0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(108,99,255,0.18)',
        boxShadow: '0 2px 24px rgba(108,99,255,0.10)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" style={{ textDecoration: 'none' }}>
            <span style={{
              fontSize: '1.7rem',
              filter: 'drop-shadow(0 0 8px rgba(108,99,255,0.6))',
              transition: 'transform 0.3s',
            }}
            className="group-hover:scale-110 inline-block"
            >🐾</span>
            <span style={{
              fontWeight: 800,
              fontSize: '1.2rem',
              background: 'linear-gradient(135deg, #a78bfa, #6C63FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}>
              PetPal
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontWeight: 500,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  color: isActive(to) ? '#a78bfa' : '#cbd5e1',
                  background: isActive(to) ? 'rgba(108,99,255,0.15)' : 'transparent',
                  borderBottom: isActive(to) ? '2px solid #6C63FF' : '2px solid transparent',
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <DarkModeToggle />
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard" style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '6px 14px', borderRadius: '10px',
                  background: 'rgba(108,99,255,0.15)',
                  border: '1px solid rgba(108,99,255,0.3)',
                  color: '#a78bfa', fontWeight: 600, fontSize: '0.88rem',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}>
                  <span>👤</span> {user.name?.split(' ')[0]}
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '6px 14px', borderRadius: '10px',
                    background: 'rgba(255,107,107,0.15)',
                    border: '1px solid rgba(255,107,107,0.3)',
                    color: '#f87171', fontWeight: 600, fontSize: '0.88rem',
                    cursor: 'pointer', transition: 'all 0.2s',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" style={{
                  padding: '7px 18px', borderRadius: '10px',
                  border: '1px solid rgba(108,99,255,0.4)',
                  color: '#a78bfa', fontWeight: 600, fontSize: '0.88rem',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}>
                  Login
                </Link>
                <Link to="/register" style={{
                  padding: '7px 18px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6C63FF, #4F46E5)',
                  color: 'white', fontWeight: 600, fontSize: '0.88rem',
                  textDecoration: 'none', transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(108,99,255,0.35)',
                }}>
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{
              background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.3)',
              borderRadius: '8px', padding: '6px', color: '#a78bfa', cursor: 'pointer',
            }}
          >
            {open ? (
              <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'rgba(15,15,26,0.97)',
          borderTop: '1px solid rgba(108,99,255,0.15)',
          padding: '12px 16px 16px',
        }}>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              style={{
                display: 'block', padding: '10px 14px', borderRadius: '8px',
                fontWeight: 500, fontSize: '0.95rem', textDecoration: 'none',
                color: isActive(to) ? '#a78bfa' : '#cbd5e1',
                background: isActive(to) ? 'rgba(108,99,255,0.12)' : 'transparent',
                marginBottom: '4px', transition: 'all 0.2s',
              }}
            >
              {label}
            </Link>
          ))}
          <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <DarkModeToggle />
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} style={{
                  padding: '7px 14px', borderRadius: '8px', background: 'rgba(108,99,255,0.15)',
                  color: '#a78bfa', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none',
                }}>
                  Dashboard
                </Link>
                <button onClick={handleLogout} style={{
                  padding: '7px 14px', borderRadius: '8px', background: 'rgba(255,107,107,0.15)',
                  color: '#f87171', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer',
                  border: 'none', fontFamily: 'Inter, sans-serif',
                }}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} style={{
                  padding: '7px 14px', borderRadius: '8px', border: '1px solid rgba(108,99,255,0.4)',
                  color: '#a78bfa', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none',
                }}>Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} style={{
                  padding: '7px 14px', borderRadius: '8px', background: 'linear-gradient(135deg, #6C63FF, #4F46E5)',
                  color: 'white', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none',
                }}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
