import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch, FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

// Products data for live search
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
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && searchRef.current) searchRef.current.focus();
  }, [isSearchOpen]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggestions(false);
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
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && activeSuggestion >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[activeSuggestion]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const categoryEmoji = (cat) => {
    if (cat === 'silk') return '🥻';
    if (cat === 'cotton') return '🌿';
    if (cat === 'linen') return '🌾';
    return '🧵';
  };

  return (
    <nav style={{
      background: 'linear-gradient(to right, #8B1538, #6b0f2a)',
      boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%',
      boxSizing: 'border-box',
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
                style={{ color: isActive(to) ? '#D4AF37' : 'white', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem', padding: '0.5rem 1rem', borderRadius: '0.4rem', borderBottom: isActive(to) ? '2px solid #D4AF37' : '2px solid transparent', transition: 'all 0.2s', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}
                onMouseOver={e => { if (!isActive(to)) { e.currentTarget.style.color = '#D4AF37'; e.currentTarget.style.borderBottomColor = '#D4AF37'; }}}
                onMouseOut={e => { if (!isActive(to)) { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderBottomColor = 'transparent'; }}}
              >{label}</Link>
            ))}
          </div>

          {/* Right Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>

            {/* Search */}
            <button onClick={() => { setIsSearchOpen(!isSearchOpen); setShowSuggestions(false); setSearchQuery(''); }}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', fontSize: '1.1rem', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px' }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.2)'; e.currentTarget.style.color = '#D4AF37'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'white'; }}
            ><FaSearch /></button>

            {/* Wishlist */}
            <Link to="/wishlist"
              style={{ color: 'white', textDecoration: 'none', position: 'relative', padding: '0.5rem', borderRadius: '50%', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.2)'; e.currentTarget.style.color = '#D4AF37'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'white'; }}
            >
              <FaHeart />
              {wishlist.length > 0 && (
                <span style={{ position: 'absolute', top: '0px', right: '0px', background: '#D4AF37', color: '#8B1538', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: '700', border: '1.5px solid white' }}>
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart"
              style={{ color: 'white', textDecoration: 'none', position: 'relative', padding: '0.5rem', borderRadius: '50%', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.2)'; e.currentTarget.style.color = '#D4AF37'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'white'; }}
            >
              <FaShoppingCart />
              {cart.length > 0 && (
                <span style={{ position: 'absolute', top: '0px', right: '0px', background: '#D4AF37', color: '#8B1538', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: '700', border: '1.5px solid white' }}>
                  {cart.length}
                </span>
              )}
            </Link>

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
                style={{ background: 'transparent', border: '1.5px solid #D4AF37', color: '#D4AF37', padding: '0.4rem 1rem', borderRadius: '2rem', fontWeight: '600', fontSize: '0.85rem', textDecoration: 'none', transition: 'all 0.2s', letterSpacing: '0.03em', whiteSpace: 'nowrap' }}
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
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
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

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', borderRadius: '0.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 200, marginTop: '0.3rem', overflow: 'hidden', border: '1px solid #f0ebe8' }}>
                    {suggestions.map((product, index) => (
                      <div
                        key={product.id}
                        onClick={() => handleSuggestionClick(product)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 1rem',
                          cursor: 'pointer',
                          background: activeSuggestion === index ? '#faf0f3' : 'white',
                          borderBottom: index < suggestions.length - 1 ? '1px solid #f5f0ee' : 'none',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#faf0f3'; setActiveSuggestion(index); }}
                        onMouseLeave={e => { if (activeSuggestion !== index) e.currentTarget.style.background = 'white'; }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '1.4rem' }}>{categoryEmoji(product.category)}</span>
                          <div>
                            <div style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '0.9rem', fontFamily: "'Poppins', sans-serif" }}>
                              {product.name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'capitalize' }}>
                              {product.category}
                            </div>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: '700', color: '#8B1538', fontSize: '0.9rem' }}>
                            ₹{product.price.toLocaleString('en-IN')}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: '600' }}>
                            {product.discount}% OFF
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* View all results */}
                    <div
                      onClick={handleSearch}
                      style={{ padding: '0.65rem 1rem', textAlign: 'center', background: '#faf8f5', color: '#8B1538', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f5eded'}
                      onMouseLeave={e => e.currentTarget.style.background = '#faf8f5'}
                    >
                      🔍 "{searchQuery}" — எல்லா results பார்க்க
                    </div>
                  </div>
                )}

                {/* No results */}
                {showSuggestions && suggestions.length === 0 && searchQuery.trim().length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', borderRadius: '0.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 200, marginTop: '0.3rem', padding: '1rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.9rem' }}>
                    😔 "{searchQuery}" — எந்த product-உம் இல்லை
                  </div>
                )}
              </div>

              <button type="submit"
                style={{ background: '#D4AF37', color: '#8B1538', border: 'none', borderRadius: '0.5rem', padding: '0 1rem', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
              >Search</button>
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