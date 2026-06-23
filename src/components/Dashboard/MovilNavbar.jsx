import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ModalBox } from "../common/ModalBox";
import { useMenu } from "../../context/MenuContext";

export const MovilNavbar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const { menuChange } = useMenu();

  const handleLogout = async () => {
    try {
      await logout(); // Esperamos a que Firebase confirme la salida
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <nav className="grow md:hidden px-2">
      <ul className="p-2 border border-gray-400 rounded-sm m-2 text-sm flex flex-col gap-2 bg-green-300">
        {/* MENU HOME */}
        <li className="flex items-center w-full">
          <Link
            onClick={menuChange}
            to={"/"}
            className={`block w-full py-2 text-left pl-4 ${location.pathname === "/" ? "text-blue-600 font-medium" : "text-gray-600"}`}
          >
            HOME
          </Link>
        </li>

        {/* MENU DASHBOARD */}
        <li className="flex items-center w-full">
          <Link
            onClick={menuChange}
            to={"/dashboard"}
            className={`block w-full py-2 text-left pl-4 ${location.pathname === "/dashboard" ? "text-blue-600 font-medium" : "text-gray-600"}`}
          >
            DASHBOARD
          </Link>
        </li>

        {/* MENU ADD PRODUCT */}
        <li className="flex items-center w-full">
          <Link
            onClick={menuChange}
            to={"/dashboard/add-product"}
            className={`block w-full py-2 text-left pl-4 ${location.pathname === "/dashboard/add-product" ? "text-blue-600 font-medium" : "text-gray-600"}`}
          >
            ADD PRODUCT
          </Link>
        </li>

        {/* LOGOUT */}
        <li className="flex items-center w-full mt-2 border-t border-gray-200 pt-2">
          <ModalBox
            onConfirm={handleLogout}
            prevActionButton={menuChange} 
            classNameButton="block w-full py-2 text-left pl-4 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            operationType="Logout"
          >
            LOGOUT
          </ModalBox>
        </li>
      </ul>
    </nav>
  );
};