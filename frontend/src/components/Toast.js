import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, type, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3500);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  const styles = {
    success: { bg: 'rgba(16,185,129,0.95)', border: 'rgba(16,185,129,0.5)', icon: '✅' },
    error: { bg: 'rgba(239,68,68,0.95)', border: 'rgba(239,68,68,0.5)', icon: '⚠️' },
    info: { bg: 'rgba(108,99,255,0.95)', border: 'rgba(108,99,255,0.5)', icon: 'ℹ️' },
  };
  const s = styles[type] || styles.info;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -60, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -60, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            position: 'fixed', top: '76px', left: '50%', transform: 'translateX(-50%)',
            zIndex: 9999, minWidth: '280px', maxWidth: '420px',
            background: s.bg, border: `1px solid ${s.border}`,
            borderRadius: '14px', padding: '12px 20px',
            color: 'white', fontWeight: 600, fontSize: '0.9rem',
            display: 'flex', alignItems: 'center', gap: '10px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            fontFamily: 'Inter, sans-serif',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            cursor: 'pointer',
          }}
          onClick={onClose}
        >
          <span style={{ fontSize: '1.1rem' }}>{s.icon}</span>
          <span style={{ flex: 1 }}>{message}</span>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '1rem', padding: '0' }}
            aria-label="Close notification"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
