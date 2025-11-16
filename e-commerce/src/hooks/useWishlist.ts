import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/redux/hook'
import { productsCleanUp } from 'src/redux/productes/ProductSlice'
import { actGetWishlist } from 'src/redux/wishlist/wishlistSlice'
const useWishlist = () => {
     const dispatch=useAppDispatch()
    useEffect(()=>{
        dispatch(actGetWishlist());
        return()=>{dispatch(productsCleanUp())}
    },[dispatch])
    const {productFullInfo,error,loading}=useAppSelector((state)=>state.wishlist);
    const cartItems =useAppSelector((state)=>state.cart.items)
    const records=productFullInfo.map(el=> (
  {...el,quntity:cartItems[el.id]||0 , isLiked:true}))
  return {error , loading ,records}
}

export default useWishlist
