import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

// Initial context state
const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  removeAllOfProductFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export default CartContext;

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_CART_COUNT:
      return {
        ...state,
        cartCount: payload
      }
    case CART_ACTION_TYPES.SET_CART_TOTAL:
      return {
        ...state,
        cartTotal: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
}


export const CartProvider = ({ children }) => {

    const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
      const newCartCount = newCartItems.reduce((total, item) => total + item.quantity, 0);
      const newCartTotal = newCartItems.reduce((total, item) => total + item.quantity * item.price, 0);
      dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems }));
      dispatch(createAction(CART_ACTION_TYPES.SET_CART_COUNT, newCartCount));
      dispatch(createAction(CART_ACTION_TYPES.SET_CART_TOTAL, newCartTotal));
    }

    const setIsCartOpen = (bool) => {
      dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const addItemToCart = (productToAdd) => {
      const newCartItems = addCartItem(cartItems, productToAdd);
      updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (productToRemove) => {
      const newCartItems = removeCartItem(cartItems, productToRemove);
      updateCartItemsReducer(newCartItems);
    }

    const removeAllOfProductFromCart = (productToRemove) => {
      const newCartItems = removeCartItem(cartItems, productToRemove, true);
      updateCartItemsReducer(newCartItems);
    }

    const addCartItem = (cartItems, productToAdd) => {
      const newCartItems = [...cartItems];
      const existingCartItem = newCartItems.find((item) => item.id === productToAdd.id);
      if (existingCartItem) {
        newCartItems.forEach((item) => {
          if (item.id === productToAdd.id) {
            item.quantity += 1;
          }
        })
      } else {
        newCartItems.push({ ...productToAdd, quantity: 1 });
      }
      return newCartItems;
    }

    const removeCartItem = (cartItems, productToRemove, removeAll = false) => {
      return cartItems.reduce((accumulatedCartItems, item) => {
        if (item.id === productToRemove.id) {
          // If we're removing all quantities, or if the item's quantity is 1, remove it entirely
          if (removeAll || item.quantity === 1) {
            return accumulatedCartItems;
          }
          // Otherwise, decrement the quantity
          return [...accumulatedCartItems, { ...item, quantity: item.quantity - 1 }];
        }
        // Keep items that aren't being removed
        return [...accumulatedCartItems, item];
      }, []);
    };

    const value = { 
      isCartOpen, 
      setIsCartOpen, 
      cartItems, 
      addItemToCart, 
      removeItemFromCart,
      removeAllOfProductFromCart, 
      cartCount, 
      cartTotal 
    };
  
    return (
      <CartContext.Provider value={value}>
        {children}
      </CartContext.Provider>
    );
  };
  
