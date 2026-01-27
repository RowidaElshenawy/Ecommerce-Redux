import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosErrorHandler} from "@utils";
import axios from "axios";
import { TProduct } from "@types";
import { RootState } from "@reduxjs/toolkit/query";
type TResponse=TProduct[];
type TDataType="productsFullInfo"|"productIds"
const actGetWishlist=createAsyncThunk("wishlist/actGetWishlist",async(dataType:TDataType,thunkAPI)=>{
  const{rejectWithValue,signal,getState}=thunkAPI;
  const {auth}=getState() as RootState
  try{
    const userWishlist=await axios.get<{productId:number}[]>(`/withlist?userId=${auth.user?.id}`,{signal})
    if(!userWishlist.data.length){
        return {data:[],dataType:"empty"};
    }
    if(dataType==="productIds"){
      const concatenatedItemsId=userWishlist.data.map(el=>el.productId)
      return {data:concatenatedItemsId , dataType:"productsIds"}
    }else{
      const concatenatedItemsId=userWishlist.data.map(el=>`id=${el.productId}`).join("&")
      const response=await axios.get<TResponse>(`/products?${concatenatedItemsId}`)
      return {data:response.data , dataType:"productsFullInfo"}
    }
    
    
  }catch(error){
    // if(axios.isAxiosError(error)){
    //     return rejectWithValue(error.message|| error.response?.data.message)
    // }else{
    //     return rejectWithValue("An unexpected error")
    // }
    return rejectWithValue(axiosErrorHandler(error))
  }
});
export default actGetWishlist;