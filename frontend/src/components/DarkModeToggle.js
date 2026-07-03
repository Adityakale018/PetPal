import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [dark, setDark] = useState(() => {
    // Persist dark mode preference across navigations
    const stored = localStorage.getItem('darkMode');
    return stored === 'true';
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle dark mode"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: '10px',
        background: dark ? 'rgba(108,99,255,0.15)' : 'rgba(255,255,255,0.12)',
        border: dark ? '1px solid rgba(108,99,255,0.35)' : '1px solid rgba(255,255,255,0.2)',
        color: dark ? '#a78bfa' : '#fbbf24',
        fontWeight: 600,
        fontSize: '0.82rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <span style={{ fontSize: '1rem' }}>{dark ? '🌙' : '☀️'}</span>
      <span>{dark ? 'Dark' : 'Light'}</span>
    </button>
  );
};

export default DarkModeToggle;
