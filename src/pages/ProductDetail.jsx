import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail} from "../components/ItemDetail";

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

  const renderContent = () => {
    if (error) {
      return (
        div
      )
    }
  }


  return (
    <div>
      <ItemDetail data={data} />
    </div>
  );
};
