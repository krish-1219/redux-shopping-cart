# redux-shopping-cart
React-Redux demo for shopping cart state management (add, remove, update items, clear cart)

## Overview
This project demonstrates the implementation of Redux for managing shopping cart state in a React application. Redux provides a predictable state container that makes it easier to manage complex application state, especially for features like shopping carts that require frequent updates and synchronization across multiple components.

## Why Redux for Shopping Cart?

Shopping carts are ideal use cases for Redux because:

1. **Centralized State Management**: The cart state needs to be accessible from multiple components (header, product list, cart page, checkout)
2. **Predictable State Updates**: Actions like adding, removing, and updating items follow clear patterns
3. **Easy Debugging**: Redux DevTools allow you to track every state change
4. **State Persistence**: Cart state can be easily persisted to localStorage
5. **Scalability**: As your e-commerce app grows, Redux makes it easier to add features like wishlists, order history, etc.

## Redux Concepts Applied

### Store
The Redux store holds the entire shopping cart state:
```javascript
{
  cart: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0
  }
}
```

### Actions
Common shopping cart actions:
- `ADD_ITEM`: Add a new product to the cart
- `REMOVE_ITEM`: Remove a product from the cart
- `UPDATE_QUANTITY`: Update the quantity of an item
- `CLEAR_CART`: Remove all items from the cart
- `INCREMENT_ITEM`: Increase quantity by 1
- `DECREMENT_ITEM`: Decrease quantity by 1

### Reducers
The cart reducer handles state transformations:
- Adds items with quantity tracking
- Updates quantities and recalculates totals
- Removes items while maintaining cart integrity
- Clears all items when needed

### Selectors
Selectors extract specific data from the store:
- `selectCartItems`: Get all cart items
- `selectCartTotal`: Calculate total price
- `selectCartQuantity`: Get total number of items
- `selectItemById`: Find specific item in cart

## Key Features

### 1. Add Items to Cart
- Adds new items with initial quantity
- If item exists, increments quantity
- Updates total price and quantity

### 2. Remove Items from Cart
- Removes item completely from cart
- Recalculates totals
- Updates UI automatically

### 3. Update Item Quantity
- Allows direct quantity input
- Validates quantity (minimum 1)
- Recalculates totals automatically

### 4. Clear Cart
- Removes all items at once
- Resets totals to zero
- Useful for post-checkout cleanup

## Redux Middleware

- **Redux Thunk**: For handling async operations (e.g., syncing cart with backend)
- **Redux Logger**: For development debugging
- **LocalStorage Middleware**: For persisting cart state

## Benefits of This Architecture

1. **Single Source of Truth**: Cart data lives in one place
2. **Immutable Updates**: State is never mutated directly
3. **Time-Travel Debugging**: Step through state changes
4. **Component Decoupling**: Components don't need to pass cart data through props
5. **Easy Testing**: Pure functions are easy to test
6. **Predictable Behavior**: Same action always produces same result

## Technologies Used

- React: UI library
- Redux: State management
- React-Redux: React bindings for Redux
- Redux Toolkit (recommended): Simplified Redux development
- Redux DevTools: Browser extension for debugging

## Getting Started

### Prerequisites
```bash
Node.js (v14 or higher)
npm or yarn
```

### Installation
```bash
# Clone the repository
git clone https://github.com/krish-1219/redux-shopping-cart.git

# Navigate to project directory
cd redux-shopping-cart

# Install dependencies
npm install

# Start development server
npm start
```

## Project Structure
```
src/
├── components/
│   ├── ProductList.js
│   ├── CartItem.js
│   ├── Cart.js
│   └── Header.js
├── redux/
│   ├── store.js
│   ├── cartSlice.js
│   └── selectors.js
├── App.js
└── index.js
```

## Usage Examples

### Adding an Item
```javascript
dispatch(addItem({
  id: 1,
  name: 'Product Name',
  price: 29.99,
  quantity: 1
}));
```

### Removing an Item
```javascript
dispatch(removeItem(itemId));
```

### Updating Quantity
```javascript
dispatch(updateQuantity({ id: itemId, quantity: 3 }));
```

### Clearing Cart
```javascript
dispatch(clearCart());
```

## Learning Resources

- [Redux Official Documentation](https://redux.js.org/)
- [React-Redux Documentation](https://react-redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for learning and development.

## Author

Created as a demonstration of Redux state management patterns for e-commerce applications.
