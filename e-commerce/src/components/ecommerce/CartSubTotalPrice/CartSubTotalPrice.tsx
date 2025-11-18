
import { TProduct } from "@types"
import Styles from "./styles.module.css"
type TCartSubtotalProps={products:TProduct[]}
const CartSubTotalPrice = ({products}:TCartSubtotalProps) => {
  const  subtotal =products.reduce((accumulator,el)=>{
    const price =el.price;
    const quntity =el.quantity;
    if(quntity&& typeof quntity === "number"){
    return accumulator + price * quntity 
    }else{
      return accumulator
    }
  },0)
  return (
    <div className={Styles.container}>
      <span>Subtotal:</span>
      <span>{subtotal.toFixed(2)} EGP</span>
    </div>
  )
}

export default CartSubTotalPrice
