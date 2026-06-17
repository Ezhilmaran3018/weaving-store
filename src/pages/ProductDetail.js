import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar, FaShieldAlt, FaTruck, FaUndo } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import banarasImage from '../assets/banaras.jpg';
import kanchipuramImage from '../assets/kanchipuram.jpg';
import mysoreImage from '../assets/mysore.jpg';
import cotonImage from '../assets/coton.jpg';
import lineImage from '../assets/line.jpg';
import chikaImage from '../assets/chika.jpg';

const allProducts = [
  { id: 1, name: 'Banarasi Silk Saree', category: 'silk', price: 8999, originalPrice: 12999, discount: 31, image: banarasImage, rating: 5, reviews: 245, description: 'Handwoven in Varanasi by master craftsmen, this Banarasi silk saree features intricate zari work and traditional motifs. Perfect for weddings and festive occasions.', material: 'Pure Silk', length: '6.5 meters', blousepiece: 'Included', careInstructions: 'Dry clean only' },
  { id: 2, name: 'Kanchipuram Silk', category: 'silk', price: 6499, originalPrice: 9999, discount: 35, image: kanchipuramImage, rating: 4, reviews: 189, description: 'Authentic Kanchipuram silk from Tamil Nadu, known for its rich texture and vibrant colors. Features traditional temple border design with gold zari.', material: 'Pure Kanjivaram Silk', length: '6 meters', blousepiece: 'Included', careInstructions: 'Dry clean only' },
  { id: 3, name: 'Mysore Silk Saree', category: 'silk', price: 7999, originalPrice: 11999, discount: 33, image: mysoreImage, rating: 5, reviews: 312, description: 'Soft and lustrous Mysore silk, known for its smooth texture and elegant finish. A timeless classic suitable for all occasions.', material: 'Mysore Silk', length: '6 meters', blousepiece: 'Included', careInstructions: 'Gentle hand wash' },
  { id: 4, name: 'Cotton Saree', category: 'cotton', price: 2499, originalPrice: 3999, discount: 37, image: cotonImage, rating: 4, reviews: 98, description: 'Lightweight and breathable pure cotton saree, perfect for daily wear. Features traditional block print patterns in natural dyes.', material: 'Pure Cotton', length: '5.5 meters', blousepiece: 'Not included', careInstructions: 'Machine washable' },
  { id: 5, name: 'Linen Saree', category: 'linen', price: 3999, originalPrice: 5999, discount: 33, image: lineImage, rating: 4, reviews: 156, description: 'Premium linen saree with a natural texture and earthy look. Extremely comfortable for summer wear with elegant draping.', material: 'Pure Linen', length: '6 meters', blousepiece: 'Included', careInstructions: 'Gentle hand wash' },
  { id: 6, name: 'Chikankari Saree', category: 'cotton', price: 4999, originalPrice: 7499, discount: 33, image: chikaImage, rating: 5, reviews: 203, description: 'Exquisite Lucknowi Chikankari embroidery on soft georgette base. Each stitch is handcrafted by skilled artisans from Lucknow.', material: 'Georgette with Cotton Embroidery', length: '6 meters', blousepiece: 'Included', careInstructions: 'Dry clean recommended' },
];

const ProductDetail = () => {
  const { id } = useParams();
  
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = allProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
        <h2 style={{ color: '#8B1538', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Product not found</h2>
        <Link to="/products" style={{ color: '#8B1538', fontWeight: '600', textDecoration: 'none', border: '2px solid #8B1538', padding: '0.6rem 1.5rem', borderRadius: '8px', marginTop: '1rem' }}>← Back to Products</Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = allProducts.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  const tabStyle = (tab) => ({
    padding: '0.6rem 1.5rem',
    border: 'none',
    borderBottom: activeTab === tab ? '2px solid #8B1538' : '2px solid transparent',
    background: 'none',
    color: activeTab === tab ? '#8B1538' : '#6b7280',
    fontWeight: activeTab === tab ? '700' : '500',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontFamily: "'Poppins', sans-serif",
    transition: 'all 0.2s',
  });

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.85rem', color: '#9ca3af' }}>
          <Link to="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link to="/products" style={{ color: '#9ca3af', textDecoration: 'none' }}>Products</Link>
          <span>›</span>
          <span style={{ color: '#8B1538', fontWeight: '600' }}>{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

          {/* Left - Image */}
          <div>
            <div style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', background: 'white' }}>
              {product.discount && (
                <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 2, background: '#8B1538', color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' }}>
                  -{product.discount}% OFF
                </div>
              )}
              <button
                onClick={() => toggleWishlist(product)}
                style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 2, background: wishlisted ? '#8B1538' : 'white', border: 'none', cursor: 'pointer', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', transition: 'all 0.2s' }}
              >
                <FaHeart size={17} style={{ color: wishlisted ? 'white' : '#ccc' }} />
              </button>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '420px', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Right - Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#D4AF37', letterSpacing: '0.08em', background: '#fff8e7', padding: '3px 10px', borderRadius: '10px', border: '1px solid #D4AF37' }}>
                {product.category}
              </span>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1a1a1a', marginTop: '0.75rem', lineHeight: 1.2, fontFamily: "'Playfair Display', serif" }}>
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={16} style={{ color: i < product.rating ? '#D4AF37' : '#e0e0e0' }} />
              ))}
              <span style={{ fontSize: '0.9rem', color: '#6b7280', marginLeft: '4px' }}>({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: '800', color: '#8B1538' }}>₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span style={{ fontSize: '1.1rem', color: '#aaa', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString()}</span>
                  <span style={{ fontSize: '0.85rem', color: '#2e7d32', fontWeight: '700', background: '#e8f5e9', padding: '3px 10px', borderRadius: '10px' }}>
                    Save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            <p style={{ color: '#4b5563', lineHeight: 1.7, fontSize: '0.95rem' }}>{product.description}</p>

            {/* Quick Info */}
            <div style={{ background: '#f9f4f6', borderRadius: '0.75rem', padding: '1rem 1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              {[
                ['Material', product.material],
                ['Length', product.length],
                ['Blouse Piece', product.blousepiece],
                ['Care', product.careInstructions],
              ].map(([label, value]) => (
                <div key={label}>
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
                  <div style={{ fontSize: '0.875rem', color: '#1a1a1a', fontWeight: '600', marginTop: '2px' }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>Quantity</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1.5px solid #e5e7eb', borderRadius: '0.6rem', overflow: 'hidden', width: 'fit-content' }}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ width: '40px', height: '40px', border: 'none', background: '#f9f4f6', color: '#8B1538', fontWeight: '700', fontSize: '1.2rem', cursor: 'pointer' }}>−</button>
                <span style={{ width: '48px', textAlign: 'center', fontWeight: '700', fontSize: '1rem' }}>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} style={{ width: '40px', height: '40px', border: 'none', background: '#f9f4f6', color: '#8B1538', fontWeight: '700', fontSize: '1.2rem', cursor: 'pointer' }}>+</button>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={handleAddToCart} style={{ flex: 1, minWidth: '160px', padding: '0.9rem', background: added ? '#2e7d32' : 'linear-gradient(135deg, #8B1538, #6b0f2a)', color: 'white', border: 'none', borderRadius: '0.6rem', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.3s', boxShadow: '0 4px 14px rgba(139,21,56,0.3)', fontFamily: "'Poppins', sans-serif" }}>
                <FaShoppingCart />
                {added ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
              <button onClick={() => toggleWishlist(product)} style={{ width: '50px', height: '50px', border: `2px solid ${wishlisted ? '#8B1538' : '#e5e7eb'}`, background: wishlisted ? '#8B1538' : 'white', borderRadius: '0.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                <FaHeart style={{ color: wishlisted ? 'white' : '#ccc' }} />
              </button>
            </div>

            {/* Trust Badges */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[
                [<FaTruck />, 'Free Shipping'],
                [<FaShieldAlt />, 'Authentic'],
                [<FaUndo />, '7-Day Returns'],
              ].map(([icon, label]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280', fontSize: '0.8rem', fontWeight: '500' }}>
                  <span style={{ color: '#8B1538' }}>{icon}</span> {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '3rem', overflow: 'hidden' }}>
          <div style={{ borderBottom: '1px solid #f0ebe8', display: 'flex' }}>
            {['description', 'details', 'reviews'].map(tab => (
              <button key={tab} style={tabStyle(tab)} onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div style={{ padding: '1.5rem' }}>
            {activeTab === 'description' && <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '0.95rem' }}>{product.description} Each piece is inspected for quality before dispatch. Our artisans have been perfecting this craft for generations, ensuring that every saree meets the highest standards of quality and authenticity.</p>}
            {activeTab === 'details' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {[['Material', product.material], ['Length', product.length], ['Blouse Piece', product.blousepiece], ['Care', product.careInstructions], ['Category', product.category], ['Origin', 'India']].map(([label, val]) => (
                  <div key={label} style={{ padding: '0.75rem', background: '#faf8f5', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>{label}</div>
                    <div style={{ color: '#1a1a1a', fontWeight: '600', fontSize: '0.9rem' }}>{val}</div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { name: 'Priya S.', rating: 5, text: 'Absolutely beautiful saree! The quality exceeded my expectations. Very fast delivery too.', date: '2 weeks ago' },
                  { name: 'Meena R.', rating: 4, text: 'Lovely fabric and great color. The zari work is stunning. Would buy again!', date: '1 month ago' },
                  { name: 'Lakshmi K.', rating: 5, text: 'Perfect for my daughter\'s wedding. Everyone complimented the saree. Worth every rupee!', date: '1 month ago' },
                ].map((review, i) => (
                  <div key={i} style={{ padding: '1rem', background: '#faf8f5', borderRadius: '0.75rem', borderLeft: '3px solid #D4AF37' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '0.9rem' }}>{review.name}</span>
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{review.date}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '2px', marginBottom: '0.5rem' }}>
                      {[...Array(5)].map((_, j) => <FaStar key={j} size={12} style={{ color: j < review.rating ? '#D4AF37' : '#e0e0e0' }} />)}
                    </div>
                    <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: 1.6 }}>{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#8B1538', fontFamily: "'Playfair Display', serif", marginBottom: '1.5rem' }}>You may also like</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {relatedProducts.map(p => (
                <Link to={`/product/${p.id}`} key={p.id} style={{ textDecoration: 'none', background: 'white', borderRadius: '0.85rem', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', display: 'block', transition: 'transform 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '0.85rem' }}>
                    <div style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '0.9rem', marginBottom: '4px' }}>{p.name}</div>
                    <div style={{ color: '#8B1538', fontWeight: '800' }}>₹{p.price.toLocaleString()}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;