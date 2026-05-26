import {FavoritesList } from "../components/Favorites/FavoritesList";
import { useFavorite } from "../context/FavoriteContext";
import { EmptyFavorites } from "../components/Favorites/EmptyFavorites";

export const Favorites = () => {
  const { favorite } = useFavorite();

  return (
    <section
      className={`mx-4 border-2 border-gray-300 rounded-xl p-4 grid grid-cols-1 gap-4 md:${favorite.length>0 ? "grid-cols-5" : "flex"}`}
    >
      {favorite.length>0 ? <FavoritesList data={favorite} /> : <EmptyFavorites/>}
      
    </section>
  );
};
