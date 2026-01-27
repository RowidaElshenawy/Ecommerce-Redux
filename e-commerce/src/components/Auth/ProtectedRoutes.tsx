import { useAppSelector } from "@redux/hook"
import { Navigate } from "react-router-dom"


const ProtectedRoutes = ({children}:{children:React.ReactNode}) => {
 const{accessToken}=useAppSelector(state=>state.auth);
 if(!accessToken){
   return <Navigate to="/login?message=login-required"/>
 }
  return <>{children}</>
}

export default ProtectedRoutes;
