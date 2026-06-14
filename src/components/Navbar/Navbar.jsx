import { SearchbarContainer } from "../Searchbar/SearchbarContainer";
import { Link } from "react-router-dom";
import { NavbarProdCategContent } from "./NavbarProdCategContent";
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useFavorite } from "../../context/FavoriteContext";
import { CartIcon, FavoriteIcon } from "../Icons/index";
import { useSource } from "../..//context/SourceContext";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../common/Button";

// import { migrateCatalogToFirebase } from "../../services/migrator";
// import { exportCatalogToJson } from "../../services/exporter";

export const Navbar = () => {
  const location = useLocation();
  const { getCartQuantity } = useCart();
  const { getFavoriteQuantity } = useFavorite();
  const { user, logout } = useAuth();
  const currentUser = user ? user.uid : null;
  const displayUser = user?.email
    ? user.email.split("@")[0].toUpperCase()
    : "GUEST";
  const displayUserEmail = user?.email ? user.email : "";
  const typeUser = user && user.rol;
  const isAdmin = user && user.rol==="admin";

  return (
    <nav className="hidden md:grid grid-rows-[2fr_1fr] grow">
      <SearchbarContainer />
      <ul className="flex justify-evenly items-center border-t border-gray-400 text-xs">
        <li className="flex items-center w-18">
          <Link
            to={"/"}
            className={`grow text-center ${location.pathname === "/" ? "text-blue-600" : "text-gray-600"}`}
          >
            HOME
          </Link>
        </li>
        <li className="flex items-center flex-col group relative w-18">
          <Link
            to={"/products"}
            className={`grow text-center ${location.pathname === "/products" ? "text-blue-600" : "text-gray-600"}`}
          >
            PRODUCTS
          </Link>
          <NavbarProdCategContent />
        </li>
        <li className="flex items-center w-18">
          <Link
            to={"/services"}
            className={`grow text-center ${location.pathname === "/services" ? "text-blue-600" : "text-gray-600"}`}
          >
            SERVICES
          </Link>
        </li>
        <li className="flex items-center w-18">
          <Link
            to={"/aboutUs"}
            className={`grow text-center ${location.pathname === "/aboutUs" ? "text-blue-600" : "text-gray-600"}`}
          >
            ABOUT US
          </Link>
        </li>
        <li className="flex items-center w-18">
          <Link
            to={"/contact"}
            className={`grow text-center ${location.pathname === "/contact" ? "text-blue-600" : "text-gray-600"}`}
          >
            CONTACT
          </Link>
        </li>
        {/* <li className="flex items-center">
          <Button
            variant="secondary"
            className="px-1"
            onClick={migrateCatalogToFirebase}
          >
            LOCAL TO DB
          </Button>
        </li>
         <li className="flex items-center">
          <Button
            variant="secondary"
            className="px-1"
            onClick={exportCatalogToJson}
          >
            DB TO LOCAL
          </Button>
        </li> */}
        <li
          className={`${!currentUser ? "flex items-center w-18" : "hidden"}`}
        >
          <Link
            to={"/login"}
            className={`grow text-center ${location.pathname === "/login" ? "text-blue-600" : "text-gray-600"}`}
          >
            LOGIN
          </Link>
        </li>
        <li
          className={`${!currentUser ? "hidden" : "group relative cursor-pointer w-18"}`}
        >
          <div className={`grow text-center overflow-hidden ${isAdmin ? "text-blue-600" : "text-gray-600"}`}>{displayUser}</div>
          <ul className="hidden group-hover:flex absolute flex-col gap-2 top-full bg-slate-200 shadow-md border border-gray-400 p-2 min-w-30 z-50 rounded-xl">
            <li className="text-blue-600 italic p-0.5">{displayUserEmail}</li>
            <li className="flex items-center">
              <Link
                to={"/favorites"}
                className={`grow text-center ${location.pathname === "/favorites" ? "text-blue-600" : "text-gray-600"}`}
              >
                <div className="flex gap-0.5">
                  <FavoriteIcon className="w-5 h-5" />
                  <span className="border border-gray-400 rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center font-semibold text-xxs bg-gray-200">
                    {getFavoriteQuantity()}
                  </span>
                </div>
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
            <li className="p-0.5">
              <Button
                onClick={logout}
                variant="primary"
                className="rounded-sm p-1 text-xxs"
              >
                Logout
              </Button>
            </li>
          </ul>
        </li>
        <li
          className={`${!currentUser ? "flex items-center w-18" : "hidden"}`}
        >
          <Link
            to={"/register"}
            className={`grow text-center ${location.pathname === "/register" ? "text-blue-600" : "text-gray-600"}`}
          >
            REGISTER
          </Link>
        </li>
        <li className={`${typeUser !== "admin" && "hidden"}`}>
          <Link
            to={"/dashboard"}
            className={`${location.pathname === "/dashboard" ? "text-blue-600" : "text-gray-600"}`}
          >
            DASHBOARD
          </Link>
        </li>
        {/* <li className="flex items-center">
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
        </li> */}
        <li
          className={`${displayUserEmail && typeUser !== "admin" ? "flex items-center w-18" : "hidden"}`}
        >
          <Link
            to={"/cart"}
            className={`grow text-center ${location.pathname === "/cart" ? "text-blue-600" : "text-gray-600"}`}
          >
            <div className="flex gap-0.5 justify-center">
              <CartIcon className="w-5 h-5" />
              <span className="border border-gray-400 rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center font-semibold text-xxs bg-gray-200">
                {getCartQuantity()}
              </span>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
