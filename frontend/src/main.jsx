import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Paginas
import Login from './components/pages/Auth/Login.jsx'
import Home from './components/pages/Home.jsx'
import Register from './components/pages/Auth/Register.jsx'
import Profile from './components/pages/User/Profile.jsx'
import MyProducts from './components/pages/Product/MyProducts.jsx'
import AddProduct from './components/pages/Product/AddProduct.jsx'
import EditProduct from './components/pages/Product/EditProduct.jsx'
import ProductDetails from './components/pages/Product/ProductDetails.jsx'

// Contexto
import { UserProvider } from './context/UserContext.jsx'
import MyOrders from './components/pages/Product/MyOrders.jsx'







const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/user/profile',
        element: <Profile/>
      },
      {
        path: '/products/myproducts',
        element: <MyProducts/>
      },
      {
        path: '/products/add',
        element: <AddProduct/>
      },
      {
        path: '/products/edit/:id',
        element: <EditProduct/>
      },
      {
        path: '/product/:id',
        element: <ProductDetails/>
      },
      {
      path: '/products/myorders',
      element: <MyOrders/>
    },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Aqui defini que todo o app pode acessar o contexto do usuário */}
    <RouterProvider router={router}>
      <UserProvider/>
    </RouterProvider>
  </StrictMode>,
)
