import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaTruck } from 'react-icons/fa';

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' });
  const [payment, setPayment] = useState('card');
  const [focused, setFocused] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderNumber = Math.floor(Math.random() * 90000 + 10000);
    clearCart();
    navigate('/order-confirmation', { state: { orderNumber, total: finalTotal } });
  };

  const total = getTotalPrice();
  const tax = total * 0.18;
  const finalTotal = total + tax;

  const inputStyle = (field) => ({
    width: '100%', padding: '0.75rem 1rem',
    border: `1.5px solid ${focused === field ? '#8B1538' : '#e5e7eb'}`,
    borderRadius: '0.6rem', fontSize: '0.9rem', outline: 'none',
    background: focused === field ? '#fff9f9' : 'white',
    color: '#1a1a1a', transition: 'all 0.2s', boxSizing: 'border-box',
    fontFamily: "'Poppins', sans-serif",
  });

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', fontFamily: "'Poppins', sans-serif", padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#8B1538', fontFamily: "'Playfair Display', serif", marginBottom: '2rem' }}>Checkout</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>

          {/* Left - Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Shipping */}
            <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f0ebe8' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaTruck style={{ color: '#8B1538' }} /> Shipping Address
              </h3>
              <form id="checkout-form" onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  {[['firstName', 'First Name'], ['lastName', 'Last Name']].map(([field, label]) => (
                    <div key={field}>
                      <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: '600', color: '#374151', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</label>
                      <input name={field} type="text" placeholder={label} onChange={handleChange} required style={inputStyle(field)} onFocus={() => setFocused(field)} onBlur={() => setFocused('')} />
                    </div>
                  ))}
                  {[['email', 'Email', 'email'], ['phone', 'Phone Number', 'tel'], ['address', 'Street Address', 'text']].map(([field, label, type]) => (
                    <div key={field} style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: '600', color: '#374151', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</label>
                      <input name={field} type={type} placeholder={label} onChange={handleChange} required style={inputStyle(field)} onFocus={() => setFocused(field)} onBlur={() => setFocused('')} />
                    </div>
                  ))}
                  {[['city', 'City'], ['state', 'State'], ['pincode', 'Pincode']].map(([field, label]) => (
                    <div key={field}>
                      <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: '600', color: '#374151', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</label>
                      <input name={field} type="text" placeholder={label} onChange={handleChange} required style={inputStyle(field)} onFocus={() => setFocused(field)} onBlur={() => setFocused('')} />
                    </div>
                  ))}
                </div>
              </form>
            </div>

            {/* Payment */}
            <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f0ebe8' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaLock style={{ color: '#8B1538' }} /> Payment Method
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[['card', '💳', 'Credit / Debit Card'], ['upi', '📱', 'UPI Payment'], ['cod', '💵', 'Cash on Delivery']].map(([val, emoji, label]) => (
                  <label key={val} onClick={() => setPayment(val)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', border: `1.5px solid ${payment === val ? '#8B1538' : '#e5e7eb'}`, borderRadius: '0.6rem', cursor: 'pointer', background: payment === val ? '#fff9f9' : 'white', transition: 'all 0.2s' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${payment === val ? '#8B1538' : '#d1d5db'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {payment === val && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#8B1538' }} />}
                    </div>
                    <span style={{ fontSize: '1rem' }}>{emoji}</span>
                    <span style={{ fontWeight: payment === val ? '600' : '400', color: payment === val ? '#8B1538' : '#374151', fontSize: '0.9rem' }}>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f0ebe8', position: 'sticky', top: '90px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '1.25rem' }}>Order Summary</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem', maxHeight: '240px', overflowY: 'auto' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '52px', height: '52px', objectFit: 'cover', borderRadius: '0.5rem', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', fontSize: '0.875rem', color: '#1a1a1a', lineHeight: 1.3 }}>{item.name}</div>
                    <div style={{ color: '#9ca3af', fontSize: '0.775rem' }}>Qty: {item.quantity}</div>
                  </div>
                  <div style={{ fontWeight: '700', color: '#8B1538', fontSize: '0.9rem', flexShrink: 0 }}>₹{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #f0ebe8', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
              {[['Subtotal', `₹${total.toLocaleString()}`], ['Shipping', 'Free'], ['Tax (18%)', `₹${tax.toFixed(2)}`]].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: '#6b7280' }}>{label}</span>
                  <span style={{ color: label === 'Shipping' ? '#22c55e' : '#1a1a1a', fontWeight: label === 'Shipping' ? '600' : '400' }}>{value}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '800', paddingTop: '0.5rem', borderTop: '1px solid #f0ebe8' }}>
                <span>Total</span>
                <span style={{ color: '#8B1538' }}>₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button form="checkout-form" type="submit"
              style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #8B1538, #6b0f2a)', color: 'white', border: 'none', borderRadius: '0.6rem', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(139,21,56,0.3)', fontFamily: "'Poppins', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <FaLock size={14} /> Place Order
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.775rem', color: '#9ca3af', marginTop: '0.85rem' }}>
              🔒 Secured by 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;