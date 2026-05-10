import { useState, useEffect } from "react";
import { Button } from "./common/Button";

export const SearchbarContainer = () => {
  const [dataIn, setDataIn] = useState({
    name: "",
  });
  const [data, setData] = useState([]);
  const [dataRes, setDataRes] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const manageChange = (event) => {
    const { name, value } = event.target;
    setDataIn({ ...dataIn, [name]: value });
  };
  const manageShipment = (event) => {
    event.preventDefault();
    console.log("Enviando los siguientes datos a la API:", dataIn);
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

  return (
    <div className="hidden md:block w-full">
      <form className="flex p-2 gap-2 justify-evenly" onSubmit={manageShipment}>
        <label htmlFor="" className="flex flex-col grow relative">
          <input
            name="name"
            value={dataIn.name}
            onChange={manageChange}
            className="flex grow border px-4 rounded-sm"
            type="text"
            placeholder="Ingrese el producto..."
          />
          <p className="z-50 absolute block w-full top-full bg-slate-300 rounded-sm border px-4">
            {dataIn.name}
          </p>
        </label>
        <Button variant="ghost" className="border rounded-sm px-6 py-2">
          Ir
        </Button>
      </form>
    </div>
  );
};
