import { Link } from "react-router-dom";
import { formatSlug } from "../../utils/formatSlug";
import { useLocation } from "react-router-dom";

export const NavProdCategList = ({ data, listMenuView, resetMenuView }) => {
  const sortedData = [...data].sort((a, b) => a.localeCompare(b));
  const location = useLocation();

  return (
    <ul
      className={`${
        listMenuView 
          ? "flex flex-col gap-2 bg-slate-200 p-2 min-w-30 z-50 rounded-xl md:absolute md:top-full md:left-0 md:shadow-md md:border md:border-gray-400" 
          : "hidden"
      }`}
    >
      {sortedData.map((item) => {
        const path = `/products/${formatSlug(item)}`;
        return (
          <li key={item} className="p-0.5">
            <Link
              onClick={resetMenuView}
              to={path}
              className={`flex grow ${location.pathname === path ? "text-blue-600" : "text-gray-600"}`}
            >
              {item.toUpperCase()}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};