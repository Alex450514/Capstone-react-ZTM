import './cart-dropdown.styles.scss';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import CartContext from '../../contexts/cart.context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    let navigate = useNavigate();

    const navigateToRoute = () => {
        navigate('/checkout'); 
    };

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length > 0 ? (
                    cartItems.map((product) => (
                        <CartItem product={product}></CartItem>
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
            <Button onClick={navigateToRoute}>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;