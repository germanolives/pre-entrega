import { useSearchFields } from "../../context/SearchFieldsContext";
import { Button } from "../common/Button";

export const SearchFilter = () => {
  const { searchFields, changeSearchField, selectedField } = useSearchFields();
  return (
    <div className="flex items-center border border-gray-400 border-t-0 rounded-sm rounded-t-none mx-2">
      <span className="text-gray-500 text-xxs ml-2">SEARCH:</span>
      <ul className="flex flex-row items-center text-xxs">
        {searchFields.map((item) => (
          <li key={item.field} className="">
            {" "}
            <Button
              onClick={() => changeSearchField(item.field)}
              variant={`${selectedField.field === item.field ? "primary" : "secondary"}`}
              className="rounded-sm w-8 mx-0.5"
            >
              {item.field.toUpperCase().slice(0, 3)}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
