import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ProductsList from "./pages/ProductsList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <ProductsList /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);