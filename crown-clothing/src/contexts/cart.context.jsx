import { createContext, useState, useContext, useEffect } from 'react';

// Initial context state
const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export default CartContext;

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
  
    // Example function to add an item to the cart
    const addItemToCart = (productToAdd) => {
      // Implement logic to add item to cart
      setCartItems((prevCartItems) => {
        // Check if productToAdd is already in cartItems
        const existingCartItem = prevCartItems.find((item) => item.id === productToAdd.id);
    
        if (existingCartItem) {
          // Increase the quantity
          return prevCartItems.map((item) =>
            item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
    
        console.log("item added")
        // If the item is not in the cart, add it with a quantity of 1
        return [...prevCartItems, { ...productToAdd, quantity: 1 }];
      });
    };
  
    // Example function to remove an item from the cart
    const removeItemFromCart = (productToRemove) => {
      // Implement logic to remove item from cart
    };
  
    // Update cart count and total whenever cartItems changes
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);
  
    const value = { 
      isCartOpen, 
      setIsCartOpen, 
      cartItems, 
      addItemToCart, 
      removeItemFromCart, 
      cartCount, 
      cartTotal 
    };
  
    return (
      <CartContext.Provider value={value}>
        {children}
      </CartContext.Provider>
    );
  };
  
