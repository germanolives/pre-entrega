import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSource } from "../../context/SourceContext"; // Corregí la ruta
import { Button } from "../../components/common/Button";
import { DatabaseIcon } from "../Icons/index";
import { useProducts } from "../../context/ProductsContext";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";

export const Navbar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const { nameSource, changeSource } = useSource();
  const { getProductsQuantity, getTotalStock } = useProducts();
  const menuRef = useRef(null);
  const [sourceMenuView, setSourceMenuView] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sourceMenuView &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setSourceMenuView(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sourceMenuView]);

  return (
    <nav className="hidden md:block px-2" ref={menuRef}>
      <ul className="flex justify-evenly items-center rounded-sm border border-gray-400 text-xs">
        {/* MENU HOME */}
        <li className="flex items-center">
          <Link to={"/"} className="text-gray-600">
            HOME
          </Link>
        </li>

        {/* MENU INVENTORY */}
        <li className="flex items-center">
          <span
            className={`w-50 text-right ${location.pathname === "/dashboard" ? "text-blue-600" : location.pathname.startsWith("/dashboard/edit") ? "text-green-600" : "text-blue-600"}`}
          >
            {`${location.pathname === "/dashboard" ? `[ ${getProductsQuantity()} PRODS - ${getTotalStock()} UNITS ]` : location.pathname.startsWith("/dashboard/edit") ? "[ EDITING PRODUCT ]" : "[ ADDING PRODUCT ]"}`}
          </span>
        </li>

        {/* MENU ADD PRODUCT */}
        <li className="flex items-center">
          <Link to={"/dashboard/add-product"} className="text-gray-600">
            ADD PRODUCT
          </Link>
        </li>

        {/* MENU SOURCE */}
        <li className="flex items-center flex-col relative">
          <div
            className="flex gap-0.5 text-blue-600 cursor-pointer"
            onClick={() => setSourceMenuView(!sourceMenuView)}
          >
            <DatabaseIcon className="w-4 h-4" />
            <span className="border border-gray-400 rounded-full h-4 w-10 px-1.5 flex items-center justify-center font-semibold text-xxs bg-gray-200">
              {nameSource}
            </span>
          </div>

          <ul
            className={`${sourceMenuView ? "flex" : "hidden"} absolute top-full mt-2 bg-slate-200 shadow-md border border-gray-400 p-2 min-w-30 z-50 rounded-xl flex-col`}
          >
            {["LOCAL", "DB", "API"].map((source) => (
              <li key={source} className="p-0.5">
                <Button
                  className={`cursor-pointer font-normal ${nameSource === source ? "text-blue-600" : "text-gray-600"}`}
                  variant="cristal"
                  onClick={() => {
                    changeSource(source.toLowerCase());
                    setSourceMenuView(false);
                  }}
                >
                  {source}
                </Button>
              </li>
            ))}
          </ul>
        </li>

        {/* MENU LOGOUT */}
        <li className="flex items-center">
          <Link to={"/"} className="text-gray-600" onClick={logout}>
            LOGOUT
          </Link>
        </li>

        {/* MENU DASHBOARD */}
        <li className="flex items-center">
          <Link
            to={"/dashboard"}
            className={`${location.pathname.startsWith("/dashboard") ? "text-blue-600" : "text-gray-600"}`}
          >
            DASHBOARD
          </Link>
        </li>
      </ul>
    </nav>
  );
};
