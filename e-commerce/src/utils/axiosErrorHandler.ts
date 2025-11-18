import { isAxiosError } from "axios";

const axiosErrorHandler =(error:unknown)=>{
    if(isAxiosError(error)){
        return error.request?.data.message||error.message
    }else{
        return "An Unexpected Error"
    }
};
export default axiosErrorHandler;