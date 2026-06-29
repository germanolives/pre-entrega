import { ItemList } from "../components/Item/ItemList";
import { RenderContent } from "../components/common/RenderContent";
import { useQuery } from "../hooks/useQuery"; 
import { useParams, useSearchParams } from "react-router-dom"; 
import { Helmet } from "react-helmet-async";
import { capitalize } from "../utils/capitalize";
import { Pagination } from "../components/common/Pagination";

export const Categories = () => {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const { data, loading, error, totalPages, hasMoreServer } = 
    useQuery(categorySlug, null, null, null, currentPage);

  const categoryName =
    data && data.length > 0 ? capitalize(data[0].category) : null;

  return (
    <section className="mx-4 border-2 border-gray-300 rounded-xl p-8 min-h-125 flex flex-col justify-between">
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

      <RenderContent loading={loading} error={error} data={data} time={150}>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <ItemList data={data} />
        </div>
        
        <Pagination totalPages={totalPages} hasMoreServer={hasMoreServer} />
        
      </RenderContent>
    </section>
  );
};