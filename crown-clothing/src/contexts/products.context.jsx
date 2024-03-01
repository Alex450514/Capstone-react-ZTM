import React, { createContext, useState, useEffect } from 'react';
import SHOP_DATA from '../shop-data.json';

export const ProductsContext = createContext({
  products: [],
  setProducts: () => null,
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      setProducts(SHOP_DATA); // Load your SHOP_DATA into state
    }, []);
  
    const value = { products, setProducts };
  
    return (
      <ProductsContext.Provider value={value}>
        {children}
      </ProductsContext.Provider>
    );
};