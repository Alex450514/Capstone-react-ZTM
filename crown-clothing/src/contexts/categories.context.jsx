import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext();

export const useCategories = () => useContext(CategoriesContext);

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async (user) => {
            setLoading(true);
            try {
                if (user) {
                    // User is logged in; fetch all categories
                    const querySnapshot = await getDocs(collection(db, 'categories'));
                    const categoriesData = querySnapshot.docs.reduce((acc, docSnapshot) => {
                        const { title, items } = docSnapshot.data();
                        acc[title.toLowerCase()] = items;
                        return acc;
                    }, {});
                    setCategoriesMap(categoriesData);
                } else {
                    // User is logged out; fetch only 'hats' category
                    const docRef = doc(db, 'categories', 'hats');
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const { title, items } = docSnap.data();
                        setCategoriesMap({ [title.toLowerCase()]: items });
                    } else {
                        console.log("No such document!");
                    }
                }
            } catch (error) {
                console.error("Error fetching categories: ", error);
            }
            setLoading(false);
        };

        const unsubscribe = onAuthStateChanged(auth, fetchCategories);

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    return (
        <CategoriesContext.Provider value={{ loading, categoriesMap }}>
            {!loading && children}
        </CategoriesContext.Provider>
    );
};

// export const getCategoriesAndDocuments = async () => {
//   const collectionRef = collection(db, 'categories');
//   const q = query(collectionRef);

//   const querySnapShot = await getDocs(q);

//   const categoryMap = querySnapShot.docs.reduce((acc, docSnapshot) => {
//     const {title, items} = docSnapshot.data();
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {})

//   return categoryMap;
// }

/////////

// export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => { 
//   const collectionRef = collection(db, collectionKey);
//   const batch = writeBatch(db);

//   objectsToAdd.forEach((obj) => {
//       const docRef = doc(collectionRef, obj.title.toLowerCase()); // Create a document reference with a formatted title
//       batch.set(docRef, obj); // Assuming you want to store the items array only
//   });

//   await batch.commit(); // Commit the batch
// };