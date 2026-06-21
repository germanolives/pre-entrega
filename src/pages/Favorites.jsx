import { useEffect } from "react";
import { FavoritesList } from "../components/Favorites/FavoritesList";
import { useFavorite } from "../context/FavoriteContext";
import { useProducts } from "../context/ProductsContext";
import { EmptyFavorites } from "../components/Favorites/EmptyFavorites";
import { RenderContent } from "../components/common/RenderContent";
import { Helmet } from "react-helmet-async";
import { Pagination } from "../components/common/Pagination";

export const Favorites = () => {
  const { favorite, checkFavorite } = useFavorite();
  const { data, loading, error } = useProducts();

  useEffect(() => {
    if (data && !loading && data.length > 0) {
      checkFavorite(data);
    }
  }, [data, loading]);

  return (
    <section
      // className={`mx-4 border-2 border-gray-300 rounded-xl p-4 grid grid-cols-1 gap-4 md:${favorite.length > 0 ? "grid-cols-4" : "flex"}`}
      className={`mx-4 border-2 border-gray-300 rounded-xl p-4 md:${favorite.length <= 0 && "flex"}`}
    >
      <Helmet>
        <title>My Favorites | Tienda S.A.U.</title>
        <meta
          name="description"
          content="Manage your saved items and wishlist. Keep track of the products you love and complete your purchase whenever you're ready."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <RenderContent data={data} loading={loading} error={error}>
        {favorite.length > 0 ? (
          <Pagination searchedProds={favorite} itemsPerPage={4}>
            {(paginatedProds) => (
              <div className="grid grid--cols-1 gap-4 md:grid-cols-4">
                <FavoritesList data={paginatedProds} />
              </div>
            )}
          </Pagination>
        ) : (
          <EmptyFavorites />
        )}
      </RenderContent>
    </section>
  );
};
