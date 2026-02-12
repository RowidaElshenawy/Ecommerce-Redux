import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { productsCleanUp } from '@redux/productes/ProductSlice'
import { actGetWishlist } from '@redux/wishlist/wishlistSlice'
const useWishlist = () => {
  const userAccessToken=useAppSelector(state=>state.auth.accessToken)
     const dispatch=useAppDispatch()
    useEffect(()=>{
       const promise= dispatch(actGetWishlist("productsFullInfo"));
       console.log(promise)
        return()=>{
          // dispatch(productsCleanUp());
          promise.abort();
        }
    },[dispatch])
    const {productFullInfo,error,loading}=useAppSelector((state)=>state.wishlist);
    const cartItems =useAppSelector((state)=>state.cart.items)
    const records=productFullInfo.map((el)=> (
  {...el,quantity:cartItems[el.id]||0 , isLiked:true,isAuthenticated:userAccessToken?true:false}))
  return {error , loading ,records}
}

export default useWishlist
