import React, { useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Payment = ({ purpose = 'donation', ref_id = null }) => {
  const [amount, setAmount] = useState('');
  const [order, setOrder] = useState(null);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  };

  const handleCreateOrder = async e => {
    e.preventDefault();
    setError('');
    setMsg('');
    try {
      const res = await api.post('/payments/create-order', { amount });
      setOrder(res.data);
      loadRazorpay();
      setTimeout(() => handlePayment(res.data), 1000);
    } catch (err) {
      setError('Failed to create order');
    }
  };

  const handlePayment = (orderData) => {
    if (!window.Razorpay) {
      setError('Razorpay SDK not loaded');
      return;
    }
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_cSaPgCCDgkPbkb',
      amount: orderData.amount,
      currency: 'INR',
      name: 'Pet Platform',
      description: 'Payment',
      order_id: orderData.id,
      handler: async function (response) {
        try {
          await api.post('/payments/verify', {
            order_id: orderData.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            purpose,
            ref_id
          });
          setMsg('Payment successful and verified!');
        } catch (err) {
          setError('Payment verification failed');
        }
      },
      prefill: {},
      theme: { color: '#2563eb' },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-12">
        <form onSubmit={handleCreateOrder} className="bg-white dark:bg-gray-800 p-8 rounded shadow w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Make a Payment</h2>
          {msg && <div className="text-green-600 mb-4">{msg}</div>}
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <input type="number" placeholder="Amount (INR)" value={amount} onChange={e => setAmount(e.target.value)} required className="w-full mb-6 px-3 py-2 border rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Pay with Razorpay</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
