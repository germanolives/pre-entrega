import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { SearchbarList } from "./SearchbarList";
import { useQuery } from "../../hooks/useQuery";

export const SearchbarContainer = () => {
  const [dataIn, setDataIn] = useState({
    name: "",
  });
  const { data, loading, error } = useQuery();
  const navigate = useNavigate();

  const manageChange = (event) => {
    const { name, value } = event.target;
    setDataIn({ ...dataIn, [name]: value });
  };
  const manageShipment = (event) => {
    event.preventDefault();
    if (matches.length>0) {
      navigate(`/products/search/${dataIn.name.trim().toLowerCase()}`);
      setDataIn({name: ""})
    }
  };

  const query = dataIn.name.trim().toLocaleLowerCase();
  const matches = query && data
    ? data.filter((item) => item.title.toLowerCase().includes(query))
    : [];

  return (
    <div className="hidden md:block w-full">
      <form className="flex p-2 gap-2 justify-evenly" onSubmit={manageShipment}>
        <label htmlFor="" className="flex flex-col grow relative">
          <input
            name="name"
            value={dataIn.name}
            onChange={manageChange}
            disabled={loading}
            className="flex grow border border-gray-400 px-4 rounded-sm"
            type="text"
            placeholder={`${loading ? "Loading products..." : "Enter the product..."}`}
          />
          {error && query && (
            <div className="z-50 absolute block w-full top-full bg-red-100 text-red-700 p-2 text-xs border border-red-300 rounded-b-sm shadow-md">
              ⚠️ Error loading products: {error}
            </div>
          )}
          {!loading && !error && query && matches.length === 0 && (
            <div className="z-50 absolute block w-full top-full bg-slate-200 rounded-b-sm border border-t-0 px-4 shadow-xl text-sm italic">
              No products were found with "{query}"
            </div>
          )}
          {!error && !loading && query && matches.length > 0 && (
            <div className="z-50 absolute block w-full top-full bg-slate-300 rounded-b-sm border border-t-0 px-4 shadow-xl text-sm">
              <SearchbarList data={matches} reset={setDataIn} />
            </div>
          )}
        </label>
        <Button
          variant="ghost"
          className="border border-gray-400 rounded-sm px-6 py-2"
          type="submit"
        >
          Go
        </Button>
      </form>
    </div>
  );
};




