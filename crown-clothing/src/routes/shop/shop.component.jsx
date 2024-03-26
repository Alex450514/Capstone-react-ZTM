import { useSelector } from 'react-redux';

import CategoryPreview from "../../components/category-preview/category-preview.component";

import './shop.styles.scss';

import { setCategoriesMap, setIsLoading } from '../../store/categories/category.action';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../utils/firebase/firebase.utils';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

const Shop = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchCategories = async (user) => {
            setIsLoading(true);
            try {
                if (user) {
                    // User is logged in; fetch all categories
                    const querySnapshot = await getDocs(collection(db, 'categories'));
                    const categoriesData = querySnapshot.docs.reduce((acc, docSnapshot) => {
                        const { title, items } = docSnapshot.data();
                        acc[title.toLowerCase()] = items;
                        return acc;
                    }, {});
                    dispatch(setCategoriesMap(categoriesData));
                } else {
                    // User is logged out; fetch only 'hats' category
                    const docRef = doc(db, 'categories', 'hats');
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const { title, items } = docSnap.data();
                        dispatch(setCategoriesMap({ [title.toLowerCase()]: items }));
                    } else {
                        console.log("No such document!");
                    }
                }
            } catch (error) {
                console.error("Error fetching categories: ", error);
            }
            setIsLoading(false);
        };

        const unsubscribe = onAuthStateChanged(auth, fetchCategories);

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

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