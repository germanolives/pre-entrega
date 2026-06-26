import { LinkCustom } from "../common/LinkCustom";

export const SearchbarList = ({ data, reset }) => {


  return (
    <ul className="max-h-27 overflow-scroll">
      {data.map((item) => (
        <LinkCustom
          key={item.id}
          to={`/products/${item.categorySlug}/${item.titleSlug}/${item.id}`}
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
