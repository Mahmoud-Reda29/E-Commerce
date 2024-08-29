/** @format */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import UserContextProvider from "./Components/Context/UserContext";
import LayOut from "./Components/LayOut/LayOut";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Cart from "./Components/Cart/Cart";
import NotFound from "./Components/NotFound/NotFound";
import WishList from "./Components/WishList/WishList";
import CartContextProvider from "./Components/Context/CartContext";
import toast, { Toaster } from 'react-hot-toast';
import CheckOut from "./Components/CheckOut/CheckOut";
import AllOrders from "./Components/AllOrders/AllOrders";
import ProtectedAuth from "./Components/ProtectedAuth/ProtectedAuth";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";

const client = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: "products", element: <ProtectedRoute> <Products /> </ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
        { path: "productDetails/:id", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
        { path: "whishlist", element: <ProtectedRoute> <WishList />  </ProtectedRoute> },
        { path: "checkout/:cartId", element: <ProtectedRoute> <CheckOut />  </ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute> <AllOrders />  </ProtectedRoute> },
        { path: "login", element: <ProtectedAuth><Login /></ProtectedAuth> },
        { path: "register", element: <ProtectedAuth><Register /></ProtectedAuth> },
        { path: "forgetpassword", element: <ProtectedAuth><ForgetPassword /></ProtectedAuth> },
        { path: "resetpassword", element: <ProtectedAuth><ResetPassword /></ProtectedAuth> },
        { path: "verifycode", element: <ProtectedAuth><VerifyCode /></ProtectedAuth> },
        { path: "cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={client}>
      <UserContextProvider>
        <CartContextProvider>
          <RouterProvider router={router} />
        </CartContextProvider>
      </UserContextProvider>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
