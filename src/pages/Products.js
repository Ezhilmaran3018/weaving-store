import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { FaFilter, FaTimes } from 'react-icons/fa';
import kanchipuramImage from '../assets/kanchipuram.jpg';
import mysoreImage from '../assets/mysore.jpg';
import cotonImage from '../assets/coton.jpg';
import banarasImage from '../assets/banaras.jpg';
import lineImage from '../assets/line.jpg';
import ChikaImage from '../assets/chika.jpg';
import { useLanguage } from '../context/LanguageContext';

const Products = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(15000);
  const [showFilter, setShowFilter] = useState(false);

  const allProducts = [
    { id: 1, name: 'Banarasi Silk Saree', category: 'silk', price: 8999, originalPrice: 12999, discount: 31, image: banarasImage, rating: 5, reviews: 245 },
    { id: 2, name: 'Kanchipuram Silk', category: 'silk', price: 6499, originalPrice: 9999, discount: 35, image: kanchipuramImage, rating: 4, reviews: 189 },
    { id: 3, name: 'Mysore Silk Saree', category: 'silk', price: 7999, originalPrice: 11999, discount: 33, image: mysoreImage, rating: 5, reviews: 312 },
    { id: 4, name: 'Cotton Saree', category: 'cotton', price: 2499, originalPrice: 3999, discount: 37, image: cotonImage, rating: 4, reviews: 98 },
    { id: 5, name: 'Linen Saree', category: 'linen', price: 3999, originalPrice: 5999, discount: 33, image: lineImage, rating: 4, reviews: 156 },
    { id: 6, name: 'Chikankari Saree', category: 'cotton', price: 4999, originalPrice: 7499, discount: 33, image: ChikaImage, rating: 5, reviews: 203 },
  ];

  const categories = [
    { value: 'all', label: t.allSarees, emoji: '🧵' },
    { value: 'silk', label: t.silk, emoji: '✨' },
    { value: 'cotton', label: t.cotton, emoji: '🌿' },
    { value: 'linen', label: t.linen, emoji: '🍃' },
  ];

  const filteredProducts = allProducts.filter(p =>
    (selectedCategory === 'all' || p.category === selectedCategory) &&
    p.price <= priceRange
  );

  const FilterSidebar = () => (
    <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', position: 'sticky', top: '90px' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#8B1538', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FaFilter size={14} /> {t.filters}
      </h3>

      {/* Category */}
      <div style={{ marginBottom: '1.75rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          {t.category}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {categories.map(cat => (
            <button key={cat.value} onClick={() => setSelectedCategory(cat.value)} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '0.6rem 0.9rem', borderRadius: '10px', border: 'none', cursor: 'pointer',
              background: selectedCategory === cat.value ? 'linear-gradient(to right, #8B1538, #a01d45)' : '#f9f4f6',
              color: selectedCategory === cat.value ? 'white' : '#444',
              fontWeight: '600', fontSize: '0.9rem', textAlign: 'left',
              transition: 'all 0.2s',
            }}>
              <span>{cat.emoji}</span> {cat.label}
              {selectedCategory === cat.value && <span style={{ marginLeft: 'auto', fontSize: '0.7rem' }}>✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p style={{ fontSize: '0.8rem', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          {t.priceRange}
        </p>
        <input type="range" min="1000" max="15000" step="500"
          value={priceRange}
          onChange={e => setPriceRange(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#8B1538', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#888' }}>₹1,000</span>
          <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#8B1538' }}>₹{priceRange.toLocaleString()}</span>
        </div>

        {/* Price range visual bar */}
        <div style={{ marginTop: '0.5rem', background: '#f0e6ea', borderRadius: '4px', height: '4px' }}>
          <div style={{ background: '#8B1538', height: '100%', borderRadius: '4px', width: `${(priceRange / 15000) * 100}%`, transition: 'width 0.2s' }}></div>
        </div>
      </div>

      {/* Reset */}
      <button onClick={() => { setSelectedCategory('all'); setPriceRange(15000); }} style={{
        marginTop: '1.5rem', width: '100%', padding: '0.6rem',
        background: 'transparent', border: '1.5px solid #8B1538', color: '#8B1538',
        borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem',
        transition: 'all 0.2s'
      }}
        onMouseOver={e => { e.currentTarget.style.background = '#8B1538'; e.currentTarget.style.color = 'white'; }}
        onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8B1538'; }}
      >
        {t.resetFilters}
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#fdf8f9', paddingTop: '2.5rem', paddingBottom: '3rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#8B1538', fontFamily: 'Playfair Display, serif', marginBottom: '0.5rem' }}>
            {t.ourCollection}
          </h1>
          <p style={{ color: '#888', fontSize: '1rem' }}>
            {filteredProducts.length} {t.sareesFound}
          </p>
          <div style={{ width: '60px', height: '3px', background: '#D4AF37', margin: '0.75rem auto 0' }}></div>
        </div>

        {/* Mobile Filter Toggle */}
        <button onClick={() => setShowFilter(!showFilter)} style={{
          display: 'none', marginBottom: '1rem', padding: '0.6rem 1.2rem',
          background: '#8B1538', color: 'white', border: 'none', borderRadius: '8px',
          fontWeight: '600', cursor: 'pointer', alignItems: 'center', gap: '8px'
        }} className="md:hidden">
          {showFilter ? <><FaTimes /> {t.hideFilters}</> : <><FaFilter /> {t.showFilters}</>}
        </button>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          {/* Sidebar */}
          <div style={{ width: '240px', flexShrink: 0 }} className="hidden md:block">
            <FilterSidebar />
          </div>

          {/* Products Grid */}
          <div style={{ flex: 1 }}>
            {filteredProducts.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>{t.noSareesFound}</p>
                <button onClick={() => { setSelectedCategory('all'); setPriceRange(15000); }}
                  style={{ marginTop: '1rem', padding: '0.6rem 1.5rem', background: '#8B1538', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                  {t.clearFilters}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;