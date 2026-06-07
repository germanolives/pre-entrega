import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { SearchbarList } from "./SearchbarList";
import { useProducts } from "../../context/ProductsContext";
import { SearchIcon } from "../../components/Icons/index";
import { useSearch } from "../../context/SearchContext";

export const SearchbarContainer = () => {
  const [dataIn, setDataIn] = useState({
    name: "",
  });
  const { data, loading, error } = useProducts();
  const navigate = useNavigate();
  const { selectedField } = useSearch();

  const manageChange = (event) => {
    const { name, value } = event.target;
    setDataIn({ ...dataIn, [name]: value });
  };
  const manageShipment = (event) => {
    event.preventDefault();
    if (matches.length > 0) {
      navigate(`/dashboard/search/${selectedField.field}/${dataIn.name.trim().toLowerCase()}`);
      setDataIn({ name: "" });
    }
  };

  const query = dataIn.name.trim().toLocaleLowerCase();
  const matches =
    query && data
      ? data.filter((item) => item[selectedField.field].toLowerCase().includes(query))
      : [];

  return (
    <div className="w-full">
      <form className="flex p-2 items-center w-full" onSubmit={manageShipment}>
        <div className="flex grow relative min-w-0">
          <input
            name="name"
            value={dataIn.name}
            onChange={manageChange}
            disabled={loading}
            className="w-full min-w-0 border border-r-0 border-gray-400 px-4 h-9 text-sm rounded-sm rounded-r-none focus:outline-none"
            type="text"
            placeholder={`${loading ? "Loading..." : "Enter product..."}`}
          />

          {error && query && (
            <div className="z-50 absolute block w-full top-full left-0 bg-red-100 text-red-700 p-2 text-xs border border-red-300 rounded-b-sm shadow-md">
              ⚠️ Error: {error}
            </div>
          )}
          {!loading && !error && query && matches.length === 0 && (
            <div className="z-50 absolute block w-full top-full left-0 bg-slate-200 rounded-b-sm border border-t-0 px-4 py-1 shadow-xl text-sm italic">
              No products found with "{query}"
            </div>
          )}
          {!error && !loading && query && matches.length > 0 && (
            <div className="z-50 absolute block w-full top-full left-0 bg-slate-300 rounded-b-sm border border-t-0 px-4 py-1 shadow-xl text-sm">
              <SearchbarList data={matches} reset={setDataIn} />
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          className="border border-gray-400 rounded-sm rounded-l-none h-9 p-2 flex items-center justify-center shrink-0"
          type="submit"
        >
          <SearchIcon className="w-5 h-5 text-gray-500" />
        </Button>
      </form>
    </div>
  );
};
