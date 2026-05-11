import { Link } from "react-router-dom";
import { formatSlug } from "../utils/formatSlug";

export const SearchbarList = ({ data }) => {
  return (
    <ul>
      {data.map((item) => (
        <Link
          to={`/products/${formatSlug(item.category)}/${formatSlug(item.title)}/${item.id}`}
        >
          <li key={item.id}>
            {item.title} - ({item.category.toUpperCase()})
          </li>
        </Link>
      ))}
    </ul>
  );
};
