import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch, FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && searchRef.current) searchRef.current.focus();
  }, [isSearchOpen]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
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
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '0 1rem',
        boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '70px',
          width: '100%',
        }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <span style={{ fontSize: '1.6rem' }}>🧵</span>
            <span style={{ color: '#D4AF37', fontWeight: '800', fontSize: '1.4rem', fontFamily: 'Playfair Display, serif', letterSpacing: '0.02em' }}>SilkWeave</span>
          </Link>

          {/* Desktop Nav Links - hidden on mobile */}
          <div className="hidden md:flex" style={{ gap: '0.5rem', alignItems: 'center' }}>
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  color: isActive(to) ? '#D4AF37' : 'white',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '0.95rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.4rem',
                  borderBottom: isActive(to) ? '2px solid #D4AF37' : '2px solid transparent',
                  transition: 'all 0.2s',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
                onMouseOver={e => { if (!isActive(to)) { e.currentTarget.style.color = '#D4AF37'; e.currentTarget.style.borderBottomColor = '#D4AF37'; }}}
                onMouseOut={e => { if (!isActive(to)) { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderBottomColor = 'transparent'; }}}
              >{label}</Link>
            ))}
          </div>

          {/* Right Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', fontSize: '1.1rem', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px' }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.2)'; e.currentTarget.style.color = '#D4AF37'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'white'; }}
            ><FaSearch /></button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
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
            <Link
              to="/cart"
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
                <div
                  className="hidden group-hover:block"
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
              <Link
                to="/login"
                style={{ background: 'transparent', border: '1.5px solid #D4AF37', color: '#D4AF37', padding: '0.4rem 1rem', borderRadius: '2rem', fontWeight: '600', fontSize: '0.85rem', textDecoration: 'none', transition: 'all 0.2s', letterSpacing: '0.03em', whiteSpace: 'nowrap' }}
                onMouseOver={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.color = '#8B1538'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#D4AF37'; }}
              >Login</Link>
            )}

            {/* Mobile Menu Button - visible only on mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.3rem', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div style={{ paddingBottom: '1rem' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search for sarees..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ flex: 1, padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1.5px solid #D4AF37', outline: 'none', fontSize: '0.95rem', boxSizing: 'border-box', fontFamily: "'Poppins', sans-serif", minWidth: 0 }}
              />
              <button
                type="submit"
                style={{ background: '#D4AF37', color: '#8B1538', border: 'none', borderRadius: '0.5rem', padding: '0 1rem', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >Search</button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div style={{ background: '#6b0f2a', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              style={{ display: 'block', padding: '0.85rem 1.5rem', color: isActive(to) ? '#D4AF37' : 'white', textDecoration: 'none', fontWeight: '500', borderLeft: isActive(to) ? '3px solid #D4AF37' : '3px solid transparent', transition: 'all 0.2s' }}
            >{label}</Link>
          ))}
          <Link
            to="/wishlist"
            onClick={() => setIsOpen(false)}
            style={{ display: 'block', padding: '0.85rem 1.5rem', color: 'white', textDecoration: 'none', fontWeight: '500', borderLeft: '3px solid transparent' }}
          >❤️ Wishlist</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;