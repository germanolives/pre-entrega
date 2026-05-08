import { useState, useEffect } from "react";
import { ItemList } from "../components/ItemList";
import { RenderContent } from "../components/common/RenderContent";

export const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const getData = async () => {
      try {
        const response = await fetch("/data/products.json");
        if (!response.ok) {
          throw new Error("No se pudieron cargar los productos");
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
    <section className={`${loading ? "flex justify-center items-center" : "grid grid-cols-1 gap-4 md:grid-cols-6"}`}>
      <RenderContent loading={loading} error={error} data={data}>
        <ItemList data={data} />
      </RenderContent>
    </section>
  );
};
