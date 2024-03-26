import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";
export const setCategoriesMap = (categoriesMap) =>
    createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesMap);

export const setIsLoading = (isLoading) =>
    createAction(CATEGORIES_ACTION_TYPES.SET_IS_LOADING, isLoading)