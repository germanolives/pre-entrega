import { ItemList } from "../components/Item/ItemList";
import { RenderContent } from "../components/common/RenderContent";
import { useProducts } from "../context/ProductsContext";
import { Helmet } from "react-helmet-async";

export const Products = () => {
  const { data, loading, error } = useProducts();

  return (
    <section
      className={`mx-4 border-2 border-gray-300 rounded-xl p-8 ${loading ? "flex justify-center items-center" : "grid grid-cols-1 gap-4 md:grid-cols-5"}`}
    >
      <Helmet>
        <title>Catalog | Tienda S.A.U.</title>
        <meta
          name="description"
          content="Explore our premium selection of clothing and electronics."
        />
      </Helmet>
      <RenderContent loading={loading} error={error} data={data}>
        <ItemList data={data} />
      </RenderContent>
    </section>
  );
};
