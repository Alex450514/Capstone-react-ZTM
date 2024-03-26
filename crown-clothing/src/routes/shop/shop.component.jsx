import { useSelector } from 'react-redux';

import CategoryPreview from "../../components/category-preview/category-preview.component";

import './shop.styles.scss';

const Shop = () => {

    const { categoriesMap, isLoading } = useSelector((state) => state.categories);

    if (isLoading) {
        return <div className="category-page">Loading...</div>;
    }

    return (
        <div className="shop-container">
            {
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={products} />;
                })
            }
        </div>
    );
};

export default Shop;