import { Link } from "react-router-dom";
import { NavbarProdCategContent } from "./NavbarProdCategContent";
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useFavorite } from "../../context/FavoriteContext";
import { CartIcon, FavoriteIcon } from "../Icons/index";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../common/Button";
import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "../Icons/index";



export const Navbar = () => {
  const menuRef = useRef(null);
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
  const isAdmin = user && user.rol === "admin";
  const [listMenuView, setListMenuView] = useState(false);

  const changeListMenuView = () => {
    setListMenuView((prev) => !prev);
    setUserMenuView(false);
  };
  const [userMenuView, setUserMenuView] = useState(false);
  const changeUserMenuView = () => {
    setUserMenuView((prev) => !prev);
    setListMenuView(false);
  };

const resetMenuView = () => {
  setListMenuView(false);
  setUserMenuView(false);
}

const logOff = () => {
  logout();
  resetMenuView();
}

  useEffect(() => {
    const handleClickOutside = (event) => {
      if ((listMenuView || userMenuView) && menuRef.current && !menuRef.current.contains(event.target)) {
        resetMenuView();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [listMenuView, userMenuView]);


  return (
    <nav className="hidden md:block px-2" ref={menuRef}>
      <ul className="flex justify-evenly items-center rounded-sm border border-gray-400 text-xs">

        {/* MENU HOME */}
        <li className="flex items-center w-20">
          <Link
            onClick={resetMenuView}
            to={"/"}
            className={`grow text-center ${location.pathname === "/" ? "text-blue-600" : "text-gray-600"}`}
          >
            HOME
          </Link>
        </li>


        {/* MENU PRODUCTS */}
        <li className="flex items-center w-20">
          <div className="flex items-center relative group">
            <Link
              onClick={resetMenuView}
              to={"/products"}
              className={`grow text-center ${location.pathname.includes("/products") ? "text-blue-600" : "text-gray-600"}`}
            >
              PRODUCTS
            </Link>
            <Button
              className={`grow text-center ${location.pathname === "/products" ? "text-blue-600" : "text-gray-600"}`}
              variant="cristal"
              onClick={changeListMenuView}
            >
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform duration-300 relative ${listMenuView ? "rotate-180 text-blue-600" : "text-gray-600"}`}
              />
            </Button>
            <NavbarProdCategContent
              listMenuView={listMenuView}
              resetMenuView={resetMenuView}
            />
          </div>
        </li>


        {/* MENU SERVICES */}
        <li className="flex items-center w-20">
          <Link
            onClick={resetMenuView}
            to={"/services"}
            className={`grow text-center ${location.pathname === "/services" ? "text-blue-600" : "text-gray-600"}`}
          >
            SERVICES
          </Link>
        </li>


        {/* MENU ABOUT US */}
        <li className="flex justify-between items-center w-20">
          <Link
            onClick={resetMenuView}
            to={"/aboutUs"}
            className={`grow text-center ${location.pathname === "/aboutUs" ? "text-blue-600" : "text-gray-600"}`}
          >
            ABOUT US
          </Link>
        </li>


        {/* MENU CONTACT */}
        <li className="flex items-center w-20">
          <Link
            onClick={resetMenuView}
            to={"/contact"}
            className={`grow text-center ${location.pathname === "/contact" ? "text-blue-600" : "text-gray-600"}`}
          >
            CONTACT
          </Link>
        </li>


        {/* MENU LOGIN (VISIBLE CUANDO NO SE ESTÁ CON USUARIO E INVISIBLE CUANDO USER ESTÁ LOGUEADO) */}
        <li className={`${!currentUser ? "flex items-center w-20" : "hidden"}`}>
          <Link
            onClick={resetMenuView}
            to={"/login"}
            className={`grow text-center ${location.pathname === "/login" ? "text-blue-600" : "text-gray-600"}`}
          >
            LOGIN
          </Link>
        </li>


        {/* MENU USER (VISIBLE CUANDO SE ESTÁ CON USUARIO LOGUEADO E INVISIBLE CUANDO NO SE ESTÁ LOGUEADO) */}
        <li className={`${!currentUser ? "hidden" : "items-center w-20"}`}>
          <div className="flex items-center relative group" ref={menuRef}>
            <div
              className={`grow text-center overflow-hidden ${isAdmin ? "text-blue-600" : "text-gray-600"}`}
            >
              {displayUser}
            </div>
            <Button
              className={`grow text-center ${location.pathname === "/products" ? "text-blue-600" : "text-gray-600"}`}
              variant="cristal"
              onClick={changeUserMenuView}
            >
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform duration-300 relative ${userMenuView ? "rotate-180 text-blue-600" : "text-gray-600"}`}
              />
            </Button>
            <ul className={`${userMenuView ? "flex absolute flex-col gap-2 top-full left-0 bg-slate-200 shadow-md border border-gray-400 p-2 min-w-30 z-50 rounded-xl" : "hidden"}`}>
              <li className="text-blue-600 italic p-0.5">{displayUserEmail}</li>
              <li className="flex items-center">
                <Link
                  onClick={resetMenuView}
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
                  onClick={resetMenuView}
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
                  onClick={logOff}
                  variant="primary"
                  className="rounded-sm p-1 text-xxs"
                >
                  Logout
                </Button>
              </li>
            </ul>
          </div>
        </li>


        {/* MENU REGISTER (VISIBLE CUANDO NO SE ESTÁ CON USUARIO E INVISIBLE CUANDO SE ESTÁ LOGUEADO) */}
        <li className={`${!currentUser ? "flex items-center w-20" : "hidden"}`}>
          <Link
            onClick={resetMenuView}
            to={"/register"}
            className={`grow text-center ${location.pathname === "/register" ? "text-blue-600" : "text-gray-600"}`}
          >
            REGISTER
          </Link>
        </li>


        {/* MENU DASHBOARD (VISIBLE CUANDO ADMIN ESTÁ LOGUEADO E INVISIBLE PARA TODOS LOS OTROS CASOS) */}
        <li className={`${typeUser !== "admin" && "hidden"}`}>
          <Link
            to={"/dashboard"}
            className={`${location.pathname === "/dashboard" ? "text-blue-600" : "text-gray-600"}`}
          >
            DASHBOARD
          </Link>
        </li>


        {/* MENU CART (VISIBLE CON USUARIO LOGUEADO E INVISIBLE CUANDO NO SE ESTÁ LOGUEADO) */}
        <li
          className={`${displayUserEmail && typeUser !== "admin" ? "flex items-center w-20" : "hidden"}`}
        >
          <Link
            onClick={resetMenuView}
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
