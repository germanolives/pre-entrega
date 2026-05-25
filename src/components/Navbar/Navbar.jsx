import { SearchbarContainer } from "../Searchbar/SearchbarContainer";
import { Link } from "react-router-dom";
import { NavbarProdCategContent } from "./NavbarProdCategContent";
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { CartIcon } from "../Icons/index";

export const Navbar = () => {
  const location = useLocation();
  const { getCartQuantity } = useCart();
  return (
    <nav className="hidden md:grid grid-rows-[2fr_1fr] grow">
      <SearchbarContainer />
      <ul className="flex justify-evenly items-center border-t border-gray-400 text-xs">
        <li className="flex items-center">
          <Link
            to={"/"}
            className={`${location.pathname === "/" ? "text-blue-600" : "text-gray-600"}`}
          >
            HOME
          </Link>
        </li>
        <li className="flex items-center flex-col group relative">
          <Link
            to={"/products"}
            className={`${location.pathname.includes("/products") ? "text-blue-600" : "text-gray-600"}`}
          >
            PRODUCTS
          </Link>
          <NavbarProdCategContent />
        </li>
        <li className="flex items-center">
          <Link
            to={"/services"}
            className={`${location.pathname === "/services" ? "text-blue-600" : "text-gray-600"}`}
          >
            SERVICES
          </Link>
        </li>
        <li className="flex items-center">
          <Link
            to={"/aboutUs"}
            className={`${location.pathname === "/aboutUs" ? "text-blue-600" : "text-gray-600"}`}
          >
            ABOUT US
          </Link>
        </li>
        <li className="flex items-center flex-col group relative">
          <Link
            to={"/login"}
            className={`${location.pathname === "/login" || location.pathname === "/register" ? "text-blue-600" : "text-gray-600"}`}
          >
            MY ACCOUNT
          </Link>
          <ul className="hidden group-hover:block absolute top-full bg-slate-200 shadow-md border border-gray-400 p-2 min-w-30 z-50 rounded-xl">
            <li className="p-0.5">
              <Link
                to={"/login"}
                className={`${location.pathname === "/login" ? "text-blue-600" : "text-gray-600"}`}
              >
                LOGIN
              </Link>
            </li>
            <li className="p-0.5">
              <Link
                to={"/register"}
                className={`${location.pathname === "/register" ? "text-blue-600" : "text-gray-600"}`}
              >
                REGISTER
              </Link>
            </li>
          </ul>
        </li>
        <li className="flex items-center">
          <Link
            to={"/cart"}
            className={`${location.pathname === "/cart" ? "text-blue-600" : "text-gray-600"}`}
          >
            <div className="flex gap-0.5">
              <CartIcon className="w-5 h-5" />
              <span className="border border-gray-400 rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center font-semibold text-xxs bg-gray-200">
                {getCartQuantity()}
              </span>
            </div>
          </Link>
        </li>
        <li className="flex items-center">
          <Link
            to={"/contact"}
            className={`${location.pathname === "/contact" ? "text-blue-600" : "text-gray-600"}`}
          >
            CONTACT
          </Link>
        </li>
      </ul>
    </nav>
  );
};
