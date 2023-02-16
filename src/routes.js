import React from 'react';
import { useRoutes } from "react-router-dom";
import {
  Home,
  Login,
  RegisterUser,
  Mypage,
  Products,
  Example,
  Notfound
} from "./screens";
import LayoutProvider from "./Layout";
import { Orders, Order } from "./screens/orders"
import OrdersProc from "./screens/orders/OrdersProc";

const AppRoutes = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <LayoutProvider />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/dashboard", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <RegisterUser /> },
        { path: "/mypage", element: <Mypage /> },
        { path: "/goods/list", element: <Products /> },
        { path: "/orders", element: <Orders />,
          children: [
            { path: "/orders/orders", element: <Orders />},
            { path: "/orders/ordersProc", element: <OrdersProc />},
          ]
        },
        { path: "/orders/orders/:ordersId", element: <Order /> },
        { path: "/example", element: <Example /> },
        { path: "*", element: <Notfound /> }
      ]
    },
  ]);
  return element;
}

export default AppRoutes;
