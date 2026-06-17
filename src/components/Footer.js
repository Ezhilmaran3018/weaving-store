import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ background: 'linear-gradient(to bottom, #1a0a0f, #2d1020)', color: 'white', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">

          {/* Brand */}
          <div className="text-center sm:text-left">
            <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#D4AF37', marginBottom: '1rem' }}>🧵 SilkWeave</h3>
            <p style={{ color: '#e2b8c4', fontSize: '0.95rem', lineHeight: '1.7' }}>
              Authentic handwoven sarees celebrating Indian craftsmanship and heritage.
            </p>
            {/* Gold divider */}
            <div style={{ width: '50px', height: '3px', background: '#D4AF37', marginTop: '1rem' }}></div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem', color: '#D4AF37', letterSpacing: '0.05em' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[['/', 'Home'], ['/products', 'Products'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([href, label]) => (
                <li key={label}>
                  <a href={href} style={{ color: '#e2b8c4', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}
                    onMouseOver={e => e.target.style.color='#D4AF37'}
                    onMouseOut={e => e.target.style.color='#e2b8c4'}>
                    › {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="text-center sm:text-left">
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem', color: '#D4AF37', letterSpacing: '0.05em' }}>Customer Service</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Shipping Info', 'Returns & Exchange', 'FAQ', 'Contact Support'].map(item => (
                <button key={item} style={{ color: '#e2b8c4', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500', textAlign: 'left', fontSize: '0.95rem' }}
                  onMouseOver={e => e.target.style.color='#D4AF37'}
                  onMouseOut={e => e.target.style.color='#e2b8c4'}>
                  › {item}
                </button>
              ))}
            </div>
          </div>

          {/* Follow Us */}
          <div className="text-center sm:text-left">
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem', color: '#D4AF37', letterSpacing: '0.05em' }}>Follow Us</h4>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, i) => (
                <button key={i}
                  style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.1rem', transition: 'all 0.3s' }}
                  onMouseOver={e => { e.currentTarget.style.background='#D4AF37'; e.currentTarget.style.color='#1a0a0f'; e.currentTarget.style.transform='scale(1.1)'; }}
                  onMouseOut={e => { e.currentTarget.style.background='rgba(212,175,55,0.15)'; e.currentTarget.style.color='#D4AF37'; e.currentTarget.style.transform='scale(1)'; }}>
                  <Icon />
                </button>
              ))}
            </div>

            {/* Contact info */}
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ color: '#e2b8c4', fontSize: '0.85rem' }}>📧 hello@silkweave.com</p>
              <p style={{ color: '#e2b8c4', fontSize: '0.85rem' }}>📞 +91 98765 43210</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(212,175,55,0.2)', paddingTop: '1.5rem', textAlign: 'center', color: '#c084a0', fontSize: '0.875rem' }}>
          <p>© 2024 <span style={{ color: '#D4AF37', fontWeight: '600' }}>SilkWeave</span>. All rights reserved. |{' '}
            <a href="/" style={{ color: '#D4AF37', textDecoration: 'none' }}>Privacy Policy</a> |{' '}
            <a href="/" style={{ color: '#D4AF37', textDecoration: 'none' }}>Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;