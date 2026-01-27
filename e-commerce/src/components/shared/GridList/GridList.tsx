import { LottieHandler } from '@components/feedback';
import React from 'react'
import { Col, Row } from 'react-bootstrap';
type GridListProps<T> ={
    records: T[];
    renderItem :(record:T)=>React.ReactNode;
    emptyMessage:string
};


const GridList = <T extends {id:number}>({records,renderItem,emptyMessage}:GridListProps) => {
    const categoriesList = records.length > 0 ? records.map((record:T)=>{
    return( 
    <Col xs={3}  key={record.id} className='d-flex justify-content-center mb-5 mt-2' >
      {renderItem(record)}
    </Col>
  )}) : <LottieHandler type='empty' message={emptyMessage}/>;
  return<Row>{categoriesList}</Row>

}

export default GridList
