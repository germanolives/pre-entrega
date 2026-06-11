import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useFavorite } from "../../context/FavoriteContext";
import { CartIcon, FavoriteIcon, DatabaseIcon } from "../Icons/index";
import { useSource } from "../..//context/SourceContext";
import { Button } from "../common/Button";

export const MovilNavbar = ({ menuChange }) => {
  const location = useLocation();
  const { getCartQuantity } = useCart();
  const { getFavoriteQuantity } = useFavorite();
  const { nameSource, changeSource } = useSource();
  return (
    <nav className="grow md:hidden">
      <ul className="p-2 border border-gray-400 rounded-sm m-2 text-sm">
        <li className="m-1" onClick={menuChange}>
          <Link
            to={"/"}
            className={`${location.pathname === "/" ? "text-blue-600" : "text-gray-600"}`}
          >
            HOME
          </Link>
        </li>
        <li className="m-1" onClick={menuChange}>
          <Link
            to={"/products"}
            className={`${location.pathname.includes("/products") ? "text-blue-600" : "text-gray-600"}`}
          >
            PRODUCTS
          </Link>
        </li>
        <li className="m-1" onClick={menuChange}>
          <Link
            to={"/services"}
            className={`${location.pathname === "/services" ? "text-blue-600" : "text-gray-600"}`}
          >
            SERVICES
          </Link>
        </li>
        <li className="m-1" onClick={menuChange}>
          <Link
            to={"/aboutUs"}
            className={`${location.pathname === "/aboutUs" ? "text-blue-600" : "text-gray-600"}`}
          >
            ABOUT US
          </Link>
        </li>
        <li className="m-1" onClick={menuChange}>
          <Link
            to={"/login"}
            className={`${location.pathname === "/login" || location.pathname === "/register" ? "text-blue-600" : "text-gray-600"}`}
          >
            MY ACCOUNT
          </Link>
        </li>
        <li className="m-1">
          <Button
            className={`flex gap-0.5 cursor-pointer font-normal ${nameSource === "LOCAL" ? "text-blue-600" : "text-gray-600"}`}
            variant="cristal"
            onClick={() => {changeSource("local"); menuChange()}}
          >
            <DatabaseIcon className="w-5 h-5" />
            <span className="border border-gray-400 rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center font-semibold text-xxs bg-gray-200">
              LOCAL
            </span>
          </Button>
        </li>
        <li className="m-1">
          <Button
            className={`flex gap-0.5 cursor-pointer font-normal ${nameSource === "DB" ? "text-blue-600" : "text-gray-600"}`}
            variant="cristal"
            onClick={() => {changeSource("db"); menuChange()}}
          >
            <DatabaseIcon className="w-5 h-5" />
            <span className="border border-gray-400 rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center font-semibold text-xxs bg-gray-200">
              DB
            </span>
          </Button>
        </li>
        <li className="m-1">
          <Button
            className={`flex gap-0.5 cursor-pointer font-normal ${nameSource === "API" ? "text-blue-600" : "text-gray-600"}`}
            variant="cristal"
            onClick={() => {changeSource("api"); menuChange()}}
          >
            <DatabaseIcon className="w-5 h-5" />
            <span className="border border-gray-400 rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center font-semibold text-xxs bg-gray-200">
              API
            </span>
          </Button>
        </li>
        <li className="flex items-center m-1" onClick={menuChange}>
          <Link
            to={"/favorites"}
            className={`${location.pathname === "/favorites" ? "text-blue-600" : "text-gray-600"}`}
          >
            <div className="flex gap-0.5">
              <FavoriteIcon className="w-5 h-5" />
              <span className="border border-gray-400 rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center font-semibold text-xxs bg-gray-200">
                {getFavoriteQuantity()}
              </span>
            </div>
          </Link>
        </li>
        <li className="flex items-center m-1" onClick={menuChange}>
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
        <li className="m-1" onClick={menuChange}>
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
