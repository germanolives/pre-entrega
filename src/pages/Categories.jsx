import { ItemList } from "../components/Item/ItemList";
import { RenderContent } from "../components/common/RenderContent";
import { useProducts } from "../context/ProductsContext";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { capitalize } from "../utils/capitalize";
import { Pagination } from "../components/common/Pagination";

export const Categories = () => {
  const { categorySlug } = useParams();
  const { data, loading, error } = useProducts(categorySlug);

  const categoryName =
    data && data.length > 0 ? capitalize(data[0].category) : null;

  return (
    <section
      // className={`mx-4 border-2 border-gray-300 rounded-xl p-8 ${loading ? "flex justify-center items-center" : "grid grid-cols-1 gap-4 md:grid-cols-5"}`}
      className="mx-4 border-2 border-gray-300 rounded-xl p-8"
    >
      <Helmet>
        <title>
          {categoryName
            ? `${categoryName} | Catalog | Tienda S.A.U.`
            : "Catalog | Tienda S.A.U."}
        </title>

        <meta
          name="description"
          content={
            categoryName
              ? `Explore our premium selection of ${categoryName} at Tienda S.A.U.`
              : "Explore our premium selection of clothing and electronics at Tienda S.A.U."
          }
        />
      </Helmet>
      <RenderContent loading={loading} error={error} data={data}>
        <Pagination searchedProds={data} itemsPerPage={5}>
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
