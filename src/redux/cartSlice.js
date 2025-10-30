/**
 * Redux Cart Slice
 * 
 * This file defines the Redux slice for managing shopping cart state.
 * It includes the initial state, reducers for cart operations, and exports
 * actions and the reducer for use in the Redux store.
 */

import { createSlice } from '@reduxjs/toolkit';

/**
 * Initial state for the shopping cart
 * 
 * cart: Array of cart items, each containing:
 *   - id: unique identifier for the product
 *   - name: product name
 *   - price: product price
 *   - quantity: number of items in cart
 *   - image: product image URL (optional)
 * 
 * totalQuantity: Total number of items across all products
 * totalAmount: Total price of all items in the cart
 */
const initialState = {
  cart: [],
  totalQuantity: 0,
  totalAmount: 0,
};

/**
 * Cart Slice - defines all cart-related actions and reducers
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Add item to cart
     * 
     * If item already exists, increase quantity by 1
     * If item is new, add it with quantity 1
     * 
     * @param {Object} state - Current cart state
     * @param {Object} action - Action with payload containing item details
     * @param {string} action.payload.id - Product ID
     * @param {string} action.payload.name - Product name
     * @param {number} action.payload.price - Product price
     * @param {string} action.payload.image - Product image URL (optional)
     */
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find(item => item.id === newItem.id);

      if (existingItem) {
        // Item already in cart - increase quantity
        existingItem.quantity++;
      } else {
        // New item - add to cart with quantity 1
        state.cart.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          image: newItem.image || '',
        });
      }

      // Update totals
      state.totalQuantity++;
      state.totalAmount += newItem.price;
    },

    /**
     * Remove item from cart completely
     * 
     * Removes the item regardless of quantity
     * 
     * @param {Object} state - Current cart state
     * @param {Object} action - Action with payload containing item ID
     * @param {string} action.payload - Product ID to remove
     */
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cart.find(item => item.id === id);

      if (existingItem) {
        // Update totals before removing
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;

        // Remove item from cart
        state.cart = state.cart.filter(item => item.id !== id);
      }
    },

    /**
     * Update item quantity in cart
     * 
     * Sets the quantity to a specific value
     * If quantity is 0 or less, removes the item
     * 
     * @param {Object} state - Current cart state
     * @param {Object} action - Action with payload
     * @param {string} action.payload.id - Product ID
     * @param {number} action.payload.quantity - New quantity value
     */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cart.find(item => item.id === id);

      if (existingItem) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.totalQuantity -= existingItem.quantity;
          state.totalAmount -= existingItem.price * existingItem.quantity;
          state.cart = state.cart.filter(item => item.id !== id);
        } else {
          // Update totals based on quantity change
          const quantityDiff = quantity - existingItem.quantity;
          state.totalQuantity += quantityDiff;
          state.totalAmount += existingItem.price * quantityDiff;

          // Update item quantity
          existingItem.quantity = quantity;
        }
      }
    },

    /**
     * Decrease item quantity by 1
     * 
     * If quantity reaches 0, removes the item
     * 
     * @param {Object} state - Current cart state
     * @param {Object} action - Action with payload containing item ID
     * @param {string} action.payload - Product ID
     */
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cart.find(item => item.id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          // Remove item if quantity will be 0
          state.totalQuantity--;
          state.totalAmount -= existingItem.price;
          state.cart = state.cart.filter(item => item.id !== id);
        } else {
          // Decrease quantity by 1
          existingItem.quantity--;
          state.totalQuantity--;
          state.totalAmount -= existingItem.price;
        }
      }
    },

    /**
     * Clear all items from cart
     * 
     * Resets cart to initial empty state
     * 
     * @param {Object} state - Current cart state
     */
    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

// Export actions for use in components
export const {
  addItem,
  removeItem,
  updateQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

// Export reducer for store configuration
export default cartSlice.reducer;
