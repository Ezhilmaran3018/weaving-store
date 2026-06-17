import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaShoppingBag } from 'react-icons/fa';

const OrderConfirmation = () => {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber || Math.floor(Math.random() * 90000 + 10000);
  const total = location.state?.total || '—';

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Poppins', sans-serif", padding: '2rem' }}>
      <div style={{ background: 'white', borderRadius: '1.25rem', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', padding: '3rem 2.5rem', maxWidth: '480px', width: '100%', textAlign: 'center' }}>

        <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #8B1538, #6b0f2a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <FaCheckCircle style={{ color: 'white', fontSize: '2.5rem' }} />
        </div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1a1a1a', fontFamily: "'Playfair Display', serif", marginBottom: '0.5rem' }}>
          Order Placed! 🎉
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
          Thank you for shopping with SilkWeave. Your saree is on its way!
        </p>

        <div style={{ background: '#faf8f5', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '2rem', border: '1px solid #f0ebe8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Order Number</span>
            <span style={{ fontWeight: '700', color: '#8B1538', fontSize: '0.9rem' }}>#{orderNumber}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Estimated Delivery</span>
            <span style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '0.9rem' }}>5–7 Business Days</span>
          </div>
          {total !== '—' && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Total Paid</span>
              <span style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '0.9rem' }}>₹{parseFloat(total).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          )}
        </div>

        <div style={{ background: 'linear-gradient(135deg, #8B153810, #D4AF3710)', border: '1px solid #D4AF3730', borderRadius: '0.75rem', padding: '1rem', marginBottom: '2rem' }}>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.6 }}>
            📧 A confirmation email has been sent to your registered email address.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" style={{ flex: 1, minWidth: '130px', padding: '0.8rem', background: 'white', border: '2px solid #8B1538', color: '#8B1538', borderRadius: '0.6rem', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <FaHome size={14} /> Home
          </Link>
          <Link to="/products" style={{ flex: 1, minWidth: '130px', padding: '0.8rem', background: 'linear-gradient(135deg, #8B1538, #6b0f2a)', color: 'white', borderRadius: '0.6rem', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <FaShoppingBag size={14} /> Shop More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;