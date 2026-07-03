import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const StarRating = ({ value, onChange }) => (
  <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
    {[1, 2, 3, 4, 5].map(star => (
      <button
        key={star}
        type="button"
        onClick={() => onChange(star)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '1.6rem', lineHeight: 1,
          filter: star <= value ? 'none' : 'grayscale(1) opacity(0.3)',
          transition: 'filter 0.15s, transform 0.15s',
          transform: star <= value ? 'scale(1.1)' : 'scale(1)',
        }}
        aria-label={`Rate ${star} stars`}
      >
        ⭐
      </button>
    ))}
  </div>
);

const Feedback = ({ showToast }) => {
  const [feedback, setFeedback] = useState([]);
  const [form, setForm] = useState({ pet_id: '', rating: 0, comment: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchFeedback(); }, []);

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const res = await api.get('/feedback/all');
      setFeedback(res.data);
    } catch (err) {
      // silently fail or show error inline
    }
    setLoading(false);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.rating) { setError('Please select a star rating.'); return; }
    setError('');
    setSuccess('');
    setSubmitting(true);
    try {
      await api.post('/feedback/submit', form);
      setSuccess('Thank you for your feedback! 🎉');
      setForm({ pet_id: '', rating: 0, comment: '' });
      fetchFeedback();
      if (showToast) showToast('Feedback submitted!', 'success');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit feedback.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (n) => '⭐'.repeat(n) + '☆'.repeat(5 - n);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f0f1a' }}>
      <Navbar />
      <section style={{
        background: 'linear-gradient(135deg, #1a1a3e 0%, #0f0f1a 100%)',
        borderBottom: '1px solid rgba(108,99,255,0.15)',
        padding: '40px 24px 32px',
      }}>
        <div className="max-w-4xl mx-auto">
          <h1 style={{ fontWeight: 800, fontSize: '1.9rem', color: '#e2e8f0', marginBottom: '6px' }}>💬 Community Feedback</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Share your experience and help others make better decisions</p>
        </div>
      </section>

      <main style={{ flex: 1, padding: '40px 24px' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Submit Form */}
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '28px', position: 'sticky', top: '90px' }}>
                <h2 style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: '20px', fontSize: '1.1rem' }}>Leave a Review</h2>

                {success && <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '10px', padding: '10px 14px', marginBottom: '16px', color: '#6ee7b7', fontSize: '0.88rem' }}>✅ {success}</div>}
                {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', padding: '10px 14px', marginBottom: '16px', color: '#f87171', fontSize: '0.88rem' }}>⚠️ {error}</div>}

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.82rem', fontWeight: 500 }}>Pet ID (optional)</label>
                    <input name="pet_id" placeholder="Leave blank for general feedback" value={form.pet_id} onChange={handleChange} className="input-premium" style={{ fontSize: '0.88rem' }} />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.82rem', fontWeight: 500 }}>Your Rating *</label>
                    <StarRating value={form.rating} onChange={(r) => setForm({ ...form, rating: r })} />
                    {form.rating > 0 && <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                      {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][form.rating]}
                    </div>}
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.82rem', fontWeight: 500 }}>Comment *</label>
                    <textarea name="comment" placeholder="Tell us about your experience..." value={form.comment} onChange={handleChange} required rows={4} className="input-premium" style={{ resize: 'vertical', fontSize: '0.88rem' }} />
                  </div>

                  <button type="submit" disabled={submitting} className="btn-primary" style={{ width: '100%', opacity: submitting ? 0.7 : 1, fontSize: '0.9rem' }}>
                    {submitting ? (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <span style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                        Submitting...
                      </span>
                    ) : '💬 Submit Feedback'}
                  </button>
                </form>
              </div>
            </div>

            {/* Feedback List */}
            <div style={{ gridColumn: 'span 3' }}>
              <h2 style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: '20px', fontSize: '1.1rem' }}>
                Community Reviews {!loading && <span style={{ color: '#64748b', fontWeight: 400, fontSize: '0.88rem' }}>({feedback.length})</span>}
              </h2>

              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
                  <div style={{ width: '40px', height: '40px', border: '3px solid rgba(108,99,255,0.2)', borderTopColor: '#6C63FF', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                </div>
              ) : feedback.length === 0 ? (
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '48px 24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>💬</div>
                  <p style={{ color: '#64748b' }}>No reviews yet. Be the first!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {feedback.map(fb => (
                    <div key={fb.id} className="card-hover" style={{
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '16px', padding: '20px 24px',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6C63FF, #4F46E5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>
                            {String(fb.user_id || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.9rem' }}>User #{fb.user_id}</div>
                            {fb.pet_id && <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Pet ID: {fb.pet_id}</div>}
                          </div>
                        </div>
                        <div style={{ fontSize: '1rem', letterSpacing: '1px' }}>
                          {renderStars(fb.rating)}
                        </div>
                      </div>
                      <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{fb.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Feedback;
