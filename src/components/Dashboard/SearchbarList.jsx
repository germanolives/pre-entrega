import { LinkCustom } from "../common/LinkCustom";
import { useSearchFields } from "../../context/SearchFieldsContext";

export const SearchbarList = ({ data, reset }) => {
  const { selectedField, unselectedFields } = useSearchFields();
  return (
    <ul className="max-h-27 overflow-scroll">
      {data.map((item) => (
        <LinkCustom
          key={item.id}
          to={`/dashboard/edit/${item.categorySlug}/${item.titleSlug}/${item.id}`}
          reset={reset}
        >
          <li>
            {item[selectedField.field]} - ({item[unselectedFields[0].field]})
          </li>
        </LinkCustom>
      ))}
    </ul>
  );
};
