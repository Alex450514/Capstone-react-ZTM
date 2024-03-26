import './App.scss';
import './components/category-item/category-item.component';

import Home from './routes/home/home.component';
import Header from './components/header/main-header.component';
import Shop from './routes/shop/shop.component';
import SignIn from './routes/sign-in/sign-in.components';
import Checkout from './routes/checkout/checkout.component';

import { Routes, Route, useLocation } from 'react-router-dom';
import ProductCategory from './routes/product-category/product-category.component';

import { motion, AnimatePresence } from 'framer-motion';

import { useFetchCategories } from './store/categories/useFetchCategories';
import { useFirebaseAuth } from './store/user/useFirebaseAuth';


const App = () => {

  ///User reducer
  useFirebaseAuth();

  ///Categories reducer
  const { isLoading } = useFetchCategories();

  const location = useLocation();

  /////////////////////////////////////////////////////////////////////////////
  if (isLoading) {
    return <div>Loading categories...</div>;
  }

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
