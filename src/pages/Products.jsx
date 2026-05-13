import { useState, useEffect } from "react";
import { ItemList } from "../components/ItemList";
import { RenderContent } from "../components/common/RenderContent";
import { addProperties } from "../utils/addProperties";

export const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const getData = async () => {
      try {
        const [resProds, resOffers] = await Promise.all([
          fetch("/data/products.json"),
          // fetch("https://fakestoreapi.com/products"),
          fetch("/data/offers.json"),
        ]);
        if (!resProds.ok) {
          throw new Error("No se pudieron cargar los productos");
        }
        if (!resOffers.ok) {
          throw new Error("No se pudieron cargar las ofertas");
        }
        const realProds = await resProds.json();
        const realOffers = await resOffers.json();
        const data = addProperties(realProds, realOffers);
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
    <section className={`mx-4 border-2 border-gray-400 rounded-xl p-8 ${loading ? "flex justify-center items-center" : "grid grid-cols-1 gap-4 md:grid-cols-6"}`}>
      <RenderContent loading={loading} error={error} data={data}>
        <ItemList data={data} />
      </RenderContent>
    </section>
  );
};
