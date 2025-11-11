import MainLayout from '@layouts/MainLayout/MainLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AboutUs from 'src/pages/AboutUs';
import Categories from 'src/pages/Categories';
import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import Products from 'src/pages/Products';
import Register from 'src/pages/Register';
import Error from './../pages/Error';
import Cart from 'src/pages/Cart';
import Wishlist from 'src/pages/Wishlist';


const router = createBrowserRouter([
    {path:"/",element:<MainLayout/>, errorElement:<Error/>,children:[
      {index:true,element:<Home/>},
      {path:"categories",element:<Categories/>},
      {path:"categories/products/:prefix",element:<Products/>,loader:({params})=>{
        console.log(params.prefix);
        if(typeof params.prefix !== "string" ||!/^[a-z]+$/i.test(params.prefix) ){
            throw new Response ("Bad Request",{
                status:400,
                statusText:"Category not found"
            })
        }
        return true;
      }},
      {path:"about-us",element:<AboutUs/>},
      {path:"login",element:<Login/>},
      {path:"register",element:<Register/>},
      {path:"cart",element:<Cart/>},
      {path:"wishlist",element:<Wishlist/>}
    ]}
]);

const AppRouter = () => {
  return <RouterProvider router={router}/>
}

export default AppRouter
