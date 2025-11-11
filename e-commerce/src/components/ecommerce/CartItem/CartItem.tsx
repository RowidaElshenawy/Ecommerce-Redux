
import { Button, Form } from 'react-bootstrap'
import Styles from "./styles.module.css"
import { TProduct } from 'src/Types/product'
import { memo } from 'react'
const{cartItem ,product ,productImg,productInfo,cartItemSelection}=Styles
type TCartItemsProps =TProduct & {
    changeQuantityHandler:(id:number , quantity:number)=>void;
    removeItemHandler:(id:number)=>void;
}
const CartItem =memo(({title,img,price,max,changeQuantityHandler,removeItemHandler}:TCartItemsProps) => {
    console.log("render");
    
    const renderOptions = Array(max).fill(0).map((_,indx)=>{
        const quantity=++indx;
        <option value={quantity} key={quantity}>{quantity}</option>
    })
    const changeQuantity =(event:React.ChangeEvent<HTMLSelectElement>)=>{
        const quantity =+ event.target.value
        const id=+event.target.id  //اتاكد منها       
        changeQuantityHandler(id, quantity)
    }
  return (
    <div className={cartItem}>
        <div className={product}>
            <div className={productImg}>
                <img src={img} alt={title}/>
            </div>
            <div className={productInfo}>
                <h2>test</h2>
                <h3>`${price.toFixed(2)}EGP`</h3>
                <Button onClick={()=>removeItemHandler(id)} variant='secondary' style={{color:"white" , width:"100"}} className='mt-auto'> Remove</Button>
            </div>
        </div>
        <div className={cartItemSelection}>
            <span className='d-block mb-1'>Quantity</span>
            <Form.Select aria-label="Default select example" onChange={changeQuantity}>
                {renderOptions}
            </Form.Select>

        </div>
    </div>
  )
})

export default CartItem;
