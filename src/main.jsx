import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { LanguageProvider } from "./context/LanguageContext";
import MainLayout from "./layout/MainLayout";
import ProductsList from "./pages/ProductsList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import CategoryPage from "./pages/CategoryPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <ProductsList /> },
        { path: "/product/:id", element: <ProductDetails /> },
        
        // Category Routes
        { 
          path: "/new-arrivals", 
          element: <CategoryPage categoryId="" initialFilters={{ limit: 12 }} /> 
        },
        { 
          path: "/women", 
          element: <CategoryPage categoryId="1" /> 
        },
        { 
          path: "/men", 
          element: <CategoryPage categoryId="2" /> 
        },
        { 
          path: "/home-collection", 
          element: <CategoryPage categoryId="3" /> 
        },
        { 
          path: "/sale", 
          element: <CategoryPage categoryId="" initialFilters={{ priceMax: "100" }} /> 
        },

        // Protected route — must be logged in
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
      ],
    },

    // Login is outside layout (no navbar)
    { path: "/login", element: <Login /> },
    { path: "*", element: <NotFound /> },
  ],
  {
    basename: "/ecommerce-app/",
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </Provider>
  </StrictMode>
);