
import { Col, Row } from 'react-bootstrap'
import ContentLoader from 'react-content-loader'

const ProductSkeleton = () => {
  const renderList =Array(4).fill(0).map((_ ,index)=>
    <Col key={index}  xs={3}  className="d-flex justify-content-center mb-5 mt-2">
        <ContentLoader
            speed={2}
            width={200}
            height={209}
            viewBox="0 0 200 209"
            backgroundColor="#ededed"
            foregroundColor="#f8f7f7">
            <rect x="261" y="0" rx="0" ry="0" width="113" height="161" /> 
            <rect x="33" y="2" rx="0" ry="0" width="108" height="148" /> 
            <rect x="47" y="202" rx="0" ry="0" width="3" height="3" /> 
            <rect x="52" y="181" rx="0" ry="0" width="65" height="27" /> 
            <rect x="52" y="158" rx="0" ry="0" width="71" height="3" /> 
            <rect x="54" y="166" rx="0" ry="0" width="40" height="4" />
        </ContentLoader>
    </Col>
)
  return (
    <Row>
        {renderList}
    </Row>
  )
}

export default ProductSkeleton
