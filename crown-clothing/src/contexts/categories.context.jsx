import React, { createContext, useState, useEffect } from 'react';
import SHOP_DATA from '../shop-data.js';

import { db } from '../utils/firebase/firebase.utils.js';
import { collection, writeBatch, doc, query, getDocs } from 'firebase/firestore';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
  
    const value = { categoriesMap };

    useEffect(() => {
      const getCategoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments();
        setCategoriesMap(categoryMap)
      }

      getCategoriesMap();
    }, []);
  
    return (
      <CategoriesContext.Provider value={value}>
        {children}
      </CategoriesContext.Provider>
    );
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);

  const categoryMap = querySnapShot.docs.reduce((acc, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})

  return categoryMap;
}

/////////

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => { 
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((obj) => {
      const docRef = doc(collectionRef, obj.title.toLowerCase()); // Create a document reference with a formatted title
      batch.set(docRef, obj); // Assuming you want to store the items array only
  });

  await batch.commit(); // Commit the batch
};