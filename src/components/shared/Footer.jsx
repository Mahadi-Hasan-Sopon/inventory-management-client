import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <aside>
          <h1 className="text-3xl font-bold text-neutral-600">Inventory</h1>
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <nav>
          <header className="footer-title">Services</header>
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/dashboard" className="link link-hover">
            Dashboard
          </Link>
          <Link to="/create-shop" className="link link-hover">
            Shop
          </Link>
          <Link to="/watch-demo" className="link link-hover">
            Watch Demo
          </Link>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <Link className="link link-hover">About us</Link>
          <Link className="link link-hover">Contact us</Link>
          <Link className="link link-hover">Jobs</Link>
          <Link className="link link-hover">Press kit</Link>
        </nav>
        <nav>
          <header className="footer-title">Socials</header>
          <div className="flex flex-col gap-3 justify-center items-center">
            <Link>
              <FaFacebook className="text-2xl" />
            </Link>
            <Link>
              <FaTwitter className="text-2xl" />
            </Link>
            <Link>
              <FaLinkedin className="text-2xl" />
            </Link>
          </div>
        </nav>
      </footer>
      <div className="footer footer-center p-4 bg-base-200/60 text-base-content">
        <aside>
          <p>
            Copyright © 2023 - All right reserved by <b>Mahadi Hasan</b>
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Footer;
