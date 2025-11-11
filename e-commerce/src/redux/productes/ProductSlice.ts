import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCatPrefix from "./act/actGetProductsByCatPrefix";
import { TLoading } from "src/Types/shared";
import { TProduct } from 'src/Types/product';
interface IProductsState{
    records:TProduct[];
    loading:TLoading;
    error:null|string;
}
const initialState:IProductsState ={
    records:[],
    loading:"idle",
    error:null
};
const ProductsSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        productsCleanUp:(state)=>{
            state.records =[]
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(actGetProductsByCatPrefix.pending ,(state)=>{
            state.loading="pending";
            state.error=null
        });
        builder.addCase(actGetProductsByCatPrefix.fulfilled,(state, action)=>{
            state.loading="succeeded";
            state.records = action.payload;
        });
        builder.addCase(actGetProductsByCatPrefix.rejected,(state,action)=>{
            state.loading="failed";
            if(action.payload&&typeof action.payload === "string"){
                state.error=action.payload
            }  
        })
    }
});

export default ProductsSlice.reducer
export {actGetProductsByCatPrefix}
export const {productsCleanUp} = ProductsSlice.actions