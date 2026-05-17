import { LinkCustom } from "../common/LinkCustom";
import { formatSlug } from "../../utils/formatSlug";

export const SearchbarList = ({ data, reset }) => {
  const favorite = "tienda";
  return (
    <ul className="max-h-27 overflow-scroll">
      {data.map((item) => (
        <LinkCustom
          key={item.id}
          to={`/products/${formatSlug(item.category)}/${formatSlug(item.title)}/${formatSlug(favorite)}/${item.id}`}
          reset={reset}
        >
          <li>
            {item.title} - ({item.category.toUpperCase()})
          </li>
        </LinkCustom>
      ))}
    </ul>
  );
};
