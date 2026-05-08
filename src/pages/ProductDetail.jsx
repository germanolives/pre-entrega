import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../components/ItemDetail";
import { RenderContent } from "../components/common/RenderContent";
import { formatSlug } from "../utils/formatSlug";

export const ProductDetail = () => {
  const { categorySlug, titleSlug, id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const getData = async () => {
      try {
        const response = await fetch("/data/products.json");
        // const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Productos no disponibles");
        }
        const resData = await response.json();
        const productFound = resData.find((item) => item.id === parseInt(id));
        // const productFound = resData;
        if (!productFound) throw new Error("El producto no existe");

        const categoryInJson = formatSlug(productFound.category)

        if (categorySlug !== categoryInJson) {
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
  }, [categorySlug, titleSlug, id]);

  return (
    <div>
      <RenderContent loading={loading} error={error} data={data}>
        <ItemDetail data={data} />
      </RenderContent>
    </div>
  );
};
