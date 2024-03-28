import './checkout-item.styles.scss';
import { useCart } from '../../store/cart/useCart';

const CheckoutItem = ({ product }) => {
    const {name, price, quantity, imageUrl} = product;

    const { removeAllOfProductFromCart, addItemToCart, removeItemFromCart } = useCart();

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name}></img>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => removeItemFromCart(product)}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => addItemToCart(product)}>
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
            <div className='remove-button' onClick={() => removeAllOfProductFromCart(product)}>
                &#10005;
            </div>
        </div>
    )

}

export default CheckoutItem;