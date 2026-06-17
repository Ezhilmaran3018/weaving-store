import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title">About SilkWeave</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              SilkWeave was born from a passion for preserving the timeless art of traditional Indian saree weaving. 
              We work directly with master artisans to bring authentic, handwoven sarees to your doorstep.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Every saree tells a story of heritage, craftsmanship, and dedication. We believe in supporting our artisans 
              and celebrating the beauty of Indian textiles.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary to-secondary rounded-xl h-96 flex items-center justify-center text-8xl">
            🧵
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: '🎨', title: 'Authentic Craftsmanship', desc: 'Each saree is handwoven by skilled artisans' },
            { icon: '🌍', title: 'Sustainable', desc: 'Eco-friendly practices and fair trade' },
            { icon: '💝', title: 'Premium Quality', desc: 'Only finest materials are used' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary to-red-900 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Support Our Artisans</h2>
          <p className="text-lg mb-6">
            When you shop with SilkWeave, you're directly supporting our weaving community.
          </p>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default About;
