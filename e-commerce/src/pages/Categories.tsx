
import Category from '@components/ecommerce/Category/Category';
import Loading from '@components/feedback/Loading/Loading';
import { GridList, Heading } from '@components/shared';
import { useEffect } from 'react';
import { Container} from 'react-bootstrap';
import { actGetCategories, categoriesRecordsCleanup } from 'src/redux/categories/CategoriesSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { Tcategory } from 'src/Types/category';


const Categories = () => {
  const dispatch = useAppDispatch()
  const {loading , error , records} = useAppSelector((state)=>state.categories)
 
   useEffect(() => {
    
      dispatch(actGetCategories());
      return ()=>{
        dispatch(categoriesRecordsCleanup())
      }
  }, [dispatch]);
  return (
    <Container>
      <Loading loading={loading} error={error}>
        <Heading title={"Categories"}/>
        <GridList records={records} renderItem={(record:Tcategory)=><Category {...record}/>}/>
      </Loading>
    </Container>
  )
}

export default Categories
