import { combineReducers } from "redux";

import { userReducer } from "./user/user-reducer.js";

import { categoriesReducer } from "./categories/category.reducer.js";

const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer
});

export default rootReducer;