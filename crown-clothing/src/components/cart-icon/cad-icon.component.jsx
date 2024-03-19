import { useContext } from 'react';

import CartContext from '../../contexts/cart.context';
import { CardIconContainer, ItemCount, ShoppingIconContainer } from './card-icon.styles.jsx';

const CardIcon = () => {
    const { isCartOpen, cartCount, setIsCartOpen } = useContext(CartContext);

    return (
        <CardIconContainer>
            <ShoppingIconContainer onClick={() => setIsCartOpen(!isCartOpen)}></ShoppingIconContainer>
            <ItemCount>{cartCount}</ItemCount>
        </CardIconContainer>
    )
}

export default CardIcon;