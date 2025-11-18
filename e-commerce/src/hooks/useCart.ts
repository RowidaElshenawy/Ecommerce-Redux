import { useCallback, useEffect } from 'react';
import { actGetProductsByItems, cartItemChangeQuantity, cartItemRemove, cleanCartProductsInfo } from '@redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@redux/hook';
const useCart = () => {
    const dispatch =useAppDispatch()
    const {loading ,error,productFullInfo,items} =useAppSelector((state)=>state.cart)
    const products =productFullInfo.map(el=>({...el,quantity:items[el.id]}))
    console.log(productFullInfo,"j");
    const changeQuantityHandler =useCallback((id:number , quantity:number)=>{
        dispatch(cartItemChangeQuantity({id,quantity}))
    },[dispatch])
    const removeItemHandler =useCallback((id:number)=>{
        console.log(id);
        dispatch(cartItemRemove(id))
        
    },[dispatch])
    
    useEffect(()=>{
        const promise = dispatch(actGetProductsByItems())
        return()=>{
            dispatch(cleanCartProductsInfo());
            promise.abort();
        }
    
    }
        ,[dispatch])
  return {loading,error,products,changeQuantityHandler,removeItemHandler}
}

export default useCart
