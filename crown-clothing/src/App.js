import './App.scss';
import './components/category-item/category-item.component';

import Home from './routes/home/home.component';
import Header from './components/header/main-header.component';
import Shop from './routes/shop/shop.component';
import SignIn from './routes/sign-in/sign-in.components';

import { Routes, Route } from 'react-router-dom';

const App = () => {

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
