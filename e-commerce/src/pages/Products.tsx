import Product from "@components/ecommerce/Product/Product";
import { useEffect } from "react";
import {Container} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/redux/hook";
import { actGetProductsByCatPrefix, productsCleanUp } from "src/redux/productes/ProductSlice";
import  Loading  from "@components/feedback/Loading/Loading";
import { GridList, Heading } from "@components/shared";
import { TProduct } from "src/Types/product";


const Products = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.products);
  
  const cartItems =useAppSelector((state)=>state.cart.items)
  const wishlistItemId = useAppSelector((state)=> state.wishlist.itemsId)
  const productFullInfo=records.map(el=> (
  {...el,quntity:cartItems[el.id]||0 , isLiked:wishlistItemId.includes(el.id)}))
  
  

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, params]);
  return (
    <Container>
      <Heading title={`${params.prefix?.toUpperCase()} products`}/>
      <Loading loading={loading} error={error}>
        <GridList records={productFullInfo} renderItem={(record:TProduct)=><Product {...record}/>}/>
      </Loading>
    </Container>
  );
};

export default Products;