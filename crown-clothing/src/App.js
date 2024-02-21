import './App.scss';
import './components/category-item/category-item.component';

import Home from './routes/home/home.component';
import Header from './components/header/main-header.component';
import Shop from './routes/shop/shop.component';
import SignIn from './routes/sign-in/sign-in.components';

import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import { getRedirectResult } from "firebase/auth";
import { auth, createUserDocumentFromAuth } from './utils/firebase/firebase.utils';

const App = () => {

  //Google log-in/signup
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // User signed in. You can get the user's information from result.user
          console.log(result.user)
          const userDocRef = createUserDocumentFromAuth(result.user)
          // You may also want to save the user data to your component's state or context
        }
      }).catch((error) => {
        // Handle Errors here, such as by displaying an error message
        console.error(error.message);
      });
  }, []);
  //////////////////////////

  return (
    <Routes>
      <Route path='/' element={<Header />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default App;
