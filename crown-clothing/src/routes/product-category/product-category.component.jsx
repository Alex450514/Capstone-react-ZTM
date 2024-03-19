import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component"; 

import { useContext, useState, useEffect } from "react";

import './product-category.styles.scss';

const ProductCategory = () => {
    let { categoryId } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[categoryId]);

    useEffect(() => {
        setProducts(categoriesMap[categoryId])
    }, [categoryId, categoriesMap])

    return (
        <div>
            <h2>{categoryId.toUpperCase()}</h2>
            <div className="products-container">
                { products &&
                  products.map((product) => (
                        <ProductCard key={product.id} product={product}></ProductCard>
                ))}
            </div>
        </div>
    )
}

export default ProductCategory;