import './App.scss';
import './components/category-item/category-item.component';

import Home from './routes/home/home.component';
import Header from './components/header/main-header.component';
import Shop from './routes/shop/shop.component';
import SignIn from './routes/sign-in/sign-in.components';
import Checkout from './routes/checkout/checkout.component';

import { Routes, Route, useLocation } from 'react-router-dom';
import ProductCategory from './routes/product-category/product-category.component';

import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';
import { onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { createUserDocumentFromAuth } from './utils/firebase/firebase.utils';

import { motion, AnimatePresence } from 'framer-motion';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeFromAuth = onAuthStateChanged(auth, (userAuth) => {
        if (userAuth) {
            // Since createUserDocumentFromAuth returns a DocumentReference, 
            // we can immediately use onSnapshot on this reference.
            createUserDocumentFromAuth(userAuth).then(userDocRef => {
                const unsubscribeFromDoc = onSnapshot(userDocRef, (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        dispatch(setCurrentUser({
                            id: docSnapshot.id,
                            ...docSnapshot.data(),
                        }));
                    }
                });

                // Optional: Handle unsubscribe from the document snapshot listener
                // You may store this unsubscribe function to call it when the component unmounts
            }).catch(error => console.error("Error fetching user document:", error));
        } else {
            dispatch(setCurrentUser(null));
        }
    });

    // Cleanup function to unsubscribe from auth changes when component unmounts
    return () => {
        unsubscribeFromAuth();
        // If you stored the unsubscribe function for doc snapshot, call it here
    };
}, []);

  //////////////////////////

  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
    <Routes location={location} key={location.pathname}>
      <Route path='/' element={<Header />}>
        <Route index element={
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Home />
        </motion.div>
        } />
        <Route path='shop' element={
        <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ type: "linear" }}>
          <Shop />
        </motion.div>
        } />
        <Route path="/shop/:categoryId" element={<ProductCategory />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
    </AnimatePresence>
  )
}

export default App;
