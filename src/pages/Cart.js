import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-6">Shopping Cart</h1>
          <p className="text-xl text-gray-600 mb-8">Your cart is empty</p>
          <Link to="/products" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Shopping Cart</h1>

        {/* Main layout: side by side */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Cart Items - left side */}
          <div style={{ flex: '2', minWidth: '300px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid #eee', marginBottom: '1.5rem' }}>
                
                {/* Product Image - fixed size */}
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                />

                {/* Product Details */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: '600', fontSize: '1.1rem', color: '#8B1538', marginBottom: '4px' }}>{item.name}</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>₹{item.price}</p>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{ color: '#8B1538', padding: '6px', borderRadius: '4px', border: '1px solid #8B1538', background: 'white', cursor: 'pointer' }}
                    >
                      <FaMinus size={12} />
                    </button>
                    <span style={{ fontWeight: '600' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{ color: '#8B1538', padding: '6px', borderRadius: '4px', border: '1px solid #8B1538', background: 'white', cursor: 'pointer' }}
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>

                {/* Price & Delete */}
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <p style={{ fontWeight: '700', fontSize: '1.1rem', color: '#8B1538' }}>₹{item.price * item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary - right side */}
          <div style={{ flex: '1', minWidth: '260px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '1.5rem', position: 'sticky', top: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#8B1538', marginBottom: '1.5rem' }}>Order Summary</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal:</span>
                <span>₹{getTotalPrice()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping:</span>
                <span style={{ color: '#D4AF37', fontWeight: '600' }}>Free</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Tax (18%):</span>
                <span>₹{(getTotalPrice() * 0.18).toFixed(2)}</span>
              </div>
              <hr style={{ margin: '8px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.1rem' }}>
                <span>Total:</span>
                <span style={{ color: '#8B1538' }}>₹{(getTotalPrice() + getTotalPrice() * 0.18).toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              style={{ display: 'block', textAlign: 'center', backgroundColor: '#8B1538', color: 'white', padding: '12px', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', marginBottom: '12px' }}
            >
              Proceed to Checkout
            </Link>

            <button
              onClick={clearCart}
              style={{ display: 'block', width: '100%', textAlign: 'center', backgroundColor: 'white', color: '#8B1538', padding: '12px', borderRadius: '8px', fontWeight: '600', border: '2px solid #8B1538', cursor: 'pointer' }}
            >
              Clear Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
