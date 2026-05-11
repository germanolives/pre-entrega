import { Link } from "react-router-dom";
import { formatSlug } from "../utils/formatSlug";

export const SearchbarList = ({ data }) => {
  const favorite = "search";
  return (
    <ul>
      {data.map((item) => (
        <Link
          to={`/products/${formatSlug(item.category)}/${formatSlug(item.title)}/${formatSlug(favorite)}/${item.id}`}
        >
          <li key={item.id}>
            {item.title} - ({item.category.toUpperCase()})
          </li>
        </Link>
      ))}
    </ul>
  );
};
