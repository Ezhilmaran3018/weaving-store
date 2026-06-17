import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative text-white overflow-hidden" style={{ background: 'linear-gradient(to right, #8B1538, #6b0f2a, #8B1538)' }}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex items-center justify-start">
        <div className="w-full max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-playfair mb-4 md:mb-6 leading-tight text-white drop-shadow-lg">
              Handwoven <span className="text-secondary drop-shadow-md">Excellence</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-yellow-50 drop-shadow-md leading-relaxed">
              Discover authentic Indian sarees with traditional craftsmanship. Each piece tells a story of heritage and artistry.
            </p>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/products" style={{
                backgroundColor: '#D4AF37', color: '#8B1538',
                padding: '0.75rem 2rem', borderRadius: '0.5rem',
                fontWeight: '700', textDecoration: 'none', fontSize: '1rem',
                display: 'inline-block', boxShadow: '0 4px 12px rgba(212,175,55,0.4)', transition: 'all 0.3s'
              }}
                onMouseOver={e => { e.currentTarget.style.transform='scale(1.05)'; e.currentTarget.style.boxShadow='0 6px 20px rgba(212,175,55,0.5)'; }}
                onMouseOut={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 4px 12px rgba(212,175,55,0.4)'; }}
              >
                🛍️ Shop Now
              </Link>
              <Link to="/about" style={{
                backgroundColor: 'transparent', color: 'white',
                padding: '0.75rem 2rem', borderRadius: '0.5rem',
                fontWeight: '700', textDecoration: 'none', fontSize: '1rem',
                display: 'inline-block', border: '2px solid white', transition: 'all 0.3s'
              }}
                onMouseOver={e => { e.currentTarget.style.backgroundColor='#D4AF37'; e.currentTarget.style.color='#8B1538'; e.currentTarget.style.borderColor='#D4AF37'; }}
                onMouseOut={e => { e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.color='white'; e.currentTarget.style.borderColor='white'; }}
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="text-secondary text-4xl">↓</div>
      </motion.div>
    </section>
  );
};

export default HeroSection;