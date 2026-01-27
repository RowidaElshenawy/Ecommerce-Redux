import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categories from "./categories/CategoriesSlice";
import products from "./productes/ProductSlice";
import cart from "./cart/cartSlice"
import storage from 'redux-persist/lib/storage'
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import wishlist from './wishlist/wishlistSlice'
import auth from"./auth/authSlice";

const rootPresistConfig={
    key:"root",
    storage,
    whitelist:["cart","auth"]
}
const authPersistConfig={
    key:"auth",
    storage,
    whiteList:["user","accessToken"]
}
const cartPersistConfig={
    key:"cart",
    storage,
    whitelist:["items"]
}
const wishlistPersistConfig ={
    key:"wishlist",
    storage,
    witelist:["itemsId"]
}
const rootReducer = combineReducers({
    auth:persistReducer(authPersistConfig,auth),
    categories,
    products,
    cart:persistReducer(cartPersistConfig,cart),
    wishlist:persistReducer(wishlistPersistConfig,wishlist)
})

const persistedReducer =persistReducer(rootPresistConfig,rootReducer)

export const store = configureStore({
    // reducer:{categories,products,cart}
    reducer:persistedReducer,
    // reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({serializableCheck: {ignoredActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}})
});
const persistor =persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export  { persistor};
