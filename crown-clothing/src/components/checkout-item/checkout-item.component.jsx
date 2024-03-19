import './checkout-item.styles.scss';
import { useContext } from 'react';

import CartContext from '../../contexts/cart.context';

const CheckoutItem = ({ product }) => {
    const {name, price, quantity, imageUrl} = product;

    const { removeAllOfProductFromCart } = useContext(CartContext);
    const { removeItemFromCart } = useContext(CartContext);
    const { addItemToCart } = useContext(CartContext);

    const removeProduct = () => removeAllOfProductFromCart(product);
    const dropQty = () => removeItemFromCart(product);
    const addQty = () => addItemToCart(product);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name}></img>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={dropQty}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addQty}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}$</span>
            {/* <div className='qty-selector'>
                <Button onClick={dropQty}>Less</Button>
                <span className='qantity'>{quantity}</span>
                <Button onClick={addQty}>More</Button>
            </div>
            <p>{price * quantity}$</p> */}
            <div className='remove-button' onClick={removeProduct}>
                &#10005;
            </div>
        </div>
    )

}

export default CheckoutItem;