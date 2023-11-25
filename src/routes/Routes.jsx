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
import Checkout from "../pages/dashboard/checkout/Checkout";
import SubscriptionAndPayment from "../pages/dashboard/subscription-payment/SubscriptionAndPayment";
import SalesCollection from "../pages/dashboard/sales-collection/SalesCollection";
import SalesSummary from "../pages/dashboard/sales-summary/SalesSummary";

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
        path: "sales-collection",
        element: <SalesCollection />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "subscription",
        element: <SubscriptionAndPayment />,
      },
      {
        path: "sales-summary",
        element: <SalesSummary />,
      },
    ],
  },
]);

export default routes;