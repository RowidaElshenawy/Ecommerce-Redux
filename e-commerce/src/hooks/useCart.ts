import { useCallback, useEffect } from 'react';
import { actGetProductsByItems, cartItemChangeQuantity, cartItemRemove, cleanCartProductsInfo } from '@redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@redux/hook';
import { resetOrderStatus } from '@redux/orders/orderSlice';
const useCart = () => {
    const placeOrderStatus=useAppSelector(state=>state.orders.loading)
    const userAccessToken=useAppSelector((state)=>state.auth.accessToken)
    const dispatch =useAppDispatch()
    const {loading ,error,productFullInfo,items} =useAppSelector((state)=>state.cart)
    const products =productFullInfo.map(el=>({...el,quantity:items[el.id]}))
    console.log(products,"j");
    const changeQuantityHandler =useCallback((id:number , quantity:number)=>{
        dispatch(cartItemChangeQuantity({id,quantity}))
    },[dispatch])
    const removeItemHandler =useCallback((id:number)=>{
        console.log(id);
        dispatch(cartItemRemove(id))
        
    },[dispatch])
    
    useEffect(()=>{
        
        const promise = dispatch(actGetProductsByItems())
        console.log(promise)
        return()=>{
            dispatch(cleanCartProductsInfo());
            promise.abort();
            dispatch(resetOrderStatus())
        }
    
    }
        ,[dispatch])
  return {loading,error,products,changeQuantityHandler,removeItemHandler,userAccessToken,placeOrderStatus}
}

export default useCart
