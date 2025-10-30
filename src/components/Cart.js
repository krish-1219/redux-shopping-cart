/**
 * Cart Component
 * 
 * This component displays the shopping cart and allows users to:
 * - View all items in their cart
 * - Update item quantities
 * - Remove items from cart
 * - Clear the entire cart
 * - See total quantity and total price
 * 
 * Uses Redux for state management via react-redux hooks
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeItem,
  updateQuantity,
  decreaseQuantity,
  addItem,
  clearCart,
} from '../redux/cartSlice';
import './Cart.css'; // Optional: Add your own CSS file for styling

const Cart = () => {
  // Get cart state from Redux store
  // useSelector hook subscribes to Redux store and re-renders when state changes
  const { cart, totalQuantity, totalAmount } = useSelector((state) => state.cart);

  // Get dispatch function to send actions to Redux store
  const dispatch = useDispatch();

  /**
   * Handle removing an item from cart
   * Dispatches removeItem action with product ID
   */
  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  /**
   * Handle increasing item quantity by 1
   * Dispatches addItem action to increment quantity
   */
  const handleIncreaseQuantity = (item) => {
    dispatch(addItem(item));
  };

  /**
   * Handle decreasing item quantity by 1
   * Dispatches decreaseQuantity action
   * If quantity reaches 0, item is automatically removed
   */
  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  /**
   * Handle updating item quantity to a specific value
   * Dispatches updateQuantity action with new quantity
   * Can be used for direct input quantity updates
   */
  const handleUpdateQuantity = (id, quantity) => {
    const newQuantity = parseInt(quantity, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  /**
   * Handle clearing all items from cart
   * Dispatches clearCart action to reset cart to empty state
   */
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear the entire cart?')) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        {cart.length > 0 && (
          <button
            className="clear-cart-btn"
            onClick={handleClearCart}
            aria-label="Clear entire cart"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        // Empty cart message
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p>Add some products to get started!</p>
        </div>
      ) : (
        // Cart items list
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                {/* Product Image */}
                {item.image && (
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                )}

                {/* Product Details */}
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="item-quantity">
                  <button
                    className="quantity-btn"
                    onClick={() => handleDecreaseQuantity(item.id)}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                    className="quantity-input"
                    aria-label="Item quantity"
                  />
                  <button
                    className="quantity-btn"
                    onClick={() => handleIncreaseQuantity(item)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Item Subtotal */}
                <div className="item-subtotal">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                {/* Remove Button */}
                <button
                  className="remove-item-btn"
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-row">
              <span>Total Items:</span>
              <span>{totalQuantity}</span>
            </div>
            <div className="summary-row total">
              <span>Total Amount:</span>
              <span className="total-amount">${totalAmount.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" aria-label="Proceed to checkout">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

/**
 * Component Features:
 * 
 * 1. Real-time Updates: Cart automatically updates when Redux state changes
 * 2. Quantity Management: Increase/decrease buttons and direct input
 * 3. Item Removal: Remove individual items or clear entire cart
 * 4. Price Calculations: Automatic subtotals and total amount calculation
 * 5. Empty State: User-friendly message when cart is empty
 * 6. Accessibility: Proper ARIA labels for screen readers
 * 7. Confirmation: Asks for confirmation before clearing cart
 * 
 * Redux Integration:
 * - useSelector: Reads cart state from Redux store
 * - useDispatch: Sends actions to update Redux store
 * - Automatic re-rendering when store state changes
 */
