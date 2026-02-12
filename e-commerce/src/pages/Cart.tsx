
import CartItemsList from '@components/ecommerce/CartItemsList/CartItemsList';
import CartSubTotalPrice from '@components/ecommerce/CartSubTotalPrice/CartSubTotalPrice';
import Loading from '@components/feedback/Loading/Loading';
import { Heading } from '@components/shared';
import useCart from '@hooks/useCart';
import { LottieHandler } from '@components/feedback';
const Cart = () => {
    const {loading,error,products,changeQuantityHandler,removeItemHandler,userAccessToken,placeOrderStatus}=useCart()
  return (
    <>
        <Heading title={"Your Cart"}/>
        <Loading loading={loading}  error={error} type="cart">
            {products.length?(<>
             <CartItemsList products={products} changeQuantityHandler={changeQuantityHandler} removeItemHandler={removeItemHandler}/>
            <CartSubTotalPrice products={products} userAccessToken={userAccessToken}/>
            </>):placeOrderStatus === "succeeded" ? (
          <LottieHandler
            message="Your order has been placed successfully" type="success"/>) 
            :(<LottieHandler type='empty' message='Your Cart is Empty'/>)}
        </Loading>
    </>
  )
}

export default Cart;
