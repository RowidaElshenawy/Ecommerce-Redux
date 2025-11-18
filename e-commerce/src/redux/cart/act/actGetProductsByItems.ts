import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { TProduct } from "@types";
import {axiosErrorHandler} from "@utils";
import { RootState } from "src/redux";


type TResponse =TProduct[];
const actGetProductsByItems = createAsyncThunk("cart/actGetProductsByItems",
async(_,thunkAPI)=>{
    const {rejectWithValue ,getState ,fulfillWithValue ,signal}=thunkAPI;
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
        const response =await axios.get<TResponse>(`/products?${concatenatedItemsId}`,{signal})
        return response.data
        console.log(response.data);
    }catch(error){
        // if(axios.isAxiosError(error)){
        //     return rejectWithValue(error.response?.data.message || error.message)
        // }else{
        //     return rejectWithValue("An unexpected errorr")
        // }
        return rejectWithValue(axiosErrorHandler(error));

    }
});


export default actGetProductsByItems;