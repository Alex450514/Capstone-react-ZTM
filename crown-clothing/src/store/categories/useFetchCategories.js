import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebase.utils';

import { setCategoriesMap } from './category.action';

export const useFetchCategories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        if (currentUser) {
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
                // Apply filter for price less than or equal to 20
                const filteredItems = items.filter(item => item.price <= 20);
                dispatch(setCategoriesMap({ [title.toLowerCase()]: filteredItems }));
            } else {
                console.log("No such document!");
            }
        }
    } catch (error) {
        console.error("Error fetching categories: ", error);
    }
      setIsLoading(false);
    };

    fetchCategories();
  }, [currentUser, dispatch]);

  return { isLoading };
};