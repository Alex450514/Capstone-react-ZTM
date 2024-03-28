import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, removeItems, toggleCartHidden } from './cart.action';
import { selectCartItems, selectCartCount, selectCartTotal, selectIsCartOpen } from './cart.selector';

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const cartTotal = useSelector(selectCartTotal);
  const isCartOpen = useSelector(selectIsCartOpen);

  const addItemToCart = (productToAdd) => {
    dispatch(addItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    dispatch(removeItem(cartItems, productToRemove));
  };

  const removeAllOfProductFromCart = (productToRemove) => {
    dispatch(removeItems(cartItems, productToRemove));
  };

  const toggleCart = () => {
    dispatch(toggleCartHidden());
  };


  return {
    isCartOpen,
    cartItems,
    toggleCart,
    addItemToCart,
    removeItemFromCart,
    removeAllOfProductFromCart,
    cartCount,
    cartTotal,
  };
};