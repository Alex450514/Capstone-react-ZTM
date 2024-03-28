import { useSelector } from 'react-redux';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector.js';
import { useCart } from '../../store/cart/useCart.js';  
import { CardIconContainer, ItemCount, ShoppingIconContainer } from './card-icon.styles.jsx';

const CardIcon = () => {
    
    const { toggleCart } = useCart();

    const cartCount = useSelector(selectCartCount);

    return (
        <CardIconContainer>
            <ShoppingIconContainer onClick={() => toggleCart()}></ShoppingIconContainer>
            <ItemCount>{cartCount}</ItemCount>
        </CardIconContainer>
    )
}

export default CardIcon;