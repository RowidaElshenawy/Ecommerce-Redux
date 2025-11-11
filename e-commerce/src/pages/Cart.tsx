
import CartItemsList from '@components/ecommerce/CartItemsList/CartItemsList';
import CartSubTotalPrice from '@components/ecommerce/CartSubTotalPrice/CartSubTotalPrice';
import Loading from '@components/feedback/Loading/Loading';
import { Heading } from '@components/shared';
import { useCallback, useEffect } from 'react';
import { actGetProductsByItems, cartItemChangeQuantity, cartItemRemove, cleanCartProductsInfo } from 'src/redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';


const Cart = () => {
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
        dispatch(actGetProductsByItems())
        return()=>{
            dispatch(cleanCartProductsInfo())
        }
    
    }
        ,[dispatch])
  return (
    <>
        <Heading title={"Your Cart"}/>
        <Loading loading={loading}  error={error}>
            {products.length?<>
             <CartItemsList products={products} changeQuantityHandler={changeQuantityHandler} removeItemHandler={removeItemHandler}/>
            <CartSubTotalPrice products={products}/>
            </> :"Your Cart Is Empty"}
        </Loading>
    </>
  )
}

export default Cart;
