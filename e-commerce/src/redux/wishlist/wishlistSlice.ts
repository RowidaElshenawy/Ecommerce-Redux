import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from './act/actLikeToggle';
import actGetWishlist from './act/actGetWishlist';
// import Loading from './../../components/feedback/Loading/Loading';
import { TLoading ,TProduct} from "@types";
// import { productsCleanUp } from "../productes/ProductSlice";
// import { Product } from '@components/ecommerce/Product/Product';

interface IWishlist{
    itemsId:number[];
    error:null|string;
    loading:TLoading;
    productFullInfo:TProduct[];
}
const initialState:IWishlist ={
    itemsId:[],
    error:null,
    loading:"idle",
    productFullInfo:[],
}
const wishlistSlice =createSlice({
    name:'wishlist',
    initialState,
    reducers:{
        productsFullInfoCleanUp:(state)=>{
            state.productFullInfo=[];
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(actLikeToggle.pending , (state)=>{
            state.error=null
        });
        builder.addCase(actLikeToggle.fulfilled , (state,action)=>{
            if(action.payload.type === "add"){
                state.itemsId.push(action.payload.id)
            }else{
                state.itemsId=state.itemsId.filter(el => el !== action.payload.id)
                state.productFullInfo=state.productFullInfo.filter(el=> el.id !== action.payload.id)
            }
        });
        builder.addCase(actLikeToggle.rejected , (state,action)=>{
            if(action.payload && typeof action.payload ==="string"){
                state.error=action.payload
            }
        });
        //get wishlist items
        builder.addCase(actGetWishlist.pending,(state)=>{
            state.loading="pending";
            state.error=null
        });
        builder.addCase(actGetWishlist.fulfilled,(state,action)=>{
            state.loading="succeeded";
            state.productFullInfo=action.payload
        });
        builder.addCase(actGetWishlist.rejected,(state,action)=>{
            state.loading="failed";
            if(action.payload&& typeof action.payload ==="string"){
               state.error=action.payload
            }
        })
    }
});
export {actLikeToggle,actGetWishlist}
export const{productsFullInfoCleanUp}=wishlistSlice.actions
export default wishlistSlice.reducer;