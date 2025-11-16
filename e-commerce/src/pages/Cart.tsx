
import CartItemsList from '@components/ecommerce/CartItemsList/CartItemsList';
import CartSubTotalPrice from '@components/ecommerce/CartSubTotalPrice/CartSubTotalPrice';
import Loading from '@components/feedback/Loading/Loading';
import { Heading } from '@components/shared';
import useCart from '@hooks/useCart';
const Cart = () => {
    const {loading,error,products,changeQuantityHandler,removeItemHandler}=useCart()
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
