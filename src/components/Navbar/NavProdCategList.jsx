import { Link } from "react-router-dom";
import { formatSlug } from "../../utils/formatSlug";

export const NavProdCategList = ({ data }) => {
  return (
    <ul className="hidden group-hover:block absolute top-full bg-slate-200 shadow-md border border-gray-400 p-2 min-w-30 z-50 rounded-xl">
      {data.map((item) => (
        <li className="p-0.5">
          <Link to={`/products/${formatSlug(item)}`}>{item.toUpperCase()}</Link>
        </li>
      ))}
    </ul>
  );
};
