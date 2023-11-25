import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Container from "../components/shared/Container";
import {
  MdOutlinePayment,
  MdOutlineShoppingCartCheckout,
  MdOutlineSummarize,
} from "react-icons/md";
import { RxCube, RxDashboard } from "react-icons/rx";
import { SiGoogletagmanager } from "react-icons/si";
import { BsStack } from "react-icons/bs";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <div className="grid grid-cols-5 relative">
          <div className="grid-cols-1 border-r border-r-[#E8EBED] w-full py-6">
            <div className="flex flex-col gap-1 list-none text-xl">
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
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
                      ? "pending"
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
                      ? "pending"
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
                      ? "pending"
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
                      ? "pending"
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
                      ? "pending"
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
                      ? "pending"
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
