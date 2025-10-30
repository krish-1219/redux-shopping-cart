/**
 * Redux Store Configuration
 * 
 * This file configures and exports the Redux store for the shopping cart application.
 * It combines all reducers (in this case, just the cart reducer) and creates
 * the store that will be provided to the React application.
 */

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

/**
 * Configure and create the Redux store
 * 
 * The store is configured with:
 * - cart reducer: manages all shopping cart state
 * 
 * Redux Toolkit's configureStore automatically:
 * - Sets up Redux DevTools for debugging
 * - Adds middleware for development warnings
 * - Enables Redux Thunk for async actions (if needed in future)
 * - Provides good defaults for store configuration
 * 
 * To add more reducers in the future, simply add them to the reducer object:
 * reducer: {
 *   cart: cartReducer,
 *   user: userReducer,
 *   products: productsReducer,
 * }
 */
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Export the configured store
export default store;

/**
 * Type exports for TypeScript (optional)
 * Uncomment these if using TypeScript:
 * 
 * export type RootState = ReturnType<typeof store.getState>
 * export type AppDispatch = typeof store.dispatch
 */
