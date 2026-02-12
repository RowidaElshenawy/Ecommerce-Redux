
import { Button, Form } from 'react-bootstrap'
import Styles from "./styles.module.css"
import { TProduct } from '@types'
import { memo } from 'react'
import ProductInfo from '../ProductInfo.tsx/ProductInfo'
const{cartItem ,product ,productImg,productInfo,cartItemSelection}=Styles
type TCartItemsProps =TProduct & {
    changeQuantityHandler:(id:number , quantity:number)=>void;
    removeItemHandler:(id:number)=>void;
}
const CartItem =memo(({id,title,img,price,max,quantity,changeQuantityHandler,removeItemHandler}:TCartItemsProps) => {
    console.log("render");
    
    const renderOptions = Array(max).fill(0).map((_,indx)=>{
        const quantity=++indx;
        return <option value={quantity} key={quantity}>{quantity}</option>
    })
    const changeQuantity =(event:React.ChangeEvent<HTMLSelectElement>)=>{
        const quantity =+ event.target.value
        // const id=+event.target.id  //اتاكد منها       
        changeQuantityHandler(id, quantity)
    }
  return (
    <div className={cartItem}>
        <ProductInfo title={title} price={price} img={img} direction="column">
           
            
                <Button onClick={()=>removeItemHandler(id)} variant='secondary' style={{color:"white" , width:"100"}} className='mt-auto'> Remove</Button>
            
        </ProductInfo>
        <div className={cartItemSelection}>
            <span className='d-block mb-1'>Quantity</span>
            <Form.Select aria-label="Default select example" onChange={changeQuantity} value={quantity}>
                {renderOptions}
            </Form.Select>

        </div>
    </div>
  )
})

export default CartItem;
