import { TProduct } from "src/Types/product"
import CartItem from "../CartItem/CartItem";

type TCartItemsList ={
    products:TProduct[] ;
    changeQuantityHandler:(id:number,quantity:number)=>void;
    removeItemHandler:(id:number)=>void
};
const CartItemsList = ({products ,changeQuantityHandler,removeItemHandler}:TCartItemsList) => {
    const renderList =products.map(el=><CartItem key={el.id} {...el} changeQuantityHandler={changeQuantityHandler} removeItemHandler={removeItemHandler}/>)
  return (
    <div>
      {renderList}
    </div>
  )
}

export default CartItemsList
