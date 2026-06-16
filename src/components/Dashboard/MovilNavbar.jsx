import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSource } from "../../context/SourceContext";
import { Button } from "../common/Button";
import { DatabaseIcon } from "../Icons/index";
import { useAuth } from "../../context/AuthContext";
import { ModalBox } from "../common/ModalBox";

export const MovilNavbar = ({ menuChange }) => {
  const location = useLocation();
  const { nameSource, changeSource } = useSource();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // Esperamos a que Firebase confirme la salida
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const handleAction = (actionFn) => {
    actionFn();
    menuChange();
  };

  return (
    <nav className="grow md:hidden px-2">
      <ul className="p-2 border border-gray-400 rounded-sm m-2 text-sm flex flex-col gap-2">
        {/* MENU HOME */}
        <li className="flex items-center w-full">
          <Link
            onClick={menuChange}
            to={"/"}
            className={`block w-full py-2 text-left pl-4 ${location.pathname === "/" ? "text-blue-600" : "text-gray-600"}`}
          >
            HOME
          </Link>
        </li>

        {/* MENU DASHBOARD */}
        <li className="flex items-center w-full">
          <Link
            onClick={menuChange}
            to={"/dashboard"}
            className={`block w-full py-2 text-left pl-4 ${location.pathname.startsWith("/dashboard") ? "text-blue-600" : "text-gray-600"}`}
          >
            DASHBOARD
          </Link>
        </li>

        {/* MENU ADD PRODUCT */}
        <li className="flex items-center w-full">
          <Link
            onClick={menuChange}
            to={"/dashboard/add-product"}
            className={`block w-full py-2 text-left pl-4 ${location.pathname === "/dashboard/add-product" ? "text-blue-600" : "text-gray-600"}`}
          >
            ADD PRODUCT
          </Link>
        </li>

        {/* MENU SOURCE*/}
        <li className="w-full mt-2 border-t border-gray-200 pt-2">
          <span className="block text-gray-400 text-xs pl-4 mb-2">
            DATA SOURCE:
          </span>
          <div className="flex flex-col gap-1">
            {["LOCAL", "DB", "API"].map((source) => (
              <Button
                key={source}
                className={`flex items-center gap-3 w-full py-2 pl-4 text-left font-normal ${nameSource === source ? "text-blue-600" : "text-gray-600"}`}
                variant="cristal"
                onClick={() =>
                  handleAction(() => changeSource(source.toLowerCase()))
                }
              >
                <DatabaseIcon className="w-5 h-5" />
                <span>{source}</span>
              </Button>
            ))}
          </div>
        </li>

        {/* LOGOUT */}
        <li className="flex items-center w-full mt-2 border-t border-gray-200 pt-2">
          <ModalBox
            onConfirm={handleLogout}
            prevActionButton={menuChange} 
            classNameButton="block w-full py-2 text-left pl-4 text-gray-600 hover:text-blue-600 transition-colors"
            operationType="Logout"
          >
            LOGOUT
          </ModalBox>
        </li>
      </ul>
    </nav>
  );
};
