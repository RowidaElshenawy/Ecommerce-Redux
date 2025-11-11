import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actLikeToggle = createAsyncThunk("wishlist/actLikeToggle",async(id:number, thunkAPI)=>{
    console.log("fire")
    const {rejectWithValue}=thunkAPI;
    try{
        const isRecordExist =await axios.get(`/withlist?userId=1&productId=${id}`);
        console.log(isRecordExist.data)
        if(isRecordExist.data.length >0){
            await axios.delete(`/withlist/${isRecordExist.data[0].id}`);
            return {type:"remove" ,id}
        }else{
            await axios.post("/withlist", {userId:'1' , productId:id})
            return {type:"add" ,id}
        }
    }catch(error){
        if(axios.isAxiosError(error)){
        return rejectWithValue(error.response?.data.message || error.message)
        }else{
            return rejectWithValue("An Unexpected Error")
        }
    }

})
export default actLikeToggle;