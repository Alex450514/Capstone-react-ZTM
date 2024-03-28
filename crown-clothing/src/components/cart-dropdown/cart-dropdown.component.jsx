import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles.jsx';
import { selectCartItems, selectIsCartOpen } from '../../store/cart/cart.selector.js';
import { useSelector } from 'react-redux';
import { useCart } from '../../store/cart/useCart.js';
import { useDispatch } from 'react-redux';
import { updateCartPrices } from '../../store/cart/cart.action.js';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const isCartOpen = useSelector(selectIsCartOpen);
    const { toggleCart } = useCart();

    let navigate = useNavigate();

    const navigateToRoute = () => {
        toggleCart();
        navigate('/checkout'); 
    };

    const dispatch = useDispatch();

    const handleUpdateClick = () => {
        dispatch(updateCartPrices());
    };

    return (
        <CartDropdownContainer isVisible={isCartOpen}>
            <CartItems>
                {cartItems.length > 0 ? (
                    cartItems.map((product) => (
                        <CartItem key={product.id} product={product}></CartItem>
                    ))
                ) : (
                    <EmptyMessage>Your cart is empty.</EmptyMessage>
                )}
            </CartItems>
            <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={() => { navigateToRoute(); handleUpdateClick(); }} type="button">GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;