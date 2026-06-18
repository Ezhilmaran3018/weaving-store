import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(name, email, password);
    if (success) {
      navigate('/'); // Only navigate if signup succeeded
    }
    // If failed, error is shown in UI — user stays on signup page
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Poppins', sans-serif" }}>

      {/* Left decorative panel */}
      <div style={{ display: 'none', flex: 1, background: 'linear-gradient(145deg, #8B1538 0%, #5a0d24 50%, #2d0612 100%)', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '3rem', position: 'relative', overflow: 'hidden' }} className="signup-left-panel">
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(212,175,55,0.15)', top: '-100px', right: '-100px' }} />
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(212,175,55,0.1)', bottom: '-50px', left: '-80px' }} />
        <div style={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🧵</div>
          <h2 style={{ color: '#D4AF37', fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: '700', marginBottom: '1rem', lineHeight: 1.3 }}>
            Join the<br />SilkWeave Family
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '280px' }}>
            Get exclusive access to new collections, special discounts, and artisan stories.
          </p>
          <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {['✓ Free shipping on first order', '✓ Early access to new arrivals', '✓ Exclusive member discounts'].map(item => (
              <div key={item} style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', textAlign: 'left' }}>{item}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf8f5', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>

          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '2rem' }}>🧵</span>
              <span style={{ color: '#8B1538', fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: '800' }}>SilkWeave</span>
            </Link>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.9rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.5rem', fontFamily: "'Playfair Display', serif" }}>Create account</h1>
            <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>Join thousands of saree lovers today</p>
          </div>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderLeft: '4px solid #ef4444', color: '#b91c1c', padding: '0.85rem 1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

            {/* Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Full Name</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e5e7eb', borderRadius: '0.6rem', padding: '0 1rem', background: 'white' }}>
                <FaUser style={{ color: '#8B1538', marginRight: '0.75rem', flexShrink: 0, fontSize: '0.85rem' }} />
                <input type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} required
                  style={{ flex: 1, border: 'none', outline: 'none', padding: '0.85rem 0', fontSize: '0.95rem', background: 'transparent', color: '#1a1a1a', fontFamily: "'Poppins', sans-serif" }}
                  onFocus={e => e.currentTarget.parentElement.style.borderColor = '#8B1538'}
                  onBlur={e => e.currentTarget.parentElement.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Email address</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e5e7eb', borderRadius: '0.6rem', padding: '0 1rem', background: 'white' }}>
                <FaEnvelope style={{ color: '#8B1538', marginRight: '0.75rem', flexShrink: 0, fontSize: '0.85rem' }} />
                <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required
                  style={{ flex: 1, border: 'none', outline: 'none', padding: '0.85rem 0', fontSize: '0.95rem', background: 'transparent', color: '#1a1a1a', fontFamily: "'Poppins', sans-serif" }}
                  onFocus={e => e.currentTarget.parentElement.style.borderColor = '#8B1538'}
                  onBlur={e => e.currentTarget.parentElement.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Password</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e5e7eb', borderRadius: '0.6rem', padding: '0 1rem', background: 'white' }}>
                <FaLock style={{ color: '#8B1538', marginRight: '0.75rem', flexShrink: 0, fontSize: '0.85rem' }} />
                <input type={showPassword ? 'text' : 'password'} placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} required
                  style={{ flex: 1, border: 'none', outline: 'none', padding: '0.85rem 0', fontSize: '0.95rem', background: 'transparent', color: '#1a1a1a', fontFamily: "'Poppins', sans-serif" }}
                  onFocus={e => e.currentTarget.parentElement.style.borderColor = '#8B1538'}
                  onBlur={e => e.currentTarget.parentElement.style.borderColor = '#e5e7eb'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0.25rem', display: 'flex' }}>
                  {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              style={{ background: isLoading ? '#c48a9e' : 'linear-gradient(135deg, #8B1538, #6b0f2a)', color: 'white', border: 'none', borderRadius: '0.6rem', padding: '0.9rem', fontSize: '1rem', fontWeight: '600', cursor: isLoading ? 'not-allowed' : 'pointer', marginTop: '0.25rem', transition: 'all 0.2s', letterSpacing: '0.03em', boxShadow: '0 4px 14px rgba(139,21,56,0.35)', fontFamily: "'Poppins', sans-serif" }}
              onMouseOver={e => { if (!isLoading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#8B1538', fontWeight: '700', textDecoration: 'none' }}>Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) { .signup-left-panel { display: flex !important; } }
      `}</style>
    </div>
  );
};

export default Signup;