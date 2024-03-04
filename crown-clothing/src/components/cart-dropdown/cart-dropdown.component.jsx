import './cart-dropdown.styles.scss';

import Button from '../button/button.component';

import CartContext from '../../contexts/cart.context';
import { useContext } from 'react';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length > 0 ? (
                    cartItems.map(({ id, name, price, quantity }) => (
                    <div key={id} className="cart-item">
                        <h2>{name}</h2>
                        <p>${price} x {quantity}</p>
                        {/* Here, you can add buttons or inputs to change the quantity or remove the item */}
                    </div>
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
            <Button>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;