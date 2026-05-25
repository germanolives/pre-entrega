import { SearchbarContainer } from "../Searchbar/SearchbarContainer";
import { Link } from "react-router-dom";
import { NavbarProdCategContent } from "./NavbarProdCategContent";
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { CartIcon } from "../Icons/index";

export const MovilNavbar = () => {
  const location = useLocation();
  const { getCartQuantity } = useCart();
  return (
    <nav className="grow md:hidden">
      <SearchbarContainer />
      <ul className="p-2 border border-gray-400 rounded-sm m-2">
        <li className="">
          <Link
            to={"/"}
            className={`${location.pathname === "/" ? "text-blue-600" : "text-gray-600"}`}
          >
            HOME
          </Link>
        </li>
        <li>
          <Link
            to={"/products"}
            className={`${location.pathname.includes("/products") ? "text-blue-600" : "text-gray-600"}`}
          >
            PRODUCTS
          </Link>
          <NavbarProdCategContent />
        </li>
        <li>
          <Link
            to={"/services"}
            className={`${location.pathname === "/services" ? "text-blue-600" : "text-gray-600"}`}
          >
            SERVICES
          </Link>
        </li>
        <li>
          <Link
            to={"/aboutUs"}
            className={`${location.pathname === "/aboutUs" ? "text-blue-600" : "text-gray-600"}`}
          >
            ABOUT US
          </Link>
        </li>
        <li>
          <Link
            to={"/login"}
            className={`${location.pathname === "/login" || location.pathname === "/register" ? "text-blue-600" : "text-gray-600"}`}
          >
            MY ACCOUNT
          </Link>
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
        <li>
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
