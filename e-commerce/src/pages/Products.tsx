import Product from "@components/ecommerce/Product/Product";
import {Container} from "react-bootstrap";
import  Loading  from "@components/feedback/Loading/Loading";
import { GridList, Heading } from "@components/shared";
import { TProduct } from "@types";
import useProducts from "@hooks/useProducts";


const Products = () => {
  const {loading,error,productFullInfo,productPrefix}=useProducts();
  return (
    <Container>
      <Heading title={`${productPrefix?.toUpperCase()} products`}/>
      <Loading loading={loading} error={error}>
        <GridList records={productFullInfo} renderItem={(record:TProduct)=><Product {...record}/>}/>
      </Loading>
    </Container>
  );
};

export default Products;