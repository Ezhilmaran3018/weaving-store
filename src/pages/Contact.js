import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '0.85rem 1rem',
    border: `1.5px solid ${focused === field ? '#8B1538' : '#e5e7eb'}`,
    borderRadius: '0.6rem',
    fontSize: '0.95rem',
    outline: 'none',
    background: focused === field ? '#fff9f9' : 'white',
    color: '#1a1a1a',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
    fontFamily: "'Poppins', sans-serif",
  });

  const contactItems = [
    {
      icon: <FaPhone />,
      color: '#8B1538',
      label: 'Phone',
      value: '+91 9345033572',
      sub: 'Mon–Sat, 9am–6pm IST',
    },
    {
      icon: <FaWhatsapp />,
      color: '#25D366',
      label: 'WhatsApp',
      value: '+91 9345033572',
      sub: 'Quick responses guaranteed',
    },
    {
      icon: <FaEnvelope />,
      color: '#D4AF37',
      label: 'Email',
      value: 'hello@silkweave.com',
      sub: 'We reply within 24 hours',
    },
    {
      icon: <FaMapMarkerAlt />,
      color: '#8B1538',
      label: 'Address',
      value: 'Sivan Kovil Street',
      sub: 'Kandachipuram, Villupuram 605701',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', fontFamily: "'Poppins', sans-serif" }}>

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #8B1538 0%, #5a0d24 100%)',
        padding: '3.5rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', width: '350px', height: '350px', borderRadius: '50%',
          border: '1px solid rgba(212,175,55,0.12)', top: '-100px', right: '-80px'
        }} />
        <div style={{
          position: 'absolute', width: '250px', height: '250px', borderRadius: '50%',
          border: '1px solid rgba(212,175,55,0.1)', bottom: '-80px', left: '-60px'
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(212,175,55,0.15)',
            color: '#D4AF37',
            border: '1px solid rgba(212,175,55,0.3)',
            padding: '0.35rem 1rem',
            borderRadius: '2rem',
            fontSize: '0.8rem',
            fontWeight: '600',
            letterSpacing: '0.08em',
            marginBottom: '1rem',
          }}>GET IN TOUCH</span>
          <h1 style={{
            color: 'white',
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: '700',
            marginBottom: '0.75rem',
          }}>We'd love to hear from you</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
            Have a question about our sarees? We're here to help you find the perfect piece.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start',
        }}>

          {/* Left - Contact Form */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '2.5rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
            border: '1px solid #f0ebe8',
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '0.4rem',
            }}>Send us a message</h2>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '2rem' }}>
              Fill in the form and we'll get back to you shortly.
            </p>

            {submitted ? (
              <div style={{
                textAlign: 'center', padding: '2.5rem 1rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'
              }}>
                <FaCheckCircle style={{ fontSize: '3rem', color: '#22c55e' }} />
                <h3 style={{ color: '#1a1a1a', fontWeight: '700', fontSize: '1.2rem' }}>Message sent!</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#374151', marginBottom: '0.4rem' }}>Your Name *</label>
                    <input
                      type="text"
                      placeholder="Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused('')}
                      style={inputStyle('name')}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#374151', marginBottom: '0.4rem' }}>Email *</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused('')}
                      style={inputStyle('email')}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#374151', marginBottom: '0.4rem' }}>Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Custom saree inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused('')}
                    style={inputStyle('subject')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#374151', marginBottom: '0.4rem' }}>Message *</label>
                  <textarea
                    placeholder="Tell us how we can help you..."
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '120px' }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #8B1538, #6b0f2a)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.6rem',
                    padding: '0.9rem',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    letterSpacing: '0.03em',
                    boxShadow: '0 4px 14px rgba(139,21,56,0.3)',
                    marginTop: '0.25rem',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(139,21,56,0.4)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(139,21,56,0.3)'; }}
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>

          {/* Right - Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {contactItems.map((item) => (
              <div key={item.label} style={{
                background: 'white',
                borderRadius: '0.85rem',
                padding: '1.25rem 1.5rem',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                border: '1px solid #f0ebe8',
                display: 'flex',
                alignItems: 'center',
                gap: '1.1rem',
                transition: 'box-shadow 0.2s',
              }}
                onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(139,21,56,0.1)'; }}
                onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
              >
                <div style={{
                  width: '46px', height: '46px', borderRadius: '50%',
                  background: `${item.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: item.color, fontSize: '1.1rem', flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    {item.label}
                  </div>
                  <div style={{ color: '#1a1a1a', fontWeight: '600', fontSize: '0.95rem' }}>{item.value}</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '0.15rem' }}>{item.sub}</div>
                </div>
              </div>
            ))}

            {/* Store Hours Card */}
            <div style={{
              background: 'linear-gradient(135deg, #8B1538, #5a0d24)',
              borderRadius: '0.85rem',
              padding: '1.5rem',
              color: 'white',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <FaClock style={{ color: '#D4AF37' }} />
                <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Store Hours</span>
              </div>
              {[
                ['Monday – Friday', '9:00 AM – 6:00 PM'],
                ['Saturday', '10:00 AM – 4:00 PM'],
                ['Sunday', 'Closed'],
              ].map(([day, time]) => (
                <div key={day} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '0.85rem',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>{day}</span>
                  <span style={{ color: day === 'Sunday' ? '#f87171' : '#D4AF37', fontWeight: '600' }}>{time}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;