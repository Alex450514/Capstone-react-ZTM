import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./root-reducer";

import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['categories'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      process.env.NODE_ENV !== 'production'
        ? getDefaultMiddleware().concat(logger)
        : getDefaultMiddleware(),
  });

export const persistor = persistStore(store);

