import { createSelector } from "reselect";

const selectCategoriesState = (state) => state.categories;

export const selectCategoriesMap = createSelector(
  [selectCategoriesState],
  (categories) => categories.categoriesMap
);

export const selectIsCategoriesLoading = createSelector(
  [selectCategoriesState],
  (categories) => categories.isLoading
);