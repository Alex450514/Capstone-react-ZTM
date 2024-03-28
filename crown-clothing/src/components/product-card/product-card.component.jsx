import './product-card.styles.scss';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { useCart } from '../../store/cart/useCart';


const ProductCard = ({ product }) => {
    const {name, price, imageUrl} = product;
    const { addItemToCart } = useCart();

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`}></img>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button onClick={() => addItemToCart(product)} buttonType={BUTTON_TYPE_CLASSES.inverted}>Add to card</Button>
        </div>
    )
}

export default ProductCard