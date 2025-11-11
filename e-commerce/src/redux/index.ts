import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categories from "./categories/CategoriesSlice";
import products from "./productes/ProductSlice";
import cart from "./cart/cartSlice"
import storage from 'redux-persist/lib/storage'
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import wishlist from './wishlist/wishlistSlice'

// const rootPresistConfig={
//     key:"root",
//     storage,
//     whitelist:["cart"]
// }
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
    categories,
    products,
    cart:persistReducer(cartPersistConfig,cart),
    wishlist:persistReducer(wishlistPersistConfig,wishlist)
})

// const persistedReducer =persistReducer(rootPresistConfig,rootReducer)

export const store = configureStore({
    // reducer:{categories,products,cart}
    // reducer:persistedReducer
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({serializableCheck: {ignoreActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}})
});
const persistor =persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export  { persistor};
