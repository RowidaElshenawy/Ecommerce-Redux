import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosErrorHandler} from "@utils";
import axios from "axios";
import { TProduct } from "@types";
type TResponse =TProduct[]
const actGetProductsByCatPrefix = createAsyncThunk("products/actGetProductsByCatPrefix",async(prefix:string,thunkAPI)=>{
    const{rejectWithValue , signal} =thunkAPI;
    try{
        const response =await axios.get <TResponse>(`/products?cat_prefix=${prefix}`,{signal});
        console.log(response.data);
        
        return response.data;
    }catch(error){
        // if(axios.isAxiosError(error)){
        //     return rejectWithValue(error.response?.data.message || error.message);
        // }else{
        //     return rejectWithValue("An unexpected error")
        // }
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default actGetProductsByCatPrefix;

