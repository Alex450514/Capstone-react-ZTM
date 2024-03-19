import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import CartContext from '../../contexts/cart.context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    let navigate = useNavigate();

    const navigateToRoute = () => {
        navigate('/checkout'); 
    };

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length > 0 ? (
                    cartItems.map((product) => (
                        <CartItem product={product}></CartItem>
                    ))
                ) : (
                    <EmptyMessage>Your cart is empty.</EmptyMessage>
                )}
            </CartItems>
            <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={navigateToRoute} type="button">GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;