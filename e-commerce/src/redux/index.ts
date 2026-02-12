import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categories from "./categories/CategoriesSlice";
import products from "./productes/ProductSlice";
import cart from "./cart/cartSlice"
import storage from 'redux-persist/lib/storage'
// import persistReducer from "redux-persist/es/persistReducer";
// import { persistStore } from "redux-persist";
import { persistReducer ,persistStore,FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import wishlist from './wishlist/wishlistSlice'
import auth from"./auth/authSlice";
import orders from"./orders/orderSlice"

const rootPresistConfig={
    key:"root",
    storage,
    whitelist:["cart","auth"]
}
const authPersistConfig={
    key:"auth",
    storage,
    whitelist:["user","accessToken"]
}
const cartPersistConfig={
    key:"cart",
    storage,
    whitelist:["items"]
}
const wishlistPersistConfig ={
    key:"wishlist",
    storage,
    whitelist:["itemsId"]
}
const rootReducer = combineReducers({
    auth:persistReducer(authPersistConfig,auth),
    orders,
    categories,
    products,
    cart:persistReducer(cartPersistConfig,cart),
    wishlist:persistReducer(wishlistPersistConfig,wishlist)
})

const persistedReducer =persistReducer(rootPresistConfig,rootReducer)

const store = configureStore({
    // reducer:{categories,products,cart}
    reducer:persistedReducer,
    // reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({serializableCheck: {ignoredActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}})
});
const persistor =persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export  { store ,persistor};
