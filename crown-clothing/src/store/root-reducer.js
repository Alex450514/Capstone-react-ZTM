import { combineReducers } from "redux";

import { userReducer } from "./user/user-reducer.js";

import { categoriesReducer } from "./categories/category.reducer.js";

import { cartReducer } from "./cart/cart.reducer.js";

const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer
});

export default rootReducer;