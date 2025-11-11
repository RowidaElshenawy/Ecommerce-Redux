import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Tcategory } from "src/Types/category";
type TResponse =Tcategory[]
const actGetCategories =createAsyncThunk("categories/actGetCategories", async(_ , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{
        const response =await axios.get<TResponse> ("/categories");
        console.log(response.data);
        
        return response.data
    }catch(error){
        if(axios.isAxiosError(error)){
            return rejectWithValue (error.response?.data.message|| error.message)
        }else{
            return rejectWithValue ("An expected error")
        }
    }
})
export default actGetCategories;