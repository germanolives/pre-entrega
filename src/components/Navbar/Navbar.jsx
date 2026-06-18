import { Link } from "react-router-dom";
import { NavbarProdCategContent } from "./NavbarProdCategContent";
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useFavorite } from "../../context/FavoriteContext";
import { CartIcon, FavoriteIcon } from "../Icons/index";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../common/Button";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDownIcon } from "../Icons/index";
import { ModalBox } from "../common/ModalBox";

export const Navbar = () => {
  const menuRef = useRef(null);
  const location = useLocation();
  const { getCartQuantity } = useCart();
  const { getFavoriteQuantity } = useFavorite();
  const { user, loading, logout } = useAuth();
  const [listMenuView, setListMenuView] = useState(false);
  const [userMenuView, setUserMenuView] = useState(false);

  const resetMenuView = useCallback(() => {
    setListMenuView(false);
    setUserMenuView(false);
  }, []);

  useEffect(() => {
    resetMenuView();
  }, [user?.uid, resetMenuView]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (listMenuView || userMenuView) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        resetMenuView();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [listMenuView, userMenuView, resetMenuView]);

  if (loading) {
    return <nav className="mx-2 h-4.5 border border-gray-400 rounded-sm animate-pulse bg-slate-300" />;
  }
  const currentUser = user ? user.uid : null;
  const displayUser = user?.email
    ? user.email.split("@")[0].toUpperCase()
    : "GUEST";
  const displayUserEmail = user?.email ? user.email : "";
  const typeUser = user && user.rol;
  const isAdmin = user?.rol === 'admin';

  const changeListMenuView = () => {
    setListMenuView((prev) => !prev);
    setUserMenuView(false);
  };
  const changeUserMenuView = () => {
    setUserMenuView((prev) => !prev);
    setListMenuView(false);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Esperamos a que Firebase confirme la salida
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const logOff = () => {
    resetMenuView(false);
    handleLogout();
  };

  
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
        {!currentUser && (
          <li className="flex items-center w-20">
            <Link
              onClick={resetMenuView}
              to={"/login"}
              className={`grow text-center ${location.pathname === "/login" ? "text-blue-600" : "text-gray-600"}`}
            >
              LOGIN
            </Link>
          </li>
        )}

        {/* MENU USER (VISIBLE CUANDO SE ESTÁ CON USUARIO LOGUEADO E INVISIBLE CUANDO NO SE ESTÁ LOGUEADO) */}
        {currentUser && (
          <li className="flex items-center w-20">
            <div className="flex items-center relative group">
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
              { userMenuView && (<ul
                className={`flex absolute flex-col gap-2 top-full left-0 shadow-md border border-gray-400 p-2 min-w-30 z-50 rounded-xl ${isAdmin ? "bg-green-200" : "bg-slate-200"}`}
              >
                <li className="text-blue-600 italic p-0.5">
                  {displayUserEmail}
                </li>
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
                  <ModalBox
                    onConfirm={logOff}
                    variantButton="primary"
                    classNameButton="rounded-sm p-1 text-xxs"
                    prevActionButton={resetMenuView}
                    operationType="Logout"
                  >
                    Logout
                  </ModalBox>
                </li>
              </ul>)}
            </div>
          </li>
        )}

        {/* MENU REGISTER (VISIBLE CUANDO NO SE ESTÁ CON USUARIO E INVISIBLE CUANDO SE ESTÁ LOGUEADO) */}
        {!currentUser && (
          <li className="flex items-center w-20">
            <Link
              onClick={resetMenuView}
              to={"/register"}
              className={`grow text-center ${location.pathname === "/register" ? "text-blue-600" : "text-gray-600"}`}
            >
              REGISTER
            </Link>
          </li>
        )}

        {/* MENU DASHBOARD (VISIBLE CUANDO ADMIN ESTÁ LOGUEADO E INVISIBLE PARA TODOS LOS OTROS CASOS) */}
        {typeUser === "admin" && (
          <li className="flex items-center w-20">
            <Link
              onClick={resetMenuView}
              to={"/dashboard"}
              className={`grow text-center ${location.pathname === "/dashboard" ? "text-blue-600" : "text-gray-600"}`}
            >
              DASHBOARD
            </Link>
          </li>
        )}


        {/* MENU CART (VISIBLE CON USUARIO LOGUEADO E INVISIBLE CUANDO NO SE ESTÁ LOGUEADO) */}
        {displayUserEmail && typeUser !== "admin" && (
          <li className="flex items-center w-20">
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
        )}
      </ul>
    </nav>
  );
};
