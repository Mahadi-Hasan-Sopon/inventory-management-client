import { NavLink, Outlet } from "react-router-dom";
import Container from "../components/shared/Container";
import {
  MdHome,
  MdOutlineInventory2,
  MdOutlinePayment,
  MdOutlineShoppingCartCheckout,
  MdOutlineSummarize,
} from "react-icons/md";
import { RxCube, RxDashboard } from "react-icons/rx";
import { SiGoogletagmanager } from "react-icons/si";
import { BsStack } from "react-icons/bs";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  return (
    <div>
      <Container>
        <div className="grid grid-cols-5 relative">
          <div className="grid-cols-1 border-r border-r-[#E8EBED] w-full py-6">
            <div className="flex flex-col gap-1 list-none text-xl">
              <li className="px-2">
                <div className="text-2xl font-bold flex items-center gap-2">
                  <MdOutlineInventory2 />{" "}
                  <span className="block text-2xl">Inventory</span>
                </div>
              </li>
              <div className="divider my-1"></div>
              <DashboardNavItems />
            </div>
          </div>
          <div className="col-span-4 ps-4 py-6">
            <Outlet />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardLayout;

const DashboardNavItems = () => {
  const { logOutUser, user } = useAuth();

  const handleImageError = (e) => {
    e.target.src = "https://i.ibb.co/ZXScD70/avatar.png";
  };

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success("User Logged Out.");
      })
      .catch((err) => toast.error(err?.message));
  };
  return (
    <>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "text-slate-500 font-medium p-2 block"
              : isActive
              ? "font-medium text-[#FE9F43] w-full bg-[#FE9F43]/10 p-2 block rounded"
              : "text-slate-500 font-medium p-2 block"
          }
          to="/dashboard"
          end
        >
          <div className="flex gap-2 items-center">
            <RxDashboard /> <span className="block">Dashboard</span>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "text-slate-500 font-medium p-2 block"
              : isActive
              ? "font-medium text-[#FE9F43] w-full bg-[#FE9F43]/10 p-2 block rounded"
              : "text-slate-500 font-medium p-2 block"
          }
          to="/dashboard/product-management"
        >
          <div className="flex gap-2 items-center">
            <SiGoogletagmanager />
            <span className="block">Manage Product</span>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "text-slate-500 font-medium p-2 block"
              : isActive
              ? "font-medium text-[#FE9F43] w-full bg-[#FE9F43]/10 p-2 block rounded"
              : "text-slate-500 font-medium p-2 block"
          }
          to="/dashboard/products"
        >
          <div className="flex gap-2 items-center">
            <RxCube />
            <span className="block">Products</span>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "text-slate-500 font-medium p-2 block"
              : isActive
              ? "font-medium text-[#FE9F43] w-full bg-[#FE9F43]/10 p-2 block rounded"
              : "text-slate-500 font-medium p-2 block"
          }
          to="/dashboard/sales-collection"
        >
          <div className="flex gap-2 items-center">
            <BsStack />
            <span className="block">Sales Collection</span>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "text-slate-500 font-medium p-2 block"
              : isActive
              ? "font-medium text-[#FE9F43] w-full bg-[#FE9F43]/10 p-2 block rounded"
              : "text-slate-500 font-medium p-2 block"
          }
          to="/dashboard/checkout"
        >
          <div className="flex gap-2 items-center">
            <MdOutlineShoppingCartCheckout />
            <span className="block">Checkout</span>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "text-slate-500 font-medium p-2 block"
              : isActive
              ? "font-medium text-[#FE9F43] w-full bg-[#FE9F43]/10 p-2 block rounded"
              : "text-slate-500 font-medium p-2 block"
          }
          to="/dashboard/subscription"
        >
          <div className="flex gap-2 items-center">
            <MdOutlinePayment />
            <span className="block">Subscription</span>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "text-slate-500 font-medium p-2 block"
              : isActive
              ? "font-medium text-[#FE9F43] w-full bg-[#FE9F43]/10 p-2 block rounded"
              : "text-slate-500 font-medium p-2 block"
          }
          to="/dashboard/sales-summary"
        >
          <div className="flex gap-2 items-center">
            <MdOutlineSummarize />
            <span className="block">Sales Summary</span>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "text-slate-500 font-medium p-2 block"
              : isActive
              ? "font-medium text-[#FE9F43] w-full bg-[#FE9F43]/10 p-2 block rounded"
              : "text-slate-500 font-medium p-2 block"
          }
          to="/"
        >
          <div className="flex gap-2 items-center">
            <MdHome />
            <span className="block">Home</span>
          </div>
        </NavLink>
      </li>
      <li className="p-2">
        <div className="flex items-center gap-4">
          <div className="avatar flex-col justify-center items-center">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                className="w-full h-full"
                src={user?.photoURL}
                onError={handleImageError}
              />
            </div>
          </div>

          <button
            onClick={handleLogOut}
            type="button"
            className="btn btn-outline btn-error py-3 px-5 h-auto min-h-fit font-medium"
          >
            LogOut
          </button>
        </div>
      </li>
    </>
  );
};
