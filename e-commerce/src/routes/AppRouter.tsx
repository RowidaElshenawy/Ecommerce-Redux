// import MainLayout from '@layouts/MainLayout/MainLayout';
// import AboutUs from 'src/pages/AboutUs';
// import Categories from 'src/pages/Categories';
// import Home from 'src/pages/Home';
// import Login from 'src/pages/Login';
// import Products from 'src/pages/Products';
// import Register from 'src/pages/Register';
// import Error from './../pages/Error';
// import Cart from 'src/pages/Cart';
// import Wishlist from 'src/pages/Wishlist';
import ProtectedRoutes from "@components/Auth/ProtectedRoutes";
import { LottieHandler } from "@components/feedback";
import PageSuspenseFallback from "@components/feedback/PageSuspenseFallback/PageSuspenseFallback";
import {lazy, Suspense} from "react";
const MainLayout = lazy(()=>import("@layouts/MainLayout/MainLayout"));
const AboutUs = lazy(()=>import("@pages/AboutUs"));
const Categories =lazy(()=>import("@pages/Categories"));
const Home =lazy(()=>import("@pages/Home"));
const Login =lazy(()=>import("@pages/Login"));
const Products =lazy(()=>import("@pages/Products"));
const Register =lazy(()=>import("@pages/Register"));
const Error =lazy(()=>import("./../pages/Error"));
const Cart =lazy(()=>import("@pages/Cart"));
const Wishlist =lazy(()=>import("@pages/Wishlist"));
const Profile =lazy(()=>import("@pages/Profile"))
const ProfileLayout=lazy(()=>import("@layouts/ProfileLayout/ProfileLayout"));
const Orders=lazy(()=>import("@pages/Orders"))
import { createBrowserRouter, RouterProvider } from 'react-router-dom';



const router = createBrowserRouter([
    {path:"/",element:<Suspense fallback={<div style={{marginTop:"10%"}}><LottieHandler type="loading" message="loading.... "/></div>}><MainLayout/></Suspense>, errorElement:<Suspense fallback="Loading ..."><Error/></Suspense>,children:[
      {index:true,element:<PageSuspenseFallback><Home/></PageSuspenseFallback>},
      {path:"categories",element:<PageSuspenseFallback><Categories/></PageSuspenseFallback>},
      {path:"categories/products/:prefix",element:<PageSuspenseFallback><Products/></PageSuspenseFallback>,loader:({params})=>{
        console.log(params.prefix);
        if(typeof params.prefix !== "string" ||!/^[a-z]+$/i.test(params.prefix) ){
            throw new Response ("Bad Request",{
                status:400,
                statusText:"Category not found"
            })
        }
        return true;
      }},
      {path:"about-us",element:<PageSuspenseFallback><AboutUs/></PageSuspenseFallback>},
      {path:"login",element:<PageSuspenseFallback><Login/></PageSuspenseFallback>},
      {path:"register",element:<PageSuspenseFallback><Register/></PageSuspenseFallback>},
      {path:"cart",element:<PageSuspenseFallback><Cart/></PageSuspenseFallback>},
      {path:"wishlist",element:<ProtectedRoutes><PageSuspenseFallback><Wishlist/></PageSuspenseFallback></ProtectedRoutes>},
      {path:"profile",element:<ProtectedRoutes><PageSuspenseFallback><ProfileLayout/></PageSuspenseFallback></ProtectedRoutes>,children:[
        {index:true,element:<PageSuspenseFallback><Profile/></PageSuspenseFallback>},
        {path:"orders",element:<PageSuspenseFallback><Orders/></PageSuspenseFallback>}
      ]},
    ]}
]);

const AppRouter = () => {
  return <RouterProvider router={router}/>
}

export default AppRouter
