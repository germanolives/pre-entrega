import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../components/ItemDetail";
import { Loading } from "../components/common/Loading";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { RenderContent } from "../components/common/RenderContent";

export const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, SetError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    SetError(null);

    const getData = async () => {
      try {
        const response = await fetch("/data/products.json");
        if (!response.ok) {
          throw new Error("Productos no disponibles");
        }
        const resData = await response.json();
        const data = resData.find((item) => item.id === parseInt(id));
        if (!data) throw new Error("El producto no existe");
        setData(data);
      } catch (error) {
        SetError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  return (
    <div>
      <RenderContent loading={loading} error={error} data={data}>
        <ItemDetail data={data} />
      </RenderContent>
    </div>
  );
};
