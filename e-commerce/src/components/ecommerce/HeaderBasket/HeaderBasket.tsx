import { useAppSelector } from 'src/redux/hook'
import styles from'./styles.module.css'
const {container,totalNum , pumpAnimate ,iconWrapper} = styles
import Logo from'@assets/SVG/cart.svg?react'
import { getCartTotalQuantity } from 'src/redux/cart/selectors'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HeaderBasket = () => {
  console.log("render");
  
  // const cartItems = useAppSelector(state =>state.cart.items)
  // console.log(cartItems);
  // const totalQuantity =Object.values(cartItems).reduce((accumulator ,currentValue)=>{return accumulator + currentValue},0)
  const totalQuantity =useAppSelector(getCartTotalQuantity)
  const[isAnimate,setIsAnimate]=useState(false);
  const quntityStyle =`${totalNum} ${isAnimate ? pumpAnimate: ""}`
  const navigate =useNavigate()
  useEffect(()=>{
    if(!totalQuantity){
      return
    }
    setIsAnimate(true)
    const debounce=setTimeout(() => {
      setIsAnimate(false)
    },300);
    return ()=> clearTimeout(debounce)
  },[totalQuantity]) 
  return (
    <div className={container} onClick={()=>navigate("/cart")}>
      <div className={iconWrapper}>
        <Logo title='basket-icon'/>
        {totalQuantity >0 && <div className={quntityStyle}>{totalQuantity}</div>}
      </div>
      <h3>Cart</h3>
    </div>
  )
}

export default HeaderBasket
