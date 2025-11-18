import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";
import { Tcategory } from "@types";
type TResponse =Tcategory[]
const actGetCategories =createAsyncThunk("categories/actGetCategories", async(_ , thunkAPI)=>{
    const {rejectWithValue ,signal} = thunkAPI;
    try{
        const response =await axios.get<TResponse> ("/categories",{signal});
        console.log(response.data);
        
        return response.data
    }catch(error){
        // if(axios.isAxiosError(error)){
        //     return rejectWithValue (error.response?.data.message|| error.message)
        // }else{
        //     return rejectWithValue ("An expected error")
        // }
        return rejectWithValue(axiosErrorHandler(error));
    }
})
export default actGetCategories;