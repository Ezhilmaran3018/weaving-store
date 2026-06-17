import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Poppins', sans-serif", background: '#faf8f5' }}>
        <FaHeart style={{ fontSize: '4rem', color: '#e5e7eb', marginBottom: '1.5rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.5rem' }}>Your wishlist is empty</h2>
        <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>Save your favourite sarees here</p>
        <Link to="/products" style={{ background: 'linear-gradient(135deg, #8B1538, #6b0f2a)', color: 'white', padding: '0.8rem 2rem', borderRadius: '0.6rem', textDecoration: 'none', fontWeight: '600' }}>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', fontFamily: "'Poppins', sans-serif", padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#8B1538', fontFamily: "'Playfair Display', serif" }}>My Wishlist</h1>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>{wishlist.length} item{wishlist.length > 1 ? 's' : ''} saved</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {wishlist.map(product => (
            <div key={product.id} style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: '1px solid #f0ebe8', transition: 'transform 0.2s' }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ position: 'relative' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <button onClick={() => toggleWishlist(product)} style={{ position: 'absolute', top: '12px', right: '12px', background: '#8B1538', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                  <FaTrash size={13} style={{ color: 'white' }} />
                </button>
                {product.discount && (
                  <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#8B1538', color: 'white', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700' }}>
                    -{product.discount}% OFF
                  </div>
                )}
              </div>
              <div style={{ padding: '1rem 1.1rem 1.25rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: '#D4AF37', letterSpacing: '0.08em' }}>{product.category}</span>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '1rem', margin: '0.4rem 0 0.5rem', lineHeight: 1.3 }}>{product.name}</h3>
                </Link>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#8B1538' }}>₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && <span style={{ fontSize: '0.8rem', color: '#aaa', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString()}</span>}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  style={{ width: '100%', padding: '0.7rem', background: 'linear-gradient(135deg, #8B1538, #6b0f2a)', color: 'white', border: 'none', borderRadius: '0.6rem', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: "'Poppins', sans-serif" }}
                >
                  <FaShoppingCart size={14} /> Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;