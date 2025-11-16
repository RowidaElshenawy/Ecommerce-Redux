
import styles from'./styles.module.css'
const {container,totalNum , pumpAnimate ,iconWrapper} = styles


import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
type THeaderCounterProps={
  totalQuantity:number,
  svgIcon:React.ReactNode,
  page:string,
  title:string
}
const HeaderCounter = ({totalQuantity,svgIcon,page,title}:THeaderCounterProps) => {
  console.log("render");
  
  // const cartItems = useAppSelector(state =>state.cart.items)
  // console.log(cartItems);
  // const totalQuantity =Object.values(cartItems).reduce((accumulator ,currentValue)=>{return accumulator + currentValue},0)
  
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
    <div className={container} onClick={()=>navigate(page)}>
      <div className={iconWrapper}>
        {svgIcon}
        {totalQuantity >0 && <div className={quntityStyle}>{totalQuantity}</div>}
      </div>
      <h3>{title}</h3>
    </div>
  )
}

export default HeaderCounter
