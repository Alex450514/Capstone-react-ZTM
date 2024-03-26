import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../user/user.selector';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebase.utils';
import { setCategoriesMap } from './category.action';
import { selectIsCategoriesLoading, selectCategoriesMap } from './category.selector';
import { setIsLoading } from './category.action';

export const useFetchCategories = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsCategoriesLoading);
  const categoriesMap = useSelector(selectCategoriesMap);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    async function fetchCategories() {
      dispatch(setIsLoading(true));
      try {
        let categoriesData = {};
        if (currentUser) {
          const querySnapshot = await getDocs(collection(db, 'categories'));
          categoriesData = querySnapshot.docs.reduce((acc, docSnapshot) => {
            const { title, items } = docSnapshot.data();
            acc[title.toLowerCase()] = items;
            return acc;
          }, {});
        } else {
          const docRef = doc(db, 'categories', 'hats');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const { title, items } = docSnap.data();
            categoriesData[title.toLowerCase()] = items.filter(item => item.price <= 20);
          }
        }
        dispatch(setCategoriesMap(categoriesData));
      } catch (error) {
        console.error("Error fetching categories: ", error);
        // Optionally dispatch an action to handle the error state
      } finally {
        dispatch(setIsLoading(false));
      }
    }

    fetchCategories();
  }, [currentUser, dispatch]);

  return { isLoading, categoriesMap };
};