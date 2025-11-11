import React from 'react'
import { Col, Row } from 'react-bootstrap';
type GridListProps<T> ={
    records: T[];
    renderItem :(record:T)=>React.ReactNode;
};


const GridList = <T extends {id:number}>({records,renderItem}:GridListProps) => {
    const categoriesList = records.length > 0 ? records.map((record:T)=>{
    return( 
    <Col xs={3}  key={record.id} className='d-flex justify-content-center mb-5 mt-2' >
      {renderItem(record)}
    </Col>
  )}) : "There are no categories";
  return<Row>{categoriesList}</Row>

}

export default GridList
