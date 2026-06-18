import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch, FaHeart, FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const allProducts = [
  { id: 1, name: 'Banarasi Silk Saree', category: 'silk', price: 8999, discount: 31 },
  { id: 2, name: 'Kanchipuram Silk', category: 'silk', price: 6499, discount: 35 },
  { id: 3, name: 'Mysore Silk Saree', category: 'silk', price: 7999, discount: 33 },
  { id: 4, name: 'Cotton Saree', category: 'cotton', price: 2499, discount: 37 },
  { id: 5, name: 'Linen Saree', category: 'linen', price: 3999, discount: 33 },
  { id: 6, name: 'Chikankari Saree', category: 'cotton', price: 4999, discount: 33 },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [showCartPreview, setShowCartPreview] = useState(false);

  const { cart, removeFromCart, updateQuantity } = useCart();
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);
  const cartPreviewRef = useRef(null);
  const cartHoverTimeout = useRef(null);

  useEffect(() => {
    if (isSearchOpen && searchRef.current) searchRef.current.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
      if (cartPreviewRef.current && !cartPreviewRef.current.contains(e.target)) {
        setShowCartPreview(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setActiveSuggestion(-1);
    if (query.trim().length > 0) {
      const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`);
    setIsSearchOpen(false);
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveSuggestion(prev => Math.min(prev + 1, suggestions.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveSuggestion(prev => Math.max(prev - 1, 0)); }
    else if (e.key === 'Enter' && activeSuggestion >= 0) { e.preventDefault(); handleSuggestionClick(suggestions[activeSuggestion]); }
    else if (e.key === 'Escape') setShowSuggestions(false);
  };

  const categoryEmoji = (cat) => ({ silk: '🥻', cotton: '🌿', linen: '🌾' }[cat] || '🧵');

  // Cart total
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  // Cart hover handlers
  const handleCartMouseEnter = () => {
    clearTimeout(cartHoverTimeout.current);
    setShowCartPreview(true);
  };
  const handleCartMouseLeave = () => {
    cartHoverTimeout.current = setTimeout(() => setShowCartPreview(false), 300);
  };

  const iconBtnStyle = {
    background: 'none', border: 'none', color: 'white', cursor: 'pointer',
    padding: '0.5rem', borderRadius: '50%', fontSize: '1.1rem', transition: 'all 0.2s',
    display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px',
  };

  return (
    <nav style={{
      background: 'linear-gradient(to right, #8B1538, #6b0f2a)',
      boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
      position: 'sticky', top: 0, zIndex: 50,
      width: '100%', boxSizing: 'border-box',
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px', width: '100%' }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <span style={{ fontSize: '1.6rem' }}>🧵</span>
            <span style={{ color: '#D4AF37', fontWeight: '800', fontSize: '1.4rem', fontFamily: 'Playfair Display, serif', letterSpacing: '0.02em' }}>SilkWeave</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex" style={{ gap: '0.5rem', alignItems: 'center' }}>
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to}
                style={{ color: isActive(to) ? '#D4AF37' : 'white', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem', padding: '0.5rem 1rem', borderRadius: '0.4rem', borderBottom: isActive(to) ? '2px solid #D4AF37' : '2px solid transparent', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                onMouseOver={e => { if (!isActive(to)) { e.currentTarget.style.color = '#D4AF37'; e.currentTarget.style.borderBottomColor = '#D4AF37'; }}}
                onMouseOut={e => { if (!isActive(to)) { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderBottomColor = 'transparent'; }}}
              >{label}</Link>
            ))}
          </div>

          {/* Right Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>

            {/* Search */}
            <button onClick={() => { setIsSearchOpen(!isSearchOpen); setShowSuggestions(false); setSearchQuery(''); }}
              style={iconBtnStyle}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.2)'; e.currentTarget.style.color = '#D4AF37'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'white'; }}
            ><FaSearch /></button>

            {/* Wishlist */}
            <Link to="/wishlist"
              style={{ ...iconBtnStyle, textDecoration: 'none', position: 'relative' }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.2)'; e.currentTarget.style.color = '#D4AF37'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'white'; }}
            >
              <FaHeart />
              {wishlist.length > 0 && (
                <span style={{ position: 'absolute', top: 0, right: 0, background: '#D4AF37', color: '#8B1538', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: '700', border: '1.5px solid white' }}>
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart with Preview */}
            <div
              ref={cartPreviewRef}
              style={{ position: 'relative' }}
              onMouseEnter={handleCartMouseEnter}
              onMouseLeave={handleCartMouseLeave}
            >
              <Link to="/cart"
                style={{ ...iconBtnStyle, textDecoration: 'none', position: 'relative' }}
                onMouseOver={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.2)'; e.currentTarget.style.color = '#D4AF37'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'white'; }}
              >
                <FaShoppingCart />
                {cart.length > 0 && (
                  <span style={{ position: 'absolute', top: 0, right: 0, background: '#D4AF37', color: '#8B1538', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: '700', border: '1.5px solid white' }}>
                    {cart.length}
                  </span>
                )}
              </Link>

              {/* Cart Preview Dropdown */}
              {showCartPreview && (
                <div
                  onMouseEnter={handleCartMouseEnter}
                  onMouseLeave={handleCartMouseLeave}
                  style={{ position: 'absolute', right: 0, top: '110%', background: 'white', borderRadius: '0.75rem', boxShadow: '0 12px 40px rgba(0,0,0,0.18)', width: '320px', zIndex: 200, overflow: 'hidden', border: '1px solid #f0ebe8' }}
                >
                  {/* Header */}
                  <div style={{ padding: '0.85rem 1rem', background: 'linear-gradient(to right, #8B1538, #6b0f2a)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: 'white', fontWeight: '700', fontSize: '0.95rem', fontFamily: "'Poppins', sans-serif" }}>
                      🛒 Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                    </span>
                    {cart.length > 0 && (
                      <span style={{ color: '#D4AF37', fontWeight: '700', fontSize: '0.9rem' }}>
                        ₹{cartTotal.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Cart Items */}
                  {cart.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🛒</div>
                      <p style={{ color: '#9ca3af', fontSize: '0.9rem', fontFamily: "'Poppins', sans-serif", margin: 0 }}>உன் cart காலியா இருக்கு!</p>
                      <Link to="/products" onClick={() => setShowCartPreview(false)}
                        style={{ display: 'inline-block', marginTop: '1rem', background: '#8B1538', color: 'white', padding: '0.5rem 1.2rem', borderRadius: '2rem', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600' }}
                      >Shop Now</Link>
                    </div>
                  ) : (
                    <>
                      {/* Items List */}
                      <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                        {cart.map((item, index) => (
                          <div key={item.id || index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderBottom: '1px solid #f5f0ee' }}>
                            {/* Emoji */}
                            <div style={{ width: '38px', height: '38px', background: '#faf0f3', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
                              🥻
                            </div>

                            {/* Name & Price */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ margin: 0, fontWeight: '600', fontSize: '0.82rem', color: '#1a1a1a', fontFamily: "'Poppins', sans-serif", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {item.name}
                              </p>
                              <p style={{ margin: 0, color: '#8B1538', fontWeight: '700', fontSize: '0.82rem' }}>
                                ₹{item.price.toLocaleString('en-IN')}
                              </p>
                            </div>

                            {/* Quantity Controls */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>
                              <button
                                onClick={() => updateQuantity ? updateQuantity(item.id, (item.quantity || 1) - 1) : null}
                                style={{ width: '24px', height: '24px', border: '1px solid #e5e7eb', borderRadius: '50%', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: '#8B1538', fontWeight: '700' }}
                              >−</button>
                              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1a1a1a', minWidth: '16px', textAlign: 'center' }}>
                                {item.quantity || 1}
                              </span>
                              <button
                                onClick={() => updateQuantity ? updateQuantity(item.id, (item.quantity || 1) + 1) : null}
                                style={{ width: '24px', height: '24px', border: '1px solid #e5e7eb', borderRadius: '50%', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: '#8B1538', fontWeight: '700' }}
                              >+</button>
                            </div>

                            {/* Remove */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d1d5db', fontSize: '0.8rem', padding: '0.2rem', flexShrink: 0, transition: 'color 0.2s' }}
                              onMouseOver={e => e.currentTarget.style.color = '#ef4444'}
                              onMouseOut={e => e.currentTarget.style.color = '#d1d5db'}
                            ><FaTrash /></button>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div style={{ padding: '0.85rem 1rem', borderTop: '1px solid #f0ebe8', background: '#faf8f5' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                          <span style={{ color: '#6b7280', fontSize: '0.88rem', fontFamily: "'Poppins', sans-serif" }}>Total</span>
                          <span style={{ color: '#8B1538', fontWeight: '800', fontSize: '1rem' }}>₹{cartTotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <Link to="/cart" onClick={() => setShowCartPreview(false)}
                            style={{ flex: 1, textAlign: 'center', padding: '0.55rem', border: '1.5px solid #8B1538', borderRadius: '0.5rem', color: '#8B1538', textDecoration: 'none', fontWeight: '600', fontSize: '0.85rem', transition: 'all 0.2s' }}
                            onMouseOver={e => { e.currentTarget.style.background = '#8B1538'; e.currentTarget.style.color = 'white'; }}
                            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8B1538'; }}
                          >View Cart</Link>
                          <Link to="/checkout" onClick={() => setShowCartPreview(false)}
                            style={{ flex: 1, textAlign: 'center', padding: '0.55rem', background: '#8B1538', borderRadius: '0.5rem', color: 'white', textDecoration: 'none', fontWeight: '600', fontSize: '0.85rem', transition: 'all 0.2s' }}
                            onMouseOver={e => e.currentTarget.style.background = '#6b0f2a'}
                            onMouseOut={e => e.currentTarget.style.background = '#8B1538'}
                          >Checkout →</Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Login / User */}
            {user ? (
              <div style={{ position: 'relative' }} className="group">
                <button
                  style={{ background: 'rgba(212,175,55,0.15)', border: '1.5px solid #D4AF37', color: '#D4AF37', cursor: 'pointer', padding: '0.4rem', borderRadius: '50%', fontSize: '1rem', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.color = '#8B1538'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.15)'; e.currentTarget.style.color = '#D4AF37'; }}
                ><FaUser /></button>
                <div className="hidden group-hover:block"
                  style={{ position: 'absolute', right: 0, top: '110%', background: 'white', borderRadius: '0.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', minWidth: '160px', overflow: 'hidden', zIndex: 100 }}
                >
                  <Link to="/dashboard" style={{ display: 'block', padding: '0.75rem 1rem', color: '#8B1538', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}
                    onMouseOver={e => { e.currentTarget.style.background = '#8B1538'; e.currentTarget.style.color = 'white'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#8B1538'; }}>👤 Dashboard</Link>
                  <Link to="/wishlist" style={{ display: 'block', padding: '0.75rem 1rem', color: '#8B1538', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}
                    onMouseOver={e => { e.currentTarget.style.background = '#8B1538'; e.currentTarget.style.color = 'white'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#8B1538'; }}>❤️ Wishlist</Link>
                  <button onClick={logout} style={{ display: 'block', width: '100%', padding: '0.75rem 1rem', color: '#8B1538', background: 'white', border: 'none', cursor: 'pointer', fontWeight: '500', fontSize: '0.9rem', textAlign: 'left' }}
                    onMouseOver={e => { e.currentTarget.style.background = '#8B1538'; e.currentTarget.style.color = 'white'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#8B1538'; }}>🚪 Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login"
                style={{ background: 'transparent', border: '1.5px solid #D4AF37', color: '#D4AF37', padding: '0.4rem 1rem', borderRadius: '2rem', fontWeight: '600', fontSize: '0.85rem', textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                onMouseOver={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.color = '#8B1538'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#D4AF37'; }}
              >Login</Link>
            )}

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden"
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.3rem', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Search Bar with Live Suggestions */}
        {isSearchOpen && (
          <div style={{ paddingBottom: '1rem' }} ref={searchContainerRef}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search for sarees..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                  style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1.5px solid #D4AF37', outline: 'none', fontSize: '0.95rem', boxSizing: 'border-box', fontFamily: "'Poppins', sans-serif" }}
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', borderRadius: '0.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 200, marginTop: '0.3rem', overflow: 'hidden', border: '1px solid #f0ebe8' }}>
                    {suggestions.map((product, index) => (
                      <div key={product.id} onClick={() => handleSuggestionClick(product)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', cursor: 'pointer', background: activeSuggestion === index ? '#faf0f3' : 'white', borderBottom: index < suggestions.length - 1 ? '1px solid #f5f0ee' : 'none', transition: 'background 0.15s' }}
                        onMouseEnter={() => setActiveSuggestion(index)}
                        onMouseLeave={() => setActiveSuggestion(-1)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '1.4rem' }}>{categoryEmoji(product.category)}</span>
                          <div>
                            <div style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '0.9rem' }}>{product.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'capitalize' }}>{product.category}</div>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: '700', color: '#8B1538', fontSize: '0.9rem' }}>₹{product.price.toLocaleString('en-IN')}</div>
                          <div style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: '600' }}>{product.discount}% OFF</div>
                        </div>
                      </div>
                    ))}
                    <div onClick={handleSearch}
                      style={{ padding: '0.65rem 1rem', textAlign: 'center', background: '#faf8f5', color: '#8B1538', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f5eded'}
                      onMouseLeave={e => e.currentTarget.style.background = '#faf8f5'}
                    >🔍 "{searchQuery}" — எல்லா results பார்க்க</div>
                  </div>
                )}
                {showSuggestions && suggestions.length === 0 && searchQuery.trim().length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', borderRadius: '0.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 200, marginTop: '0.3rem', padding: '1rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.9rem' }}>
                    😔 "{searchQuery}" — எந்த product-உம் இல்லை
                  </div>
                )}
              </div>
              <button type="submit" style={{ background: '#D4AF37', color: '#8B1538', border: 'none', borderRadius: '0.5rem', padding: '0 1rem', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>Search</button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div style={{ background: '#6b0f2a', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setIsOpen(false)}
              style={{ display: 'block', padding: '0.85rem 1.5rem', color: isActive(to) ? '#D4AF37' : 'white', textDecoration: 'none', fontWeight: '500', borderLeft: isActive(to) ? '3px solid #D4AF37' : '3px solid transparent', transition: 'all 0.2s' }}
            >{label}</Link>
          ))}
          <Link to="/wishlist" onClick={() => setIsOpen(false)}
            style={{ display: 'block', padding: '0.85rem 1.5rem', color: 'white', textDecoration: 'none', fontWeight: '500', borderLeft: '3px solid transparent' }}
          >❤️ Wishlist</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;