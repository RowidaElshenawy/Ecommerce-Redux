import { zodResolver } from "@hookform/resolvers/zod"
import { actAuthLogin, resetUI } from "@redux/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@redux/hook"
import { signinSchema, TSigninType } from "@validations/signinSchema"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"


const useLogin = () => {
    const {Loading,error,accessToken}=useAppSelector(state=>state.auth)
    const dispatch=useAppDispatch()
    const navigate=useNavigate()
    const [searchParams,setSearchParams]=useSearchParams()
    const {register,handleSubmit,formState:{errors:formErrors}}=useForm<TSigninType>({
        mode:"onBlur",
        resolver:zodResolver(signinSchema)
    });
    const submitForm:SubmitHandler<TSigninType>=(data)=>{
        console.log(data)
        dispatch(actAuthLogin(data)).unwrap().then(()=>{navigate("/")})
        if(searchParams.get("message")==="account-created"){
        setSearchParams("")
        }
    }
   useEffect(
    ()=>{return ()=>{dispatch(resetUI())}},[dispatch]);
  return{Loading,error,accessToken,register,handleSubmit,searchParams,submitForm,formErrors}
}

export default useLogin
