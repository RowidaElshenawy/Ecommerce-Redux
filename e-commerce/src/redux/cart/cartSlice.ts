import {  createSlice } from "@reduxjs/toolkit";
// import { RootState } from "@reduxjs/toolkit/query";
import { TProduct,TLoading } from "@types";
import { getCartTotalQuantity } from './selectors';
import actGetProductsByItems from "./act/actGetProductsByItems";



// const getCartTotalQuantity =(state)=>{
//     console.log("function");
    
//     console.log(state);
//     const totalQuantity = Object.values(state.cart.items).reduce(
//         (accumulator,currentValues)=>{
//             return accumulator + currentValues;
//         },0
//     );
//     return totalQuantity;
// }
// seprate in file
// const getCartTotalQuantity = createSelector((state:RootState)=>state.cart.items,(items)=>{
//     console.log("ff");
    
//      const totalQuantity = Object.values(items).reduce(
//         (accumulator,currentValues)=>{
//             return accumulator + currentValues;
//         },0
//     );
//     return totalQuantity;
// })
interface IcartState {
    items:{[key:number]:number};
    productFullInfo:TProduct[];
    loading:TLoading;
    error:null | string;
}
const initialState:IcartState ={
    items:{},
    productFullInfo:[],
    loading:"idle",
    error:null,
}
const cartSlice =createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            console.log(action.payload)
            const id= action.payload
            if(state.items[id]){
                state.items[id]++;
            }else{
                state.items[id]=1;
            }
        },
        cartItemChangeQuantity:(state,action)=>{
            state.items[action.payload.id]=action.payload.quantity
        },
        cartItemRemove:(state,action)=>{
            delete state.items[action.payload];
            state.productFullInfo=state.productFullInfo.filter(el=> el.id !== action.payload)
        }, 
        cleanCartProductsInfo:(state)=>{
            state.productFullInfo=[];
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(actGetProductsByItems.pending,
            (state)=>{
                state.loading ="pending"
                state.error ="null"
            }
        );
        builder.addCase(actGetProductsByItems.fulfilled,
            (state,action)=>{
                state.loading ="succeeded"
                state.productFullInfo = action.payload
            }
        )
        builder.addCase(actGetProductsByItems.rejected,
            (state,action)=>{
                state.loading="failed"
                if(action.payload && typeof action.payload === "string"){
                    state.error = action.payload
                }
            }
        )
    }
});
export default cartSlice.reducer;
export const {addToCart,cartItemChangeQuantity,cartItemRemove,cleanCartProductsInfo} = cartSlice.actions;
export {getCartTotalQuantity ,actGetProductsByItems}

