import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { TProduct } from "src/Types/product";
import { RootState } from '..';

type TResponse =TProduct[];
const actGetProductsByItems = createAsyncThunk("cart/actGetProductsByItems",
async(_,thunkAPI)=>{
    const {rejectWithValue ,getState ,fulfillWithValue}=thunkAPI;
    const {cart}=getState() as RootState;
    console.log(cart.items);
    const itemsId =Object.keys(cart.items)
    console.log(itemsId);
    const concatenatedItemsId =itemsId.map(el=>`id=${el}`).join("&")
    console.log(concatenatedItemsId);
    if(!itemsId.length){
        fulfillWithValue([])
    }
    try{
        const response =await axios.get<TResponse>(`/products?${concatenatedItemsId}`)
        return response.data
        console.log(response.data);
    }catch(error){
        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data.message || error.message)
        }else{
            return rejectWithValue("An unexpected errorr")
        }

    }
});


export default actGetProductsByItems;