
import { TProduct } from "@types"
import Styles from "./styles.module.css"
import { Button, Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch } from "@redux/hook";
import { actPlaceOrder } from "@redux/orders/orderSlice";
import { clearCartAfterPlaceOrder } from "@redux/cart/cartSlice";

type TCartSubtotalProps={products:TProduct[];
  userAccessToken:string|null;
}
const CartSubTotalPrice = ({products,userAccessToken}:TCartSubtotalProps) => {
  const  subtotal =products.reduce((accumulator,el)=>{
    const price =el.price;
    const quntity =el.quantity;
    if(quntity&& typeof quntity === "number"){
    return accumulator + price * quntity 
    }else{
      return accumulator
    }
  },0)
  const [showModal,setShowModal]=useState(false)
  const dispatch=useAppDispatch()
  const modalHandler=()=>{
    setShowModal(!showModal)
    setError(null)
  }
  const placeOrderHandler=()=>{
    setLoading(true)
    dispatch(actPlaceOrder(subtotal)).unwrap().then(()=>{  dispatch(clearCartAfterPlaceOrder());
        setShowModal(false);}).catch((error)=>{setError(error)}).finally(()=>{setLoading(false)})
  }
  const [loading,setLoading]=useState(false)
  const[error,setError]=useState<string|null>(null)
  return (
    <>
    <Modal show={showModal} onHide={modalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Place Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to place order with subtotal :{""}
          {subtotal.toFixed(2)}EGP
          {!loading && error && (
            <p style={{color:"#DC3545" ,marginTop:"10px"}}>{error}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            Close
          </Button>
          <Button variant="info" onClick={placeOrderHandler} style={{color:"white"}}>
            {loading?(
              <>
              <Spinner animation="border" size="sm">Loading...</Spinner>
              </>
            ):("Confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    {userAccessToken&&
    <div className={Styles.container}>
      <span>Subtotal:</span>
      <span>{subtotal.toFixed(2)} EGP</span>
      <span>
        <Button variant="info" style={{color:"white"}} onClick={modalHandler}>Place order</Button>
      </span>
    </div>}
    </>
    
  )
}

export default CartSubTotalPrice
