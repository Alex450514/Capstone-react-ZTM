import CartContext from "../../contexts/cart.context";
import { useContext } from "react";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import './checkout.styles.scss';

const Checkout = () => {
    const { cartItems } = useContext(CartContext);
    const { cartTotal } = useContext(CartContext);

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.length > 0 ? (
                    cartItems.map((product) => (
                        <CheckoutItem key={product.id} product={product}></CheckoutItem>
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            <span className="total">Cart total: {cartTotal}$</span>
        </div>
    )
}

export default Checkout;