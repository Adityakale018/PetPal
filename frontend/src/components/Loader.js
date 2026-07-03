import React from 'react';

const Loader = () => (
  <div style={{
    position: 'fixed', inset: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(15,15,26,0.75)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    zIndex: 9999,
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '56px', height: '56px',
        border: '4px solid rgba(108,99,255,0.2)',
        borderTopColor: '#6C63FF',
        borderRadius: '50%',
        margin: '0 auto 16px',
        animation: 'spin 0.8s linear infinite',
      }} />
      <div style={{
        color: '#a78bfa', fontWeight: 600, fontSize: '0.9rem',
        fontFamily: 'Inter, sans-serif',
      }}>
        Loading...
      </div>
    </div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default Loader;
