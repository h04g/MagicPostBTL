import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import productReducer from './products';
import categoriesReducer from './categories';
import cartReducer from './cart';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userReducer', 'categoriesReducer', 'cartReducer'],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    userReducer,
    productReducer,
    categoriesReducer,
    cartReducer,
  }),
);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
