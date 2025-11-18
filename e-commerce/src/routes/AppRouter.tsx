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
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {path:"/",element:<Suspense fallback="Loading ..."><MainLayout/></Suspense>, errorElement:<Suspense fallback="Loading ..."><Error/></Suspense>,children:[
      {index:true,element:<Suspense fallback="Loading ..."><Home/></Suspense>},
      {path:"categories",element:<Suspense fallback="Loading ..."><Categories/></Suspense>},
      {path:"categories/products/:prefix",element:<Suspense fallback="Loading ..."><Products/></Suspense>,loader:({params})=>{
        console.log(params.prefix);
        if(typeof params.prefix !== "string" ||!/^[a-z]+$/i.test(params.prefix) ){
            throw new Response ("Bad Request",{
                status:400,
                statusText:"Category not found"
            })
        }
        return true;
      }},
      {path:"about-us",element:<Suspense fallback="Loading ..."><AboutUs/></Suspense>},
      {path:"login",element:<Suspense fallback="Loading ..."><Login/></Suspense>},
      {path:"register",element:<Suspense fallback="Loading ..."><Register/></Suspense>},
      {path:"cart",element:<Suspense fallback="Loading ..."><Cart/></Suspense>},
      {path:"wishlist",element:<Suspense fallback="Loading ..."><Wishlist/></Suspense>}
    ]}
]);

const AppRouter = () => {
  return <RouterProvider router={router}/>
}

export default AppRouter
