import ContentLoader from "react-content-loader"
import { Col,Row } from "react-bootstrap"
const CategorySkeleton = () => {
    const renderSkeleton =Array(4).fill(0).map((_,index)=>
        <Col xs={3}  key={index} className='d-flex justify-content-center mb-5 mt-2'>
            <ContentLoader speed={2} width={180} height={209} viewBox="0 0 180 209" backgroundColor="#ededed" foregroundColor="#f8f7f7">
                <rect x="31" y="156" rx="6" ry="6" width="116" height="7" /> 
                <circle cx="88" cy="72" r="69" />
            </ContentLoader>
        </Col>
    );
  return (
   <Row>{renderSkeleton}</Row>
  )
}

export default CategorySkeleton

