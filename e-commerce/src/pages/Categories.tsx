
import Category from '@components/ecommerce/Category/Category';
import Loading from '@components/feedback/Loading/Loading';
import { GridList, Heading } from '@components/shared';
import useCategories from '@hooks/useCategories';
import { Container} from 'react-bootstrap';
import { Tcategory } from 'src/Types/category';


const Categories = () => {
 const {loading,error,records}=useCategories();
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
