import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

import { db } from "../../utils/firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";

export const setIsCartOpen = (isCartOpen) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);

export const setCartItems = (cartItems) =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);

export const setCartCount = (cartCount) =>
    createAction(CART_ACTION_TYPES.SET_CART_COUNT, cartCount);

export const setCartTotal = (cartTotal) =>
    createAction(CART_ACTION_TYPES.SET_CART_TOTAL, cartTotal)

export const addItem = (cartItems, productToAdd) => {
    const newCartItems = cartItems.map(cartItem => {
        if (cartItem.id === productToAdd.id) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
        } else {
            return cartItem;
        }
    });

    const existingCartItem = newCartItems.find((item) => item.id === productToAdd.id);
    if (!existingCartItem) {
        newCartItems.push({ ...productToAdd, quantity: 1 });
    }
    
    return {
        type: CART_ACTION_TYPES.ADD_ITEM,
        payload: newCartItems,
    };
};

export const removeItem = (cartItems, productToRemove) => {
    const newCartItems = cartItems.reduce((accumulatedCartItems, cartItem) => {
      if (cartItem.id === productToRemove.id) {
        // Only decrease quantity if it's more than 1
        if (cartItem.quantity > 1) {
          return accumulatedCartItems.concat({ ...cartItem, quantity: cartItem.quantity - 1 });
        }
      }
      return accumulatedCartItems.concat(cartItem);
    }, []);
  
    return {
      type: CART_ACTION_TYPES.REMOVE_ITEM,
      payload: newCartItems,
    };
};

export const clearCartItems = () => ({
    type: CART_ACTION_TYPES.CLEAR_CART_ITEMS
});

export const removeItems = (cartItems, productToRemove) => {
    const newCartItems = cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
  
    return {
      type: CART_ACTION_TYPES.REMOVE_ALL_OF_PRODUCT_FROM_CART,
      payload: newCartItems,
    };
};

export const toggleCartHidden = () => ({
    type: CART_ACTION_TYPES.TOGGLE_CART_HIDDEN
});

export const updatePrices = (updatedPrices) => ({
    type: CART_ACTION_TYPES.UPDATE_PRICES,
    payload: updatedPrices,
  });

export const updateCartPrices = () => async (dispatch, getState) => {

    try {
    const itemsWithPrices = await fetchAllItemsWithPrices(db); // Ensure db is your Firestore instance
    const { cartItems } = getState().cart;

    const updatedCartItems = cartItems.map((item) => {
    const latestPrice = itemsWithPrices[item.id];
    if (latestPrice && latestPrice !== item.price) {
        return { ...item, price: latestPrice };
    }
    return item;
    });

    dispatch(setCartItems(updatedCartItems)); // Assuming you have an action to update cart items
    } catch (error) {
    console.error("Error updating cart prices:", error);
    // Optionally dispatch an action to handle the error state
    } finally {

    }
};

const fetchAllItemsWithPrices = async (db) => {
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    let itemsWithPrices = {};
  
    categoriesSnapshot.forEach((docSnapshot) => {
      const { title, items } = docSnapshot.data();
      items.forEach((item) => {
        // Assuming each item has a unique ID across all categories
        itemsWithPrices[item.id] = item.price;
      });
    });
  
    return itemsWithPrices;
  };

