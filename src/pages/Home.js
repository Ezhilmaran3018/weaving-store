import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import banarasImage from '../assets/banaras.jpg';
import kanchipuramImage from '../assets/kanchipuram.jpg';
import mysoreImage from '../assets/mysore.jpg';
import cotonImage from '../assets/coton.jpg';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  const featuredProducts = [
    {
      id: 1,
      name: 'Banarasi Silk Saree',
      category: 'Traditional',
      price: 8999,
      originalPrice: 12999,
      discount: 31,
      image: banarasImage,
      rating: 5,
      reviews: 245,
    },
    {
      id: 2,
      name: 'Kanchipuram Silk',
      category: 'Heritage',
      price: 6499,
      originalPrice: 9999,
      discount: 35,
      image: kanchipuramImage,
      rating: 4,
      reviews: 189,
    },
    {
      id: 3,
      name: 'Mysore Silk Saree',
      category: 'Premium',
      price: 7999,
      originalPrice: 11999,
      discount: 33,
      image: mysoreImage,
      rating: 5,
      reviews: 312,
    },
    {
      id: 4,
      name: 'Cotton Saree',
      category: 'Casual',
      price: 2499,
      originalPrice: 3999,
      discount: 37,
      image: cotonImage,
      rating: 4,
      reviews: 98,
    },
  ];

  return (
    <div>
      <HeroSection />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">{t.featuredCollection}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">{t.whyChooseUs}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '✓', title: t.authenticCraftsmanship, desc: t.authenticDesc },
              { icon: '✓', title: t.premiumQuality, desc: t.premiumDesc },
              { icon: '✓', title: t.fastShipping, desc: t.fastDesc },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
                <div className="text-4xl text-secondary mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;