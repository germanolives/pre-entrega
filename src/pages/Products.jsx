import { ItemList } from "../components/Item/ItemList";
import { RenderContent } from "../components/common/RenderContent";
import { useQuery } from "../hooks/useQuery";
import { Helmet } from "react-helmet-async";
import { Pagination } from "../components/common/Pagination";
import { useSearchParams } from "react-router-dom";

export const Products = () => {
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const { data, loading, error, totalPages, hasMoreServer } = useQuery(
    null,
    null,
    null,
    null,
    currentPage,
  );

  return (
    <section className="mx-4 border-2 border-gray-300 rounded-xl p-8 min-h-130 flex flex-col justify-between">
      <Helmet>
        <title>Catalog | Tienda S.A.U.</title>
        <meta
          name="description"
          content="Explore our premium selection of clothing and electronics."
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

