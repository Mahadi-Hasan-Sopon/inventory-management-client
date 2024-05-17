import { NavLink, Outlet } from "react-router-dom";
import Container from "../components/shared/Container";
import {
  MdHome,
  MdOutlineInventory2,
  MdOutlinePayment,
  MdOutlineSummarize,
} from "react-icons/md";
import { FaBarsStaggered, FaAnglesLeft } from "react-icons/fa6";
import { RxCube } from "react-icons/rx";
import { BsShop, BsStack } from "react-icons/bs";
import { PiUsersFourFill } from "react-icons/pi";

import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import Footer from "../components/shared/Footer";
import useAdmin from "../hooks/useAdmin";

const DashboardNavItems = () => {
  const { logOutUser, user } = useAuth();
  const { isAdmin } = useAdmin();

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
      {isAdmin ? (
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
              to="/dashboard/admin/sales-summary"
            >
              <div className="flex gap-2 items-center">
                <MdOutlineSummarize className="text-2xl" />
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
              to="/dashboard/admin/manage-shops"
            >
              <div className="flex gap-2 items-center">
                <BsShop className="text-2xl" />
                <span className="block">Manage Shops</span>
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
              to="/dashboard/admin/manage-users"
            >
              <div className="flex gap-2 items-center">
                <PiUsersFourFill className="text-2xl" />
                <span className="block">Manage Users</span>
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
                <MdHome className="text-2xl" />
                <span className="block">Home</span>
              </div>
            </NavLink>
          </li>
          <li>
            <div className="flex items-center gap-4 p-2">
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
      ) : (
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
              to="/dashboard/sales-summary"
            >
              <div className="flex gap-2 items-center">
                <MdOutlineSummarize className="text-2xl" />
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
              to="/dashboard/product-management"
            >
              <div className="flex gap-2 items-center">
                <RxCube className="text-2xl" />
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
              to="/dashboard/sales-collection"
            >
              <div className="flex gap-2 items-center">
                <BsStack className="text-2xl" />
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
              to="/dashboard/subscription"
            >
              <div className="flex gap-2 items-center">
                <MdOutlinePayment className="text-2xl" />
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
              to="/"
            >
              <div className="flex gap-2 items-center">
                <MdHome className="text-2xl" />
                <span className="block">Home</span>
              </div>
            </NavLink>
          </li>
          <li>
            <div className="flex items-center gap-4 p-2">
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
      )}
    </>
  );
};

const DashboardLayout = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Container>
        <div className="drawer md:drawer-open">
          <input
            id="my-drawer-2"
            type="checkbox"
            className="drawer-toggle"
            checked={checked}
            readOnly
          />
          <div className="drawer-content flex flex-col">
            {/* Page content here */}
            <div className="flex justify-between gap-6 w-full md:hidden px-4">
              <label htmlFor="my-drawer-2" className="drawer-button">
                <FaBarsStaggered
                  className="text-2xl my-2 block cursor-pointer"
                  onClick={() => setChecked(!checked)}
                />
              </label>
              <div className="text-2xl font-bold flex items-center gap-2">
                <MdOutlineInventory2 />{" "}
                <span className="block text-2xl">Inventory</span>
              </div>
            </div>
            <div className="md:px-4 py-6">
              <Outlet />
            </div>
            <Footer />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="py-6 ps-2 w-64 min-h-full border-r border-r-[#E8EBED] bg-white">
              {/* Sidebar content here */}
              <div className="flex flex-col gap-3 list-none text-xl relative">
                <div
                  className={`${
                    !checked && "hidden"
                  } md:hidden flex absolute -right-4 bg-white p-2 rounded-full top-4 justify-end items-center`}
                >
                  <FaAnglesLeft
                    className="text-2xl block text-red-700 cursor-pointer"
                    onClick={() => setChecked(!checked)}
                  />
                </div>
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
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardLayout;
