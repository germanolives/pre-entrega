import { Link } from "react-router-dom";
import { formatSlug } from "../../utils/formatSlug";
import { useLocation } from "react-router-dom";

export const NavProdCategList = ({ data }) => {
  const sortedData = [...data].sort((a, b)=>a.localeCompare(b));
  const location = useLocation();
  return (
    <ul className="hidden group-hover:block absolute top-full bg-slate-200 shadow-md border border-gray-400 p-2 min-w-30 z-50 rounded-xl">
      {sortedData.map((item) => (
        <li key={item} className="p-0.5">
          <Link
            to={`/products/${formatSlug(item)}`}
            className={`${location.pathname === `/products/${formatSlug(item)}` ? "text-blue-600" : "text-gray-600"}`}
          >
            {item.toUpperCase()}
          </Link>
        </li>
      ))}
    </ul>
  );
};
