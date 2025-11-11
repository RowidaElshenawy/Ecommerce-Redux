import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "src/redux";


const getCartTotalQuantity = createSelector((state:RootState)=>state.cart.items,(items)=>{
    console.log("ff");
    
     const totalQuantity = Object.values(items).reduce(
        (accumulator,currentValues)=>{
            return accumulator + currentValues;
        },0);
    return totalQuantity;
});
export {getCartTotalQuantity}