import { ItemList } from "../components/Item/ItemList";
import { RenderContent } from "../components/common/RenderContent";
import { useProducts } from "../context/ProductsContext";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { capitalize } from "../utils/capitalize";
import { Pagination } from "../components/common/Pagination";

export const FiltredProducts = () => {
  const { filterSlug } = useParams();
  const { data, loading, error } = useProducts();

  const cleanFilter = filterSlug ? filterSlug.toLowerCase() : "";
  const displayFilter = capitalize(cleanFilter);
  const searchedProds =
    data && cleanFilter
      ? data.filter((item) => item.title.toLowerCase().includes(cleanFilter))
      : [];

  return (
    <section className="mx-4 border-2 border-gray-300 rounded-xl p-8">
      <Helmet key={displayFilter}>
        <title>
          {displayFilter
            ? `Search Results for: "${displayFilter}" | Tienda S.A.U.`
            : "Searching... | Tienda S.A.U."}
        </title>
        <meta
          name="description"
          content={`Discover our products matching your search for ${displayFilter || "productos"}.Find the best deals at Tienda S.A.U.`}
        />
      </Helmet>
      <RenderContent loading={loading} error={error} data={searchedProds}>
        <Pagination searchedProds={searchedProds} itemsPerPage={5}>
          {(paginatedProds) => (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              <ItemList data={paginatedProds} />
            </div>
          )}
        </Pagination>
      </RenderContent>
    </section>
  );
};
