import { Link, NavLink } from "react-router-dom";
import Container from "./Container";

const Navbar = () => {
  return (
    <div className="bg-base-200">
      <Container>
        <div className="navbar">
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
            <Link to="/" className="btn btn-ghost text-2xl">
              Inventory
            </Link>
          </div>
          <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-base">{navItems}</ul>
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
);
