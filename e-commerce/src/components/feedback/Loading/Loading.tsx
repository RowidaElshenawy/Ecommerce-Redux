
import { TLoading } from '@types';
import CategorySkeleton from '../skeletons/categorySkeleton/CategorySkeleton';
import CartSkeleton from '../skeletons/cartSkeleton/CartSkeleton';
import ProductSkeleton from '../skeletons/productSkeleton/ProductSkeleton';
import LottieHandler from '../LottieHandler/LottieHandler';
import TableSkeleton from '../skeletons/TableSkeletone/TableSkeletone';


interface LoadingProps {
    loading:TLoading;
    error:null|string;
    children:React.ReactNode;
    type?:"cart"|"category"|"product"|"table";
}
const Loading = ({error,loading,children,type="category" }:LoadingProps) => {
    const skeletonTypes={
      cart:CartSkeleton,
      category:CategorySkeleton,
      product:ProductSkeleton,
      table:TableSkeleton
    }
    const Component=skeletonTypes[type]
    if(loading === "pending"){
         return <Component/>
    }
    if(loading === "failed"){
        return<p><LottieHandler type="error" message={error as string}/></p>
    }
  return (
    <>
      {children}
    </>
  )
}

export default Loading
