
import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@types";
import { useAppDispatch } from "@redux/hook";
import { addToCart } from "@redux/cart/cartSlice";
import { memo, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Like from '../../../assets/SVG/like.svg?react'
import LikeFill from '../../../assets/SVG/like-fill.svg?react'
import { actLikeToggle } from "@redux/wishlist/wishlistSlice";

const { product, productImg ,maximumNotice ,wishListBtn } = styles;

const Product = memo(({ title, price, img,id, max , quantity ,isLiked ,isAuthenticated}: TProduct) => {
  const[showModal,setShowModal]=useState(false)
  const currentRemainQuantity = max -(quantity  ?? 0)
  console.log(quantity);
  
  const QuantityReachedToMax= currentRemainQuantity <= 0 ? true :false;
  console.log(img );
  const [isBtnDisabled,setIsBtnDisabled]=useState(false)
  useEffect(()=>{
    if(!isBtnDisabled){
      return
    }
    setIsBtnDisabled(true)
    const debounce=setTimeout(() => {
      setIsBtnDisabled(false)
    }, 300);
    return()=>clearTimeout(debounce)
  },[isBtnDisabled])
  const dispatch =useAppDispatch();
  const addToCartHandler =()=>{
    dispatch(addToCart(id))
    setIsBtnDisabled(true)
  }
  const [isLoading,setIsLoading]=useState(false)
  const likeToggleHandler = ()=>{
   if(isAuthenticated){
     if(isLoading){
      return;
    }
    setIsLoading(true);
    dispatch(actLikeToggle(id)).unwrap().then(()=>setIsLoading(false)).catch(()=>setIsLoading(false))
   }else{
    setShowModal(true)
   }
  }
  return (
    <>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Login Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You need to login first to add this item to your wishlist.
      </Modal.Body>
    </Modal>
    <div className={product}>
      <div className={wishListBtn} onClick={likeToggleHandler}>
        {isLoading?<Spinner animation="border" size="sm" variant="primary"/> : isLiked? <LikeFill/> : <Like/>}
      </div>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price.toFixed(2)} EGP</h3>
      <p className={maximumNotice}>{QuantityReachedToMax ? "You reached your limit" : `You Can Add ${currentRemainQuantity} item(s)`}</p>
      <Button disabled={isBtnDisabled || QuantityReachedToMax} onClick={addToCartHandler} variant="info" style={{ color: "white" }}>
        {isBtnDisabled ? <> <BeatLoader color="green" size={10}/> Loading....</> : "Add To Cart"}
      </Button>
    </div>
    </>
   
  );
});

export default Product;