import { ItemList } from "../components/Item/ItemList";
import { RenderContent } from "../components/common/RenderContent";
import { useProducts } from "../context/ProductsContext";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export const FiltredProducts = () => {
  const { filterSlug } = useParams();
  const { data, loading, error } = useProducts();

  const cleanFilter = filterSlug ? filterSlug.toLowerCase() : "";
  const searchedProds =
    data && cleanFilter
      ? data.filter((item) => item.title.toLowerCase().includes(cleanFilter))
      : [];

  return (
    <section
      className={`mx-4 border-2 border-gray-300 rounded-xl p-8 ${loading ? "flex justify-center items-center" : "grid grid-cols-1 gap-4 md:grid-cols-5"}`}
    >
      <Helmet>
        <title>Search Results | Tienda S.A.U.</title>
        <meta
          name="description"
          content={`Discover our products matching your search. Find the best deals at Tienda S.A.U.`}
        />
      </Helmet>
      <RenderContent loading={loading} error={error} data={searchedProds}>
        <ItemList data={searchedProds} />
      </RenderContent>
    </section>
  );
};
