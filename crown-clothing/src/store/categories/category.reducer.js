import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const CATEGORY_INITIAL_STATE = {
    categoriesMap: {},
    isLoading: false
}

export const categoriesReducer = (state = CATEGORY_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
            return {
                ...state,
                categoriesMap: payload
            }
        case CATEGORIES_ACTION_TYPES.SET_IS_LOADING:
            return {
                ...state,
                isLoading: payload
            }
        default:
            return state;
    }
}