import Product from '@components/ecommerce/Product/Product'
import Loading from '@components/feedback/Loading/Loading'
import { GridList, Heading } from '@components/shared'
import useWishlist from '@hooks/useWishlist'
import { TProduct } from '@types'


const Wishlist = () => {
   const {error , loading ,records}=useWishlist()
  return (
    <>
      <Heading title={"Your Wishlist"}/>
       <Loading loading={loading} error={error} type="product">
        <GridList<TProduct> emptyMessage="There are No items in Your Wishlist" records={records} renderItem={(record:TProduct)=><Product {...record}/>}/>
      </Loading>
    </>
  )
}

export default Wishlist
