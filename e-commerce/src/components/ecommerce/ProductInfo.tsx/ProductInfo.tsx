
import styles from "./styles.module.css"
type ProductInfoProps={
    title:string;
    img:string;
    price:number;
    children?:React.ReactNode;
    style?:React.CSSProperties;
    direction:"row"|"column";
    quantity?:number
}
// const{cartItem ,product ,productImg,productInfo,cartItemSelection}=styles;

const ProductInfo = ({title,img,price,direction="row",children,style}:ProductInfoProps) => {
  return (
    <div className={`${styles[`product-${direction}`]}`}>
        <div  className={`${styles[`productImg-${direction}`]}`} >
            <img src={img} alt={title}/>
        </div>
        <div className={`${styles[`productInfo-${direction}`]}`}>
            <h2 >{title}</h2>
            <h3>{price.toFixed(2)}EGP</h3>
            {children}
        </div>
        
    </div>

  )
}

export default ProductInfo
