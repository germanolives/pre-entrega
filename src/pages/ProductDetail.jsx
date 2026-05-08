import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../components/ItemDetail";
import { RenderContent } from "../components/common/RenderContent";

export const ProductDetail = () => {
  const { category, slug, id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const getData = async () => {
      try {
        const response = await fetch("/data/products.json");
        if (!response.ok) {
          throw new Error("Productos no disponibles");
        }
        const resData = await response.json();
        const productFound = resData.find((item) => item.id === parseInt(id));
        if (!productFound) throw new Error("El producto no existe");

        const categoryInUrl = category.toLowerCase().replace(/\s+|%20/g, "-");
        const categoryInJson = productFound.category
          .toLowerCase()
          .replace(/\s+/g, "-");

        if (categoryInUrl !== categoryInJson) {
          throw new Error("Categoría incorrecta para este producto");
        }

        setData(productFound);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [category, slug, id]);

  return (
    <div>
      <RenderContent loading={loading} error={error} data={data}>
        <ItemDetail data={data} />
      </RenderContent>
    </div>
  );
};
