import { Container } from "react-bootstrap"
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom"

const Error = () => {
  const error = useRouteError();
  let errorStatus;
  let errorStatusText;
  if(isRouteErrorResponse(error)){
    errorStatus = error.status;
    errorStatusText = error.statusText
  }else{
    errorStatus=404;
    errorStatusText="Page not found";
  }
  return (
    <Container className='notFound'>
      <h1>{errorStatus}</h1>
      <p>{errorStatusText}</p>
      <Link to={"/"} replace={true}>
      How about going back to safety?
      </Link>
    </Container>
  )
};

export default Error
