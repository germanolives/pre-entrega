import { ItemList } from "../Item/ItemList";
import { RenderContent } from "../common/RenderContent";
import { useProducts } from "../../context/ProductsContext";

export const Intro = () => {
  const { data, loading, error } = useProducts();

  return (
    <section
      className={`mx-4 border-2 border-gray-300 rounded-xl p-8 ${loading ? "flex justify-center items-center" : "grid grid-cols-1 gap-4 md:grid-cols-5"}`}
    >
      <RenderContent loading={loading} error={error} data={data}>
        <ItemList data={data} />
      </RenderContent>
    </section>
  );
};
