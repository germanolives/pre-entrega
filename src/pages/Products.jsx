import { useEffect } from "react";
import { ItemList } from "../components/Item/ItemList";
import { RenderContent } from "../components/common/RenderContent";
import { useQuery } from "../hooks/useQuery";
import { Helmet } from "react-helmet-async";
import { Pagination } from "../components/common/Pagination";
import { useSearchParams } from "react-router-dom";

export const Products = () => {
  // 🚀 Traemos 'setSearchParams' para poder corregir la URL tipeada a mano
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const { data, loading, error, totalPages, hasMoreServer, isInvalidPage } = useQuery(
    null,
    null,
    null,
    null,
    currentPage,
  );

  // 🔒 CONTROLADOR DE FLUJO SÍNCRONO: Si el usuario escribe una página huérfana de cursor,
  // limpiamos la barra y la forzamos a volver a 1, evitando que se desincronice el paginador.
  useEffect(() => {
    if (isInvalidPage) {
      setSearchParams({ page: 1 });
    }
  }, [isInvalidPage, setSearchParams]);

  return (
    <section className="mx-4 border-2 border-gray-300 rounded-xl p-8 min-h-130 flex flex-col justify-between">
      <Helmet>
        <title>Catalog | Tienda S.A.U.</title>
        <meta
          name="description"
          content="Explore our premium selection of clothing and electronics."
        />
      </Helmet>

      {/* Sumamos 'isInvalidPage' al loading para congelar la vista mientras el useEffect reencamina la URL */}
      <RenderContent loading={loading || isInvalidPage} error={error} data={data} time={150}>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <ItemList data={data} />
        </div>

        <Pagination totalPages={totalPages} hasMoreServer={hasMoreServer} />
        
      </RenderContent>
    </section>
  );
};


