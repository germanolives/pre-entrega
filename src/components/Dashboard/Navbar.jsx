import { SearchbarContainer } from "./SearchbarContainer";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useFavorite } from "../../context/FavoriteContext";
import { useSource } from "../..//context/SourceContext";
import { useSearch } from "../../context/SearchContext";
import { Button } from "../../components/common/Button";
import { DatabaseIcon } from "../Icons/index";
import { useProducts } from "../../context/ProductsContext";

export const Navbar = () => {
  const location = useLocation();
  const { nameSource, changeSource } = useSource();
  const { search, changeSearch, selectedField } = useSearch();
  const { getProductsQuantity, getTotalStock } = useProducts();
  return (
    <nav className="hidden md:grid grid-rows-[2fr_1fr] grow">
      <SearchbarContainer />
      <ul className="flex justify-between items-center border-t border-gray-400 text-xs gap-4">
        <li className="flex items-center  border border-gray-400 rounded-sm ml-2.5">
          <span className="text-gray-500 text-xs ml-1">SEARCH BY:</span>
          <ul className="flex flex-row items-center px-0.5">
            {search.map((item) => (
              <li className="">
                {" "}
                <Button
                  onClick={() => changeSearch(item.field)}
                  variant={`${selectedField.field === item.field ? "primary" : "secondary"}`}
                  className="rounded-sm w-12  mx-1"
                >
                  {item.field.toUpperCase().slice(0, 3)}
                </Button>
              </li>
            ))}
          </ul>
        </li>

        <li className="flex items-center">
          <Link
            to={"/dashboard"}
            // className={`${location.pathname.startsWith("/dashboard") ? "text-blue-600" : "text-gray-600"}`}
            className="text-gray-600"
          >
            DASHBOARD
          </Link>
        </li>

        <li className="flex items-center flex-col group relative">
          <div className="flex gap-0.5">
            <DatabaseIcon className="w-5 h-5" />
            <span className="border border-gray-400 rounded-full h-5 w-10 px-1.5 flex items-center justify-center font-semibold text-xxs bg-gray-200">
              {nameSource()}
            </span>
          </div>
          <ul className="hidden group-hover:block absolute top-full bg-slate-200 shadow-md border border-gray-400 p-2 min-w-30 z-50 rounded-xl">
            <li className="p-0.5">
              <Button
                className={`cursor-pointer font-normal ${nameSource() === "LOCAL" ? "text-blue-600" : "text-gray-600"}`}
                variant="cristal"
                onClick={() => changeSource("local")}
              >
                LOCAL
              </Button>
            </li>
            <li className="p-0.5">
              <Button
                className={`cursor-pointer font-normal ${nameSource() === "DB" ? "text-blue-600" : "text-gray-600"}`}
                variant="cristal"
                onClick={() => changeSource("db")}
              >
                DB
              </Button>
            </li>
            <li className="p-0.5">
              <Button
                className={`cursor-pointer font-normal ${nameSource() === "API" ? "text-blue-600" : "text-gray-600"}`}
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
            LOG OFF
          </Link>
        </li>

        <li className="flex items-center justify-center rounded-sm text-white font-semibold bg-blue-900 px-1">
          <Link to={"/dashboard/add-product"}>ADD PRODUCT</Link>
        </li>
        <li className="flex items-center">
          <span
            // to={"/dashboard"}
            className={`w-50 text-right mr-21 ${location.pathname === "/dashboard" ? "text-blue-600" : location.pathname.startsWith("/dashboard/edit") ? "text-green-600" : "text-blue-600"}`}
          >
            {`${location.pathname === "/dashboard" ? `[ ${getProductsQuantity()} PRODS - ${getTotalStock()} UNITS ]` : location.pathname.startsWith("/dashboard/edit") ? "[ EDITING PRODUCT ]" : "[ ADDING PRODUCT ]"}`}
          </span>
        </li>
      </ul>
    </nav>
  );
};
