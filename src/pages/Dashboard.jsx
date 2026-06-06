import { useState, useEffect } from "react";
import { useProducts } from "../context/ProductsContext";
import { RenderContent } from "../components/common/RenderContent";
import { ProductList } from "../components/Dashboard/ProductList";
import { useSource } from "../context/SourceContext";
import { Button } from "../components/common/Button";
import { Header } from "../layouts/Header";

export const Dashboard = () => {
  const { changeSource } = useSource();
  const { data, loading, error } = useProducts();
  const [fieldOrder, selectFieldOrder] = useState({
    name: "title",
    order: true,
  });

  useEffect(() => {
    changeSource("db");
  }, []);

  return (
    <div
      className={`mx-28.5 border-2 border-gray-300 rounded-xl p-8 ${loading ? "flex justify-center items-center" : "grid grid-cols-1 gap-4"}`}
    >
      <RenderContent data={data} loading={loading} error={error}>
        <div className="sticky top-25 self-start p-5 gap-5 grid grid-cols-[3fr_5fr_3fr_2fr_2fr] bg-cyan-300 border border-gray-300 rounded-sm">
          <Button
            onClick={() =>
              selectFieldOrder((prev) => ({
                ...prev,
                name: "code",
                order: prev.name === "code" ? !prev.order : true,
              }))
            }
            variant="primary"
            className="rounded-sm text-center"
          >
            CODE
          </Button>
          <Button
            onClick={() =>
              selectFieldOrder((prev) => ({
                ...prev,
                name: "title",
                order: prev.name === "title" ? !prev.order : true,
              }))
            }
            variant="primary"
            className="rounded-sm text-center"
          >
            TITLE
          </Button>
          <Button
            onClick={() =>
              selectFieldOrder((prev) => ({
                ...prev,
                name: "category",
                order: prev.name === "category" ? !prev.order : true,
              }))
            }
            variant="primary"
            className="rounded-sm text-center"
          >
            CATEGORY
          </Button>
          <Button
            onClick={() =>
              selectFieldOrder((prev) => ({
                ...prev,
                name: "price",
                order: prev.name === "price" ? !prev.order : true,
              }))
            }
            variant="primary"
            className="rounded-sm text-center"
          >
            PRICE
          </Button>
          <Button
            onClick={() =>
              selectFieldOrder((prev) => ({
                ...prev,
                name: "stock",
                order: prev.name === "stock" ? !prev.order : true,
              }))
            }
            variant="primary"
            className="rounded-sm text-center"
          >
            STOCK
          </Button>
        </div>
        <ProductList select={fieldOrder} data={data} />
      </RenderContent>
    </div>
  );
};
