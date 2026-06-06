import { useEffect } from "react"; 
import { FavoritesList } from "../components/Favorites/FavoritesList";
import { useFavorite } from "../context/FavoriteContext";
import { useProducts } from "../context/ProductsContext";
import { EmptyFavorites } from "../components/Favorites/EmptyFavorites";
import { RenderContent } from "../components/common/RenderContent";

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
      className={`mx-4 border-2 border-gray-300 rounded-xl p-4 grid grid-cols-1 gap-4 md:${favorite.length > 0 ? "grid-cols-5" : "flex"}`}
    >
      <RenderContent data={data} loading={loading} error={error}>
        {favorite.length > 0 ? (
          <FavoritesList data={favorite} />
        ) : (
          <EmptyFavorites />
        )}
      </RenderContent>
    </section>
  );
};
