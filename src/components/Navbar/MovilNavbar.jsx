import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useFavorite } from "../../context/FavoriteContext";
import { CartIcon, FavoriteIcon } from "../Icons/index";
import { useAuth } from "../../context/AuthContext";
import { ModalBox } from "../common/ModalBox";
import { useMenu } from "../../context/MenuContext";
import { NavbarProdCategContent } from "./NavbarProdCategContent";

export const MovilNavbar = () => {
  const location = useLocation();
  const { getCartQuantity } = useCart();
  const { getFavoriteQuantity } = useFavorite();
  const { user, logout } = useAuth();

  const currentUser = user ? user.uid : null;
  const displayUserEmail = user?.email ? user.email : "";
  const typeUser = user && user.rol;
  const isAdmin = user?.rol === "admin";
  const { menuChange } = useMenu();

  const resetMenuView = () => {
    menuChange();
  };

  const handleLogout = async () => {
    try {
      await logout(); // Esperamos a que Firebase confirme la salida
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const logOff = () => {
    handleLogout();
    resetMenuView();
  };

  return (
    <nav className="grow md:hidden px-2">
      <ul className="p-2 border border-gray-400 rounded-sm m-2 text-sm flex flex-col gap-2">
        {/* MENU HOME */}
        <li className="flex items-center w-full">
          <Link
            onClick={resetMenuView}
            to={"/"}
            className={`block w-full py-2 text-left pl-4 ${location.pathname === "/" ? "text-blue-600" : "text-gray-600"}`}
          >
            HOME
          </Link>
        </li>

        {/* MENU PRODUCTS */}
        <li className="flex items-center w-full">
          <Link
            onClick={resetMenuView}
            to={"/products"}
            className={`block w-full py-2 text-left pl-4 ${location.pathname.includes("/products") ? "text-blue-600" : "text-gray-600"}`}
          >
            PRODUCTS
          </Link>
        </li>
        <li className="px-1.5">
          <NavbarProdCategContent
            listMenuView={true}
            resetMenuView={resetMenuView}
          />
        </li>

        {/* MENU SERVICES */}
        <li className="flex items-center w-full">
          <Link
            onClick={resetMenuView}
            to={"/services"}
            className={`block w-full py-2 text-left pl-4 ${location.pathname === "/services" ? "text-blue-600" : "text-gray-600"}`}
          >
            SERVICES
          </Link>
        </li>

        {/* MENU ABOUT US */}
        <li className="flex items-center w-full">
          <Link
            onClick={resetMenuView}
            to={"/aboutUs"}
            className={`block w-full py-2 text-left pl-4 ${location.pathname === "/aboutUs" ? "text-blue-600" : "text-gray-600"}`}
          >
            ABOUT US
          </Link>
        </li>

        {/* MENU CONTACT */}
        <li className="flex items-center w-full">
          <Link
            onClick={resetMenuView}
            to={"/contact"}
            className={`block w-full py-2 text-left pl-4 ${location.pathname === "/contact" ? "text-blue-600" : "text-gray-600"}`}
          >
            CONTACT
          </Link>
        </li>

        {/* MENU DASHBOARD */}
        {typeUser === "admin" && (
          <li className="flex items-center w-full">
            <Link
              onClick={resetMenuView}
              to={"/dashboard"}
              className={`block w-full py-2 text-left pl-4 ${location.pathname === "/dashboard" ? "text-blue-600" : "text-gray-600"}`}
            >
              DASHBOARD
            </Link>
          </li>
        )}

        {/* MENU LOGIN */}
        {!currentUser && (
          <li className="flex items-center w-full">
            <Link
              onClick={resetMenuView}
              to={"/login"}
              className={`block w-full py-2 text-left pl-4 ${location.pathname === "/login" ? "text-blue-600" : "text-gray-600"}`}
            >
              LOGIN
            </Link>
          </li>
        )}

        {/* MENU USER (LOGUEADO) */}
        {currentUser && (
          // <li className="w-full bg-slate-100 border-l-4 border-blue-500 rounded-xl p-3">
          <li className={`w-full border-l-4 border-blue-500 rounded-xl p-3 ${isAdmin ? "bg-green-200" : "bg-slate-200"}`}>
            <div className={`font-bold text-blue-600 mb-2 pl-2`}>
              {displayUserEmail}
            </div>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  onClick={resetMenuView}
                  to={"/favorites"}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >
                  <FavoriteIcon className="w-5 h-5" />
                  <span>FAVORITES ({getFavoriteQuantity()})</span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={resetMenuView}
                  to={"/cart"}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >
                  <CartIcon className="w-5 h-5" />
                  <span>CART ({getCartQuantity()})</span>
                </Link>
              </li>
              <li>
                <ModalBox
                  onConfirm={logOff}
                  variantButton="primary"
                  classNameButton="w-full py-1 text-xs"
                  operationType="Logout"
                  // prevActionButton={menuChange}
                >
                  Logout
                </ModalBox>
              </li>
            </ul>
          </li>
        )}

        {/* MENU REGISTER */}
        {!currentUser && (
          <li className="flex items-center w-full">
            <Link
              onClick={resetMenuView}
              to={"/register"}
              className={`block w-full py-2 text-left pl-4 ${location.pathname === "/register" ? "text-blue-600" : "text-gray-600"}`}
            >
              REGISTER
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
