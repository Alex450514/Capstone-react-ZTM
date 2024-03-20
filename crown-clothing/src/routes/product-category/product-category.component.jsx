import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component"; 

import './product-category.styles.scss';

const ProductCategory = () => {
    const { categoryId } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    
    // Initialize state with a function to ensure it's always up to date
    const [products, setProducts] = useState(() => categoriesMap[categoryId] || []);

    useEffect(() => {
        // Update products based on the current categoryId and categoriesMap
        setProducts(categoriesMap[categoryId] || []);
    }, [categoryId, categoriesMap]); // Dependencies: re-run effect if these change

    return (
        <div className="category-page">
            <h2 className="title">{categoryId.toUpperCase()}</h2>
            <div className="products-container">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductCategory;