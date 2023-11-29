import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { MdOutlineInventory2 } from "react-icons/md";
import useAdmin from "../../hooks/useAdmin";

const Navbar = () => {
  const { user, loading, logOutUser } = useAuth();
  const { isAdmin } = useAdmin();
  
  console.log({isAdmin})

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success("User Logged Out.");
      })
      .catch((err) => toast.error(err?.message));
  };

  const handleImageError = (e) => {
    e.target.src = "https://i.ibb.co/ZXScD70/avatar.png";
  };

  const navItems = (
    <>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "font-medium bg-base-100 text-blue-500"
              : ""
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "font-medium bg-base-100 text-blue-500"
              : ""
          }
          to="/create-shop"
        >
          Create Shop
        </NavLink>
      </li>
      {!loading && user && (
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "font-medium bg-base-100 text-blue-500"
                : ""
            }
            to="/dashboard/sales-summary"
          >
            Dashboard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "font-medium bg-base-100 text-blue-500"
              : ""
          }
          to="/watch-demo"
        >
          Watch Demo
        </NavLink>
      </li>
      {loading && (
        <div className="flex flex-col gap-4 w-52">
          <div className="flex gap-4 items-center">
            <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
        </div>
      )}
      {!loading && !user ? (
        <>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "font-medium bg-base-100 text-blue-500"
                  : ""
              }
              to="/register"
            >
              Register
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "font-medium bg-base-100 text-blue-500"
                  : ""
              }
              to="/login"
            >
              Login
            </NavLink>
          </li>
        </>
      ) : (
        !loading && (
          <div className="flex gap-2 justify-center items-center">
            <div className="avatar flex-col justify-center items-center">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  className="w-full h-full"
                  src={user?.photoURL}
                  onError={handleImageError}
                />
              </div>
              <h3 className="text-sm font-semibold mt-1">
                {user?.displayName?.length > 12
                  ? user?.displayName.slice(0, 12) + "..."
                  : user?.displayName}
              </h3>
            </div>
            <button
              onClick={handleLogOut}
              type="button"
              className="btn btn-outline btn-error btn-sm opacity-100 font-medium py-2.5 min-h-auto h-auto px-4"
            >
              LogOut
            </button>
          </div>
        )
      )}
    </>
  );

  return (
    <div className="bg-base-200">
      <Container>
        <div className="navbar p-0">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 z-[1] shadow bg-base-200 rounded-box w-60 text-lg p-0"
              >
                {navItems}
              </ul>
            </div>
            <Link to="/" className="text-2xl font-bold flex items-center gap-2">
              <MdOutlineInventory2 /> <span className="block">Inventory</span>
            </Link>
          </div>
          <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-base items-center">
              {navItems}
            </ul>
          </div>
          {/* <div className="navbar-end">
            <a className="btn">Login</a>
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
