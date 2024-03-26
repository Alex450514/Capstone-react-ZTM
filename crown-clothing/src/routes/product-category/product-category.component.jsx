import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../../components/product-card/product-card.component"; 

import './product-category.styles.scss';

const ProductCategory = () => {
    const { categoryId } = useParams();
    const { categoriesMap, isLoading } = useSelector((state) => state.categories);

    const products = categoriesMap[categoryId] || [];

    // Show loading text if isLoading is true
    if (isLoading) {
        return <div className="category-page">Loading...</div>;
    }

    return (
        <div className="category-page">
            <h2 className="title">{categoryId.toUpperCase()}</h2>
            <div className="products-container">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <span className="empty-message">No products found in this category.</span>
                )}
            </div>
        </div>
    );
}

export default ProductCategory;