import './cart-item.styles.scss';

const CartItem = ({ product }) => {
    const {name, id, price, quantity, imageUrl} = product;

    return (
        <div key={id} className="cart-item-container">
            <img src={imageUrl} alt={name}></img>
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>${price} x {quantity}</span>
            </div>
        </div>
    )
}

export default CartItem;