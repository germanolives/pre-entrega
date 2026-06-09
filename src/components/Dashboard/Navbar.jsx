import { SearchbarContainer } from "./SearchbarContainer";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useFavorite } from "../../context/FavoriteContext";
import { useSource } from "../..//context/SourceContext";
import { useSearch } from "../../context/SearchContext";
import { Button } from "../../components/common/Button";

export const Navbar = () => {
  const location = useLocation();
  const { getCartQuantity } = useCart();
  const { getFavoriteQuantity } = useFavorite();
  const { nameSource, changeSource } = useSource();
  const { search, changeSearch, selectedField } = useSearch();
  return (
    <nav className="hidden md:grid grid-rows-[2fr_1fr] grow">
      <SearchbarContainer />
      <ul className="flex justify-between items-center border-t border-gray-400 text-xs">
        <div className="flex flex-row items-center px-6">
          {search.map((item) => (
            <li className="">
              {" "}
              <Button
                onClick={() => changeSearch(item.field)}
                variant={`${selectedField.field === item.field ? "primary" : "secondary"}`}
                className="px-2 py-1 rounded-sm w-24"
              >
                {item.field.toUpperCase()}
              </Button>
            </li>
          ))}
        </div>

        <li className="flex items-center">
          <Link
            to={"/"}
            className={`${location.pathname === "/dashboard" ? "text-blue-600" : "text-gray-600"}`}
          >
            HOME
          </Link>
        </li>
        <li className="flex items-center">
          <Link
            to={"/dashboard/add-product"}
          >
            ADD
          </Link>
        </li>
      </ul>
    </nav>
  );
};
