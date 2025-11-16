import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/redux/hook";
import { actGetProductsByCatPrefix, productsCleanUp } from "src/redux/productes/ProductSlice";
const useProducts = () => {
    const params = useParams();
    const productPrefix=params.prefix
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.products);
  
  const cartItems =useAppSelector((state)=>state.cart.items)
  const wishlistItemId = useAppSelector((state)=> state.wishlist.itemsId)
  const productFullInfo=records.map(el=> (
  {...el,quntity:cartItems[el.id]||0 , isLiked:wishlistItemId.includes(el.id)}))
  
  

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(productPrefix as string));

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, params]);
  return {loading,error,productFullInfo,productPrefix}
}

export default useProducts
