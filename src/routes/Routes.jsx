import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import ErrorPage from "../utils/error/ErrorPage";
import CreateShop from "../pages/createShop/CreateShop";
import WatchDemo from "../pages/watchDemo/WatchDemo";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import ProductManagement from "../pages/dashboard/product-management/ProductManagement";
import DashboardLayout from "../layouts/DashboardLayout";
import Checkout from "../pages/dashboard/checkout/Checkout";
import SubscriptionAndPayment from "../pages/dashboard/subscription-payment/SubscriptionAndPayment";
import SalesCollection from "../pages/dashboard/sales-collection/SalesCollection";
import SalesSummary from "../pages/dashboard/sales-summary/SalesSummary";
import PrivateRoutes from "./PrivateRoutes";
import { axiosSecure } from "../hooks/useAxios";
import UpdateProduct from "../pages/dashboard/updateProduct/UpdateProduct";
import CheckoutCart from "../pages/dashboard/checkout/CheckoutCart";
import AdminRoutes from "./AdminRoutes";
import AdminSalesSummary from "../pages/dashboard/adminRoutes/AdminSalesSummary";
import ManageShops from "../pages/dashboard/adminRoutes/ManageShops";
import ManageUsers from "../pages/dashboard/adminRoutes/ManageUsers";

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
    errorElement: <ErrorPage />,
    children: [
      {
        path: "admin/sales-summary",
        element: (
          <AdminRoutes>
            <AdminSalesSummary />
          </AdminRoutes>
        ),
      },
      {
        path: "admin/manage-shops",
        element: (
          <AdminRoutes>
            <ManageShops />
          </AdminRoutes>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoutes>
            <ManageUsers />
          </AdminRoutes>
        ),
      },
      {
        path: "product-management",
        element: (
          <PrivateRoutes>
            <ProductManagement />
          </PrivateRoutes>
        ),
        loader: () => axiosSecure.get("/products"),
      },
      {
        path: "sales-collection",
        element: (
          <PrivateRoutes>
            <SalesCollection />
          </PrivateRoutes>
        ),
        loader: () => axiosSecure.get("/products"),
      },
      {
        path: "cart",
        element: (
          <PrivateRoutes>
            <CheckoutCart />
          </PrivateRoutes>
        ),
      },
      {
        path: "checkout",
        element: (
          <PrivateRoutes>
            <Checkout />
          </PrivateRoutes>
        ),
      },
      {
        path: "subscription",
        element: (
          <PrivateRoutes>
            <SubscriptionAndPayment />
          </PrivateRoutes>
        ),
      },
      {
        path: "sales-summary",
        element: (
          <PrivateRoutes>
            <SalesSummary />
          </PrivateRoutes>
        ),
        loader: () => axiosSecure.get("/sales"),
      },
      {
        path: "product/update/:productId",
        element: <UpdateProduct />,
        loader: ({ params }) =>
          axiosSecure.get(`/product/${params?.productId}`),
      },
    ],
  },
]);

export default routes;
