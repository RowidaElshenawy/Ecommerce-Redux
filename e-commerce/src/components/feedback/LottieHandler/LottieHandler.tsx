import Lottie from "lottie-react";
import notFound from "../../../assets/lottieFiles/notFound.json"
import empty from "../../../assets/lottieFiles/empty.json"
import loading from "../../../assets/lottieFiles/loading.json"
import error from "../../../assets/lottieFiles/error.json"

const lottieFilesMap={
    notFound,
    empty,
    loading,
    error
}
type lottieHandlerProps ={
    type:keyof typeof lottieFilesMap;
    message?:string;
}

const LottieHandler = ({type,message}:lottieHandlerProps) => {
const lottie =lottieFilesMap[type];
const messageStyle= type==="error" ?{fontSize:"19px",color:"red"}:{fontSize:"19px" ,marginTop:"30px"}
  return (
    <div className="d-flex flex-column align-items-center">
      <Lottie animationData={lottie} style={{width:"400px"}}/>
        {message&&<h3 style={messageStyle}>{message}</h3>}
    </div>
  )
}

export default LottieHandler
