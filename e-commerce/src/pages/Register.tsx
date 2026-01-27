import { Heading } from "@components/shared"
import { Row  ,Col ,Button,Spinner } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
// import z from "zod"
import { Input } from "@components/form";
import { Navigate } from "react-router-dom";
import useRegister from "@hooks/useRegister";




const Register = () => {
const{Loading,error,accessToken,register,handleSubmit,emailAvailabilityStatus,emailOnBlurHandler,submitForm,formErrors}=useRegister()
    if(accessToken){
      return <Navigate to="/"/>
    }
  return (
   <>
   <Heading title="User Registeration"/>
   <Row>
    <Col md={{span:6 , offset:3}}>
     <Form onSubmit={handleSubmit(submitForm)}>
      <Input label="First Name" register={register} error={formErrors.firstName?.message} name="firstName"/>
      <Input label="Last Name" register={register} error={formErrors.lastName?.message} name="lastName"/>
      <Input label="Email Address" register={register} error={formErrors.email?.message ? formErrors.email?.message : emailAvailabilityStatus==="notAvailable" ? "the email is already in use .":emailAvailabilityStatus==="failed"?"error from the server.":""} name="email" onBlur={emailOnBlurHandler} 
      formText={emailAvailabilityStatus ==="checking"?"We currently checking the availability of this email address. please wait a moment":""}
      success={emailAvailabilityStatus==="available"?"this email is availible for use ." :""}
      disabled={emailAvailabilityStatus==="checking"?true:false}/>
      <Input label="Password" register={register} error={formErrors.password?.message} name="password" type="password"/>
      <Input label="Confirm Password" register={register} error={formErrors.confirmPassword?.message} name="confirmPassword" type="password"/>
      <Button disabled={emailAvailabilityStatus==="checking"?true:false||Loading==="pending"} variant="info" type="submit" style={{color:"white"}}>
        {Loading==="pending" ? <><Spinner animation="border" size="sm"></Spinner> Loading</>:"Submit"}
      </Button>
      {error&& <p>{error}</p>}
    </Form>
    </Col>
   </Row>
   </>
  );
}

export default Register
