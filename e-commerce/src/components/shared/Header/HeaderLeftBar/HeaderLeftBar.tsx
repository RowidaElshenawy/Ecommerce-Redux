

import { useAppSelector } from 'src/redux/hook';
import { getCartTotalQuantity } from 'src/redux/cart/selectors';
import WishlistIcon from "@assets/SVG/wishlist.svg?react"
import CartIcon from "@assets/SVG/cart.svg?react" 
import HeaderCounter from '../HeaderCounter/HeaderCounter';
import styles from "./styles.module.css"
const HeaderLeftBar = () => {
    const cartTotalQuantity =useAppSelector(getCartTotalQuantity)
    const WishlistTotalQuantity = useAppSelector((state)=>state.wishlist.itemsId.length)
    const {headerLeftBar}=styles
  return (
    <>
      <div className={headerLeftBar}>
          <HeaderCounter page={"wishlist"} totalQuantity={WishlistTotalQuantity} svgIcon={<WishlistIcon title="wishlist"/>} title={"wishlist"}/>
          <HeaderCounter page={"cart"} totalQuantity={cartTotalQuantity} svgIcon={<CartIcon title="cart"/>} title={"cart"}/>
        </div>
    </>
  )
}

export default HeaderLeftBar
