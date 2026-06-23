import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import { useAuth } from "../../context/AuthContext";
import { ModalBox } from "../../components/common/ModalBox";

export const Navbar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const { getProductsQuantity, getTotalStock } = useProducts();

  const handleLogout = async () => {
    try {
      await logout(); // Esperamos a que Firebase confirme la salida
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <nav className="hidden md:block px-2">
      <ul className="flex justify-evenly items-center rounded-sm border border-gray-400 text-xs h-4.5 bg-green-300">
        {/* MENU HOME */}
        <li className="flex items-center">
          <Link
            to={"/"}
            className={`${location.pathname === "/" ? "text-blue-600 font-medium" : "text-gray-600"}`}
          >
            HOME
          </Link>
        </li>

        {/* MENU DASHBOARD (Se pone azul si está parado en la tabla general) */}
        <li className="flex items-center">
          <Link
            to={"/dashboard"}
            className={`${location.pathname === "/dashboard" ? "text-blue-600 font-medium" : "text-gray-600"}`}
          >
            DASHBOARD
          </Link>
        </li>

        {/* MENU ADD PRODUCT */}
        <li className="flex items-center">
          <Link
            to={"/dashboard/add-product"}
            className={`${location.pathname === "/dashboard/add-product" ? "text-blue-600 font-medium" : "text-gray-600"}`}
          >
            ADD PRODUCT
          </Link>
        </li>

        {/* MENU LOGOUT */}
        <li className="flex items-center">
          <ModalBox
            operationType="Logout"
            onConfirm={handleLogout}
            classNameButton="text-xs text-gray-600 font-normal cursor-pointer hover:text-blue-600 transition-colors"
          >
            LOGOUT
          </ModalBox>
        </li>

        {/* MENU INVENTORY (Métricas reales o indicador dinámico según la sección) */}
        <li className="flex items-center">
          <span
            className={`w-50 text-right ${
              location.pathname === "/dashboard" 
                ? "text-blue-600 font-medium" 
                : location.pathname.startsWith("/dashboard/edit") 
                ? "text-green-600 font-medium" 
                : "text-blue-600 font-medium"
            }`}
          >
            {location.pathname === "/dashboard" 
              ? `[ ${getProductsQuantity()} PRODS - ${getTotalStock()} UNITS ]` 
              : location.pathname.startsWith("/dashboard/edit") 
              ? "[ EDITING PRODUCT ]" 
              : location.pathname === "/dashboard/add-product"
              ? "[ ADDING PRODUCT ]"
              : "" // Si no está en el área administrativa, no dibuja la etiqueta de stock
            }
          </span>
        </li>
      </ul>
    </nav>
  );
};