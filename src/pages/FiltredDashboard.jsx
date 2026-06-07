import { useState } from "react";
import { RenderContent } from "../components/common/RenderContent";
import { useProducts } from "../context/ProductsContext";
import { useParams } from "react-router-dom";
import { ProductList } from "../components/Dashboard/ProductList";
import { Button } from "../components/common/Button";

export const FiltredDashboard = () => {
  const { fieldSlug, filterSlug } = useParams();
  const { data, loading, error } = useProducts();
  const [fieldOrder, selectFieldOrder] = useState({
    name: "title",
    order: true,
  });

  const cleanField = fieldSlug ? fieldSlug.trim() : "";
  const cleanFilter = filterSlug ? filterSlug.toLowerCase().trim() : "";

  const searchedProds =
    data && cleanFilter && cleanField
      ? data.filter((item) => {
          if (item[cleanField] === undefined || item[cleanField] === null) return false;
          const valueAsString = String(item[cleanField]).toLowerCase();
          return valueAsString.includes(cleanFilter);
        })
      : [];

  return (
    <section
      className={`mx-28.5 border-2 border-gray-300 rounded-xl p-8 ${loading ? "flex justify-center items-center" : "grid grid-cols-1 gap-4"}`}
    >
      <RenderContent loading={loading} error={error} data={searchedProds}>
                <div className="sticky top-25 self-start p-5 gap-5 grid grid-cols-[3fr_5fr_3fr_2fr_2fr_0.75fr_0.75fr] bg-cyan-300 border border-gray-300 rounded-sm">
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
          <span className="flex items-center justify-center rounded-sm text-white font-semibold bg-green-500">EDIT</span>
          <span className="flex items-center justify-center rounded-sm text-white font-semibold bg-red-400">DEL</span>
        </div>
        <ProductList data={searchedProds} select={fieldOrder} />
      </RenderContent>
    </section>
  );
};