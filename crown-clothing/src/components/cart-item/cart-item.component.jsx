import { CartItemContainer } from './cart-item.styles.jsx';

const CartItem = ({ product }) => {
    const {name, id, price, quantity, imageUrl} = product;

    return (
        <CartItemContainer key={id}>
            <img src={imageUrl} alt={name}></img>
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>${price} x {quantity}</span>
            </div>
        </CartItemContainer>
    )
}

export default CartItem;