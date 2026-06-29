import { FavoritesList } from "../components/Favorites/FavoritesList";
import { useFavorite } from "../context/FavoriteContext";
import { useQuery } from "../hooks/useQuery";
import { EmptyFavorites } from "../components/Favorites/EmptyFavorites";
import { RenderContent } from "../components/common/RenderContent";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { ClientPagination } from "../components/common/ClientPagination";

export const Favorites = () => {
  const { idListFavorites } = useFavorite();
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  
  const { data, loading, error } = useQuery(
    null,
    null,
    null,
    idListFavorites,
    currentPage,
  );

  return (
    <section className="mx-4 border-2 border-gray-300 rounded-xl p-8 min-h-125 flex flex-col justify-between">
      <Helmet>
        <title>My Favorites | Tienda S.A.U.</title>
        <meta
          name="description"
          content="Manage your saved items and wishlist. Keep track of the products you love and complete your purchase whenever you're ready."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {idListFavorites.length > 0 ? (
        <RenderContent data={data} loading={loading} error={error} time={150}>
          <ClientPagination searchedProds={data} itemsPerPage={5}>
            {(paginatedProds) => (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                <FavoritesList data={paginatedProds} />
              </div>
            )}
          </ClientPagination>
        </RenderContent>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full my-auto">
          <EmptyFavorites />
        </div>
      )}
    </section>
  );
};