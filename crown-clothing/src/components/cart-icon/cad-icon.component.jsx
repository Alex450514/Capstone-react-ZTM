import './card-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';

import CartContext from '../../contexts/cart.context';

const CardIcon = () => {
    const { isCartOpen, cartCount, setIsCartOpen } = useContext(CartContext);

    return (
        <div className='cart-icon-container'>
            <ShoppingIcon className="shopping-icon" onClick={() => setIsCartOpen(!isCartOpen)}></ShoppingIcon>
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CardIcon;