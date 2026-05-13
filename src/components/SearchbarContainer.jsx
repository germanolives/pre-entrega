import { useState, useEffect } from "react";
import { Button } from "./common/Button";
import { SearchbarList } from "./SearchbarList";

export const SearchbarContainer = () => {
  const [dataIn, setDataIn] = useState({
    name: "",
  });
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const manageChange = (event) => {
    const { name, value } = event.target;
    setDataIn({ ...dataIn, [name]: value });
  };
  const manageShipment = (event) => {
    event.preventDefault();
    console.log("Enviando...", dataIn);
  };

  useEffect(() => {
    setError(null);
    setLoading(true);

    const getData = async () => {
      try {
        const response = await fetch("/data/products.json");
        if (!response.ok) {
          throw new Error("No hay productos");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const query = dataIn.name.trim().toLocaleLowerCase();
  const matches = query
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
            className="flex grow border px-4 rounded-sm"
            type="text"
            placeholder={`${loading ? "Cargando productos..." : "Ingrese el producto..."}`}
          />
          {error && query && (
            <div className="z-50 absolute block w-full top-full bg-red-100 text-red-700 p-2 text-xs border border-red-300 rounded-b-sm shadow-md">
              ⚠️ Error al cargar productos: {error}
            </div>
          )}
          {!loading && !error && query && matches.length === 0 && (
            <div className="z-50 absolute block w-full top-full bg-slate-300 rounded-b-sm border border-t-0 px-4 shadow-xl text-sm italic">
              No se encontraron productos con "{query}"
            </div>
          )}
          {!error && query && matches.length > 0 && (
            <div className="z-50 absolute block w-full top-full bg-slate-300 rounded-b-sm border border-t-0 px-4 shadow-xl text-sm">
              <SearchbarList data={matches} reset={setDataIn} />
            </div>
          )}
        </label>
        <Button
          variant="ghost"
          className="border rounded-sm px-6 py-2"
          type="submit"
        >
          Ir
        </Button>
      </form>
    </div>
  );
};
