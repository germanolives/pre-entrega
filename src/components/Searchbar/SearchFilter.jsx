import { useSearch } from "../../context/SearchContext";
import { Button } from "../common/Button";

export const SearchFilter = () => {
  const { search, changeSearch, selectedField } = useSearch();
  return (
    <div className="flex items-center border border-gray-400 border-t-0 rounded-sm rounded-t-none mx-1">
      <span className="text-gray-500 text-xxs ml-2">SEARCH:</span>
      <ul className="flex flex-row items-center text-xs">
        {search.map((item) => (
          <li key={item.field} className="">
            {" "}
            <Button
              onClick={() => changeSearch(item.field)}
              variant={`${selectedField.field === item.field ? "primary" : "secondary"}`}
              className="rounded-sm w-8  mx-0.5"
            >
              {item.field.toUpperCase().slice(0, 3)}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
