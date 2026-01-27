import { zodResolver } from "@hookform/resolvers/zod";
import { actAuthRegister, resetUI } from "@redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { signupSchema, TSignupType } from "@validations/signupSchema";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useCheckEmailAvailability from "./useCheckEmailAvailability";


export default function useRegister() {
      const dispatch=useAppDispatch()
  const navigate=useNavigate()
  const {Loading,error,accessToken}=useAppSelector((state)=>state.auth)
  const{register ,handleSubmit,formState:{errors:formErrors},trigger, getFieldState,}=useForm<TSignupType>({
    mode:"onBlur",
    resolver:zodResolver(signupSchema)})
    const{emailAvailabilityStatus,enteredEmail,checkEmailAvailability,resetCheckEmailAvailability}=useCheckEmailAvailability();
  const submitForm :SubmitHandler<TSignupType>=async (data)=>{
    const {firstName,lastName,email,password}=data
    dispatch(actAuthRegister({firstName,lastName,email,password})).unwrap().then((res)=>{console.log(res) ,navigate("/login?message=account-created")})
    console.log(data)
  }
  const emailOnBlurHandler=async(e:React.FocusEvent<HTMLInputElement>)=>{
    console.log(e);
    const value =e.target.value 
    await trigger("email");
    const {isDirty,invalid}=getFieldState("email")
     if (isDirty && !invalid && enteredEmail !== value) {
      // checking
      checkEmailAvailability(value);
    }

    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
  }
   useEffect(
      ()=>{return ()=>{dispatch(resetUI())}},[dispatch]);
      
  return{Loading,error,accessToken,register,handleSubmit,emailAvailabilityStatus,emailOnBlurHandler,submitForm,formErrors}
}
