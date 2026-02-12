import { createSlice } from "@reduxjs/toolkit";
import { isString, TLoading ,  TOrderItem } from '@types';
import actPlaceOrder from './act/actPlaceOrder';
import actGetOrders from "./act/actGetOrders";



interface IOrderSlice{
    loading:TLoading;
    error:string|null;
    orderList:TOrderItem[];

}
const initialState:IOrderSlice={
    orderList:[],
    loading:"idle",
    error:null
}

const orderSlice=createSlice({
    name:"order",
    initialState,
    reducers:{
        resetOrderStatus:(state)=>{
            state.error=null;
            state.loading="idle"
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(actPlaceOrder.pending,(state)=>{
            state.loading="pending";
            state.error=null
        });
        builder.addCase(actPlaceOrder.fulfilled,(state)=>{
            state.loading="succeeded"
        });
        builder.addCase(actPlaceOrder.rejected,(state,action)=>{
            state.loading="failed";
            if(isString(action.payload)){
                state.error=action.payload
            }
        });
        //get orders
        builder.addCase(actGetOrders.pending,(state)=>{
            state.loading="pending"
            state.error=null
        });
         builder.addCase(actGetOrders.fulfilled,(state,action)=>{
            state.loading="succeeded"
            state.orderList=action.payload;
        });
         builder.addCase(actGetOrders.rejected,(state,action)=>{
            state.loading="failed"
            if(isString(action.payload)){
                state.error=action.payload;
            }
        })
    }
    
})


export default orderSlice.reducer;
export{actPlaceOrder}
export const {resetOrderStatus}=orderSlice.actions