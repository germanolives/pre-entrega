import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSource } from "../..//context/SourceContext";
import { Button } from "../../components/common/Button";
import { DatabaseIcon } from "../Icons/index";
import { useProducts } from "../../context/ProductsContext";

export const Navbar = () => {
  const location = useLocation();
  const { nameSource, changeSource } = useSource();
  const { getProductsQuantity, getTotalStock } = useProducts();
  return (
    <nav className="hidden md:flex grow justify-center pt-2">
      <ul className="flex justify-evenly grow items-center border-t border-gray-400 text-xs gap-4">
        <li className="flex items-center">
          <Link
            to={"/"}
            className="text-gray-600"
          >
            HOME
          </Link>
        </li>
        <li className="flex items-center">
          <Link
            to={"/dashboard"}
            className={`${location.pathname.startsWith("/dashboard") ? "text-blue-600" : "text-gray-600"}`}
  
          >
            DASHBOARD
          </Link>
        </li>
        <li className="flex items-center">
          <Link to={"/dashboard/add-product"} className="text-gray-600">
            ADD PRODUCT
          </Link>
        </li>
        <li className="flex items-center flex-col group relative">
          <div className="flex gap-0.5">
            <DatabaseIcon className="w-5 h-5" />
            <span className="border border-gray-400 rounded-full h-5 w-10 px-1.5 flex items-center justify-center font-semibold text-xxs bg-gray-200">
              {nameSource}
            </span>
          </div>
          <ul className="hidden group-hover:block absolute top-full bg-slate-200 shadow-md border border-gray-400 p-2 min-w-30 z-50 rounded-xl">
            <li className="p-0.5">
              <Button
                className={`cursor-pointer font-normal ${nameSource === "LOCAL" ? "text-blue-600" : "text-gray-600"}`}
                variant="cristal"
                onClick={() => changeSource("local")}
              >
                LOCAL
              </Button>
            </li>
            <li className="p-0.5">
              <Button
                className={`cursor-pointer font-normal ${nameSource === "DB" ? "text-blue-600" : "text-gray-600"}`}
                variant="cristal"
                onClick={() => changeSource("db")}
              >
                DB
              </Button>
            </li>
            <li className="p-0.5">
              <Button
                className={`cursor-pointer font-normal ${nameSource === "API" ? "text-blue-600" : "text-gray-600"}`}
                variant="cristal"
                onClick={() => changeSource("api")}
              >
                API
              </Button>
            </li>
          </ul>
        </li>
        <li className="flex items-center">
          <Link
            to={"/"}
            className={`${location.pathname === "/" ? "text-blue-600" : "text-gray-600"}`}
          >
            LOGOUT
          </Link>
        </li>

        <li className="flex items-center">
          <span
            className={`w-50 text-right ${location.pathname === "/dashboard" ? "text-blue-600" : location.pathname.startsWith("/dashboard/edit") ? "text-green-600" : "text-blue-600"}`}
          >
            {`${location.pathname === "/dashboard" ? `[ ${getProductsQuantity()} PRODS - ${getTotalStock()} UNITS ]` : location.pathname.startsWith("/dashboard/edit") ? "[ EDITING PRODUCT ]" : "[ ADDING PRODUCT ]"}`}
          </span>
        </li>
      </ul>
    </nav>
  );
};
