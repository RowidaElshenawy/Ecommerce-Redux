import Product from '@components/ecommerce/Product/Product'
import Loading from '@components/feedback/Loading/Loading'
import { GridList, Heading } from '@components/shared'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/redux/hook'
import { productsCleanUp } from 'src/redux/productes/ProductSlice'
import { actGetWishlist } from 'src/redux/wishlist/wishlistSlice'
import { TProduct } from 'src/Types/product'


const Wishlist = () => {
    const dispatch=useAppDispatch()
    useEffect(()=>{
        dispatch(actGetWishlist());
        return()=>{dispatch(productsCleanUp())}
    },[dispatch])
    const {productFullInfo,error,loading}=useAppSelector((state)=>state.wishlist);
    const cartItems =useAppSelector((state)=>state.cart.items)
    const records=productFullInfo.map(el=> (
  {...el,quntity:cartItems[el.id]||0 , isLiked:true}))
  return (
    <>
      <Heading title={"Your Wishlist"}/>
       <Loading loading={loading} error={error}>
        <GridList records={records} renderItem={(record:TProduct)=><Product {...record}/>}/>
      </Loading>
    </>
  )
}

export default Wishlist
