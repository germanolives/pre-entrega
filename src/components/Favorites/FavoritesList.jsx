import { FavoritesItem } from "./FavoritesItem";

export const FavoritesList = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <FavoritesItem key={item.id} item={item} />
      ))}
    </>
  );
};
