import React, { useState } from 'react';
import { FaHeart, FaShoppingCart, FaStar, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div style={{
      background: 'white', borderRadius: '16px', overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)', transition: 'all 0.3s ease', position: 'relative',
    }}
      onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 35px rgba(139,21,56,0.15)'; }}
      onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)'; }}
    >
      {/* Discount Badge */}
      {product.discount && (
        <div style={{
          position: 'absolute', top: '12px', left: '12px', zIndex: 2,
          background: '#8B1538', color: 'white', padding: '4px 10px',
          borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700',
        }}>
          -{product.discount}% OFF
        </div>
      )}

      {/* Wishlist Button */}
      <button onClick={(e) => { e.preventDefault(); toggleWishlist(product); }} style={{
        position: 'absolute', top: '12px', right: '12px', zIndex: 2,
        background: wishlisted ? '#8B1538' : 'rgba(255,255,255,0.95)',
        border: 'none', cursor: 'pointer', width: '36px', height: '36px',
        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)', transition: 'all 0.2s'
      }}>
        <FaHeart size={15} style={{ color: wishlisted ? 'white' : '#ccc' }} />
      </button>

      {/* Whole card is a link to product detail */}
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>

        {/* Product Image */}
        <div style={{ position: 'relative', height: '240px', overflow: 'hidden', background: '#f9f4f6' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            onMouseOver={e => e.target.style.transform = 'scale(1.08)'}
            onMouseOut={e => e.target.style.transform = 'scale(1)'}
          />
          {/* Quick View overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(139,21,56,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0, transition: 'opacity 0.3s',
          }}
            onMouseOver={e => e.currentTarget.style.opacity = 1}
            onMouseOut={e => e.currentTarget.style.opacity = 0}
          >
            <span style={{
              color: 'white', fontWeight: '700', fontSize: '0.95rem',
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.15)', padding: '0.5rem 1.25rem',
              borderRadius: '2rem', border: '1.5px solid rgba(255,255,255,0.4)'
            }}>
              <FaEye size={14} /> Quick View
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div style={{ padding: '1rem 1.1rem 1.2rem' }}>
          <span style={{
            fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase',
            color: '#D4AF37', letterSpacing: '0.08em', background: '#fff8e7',
            padding: '2px 8px', borderRadius: '10px', border: '1px solid #D4AF37'
          }}>
            {product.category}
          </span>

          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1a1a1a', marginTop: '0.5rem', marginBottom: '0.3rem', lineHeight: '1.3' }}>
            {product.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '0.75rem' }}>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={13} style={{ color: i < product.rating ? '#D4AF37' : '#e0e0e0' }} />
            ))}
            <span style={{ fontSize: '0.75rem', color: '#888', marginLeft: '4px' }}>({product.reviews})</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#8B1538' }}>₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span style={{ fontSize: '0.8rem', color: '#aaa', textDecoration: 'line-through', marginLeft: '6px' }}>
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <span style={{ fontSize: '0.75rem', color: '#2e7d32', fontWeight: '600', background: '#e8f5e9', padding: '2px 8px', borderRadius: '10px' }}>
                Save ₹{(product.originalPrice - product.price).toLocaleString()}
              </span>
            )}
          </div>

          <button onClick={handleAddToCart} style={{
            width: '100%', padding: '0.65rem',
            background: added ? '#2e7d32' : 'linear-gradient(to right, #8B1538, #a01d45)',
            color: 'white', border: 'none', borderRadius: '10px',
            fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'all 0.3s', boxShadow: added ? '0 4px 12px rgba(46,125,50,0.4)' : '0 4px 12px rgba(139,21,56,0.3)'
          }}>
            <FaShoppingCart size={15} />
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;