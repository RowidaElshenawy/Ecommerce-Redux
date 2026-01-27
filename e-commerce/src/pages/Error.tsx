import { Container } from "react-bootstrap"
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom"
// import Lottie from "lottie-react";
// import notFound from "../assets/lottieFiles/notFound.json"
import { LottieHandler } from "@components/feedback";
const Error = () => {
  // const error = useRouteError();
  // let errorStatus;
  // let errorStatusText;
  // if(isRouteErrorResponse(error)){
  //   errorStatus = error.status;
  //   errorStatusText = error.statusText
  // }else{
  //   errorStatus=404;
  //   errorStatusText="Page not found";
  // }
  return (
    <Container >
      <div className="d-flex flex-column align-items-center">
          {/* <Lottie animationData={notFound} style={{width:"400px"}} /> */}
          <LottieHandler type={"notFound"}/>
          {/* <h1>{errorStatus}</h1>
          <p>{errorStatusText}</p> */}
          <Link to={"/"} replace={true}>
              How about going back to safety?
          </Link>
      </div>
    </Container>
  )
};

export default Error
