import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ProductCard from "../../components/product-card/product-card.component"; 

import './product-category.styles.scss';

const ProductCategory = () => {
    const { categoryId } = useParams();
    const { categoriesMap, isLoading } = useSelector((state) => state.categories);
    
    // Initialize state with a function to ensure it's always up to date
    const [products, setProducts] = useState(() => categoriesMap[categoryId] || []);

    useEffect(() => {
        // Update products based on the current categoryId and categoriesMap
        setProducts(categoriesMap[categoryId] || []);
    }, [categoryId, categoriesMap]); // Dependencies: re-run effect if these change

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