import { Heading } from "@components/shared"
import { Row  ,Col, Button, Spinner } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import { Input } from "@components/form";
import { Alert } from "react-bootstrap";
import { Navigate} from "react-router-dom";

import useLogin from "@hooks/useLogin";


const Login = () => {
  const{Loading,error,accessToken,register,handleSubmit,searchParams,submitForm,formErrors}=useLogin()
    if(accessToken){
      return <Navigate to="/"/>
    }
  return (
    <>
    <Heading title="User Registeration"/>
    <Row>
      <Col md={{span:6 , offset:3}}>
      {searchParams.get("message")==="login-required"&&<Alert variant="success">You need to login to view this content</Alert>}
      {searchParams.get("message")==="account-created"&&<Alert variant="success">Your Account Successfully created ,please login</Alert>}
      <Form onSubmit={handleSubmit(submitForm)}>
        <Input label="Email Address" register={register} error={formErrors.email?.message} name="email"/>
        <Input label="Password" register={register} error={formErrors.password?.message} name="password" type="password"/>
        <Button variant="info" type="submit" size="sm" style={{color:"white"}}>
        {Loading==="pending"?<><Spinner animation="border" size="sm">loading....</Spinner></>:"submit"}
      </Button>
      {error&&(<p style={{color:"#Dc3545",marginTop:"10px"}}>{error}</p>)}
      </Form>
      </Col>
    </Row>
   </>
  )
}

export default Login
