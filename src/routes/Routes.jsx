import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import ErrorPage from "../utils/error/ErrorPage";
import CreateShop from "../pages/createShop/CreateShop";
import WatchDemo from "../pages/watchDemo/WatchDemo";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ProductManagement from "../pages/dashboard/product-management/ProductManagement";
import DashboardLayout from "../layouts/DashboardLayout";
import Products from "../pages/dashboard/products/Products";
import Sales from "../pages/dashboard/sales/Sales";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "create-shop",
        element: <CreateShop />,
      },
      {
        path: "watch-demo",
        element: <WatchDemo />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "product-management",
        element: <ProductManagement />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "sales",
        element: <Sales />,
      },
    ],
  },
]);

export default routes;
